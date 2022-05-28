import React, { useState } from "react";
import SearchContext from "./SearchContext";

const SearchProvider = props =>{

    const [product, setProduct] = useState('')

    const productTOSearch = (product) =>{
        setProduct(product)
    }

    const searchContext = {
        product: product,
        ToSearch: productTOSearch
    }

    return(
        <SearchContext.Provider value={searchContext}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchProvider;