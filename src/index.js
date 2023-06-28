// Styles
import './index.css';

// Functions
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";

// Pages
import App from './App';

// Context
import AuthContextProvider from "./context/AuthContext";
import ListsContextProvider from "./context/ListsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <ListsContextProvider>
                    <App/>
                </ListsContextProvider>
            </AuthContextProvider>
        </Router>
    // </React.StrictMode>
);
