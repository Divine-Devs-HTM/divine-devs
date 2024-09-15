import React, { useState, useEffect } from 'react';
import { getLoggedInUser } from '../api/auth';

const Header = () => {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getLoggedInUser();
            setUser(userData);
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        // Implement logout functionality here
        console.log('Logout clicked');
        setDropdownOpen(false);
    };

    return (
        <header className="flex justify-between items-center p-4 bg-[#9CCFCE]">
            <div>
                <h1 className={"text-3xl font-bold rune text-[#FFF5B6] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"} >ParsePal</h1>
            </div>
                {user?.success ? (
                    <div className="relative">
                        <button className="flex items-center space-x-2 focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img src={user.user?.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <div className="px-4 py-2 text-sm text-gray-700">Hi {user.user?.username}</div>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <a href="/login" className="mr-4 px-4 py-2 text-[#9CCFCE] bg-[#FFF5B6] rounded-full shadow-lg hover:shadow-xl duration-300 inline-block">
                            <span className="text-[#9CCFCE] drop-shadow-md [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">Sign In</span>
                        </a>
                        <a href="/register" className="px-4 py-2 text-[#9CCFCE] bg-[#FFF5B6] rounded-full shadow-lg hover:shadow-xl duration-300 inline-block">
                            <span className="text-[#9CCFCE] drop-shadow-md [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">Sign Up</span>
                        </a>
                    </div>
                )}
        </header>
    );
}

export default Header;