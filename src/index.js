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
import PasswordContextProvider from "./context/PasswordContext";
import PasswordCheckContextProvider from "./context/PasswordCheckContext";
import EmailContextProvider from "./context/EmailContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <EmailContextProvider>
                <PasswordContextProvider>
                    <PasswordCheckContextProvider>
                        <UsernameContextProvider>
                            <AuthContextProvider>
                                <App/>
                            </AuthContextProvider>
                        </UsernameContextProvider>
                    </PasswordCheckContextProvider>
                </PasswordContextProvider>
            </EmailContextProvider>
        </Router>
    </React.StrictMode>
);
