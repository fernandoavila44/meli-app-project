# Documentación desafío técnico FrontEnd Mercadolibre  

Aplicacion web que permite consultar productos disponibles en la tienda oficial de mercadolibre Argentina y los muestra en pantalla para que el usuario pueda seleccionar cualquier producto y ver informacion mas detallada.

## Tecnologias utilizadas

### FrontEnd:

HTML/
CSS/
ReactJs/
React Router/
CSS Modules

### Backend:

NodeJs/ 
Express Js/
Axios

## Funcionamiento

Se implementaron tres vistas que pueden ser navegadas de manera independiente, la primera vista es la barra de búsqueda para ingresar el producto a buscar y la tercera vista nos muestra en pantalla información más detallada del producto seleccionado.  


En el frontend se utilizó como tecnología principal ReactJs, adicional se implementó ReactRouter para el control de navegación de las diferentes vistas, para el manejo de estilos se utilizó CSS Modules para tener mayor control en los estilos implementados, las 3 vistas con su respectivas rutas se muestran a continuación:

```javascript
function App() {

	return (
		<SearchProvider>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home/>}>
					<Route path='/items' element={<AvailablesProducts/>}/>
					<Route path='/items/:id' element={<ProductDetails/>}/>
				</Route>
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</BrowserRouter>
		</SearchProvider>
	);
}
```
Se implemento un Context para tener disponible de manera global el producto que ingresa el usuario en la barra de búsqueda, esto con el fin de poder utilizarlo en la segunda vista donde se cargan los productos que devuelve el servidor.

```javascript
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
```

La primera vista se encuentra en el componente "SearchBar.jsx" nos permite ingresar el producto a buscar y ejecutar una búsqueda, se implementó validación para que solo se realice la búsqueda si se ingresan datos en el input, en esta vista se almacena en el Context el producto a buscar. 

la segunda vista se encuentra en el componente "AvailablesProducts" nos muestra en pantalla la información consultada, cabe mencionar que solo se listan 4 productos pero esto es debido a la solicitud del requerimiento, desde el servidor se puede modificar la cantidad de ítems que se envían como respuesta al front, en esta vista se genera la url como se solicita en el requerimiento (Resultados de la búsqueda: “/items?search=”), y finaliza con el nombre del producto que ingresamos en la barra de búsqueda, en este punto se utilizó el dato almacenado en el Context para poder mediante el hook useSearchParams() generar la ruta, estando ubicados en esta vista si digitamos el nombre de otro producto en la URL por ejemplo (http://localhost:3000/items?search=iphone) nos traerá en pantalla los productos referentes a esa nueva búsqueda.

Los ítems listados en la vista de resultado de la búsqueda nos muestra información relacionada a cada producto, se muestra una imagen del producto, el precio según la divisa de cada producto, si este cuenta con envió gratis se mostrara un icono indicándolo y la ubicación, cada uno de los ítems listados se renderiza en un componente llamado "ProductsItem", este componente está habilitado para que el usuario haga click sobre él y se muestre la información detalla del producto en una tercera vista.

La tercera vista se encuentra en el archivo "ProductDetails", esta vista tiene su propia URL por ejemplo (http://localhost:3000/items/MLA931455240), en la URL podemos visualizar el id del producto que se está detallando además renderiza la información relacionada al producto, se implementó que también se puedan hacer consultas modificando el id del producto directamente en la URL.

En esta tercera vista se implementó un módulo que muestra una imagen principal del producto y activa una galería en la cual se cargan otras imágenes referentes a este mismo producto, el usuario puede colocar el cursor sobre cualquiera de las imágenes y automáticamente se actualizara la imagen principal por la que el usuario quiera visualizar.

Se implemento un componente que permite generar los BreadCrumbs de cada búsqueda de producto y a su vez de cada detalle del producto, este componente se renderiza individualmente en la segunda y tercera vista.

De igual forma se implementó un componente spinner para mostrar un spinner de carga mientras se realiza el proceso de consulta de data y renderizado, para el manejo de renderizado de los errores se implementó un componente que se mostrara si por ejemplo no se obtuvieron resultados para una búsqueda de un producto o si se ingresó el id erróneo de un producto en la barra de búsqueda.


## License
[MIT](https://choosealicense.com/licenses/mit/)