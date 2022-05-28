import classes from './BreadCrumb.module.css';

const BreadCrumb = (props) =>{
    
    let display = props.categories.length !== 0 
        ? <ol className={classes.breadCrumb}>
            {props.categories.map((item,index) =>(
                <li key={index}>
                    {item} {index !== props.categories.length - 1 ? '>' : ''}
                </li>
            ))}
        </ol>
        : <span className={classes.spanTransparent}> </span>

    return(
        <>
        {display}
        </>
    )
}

export default BreadCrumb;