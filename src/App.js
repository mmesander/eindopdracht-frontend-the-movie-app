// Styles
import './App.css';

// Functions
import {Routes, Route, Link} from 'react-router-dom';

// Pages
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Suggestion from "./pages/suggestion/Suggestion";
import Lists from "./pages/lists/Lists";

// Components
import NavBar from "./components/navbar/NavBar";
import SingIn from "./pages/singin/SingIn";

function App() {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/zoeken" element={<Search/>}/>
                <Route path="/suggestie" element={<Suggestion/>}/>
                <Route path="/lijsten" element={<Lists/>}/>
                <Route path="/login" element={<SingIn/>}/>
            </Routes>
        </>
    );
}

export default App;
