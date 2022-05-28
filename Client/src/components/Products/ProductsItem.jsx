import { useNavigate } from 'react-router-dom';
import freeShipping from '../../assets/ic_shipping.png';
import classes from './ProductsItem.module.css';

const ProductsItem = props =>{

    const navigate = useNavigate()

    const clickItemHandler = () =>{
        navigate(`/items/${props.id}`)
    }

    const priceFormat = new Intl.NumberFormat('es-AR', { style: 'currency', currency: `${props.currency}`, maximumFractionDigits: 0 }).format(props.price)

    return(
        <li onClick={clickItemHandler} className={classes.itemWrapper}>
            <div className={classes.infoItemGeneral}>
                <div>
                    <img className={classes.imgProduct} src={props.picture} alt="iteamSearchImg"/>
                </div>
                <div className={classes.dataProduct}>
                    <div>
                        <span>{priceFormat}</span>
                        <span>
                            {props.freeShipping && <img src={freeShipping} alt="free shipping flag" />}
                        </span>
                    </div>
                    <h2>{props.title}</h2>
                </div>
            </div>
            <div className={classes.location}>
                <span>{props.state} - {props.city}</span>
            </div>
        </li>
    )
}

export default ProductsItem;