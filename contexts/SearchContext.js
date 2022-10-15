import { createContext, useReducer } from "react";
import { INITIAL_STATE, SearchReducer } from "../Reducers/SearchReducer";

export const SearchContext = createContext(INITIAL_STATE)

export const SearchProvider = (props) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

    return (
        <SearchContext.Provider value={{ state, dispatch }}>
            {props.children}
        </SearchContext.Provider>
    )

}

export default SearchProvider