// Styles
import './App.css';

// Functions
import {Routes, Route} from 'react-router-dom';
import {useContext} from "react";

// Pages
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Suggestion from "./pages/suggestion/Suggestion";
import Lists from "./pages/lists/Lists";

// Components
import NavBar from "./components/navbar/NavBar";
import SignIn from "./pages/signin/SignIn";

// Context
import {AuthContext} from "./context/AuthContext";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            {isAuth && <NavBar/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/zoeken" element={<Search/>}/>
                <Route path="/suggestie" element={<Suggestion/>}/>
                <Route path="/lijsten" element={<Lists/>}/>
                <Route path="/login" element={<SignIn/>}/>
            </Routes>
        </>
    );
}

export default App;
