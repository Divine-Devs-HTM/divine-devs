import React from 'react';

const Footer = () => {

    return (
        <footer className="bg-[#9CCFCE] text-white text-center p-4 m-0 relative top-0">
            <p>&copy; {new Date().getFullYear()} ParsePal. All rights reserved.</p>
        </footer>
    );
}

export default Footer;