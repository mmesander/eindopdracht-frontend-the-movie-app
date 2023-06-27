// Functions
import React, {createContext, useState} from "react";

export const ListsContext = createContext(null);

function ListsContextProvider({children}) {
    const [listItem, setListItem] = useState({
        favorite: false,
        watchlist: false,
        watched: false
    })

    const data = {
        favorite: listItem.favorite,
        watchlist: listItem.watchlist,
        watched: listItem.watched,
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