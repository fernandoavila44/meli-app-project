import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import Card from "../UI/Card/Card"
import ProductsItem from './ProductsItem';
import classes from "./AvailablesProducts.module.css";
import BreadCrumb from "../UI/BreadCrumb/BreadCrumb";
import Spinner from "../UI/Spinner/Spinner";
import Errors from "../UI/Errors/Errors";

import { searchItem } from "../../services/Services";


const AvailablesProducts = () => {

    const [dataItems, setDataItems] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);
    const [isLoadding, setIsLoadding] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search)

    const itemToSearch = queryParams.get('search')

    useEffect(() => {

        const searchItemHandler = async () => {

            try {
                setDataItems([])
                setIsLoadding(true)
                const response = await searchItem(itemToSearch)

                const dataItemsArray = response.items
                const categories = response.categories
                if (dataItemsArray.length === 0) {
                    throw new Error('No hay publicaciones que coincidan con tu búsqueda.')
                } else {
                    setDataItems(dataItemsArray)
                    setDataCategories(categories)
                }
            } catch (error) {
                setError(error.message)
            }
            setIsLoadding(false)
        }

        searchItemHandler()

    }, [itemToSearch])

    const itemsList =
        <ul>{
            dataItems.map(item => (
                <ProductsItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    picture={item.picture}
                    price={item.price.amount}
                    currency={item.price.currency}
                    freeShipping={item.free_shipping}
                    state={item.location.state}
                    city={item.location.city}
                />
            ))
        }
        </ul>

    let display = <>
        <BreadCrumb categories={dataCategories} />
        <section className={classes.products}>
            <Card>
                {itemsList}
            </Card>
        </section>
    </>

    return (
        <>
            {isLoadding ? <Spinner /> :
                dataItems.length > 0 ? display :
                    error ? <Errors message={error} /> : ''}
        </>
    )
}

export default AvailablesProducts;