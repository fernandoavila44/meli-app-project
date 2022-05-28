import React, { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import Card from "../UI/Card/Card"
import ProductsItem from './ProductsItem';
import classes from "./AvailablesProducts.module.css";
import BreadCrumb from "../UI/BreadCrumb/BreadCrumb";
import SearchContext from "../../store/SearchContext";
import Spinner from "../Spinner/Spinner";


const AvailablesProducts = () => {

    const [dataItems, setDataItems] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);
    const [isLoadding, setIsLoadding] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // const product = searchParams.get('search');

    const searchCtx = useContext(SearchContext)

    useEffect(() => {
     
        const searchItemHandler = async () => {
            setDataItems([])
            setIsLoadding(true)
            setSearchParams({ search: searchCtx.product})
            try {
                const response = await fetch('http://localhost:4747/api/items', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        item: searchCtx.product,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (!response.ok) {
                    throw new Error(`Something went wrong, Error ${response.status}`)
                }
                const data = await response.json()
                const dataItemsArray = data.items;

                if (dataItemsArray.length === 0) {
                    throw new Error('No hay publicaciones que coincidan con tu búsqueda.')
                } else {
                    setDataItems(dataItemsArray)
                    setDataCategories(data.categories)
                }
            } catch (error) {
                setError(error.message)
            }
            setIsLoadding(false)
        }
        searchItemHandler()
    }, [searchCtx.product, setSearchParams])

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
        <main>
            {isLoadding ? <Spinner /> :
                dataItems.length > 0 ? display :
                    error ? <p>{error}</p> : ''}
        </main>
    )
}

export default AvailablesProducts;