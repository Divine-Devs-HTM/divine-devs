import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../api/ml';

const Convert = () => {
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(true);
    const [response, setResponse] = useState("Loading...");

    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0]);
    }, []);

    const handleConvert = async () => {
        setShowModal(true);
        if(file) {
            let fileType = '';
            if (file.type.startsWith('image/')) {
                fileType = 'img';
            } else if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                fileType = 'pdf';
            }
            const response = await uploadFile(file, fileType);
            showResponse(response);
        }
    }

    function showResponse(response) {
        setResponse(response);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(response, null, 2))
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="h-[86.7vh] flex flex-col items-center justify-center">
            <div>
                <div {...getRootProps()} className={`flex flex-col items-center justify-center h-full border-2 border-black border-dashed w-[500px] h-[230px] rounded-xl ${isDragActive ? 'bg-gray-100' : ''}`}>
                <input {...getInputProps()} />
                    <h1 className="text-4xl font-bold">
                        {file ? file.name : 'Upload your file'}
                    </h1>
                    <p className="text-lg">
                        {file ? 'File selected' : 'Drag and drop a file here, or click to select a file'}
                    </p>
                </div>
                {file && (
                    <button onClick={handleConvert} className="mt-4 px-4 py-2 bg-[#9CCFCE] text-white rounded">
                        Convert to JSON
                    </button>
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
                        <h2 className="text-2xl font-bold mb-4">Conversion Result</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-[#F9DE87] text-[#9CCFCE] rounded hover:bg-[#F7D46A] transition-colors"
                            >
                                Copy to Clipboard
                            </button>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-[#9CCFCE] text-white rounded hover:bg-[#7BAFAE] transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Convert;