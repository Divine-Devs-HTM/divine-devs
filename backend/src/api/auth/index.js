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
            return res.status(400).json({ success: false, message: 'Username is already taken' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email is already registered' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username, email, password: hashedPassword, avatar: `https://avatar.iran.liara.run/public?username=${username}` });
        
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(201).json({ 
            success: true,
            message: 'User registered successfully', 
            userId: user._id,
            token: token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
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
        res.status(500).json({ success: false, message: 'Error logging in user', error: error.message });
    }
});

authRouter.get('/loggedin', (req, res) => {
    const token = req.cookies && req.cookies.token;
    console.log("token", token);
    console.log(req);
    if (!token) {
        console.log("no token");
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("error verifying token");
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        console.log("token verified");
        res.status(200).json({ success: true, message: 'User logged in', userId: decoded.userId });
    });
});

authRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'User logged out' });
});

export default authRouter;