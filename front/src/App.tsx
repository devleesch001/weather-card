import React from 'react';
import './App.css';
import Home from './components/Home';
import { setAuthToken } from './services/AuthentificationService';

function App() {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }

    return (
        <div className="App">
            <Home></Home>
        </div>
    );
}

export default App;
