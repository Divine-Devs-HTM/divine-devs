import React, { useState } from 'react';
import { login } from '../../api/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        console.log(response);
        if (response.success) {
            localStorage.setItem('token', response.token);
            window.location.href = '/';
        } else {
            alert(response.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFF5B6] via-[#F6F2BC] to-[#E8EDC5]">
            <div className="bg-[#FFF5B6] p-12 w-[90vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] rounded-2xl auth-box-shadow border-t-[2px] border-l-[2px] border-[#9CCFCE]">
                <h1 className="text-5xl md:text-6xl font-bold rune text-[#9CCFCE] text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)] mb-8">
                    Welcome Back!
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-8 mt-12">
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email*" className="w-full p-3 rounded-full bg-[#F9DE87] text-[#49878A] font-bold text-lg auth-input-shadow" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password*" className="w-full p-3 rounded-full bg-[#F9DE87] text-[#49878A] font-bold text-lg auth-input-shadow" />
                    <button type="submit" className="bg-[#9CCFCE] mt-8 text-[#49878A] px-16 py-3 rounded-full text-[#E8EDC5] font-bold text-xl hover:bg-[#8BBFBE] transition-colors duration-300">
                        Sign In
                    </button>
                    <p className="text-lg mt-4">
                        Don't have an account? <a href="/register" className="text-[#49878A] font-bold hover:underline">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;