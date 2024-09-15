import React, { useState, useEffect } from 'react';
import Convert from './components/convert/Convert';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Chat from './components/chat/Chat';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { getLoggedInUser } from './api/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        const userData = await getLoggedInUser();
        setUser(userData);
    };

    fetchUser();
}, []);


  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="gap-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat avatar={user?.user?.avatar} />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;