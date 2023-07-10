// Functions
import {Routes, Route} from 'react-router-dom';
import {useContext} from "react";

// Context
import {AuthContext} from "./context/AuthContext";

// Components
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

// Pages
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import SearchSpecific from "./pages/searchspecific/SearchSpecific";
import Suggestion from "./pages/suggestion/Suggestion";
import SuggestionSpecific from "./pages/suggestionspecific/SuggestionSpecific";
import Lists from "./pages/lists/Lists";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import MovieDetails from "./pages/details/MovieDetails";
import SerieDetails from "./pages/details/SerieDetails";

// Styles
import './App.css';

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            {isAuth && <NavBar/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/zoeken/filter/:filterId" element={<Search/>}/>
                <Route path="/zoeken/specifiek/:searchId" element={<SearchSpecific/>}/>
                <Route path="/suggestie" element={<Suggestion/>}/>
                <Route path="/suggestie/:moodId/:pageId" element={<SuggestionSpecific/>}/>
                <Route path="/lijsten" element={<Lists/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/registratie" element={<SignUp/>}/>
                <Route path="/film-details/:movieId" element={<MovieDetails/>}></Route>
                <Route path="/serie-details/:serieId" element={<SerieDetails/>}></Route>
            </Routes>
            {isAuth && <Footer/>}
        </>
    );
}

export default App;
