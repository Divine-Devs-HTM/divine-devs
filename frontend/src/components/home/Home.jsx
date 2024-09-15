import React from 'react';

const Home = () => {
    return (
        <main className="flex flex-col bg-white min-h-[86.7vh] m-0">
            <div className="flex-grow px-[15vh] pt-[18vh] rounded-xl">
                <h1 className="text-5xl rune mb-6 text-[#9CCFCE] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    ParsePal:{' '}
                    <span className="font-inria font-light">
                        Effortless Document Extraction
                    </span>
                </h1>
                <p className="text-2xl text-[#9CCFCE] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] max-w-3xl leading-relaxed">
                    Upload your PDFs, JPEGs, or PNGs, and let ParsePal extract and convert
                    text and tables into JSON or CSV. Use our interactive query feature
                    to get specific insights from your documents quickly and easily.
                </p>
                <button onClick={() => window.location.href = '/chat'} className="bg-[#9CCFCE] mt-6 text-[#49878A] h-20 w-48 p-0 rounded-full text-3xl text-[#E8EDC5] font-bold">
                    Get Started
                </button>
            </div>
            <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative left-[95vw] bottom-5 right-0"
            >
                <path
                    d="M30 40V20"
                    stroke="#49878A"
                    strokeWidth="3.75"
                    strokeLinecap="round"
                />
                <path
                    d="M20 35V25"
                    stroke="#49878A"
                    strokeWidth="3.75"
                    strokeLinecap="round"
                />
                <path
                    d="M40 35V25"
                    stroke="#49878A"
                    strokeWidth="3.75"
                    strokeLinecap="round"
                />
                <path
                    d="M42.5 8.34455C38.8227 6.21743 34.5535 5 30 5C16.1929 5 5 16.1929 5 30C5 33.9992 5.93905 37.779 7.60865 41.1312C8.05235 42.022 8.20002 43.0402 7.9428 44.0015L6.45378 49.5668C5.80738 51.9825 8.01752 54.1925 10.4334 53.5463L15.9985 52.0573C16.9598 51.8 17.978 51.9477 18.8688 52.3912C22.2209 54.061 26.0008 55 30 55C43.807 55 55 43.807 55 30C55 25.4465 53.7825 21.1772 51.6555 17.5"
                    stroke="#49878A"
                    strokeWidth="3.75"
                    strokeLinecap="round"
                />
            </svg>
        </main>
    );
};

export default Home;