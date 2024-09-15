import React, { useState } from 'react';
import { uploadFile } from '../../api/ml';

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileId, setFileId] = useState(null);

    const handleUpload = async () => {
        if (file) {
            try {
                const response = await uploadFile(file);
                console.log('File uploaded:', response);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleMessage = async () => {
    }

    return (
        <div className="bg-[#F6F2BC] h-[86.7vh] overflow-y-auto p-4">
            <div className="relative">
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    className="w-full p-3 pr-12 rounded-full bg-[#F9DE87] text-[#49878A] font-bold text-lg auth-input-shadow focus:outline-none"
                />
                <button 
                    onClick={handleUpload}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#F9DE87] hover:bg-[#F7D76C] focus:outline-none transition duration-300 ease-in-out"
                >
                    <svg width="20" height="24" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1801 29.5093L13.1801 2.49064M13.1801 2.49064L3.18005 13.2981M13.1801 2.49064L23.1801 13.2981" stroke="#49878A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Chat;