import React, { useState } from 'react';
import { sendMessage, uploadFile } from '../../api/ml';
import ClockLoader from "react-spinners/ClockLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Chat = ({ avatar }) => {
    const [chats, setChats] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileId, setFileId] = useState(true);

    const handleUpload = async () => {
        if (file) {
            try {
                const response = await uploadFile(file);
                console.log('File uploaded:', response);
                setFileId(response.file_id);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleMessage = async () => {
        if (fileId && currentMessage) {
            const newUserMessage = { role: 'user', content: currentMessage };
            setChats(prevChats => [...prevChats, newUserMessage]);
            setIsLoading(true);
            try {
                const response = await sendMessage(fileId, currentMessage);
                console.log('Message sent:', response);
                setChats(prevChats => [...prevChats, { role: 'assistant', content: response.message }]);
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Error sending message');
            } finally {
                setIsLoading(false);
                setCurrentMessage('');
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleMessage();
        }
    }

    return (
        <div className="bg-[#F6F2BC] h-[86.7vh] overflow-y-auto p-4">
            {chats.map((chat, index) => {
                return (
                    <div key={index} className={`flex flex-col ${chat.role === 'user' ? 'items-end' : 'items-start'} mb-4`}>
                        <div className={`flex ${chat.role === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-[70%]`}>
                            <div className="w-10 h-10 rounded-full bg-[#F9DE87] flex items-center justify-center overflow-hidden flex-shrink-0">
                                {chat.role === 'user' ? 
                                    <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" /> 
                                    : 'A'}
                            </div>
                            <div className={`${chat.role === 'user' ? 'mr-2 bg-[#9CCFCE]' : 'ml-2 bg-[#F9DE87]'} p-3 rounded-lg`}>
                                {chat.content}
                            </div>
                        </div>
                    </div>
                )
            })}
            {isLoading && (
                <div className="flex flex-col items-start mb-4">
                    <div className="flex flex-row max-w-[70%]">
                        <div className="w-10 h-10 rounded-full bg-[#F9DE87] flex items-center justify-center overflow-hidden flex-shrink-0">
                            A
                        </div>
                        <div className="ml-2 flex items-center bg-[#F9DE87] p-3 rounded-lg">
                            <ClockLoader color="#49878A" cssOverride={override} size={24} />
                            <span className="ml-2">Thinking...</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative mt-4">
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    className={"w-full relative b-0 p-3 pr-12 rounded-full bg-[#F9DE87] text-[#49878A] font-bold text-lg auth-input-shadow focus:outline-none " + (fileId ? "hidden" : "")}
                />
                <input 
                    type="text" 
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask ParsePal..."
                    value={currentMessage}
                    className={"w-full relative b-0 p-3 pr-12 rounded-full bg-[#F9DE87] text-[#49878A] font-bold text-lg auth-input-shadow focus:outline-none " + (!fileId ? "hidden" : "")}
                />
                <button 
                    onClick={fileId != null ? handleMessage : handleUpload}
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