// Styles
import './index.css';

// Functions
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";

// Pages
import App from './App';

// Components
import AuthContextProvider from "./context/AuthContext";
import UsernameContextProvider from "./context/UsernameContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <PasswordContextProvider>
                <UsernameContextProvider>
                    <AuthContextProvider>
                        <App/>
                    </AuthContextProvider>
                </UsernameContextProvider>
            </PasswordContextProvider>
        </Router>
    </React.StrictMode>
);
