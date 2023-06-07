// Styles
import './App.css';

// Functions
import {Routes, Route} from 'react-router-dom';

// Pages
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Suggestion from "./pages/suggestion/Suggestion";
import Lists from "./pages/lists/Lists";

// Components
import NavBar from "./components/NavBar";

function App() {
    return (
        <NavBar/>
    );
}

export default App;
