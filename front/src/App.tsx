import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';

function App() {
    const [maVariable, setMaVariable] = useState<string | null>(null);
    const maVariableHandler = () => {
        setMaVariable("c'est moi");
    };

    return (
        <div className="App">
            <Home></Home>
            <p>maVariable</p>
            <p>{maVariable}</p>
        </div>
    );
}

export default App;
