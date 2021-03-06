# Documentación desafío técnico FrontEnd Mercadolibre  

Aplicacion web que permite consultar productos disponibles en la tienda oficial de mercadolibre Argentina y los muestra en pantalla para que el usuario pueda seleccionar cualquier producto y ver informacion mas detallada.

## Tecnologias utilizadas

### FrontEnd:

HTML/
CSS/
ReactJs/
React Router/
CSS Modules/

### Backend:

NodeJs/ Express Js/ Axios

## Instalación / Instrucciones 

Clonar el repositorio en tu máquina. necesitaras tener instalado node y npm instalado globalmente en tu máquina.

### Instalación:

npm install ubicado en la carpeta client y en la carpeta server.

### Iniciar el servidor 

para iniciar el servidor de React, ubicarse en la carpeta Client en terminal y ingresar npm start

para iniciar el servidor de NodeJs, ubicarse en la carpeta Server en terminal y ingresar node server.js o nodemon server.js si lo tienes instalado, tener en cuenta que el puerto 4747 debe estar libre si no, puedes utilizar otro puerto de tu preferencia.

### Para visitar las diferentes vistas

localhost:3000/ 

localhost:3000/items?search=iphone

localhost:3000/items/MLA931455240

## Funcionamiento

Se implementaron tres vistas que pueden ser navegadas de manera independiente, la primera vista es la barra de búsqueda para ingresar el producto a buscar y la tercera vista nos muestra en pantalla información más detallada del producto seleccionado.  


En el frontend se utilizó como tecnología principal ReactJs, adicional se implementó ReactRouter para el control de navegación de las diferentes vistas, para el manejo de estilos se utilizó CSS Modules para tener mayor control en los estilos implementados, las 3 vistas con su respectivas rutas se muestran a continuación:

```javascript
function App() {

	return (
		<Layout>
			<Routes>
				<Route path='/'/>
				<Route path='/items' element={<SearchResult />} />
				<Route path='/items/:id' element={<Details />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</Layout>
	);
}

```

La primera vista se encuentra en el componente "SearchBar.jsx" nos permite ingresar el producto a buscar y ejecutar una búsqueda, se implementó validación para que solo se realice la búsqueda si se ingresan datos en el input, en esta vista se almacena en el Context el producto a buscar. 

la segunda vista se encuentra en el componente "AvailablesProducts" nos muestra en pantalla la información consultada, cabe mencionar que solo se listan 4 productos pero esto es debido a la solicitud del requerimiento, desde el servidor se puede modificar la cantidad de ítems que se envían como respuesta al front, en esta vista se genera la url como se solicita en el requerimiento (Resultados de la búsqueda: “/items?search=”), y finaliza con el nombre del producto que ingresamos en la barra de búsqueda.

Los ítems listados en la vista de resultado de la búsqueda nos muestra información relacionada a cada producto, se muestra una imagen del producto, el precio según la divisa de cada producto, si este cuenta con envió gratis se mostrara un icono indicándolo y la ubicación, cada uno de los ítems listados se renderiza en un componente llamado "ProductsItem", este componente está habilitado para que el usuario haga click sobre él y se muestre la información detalla del producto en una tercera vista.

La tercera vista se encuentra en el archivo "ProductDetails", esta vista tiene su propia URL por ejemplo (http://localhost:3000/items/MLA931455240), en la URL podemos visualizar el id del producto que se está detallando además renderiza la información relacionada al producto, se implementó que también se puedan hacer consultas modificando el id del producto directamente en la URL.

En esta tercera vista se implementó un módulo que muestra una imagen principal del producto y activa una galería en la cual se cargan otras imágenes referentes a este mismo producto, el usuario puede colocar el cursor sobre cualquiera de las imágenes y automáticamente se actualizara la imagen principal por la que el usuario quiera visualizar.

Se implemento un componente que permite generar los BreadCrumbs de cada búsqueda de producto y a su vez de cada detalle del producto, este componente se renderiza individualmente en la segunda y tercera vista.

De igual forma se implementó un componente spinner para mostrar un spinner de carga mientras se realiza el proceso de consulta de data y renderizado, para el manejo de renderizado de los errores se implementó un componente que se mostrara si por ejemplo no se obtuvieron resultados para una búsqueda de un producto o si se ingresó el id erróneo de un producto en la barra de búsqueda.

En el archivo server.js se detalla la lógica que se implementó en cada una de las partes del código que realizan las funciones más importante.

## Screenshots

### Barra de busqueda
![Alt text](./Client/src/assets/Screenshots/Barra%20busqueda.PNG?raw=true "Barra de busqueda")

### Resultado de busqueda
![Alt text](./Client/src/assets/Screenshots/Resultado%20de%20busqueda.PNG?raw=true "Resultado de busqueda")

### Detalle de producto
![Alt text](./Client/src/assets/Screenshots/Detalle%20de%20producto.PNG?raw=true "Detalle de producto")

### Barra de busqueda item inexistente
![Alt text](./Client/src/assets/Screenshots/Resultado%20busqueda%20item%20inexistente.PNG?raw=true "Barra de busqueda item inexistente")

### Acceso a ruta inexistente
![Alt text](./Client/src/assets/Screenshots/Acceso%20ruta%20inexistente.PNG?raw=true "Acceso a ruta inexistente")

## Reflexion

Este desafío ha sido una de las experiencias mas gratificantes para mi, me permitió medir mis habilidades de lado del FrontEnd y del Backend, de igual forma el consumo de APIs entre ReactJs y el Servidor NodeJs.

Uno de los mayores desafíos  fue la construcción del archivo JSON que se debía enviar desde el servidor NodeJs al Front, investigue mediante la herramienta Postman todas respuestas que generaban los diferentes endpoints que se solicitan en el requerimiento, finalmente para las categorías que se muestran en la vista ProductDetails, decidi hacer un llamado a un tercer endpoind de la API de mercadolibre en el cual consultaba información referente a la categoría mediante el id de categoría recuperado del llamado al segundo endpoint (https://api.mercadolibre.com/items/:idproducto).

Finalmente implemente algunas funcionalidades extras como los spinners de carga que se muestran mientras se consulta la data al servidor y se muestra en pantalla, pantallas que muestran errores que se pueden generar por problemas de conexión o si se consulta un ítem que no existe y finalmente un módulo de galería que permite ver en más detalle una serie de imágenes sobre el producto consultado.


## License
[MIT](https://choosealicense.com/licenses/mit/)