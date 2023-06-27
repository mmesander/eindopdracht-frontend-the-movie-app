// Functions
import React, {createContext, useState} from "react";

export const ListsContext = createContext(null);

function ListsContextProvider({children}) {
    const [favorite, setFavorite] = useState(false);
    const [watchlist, setWatchlist] = useState(false);
    const [watched, setWatched] = useState(false);

    const data = {
        favorite: favorite,
        setFavorite: setFavorite,
        watchlist: watchlist,
        setWatchlist: setWatchlist,
        watched: watched,
        setWatched: setWatched,
    }

    return (
        <ListsContext.Provider value={data}>
            {children}
        </ListsContext.Provider>
    )
}

export default ListsContextProvider;