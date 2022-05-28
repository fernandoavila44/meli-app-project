import React from "react";

const SearchContext = React.createContext({
    product: '',    
    ToSearch: (product) => {},
})

export default SearchContext;