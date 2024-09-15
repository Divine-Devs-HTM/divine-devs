import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../model/user.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(200).json({ success: false, message: 'Username is already taken' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(200).json({ success: false, message: 'Email is already registered' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username, email, password: hashedPassword, avatar: `https://avatar.iran.liara.run/public?username=${username}` });
        
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({ 
            success: true,
            message: 'User registered successfully', 
            userId: user._id,
            token: token
        });
    } catch (error) {
        res.status(200).json({ success: false, message: 'Error registering user', error: error.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(200).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ 
            success: true,
            message: 'User logged in successfully', 
            userId: user._id
        });
    } catch (error) {
        res.status(200).json({ success: false, message: 'Error logging in user', error: error.message });
    }
});

authRouter.get('/loggedin', async (req, res) => {
    const token = req.cookies && req.cookies.token;
    if (!token) {
        console.log('No token found');
        return res.status(200).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            console.log('User not found');
            return res.status(200).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ 
            success: true,
            message: 'User logged in', 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.log('Error getting logged in user', error);
        res.status(200).json({ success: false, message: 'Unauthorized' });
    }
});

authRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'User logged out' });
});

export default authRouter;