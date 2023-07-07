// Functions
import React, {createContext, useState} from "react";

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