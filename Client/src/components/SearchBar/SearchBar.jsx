import React, {useContext, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import melilogo2X from '../../assets/Logo_ML@2x.png'
import searchIcon from '../../assets/ic_Search.png'
import SearchContext from '../../store/SearchContext';
import classes from './SearchBar.module.css';

const SearchBar = () => {

    const [enteredInput, setEnteredInput] = useState('');
    const navigate = useNavigate();
    const searchCtx = useContext(SearchContext);

    const submitHandler = event =>{
        event.preventDefault()

        searchCtx.ToSearch(enteredInput)

        if(enteredInput.trim() !== ''){
            navigate('/items')
        }
        setEnteredInput('')
    }

    const valueChangeHandler = event =>{
        setEnteredInput(event.target.value)
    }

    const navigateToHomeLogoHandler = () =>{
        navigate('/')
    }

    return (
        <>
            <header className={classes.header}>
            <div className={classes.searchWrapper}>
                <img onClick={navigateToHomeLogoHandler} src={melilogo2X} alt="Logo Mercadolibre" />
                <form onSubmit={submitHandler} className={classes.control}>
                    <input 
                        className={classes.input} 
                        type="text" 
                        placeholder='Nunca dejes de buscar' 
                        value={enteredInput} 
                        onChange={valueChangeHandler}
                    />
                    <button>
                        <img src={searchIcon} alt="search - icon" />
                    </button>
                </form>
            </div>
        </header>
        <h1>Mercadolibre dummy app</h1>
        </>
    )
}

export default SearchBar;