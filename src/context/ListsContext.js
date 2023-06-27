// Functions
import React, {createContext} from "react";

export const ListsContext = createContext(null);

function ListsContextProvider({children}) {


    return (
        <ListsContext.Provider value={data}>
            {children}
        </ListsContext.Provider>
    )
}

export default ListsContextProvider;