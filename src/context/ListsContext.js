// Functions
import React, {createContext, useEffect, useState} from "react";

export const ListsContext = createContext(null);

function ListsContextProvider({children}) {
    const [listItem, setListItem] = useState({
        favoriteMovies: [],
        watchlistMovies: [],
        watchedMovies: [],
        favoriteSeries: [],
        watchlistSeries: [],
        watchedSeries: [],
    });

    // useEffect(() => {
    //     if (!localStorage.getItem("movies")) {
    //         localStorage.setItem('movies', JSON.stringify(listItem))
    //     }
    //     if (!localStorage.getItem("series")) {
    //         localStorage.setItem('series', JSON.stringify(listItem))
    //     }
    // }, []);

    const data = {
        listItem: listItem,
        setListItem: setListItem,
    }

    return (
        <ListsContext.Provider value={data}>
            {children}
        </ListsContext.Provider>
    )
}

export default ListsContextProvider;