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
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp"

// Components
import NavBar from "./components/navbar/NavBar";

// Context
import {AuthContext} from "./context/AuthContext";
import MovieDetails from "./pages/moviedetails/MovieDetails";

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
                <Route path="/registratie" element={<SignUp/>}/>
                <Route path="/details/:movieId" element={<MovieDetails/>}></Route>
            </Routes>
        </>
    );
}

export default App;
