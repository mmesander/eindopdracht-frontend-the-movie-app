// Functions
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";

// Context
import AuthContextProvider from "./context/AuthContext";
import ListsContextProvider from "./context/ListsContext";

// Pages
import App from './App';

// Styles
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <ListsContextProvider>
                    <App/>
                </ListsContextProvider>
            </AuthContextProvider>
        </Router>
    // </React.StrictMode>
);