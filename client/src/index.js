import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BalanceContextProvider } from './context/BalanceContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <BalanceContextProvider>
            <App />
        </BalanceContextProvider>
    </AuthContextProvider>
);


