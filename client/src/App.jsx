import React from 'react';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
function App() {
    return (
        <div>
            <Navbar />
            {/* <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/welcome">Welcome</Link> */}

            <Routes>
                <Route path="/" element={<Homepage />} />

                {/* <Route path="/welcome" element={<Welcome />} /> */}
                <Route path="/welcome/:client_id" element={<Welcome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
