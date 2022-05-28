import { useState } from 'react';
import classes from './GalleryImages.module.css'

const GalleryImages = props => {

    const [indexImageSelected, setIndexImageSelected] = useState(0);

    const arrayImages = props.arrayImages.slice(0, 7);

    const hoverImageHandler = (index) =>{
        setIndexImageSelected(index)
    }

    const displayGallery =
        <ul>
            {arrayImages.map((image, index) => (
                <li 
                key={image.id}
                id={index}
                onMouseEnter={hoverImageHandler.bind(null, index)}
                >
                    <img src={image.url} alt="" />
                </li>
            ))}
        </ul>

    return (
        <div className={classes.galleryModule}>
            <figure className={classes.mainImage}>
                <img src={arrayImages[indexImageSelected].url} alt='' />
            </figure>
            <div className={classes.gallery}>
                {displayGallery}
            </div>
        </div>
    )
}

export default GalleryImages