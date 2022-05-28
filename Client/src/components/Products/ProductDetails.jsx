import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Card from "../UI/Card/Card"
import classes from "./ProductDetails.module.css";
import freeShipping from '../../assets/ic_shipping.png';
import BreadCrumb from "../UI/BreadCrumb/BreadCrumb";
import GalleryImages from "../UI/GalleryImages/GalleryImages";
import Spinner from "../Spinner/Spinner";
import Errors from "../Errors/Errors";

const ProductDetails = () => {

    const [item, setItem] = useState(null)
    const [isLoadding, setIsLoadding] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams()

    useEffect(() => {
        
        const detailsItemHandler = async () => {
            setIsLoadding(true)
            try {
                const response = await fetch(`http://localhost:4747/id`, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        id: id
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (!response.ok) {
                    throw new Error(`Something went wrong, Error ${response.status}`)
                }
                const data = await response.json()

                if (data.item.id === 'Not Found'){
                    throw new Error(`No hay publicaciones que coincidan con tu búsqueda.`)
                }else{
                    setItem(data)
                }

            } catch (error) {
                setError(error.message)
            }
            setIsLoadding(false)
        }
        detailsItemHandler()
  
    }, [id])

    const priceFormat = item && new Intl.NumberFormat('es-AR', { style: 'currency', currency: `${item.item.price.currency}`, maximumFractionDigits: 0 }).format(item.item.price.amount)

    return (
        <main>
            {isLoadding ? <Spinner/>:
            item ? <>
                <BreadCrumb categories={item.categories} />
                <section className={classes.detailProduct}>
                    <Card>
                        <div className={classes.detailWrapper}>
                            <div className={classes.productImgDesc}>
                                <GalleryImages arrayImages={item.item.picture} />
                                <div>
                                    <h2>Descripcion del producto</h2>
                                    <p>{item.item.description}</p>
                                </div>
                            </div>
                            <aside className={classes.productInfo}>
                                <span>{item.item.condition} - {item.item.sold_quantity} vendidos</span>
                                <h2>{item.item.title}</h2>
                                <div className={classes.currencyDetails}>
                                    <span>{priceFormat}</span>
                                    <span>00</span>
                                    <span>
                                        {item.item.free_shipping && <img src={freeShipping} alt="free shipping flag" />}
                                    </span>
                                </div>
                                <div>
                                    <button>Comprar</button>
                                </div>
                            </aside>
                        </div>
                    </Card>
                </section>
            </> :
            error ? <Errors message={error} /> :''}
        </main>
    )
}

export default ProductDetails;