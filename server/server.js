const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 4747;

const axios = require('axios')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar cabeceras y cors para evitar errores de origenes cruzados
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Endpoint que realizara la consulta de los productos, desde el reequest llega un parametro que es el
// producto a buscar
app.post("/api/items", (req, res) => {
    const itemReq = req.body

    //Solicitud de data mediante axios al primer endpoint
    axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=:${itemReq.item}`)
        .then(response => {

            //Si el numero de items que trae la respuesta es 0 devuelve un objeto con categorias vacias y items vacios

            if (response.data.paging.total === 0) {
                const formatedResultsJSON = {
                    "author": {
                        "name": 'Fernando',
                        "lastname": 'Avila'
                    },
                    "categories": [],
                    "items": []
                }
                res.send(formatedResultsJSON);

            } else {

                //Se arman las categorias recuperando la informacion que viene en el campo response.data.filters

                const categoriesArray = response.data.filters

                // Funcion que toma como parametro el arreglo de categorias obtenido en la respuesta, si el arreglo esta vacio,
                // devuelve un arreglo vacio, si tiene datos, devuelve un nuevo arreglo con los nombres de las categorias 
                // estas categorias se utilizaran en el componente que generara el BreadCrumb 
                const categoriesFormat = catArray => {
                    if (catArray.length === 0) {
                        return catArray
                    } else {
                        return (
                            catArray[0].values[0].path_from_root.map(item => {
                                return item.name
                            })
                        )
                    }
                }

                const categories = categoriesFormat(categoriesArray)

                // Se toman los primeros 4 productos que vienen en la respuesta como se solicita en el requerimiento
                const items = response.data.results

                const itemsFormat = items.slice(0, 4);

                //Por cada uno de los 4 productos recuperados de la respuesta, se construye un objeto con la respectiva
                // informacion de cada item
                const itemsFormatMap = itemsFormat.map(item => {
                    return {
                        "id": item.id,
                        "title": item.title,
                        "category": item.category_id,
                        "price": {
                            "currency": item.prices.prices[0].currency_id,
                            "amount": item.prices.prices[0].amount,
                            "decimals": 0
                        },
                        "picture": item.thumbnail,
                        "condition": item.condition,
                        "free_shipping": item.shipping.free_shipping,
                        "location": {
                            "state": item.address.state_name,
                            "city": item.address.city_name
                        }
                    }
                })

                //Objeto final siguiendo la estructura solicitada en el requerimiento
                const formatedResultsJSON = {
                    "author": {
                        "name": 'Fernando',
                        "lastname": 'Avila'
                    },
                    "categories": categories,
                    "items": itemsFormatMap
                }
                res.send(formatedResultsJSON);
            }
        })
        .catch(error => {
            console.log('error here')
            res.send({
                errorCode: error.response.status,
                errorText: error.response.statusText
            })
        })
});


// Endpoint para consultar el datalle de cada producto al seleccionarlo en la lista de productos de la vista 2
// o al ingresar el id del producto directamente en la URL
app.post("/id", (req, res) => {
    const idReq = req.body.id

    const getData = async () => {

        try {
            //Solicitud de data mediante axios al primer endpoint, este trae la informacion relacionada con el producto
            //para poder mostrar el detalle del producto
            const getItemInfo = await axios.get(`https://api.mercadolibre.com/items?ids=${idReq}`)

            //Si el codigo de respuesta de la primera peticion es 200, se realiza la siguiente solicitud al endpoint que permite
            //traer la descripcion del producto  
            if (getItemInfo.data[0].code === 200) {

                const getItemDescription = await axios.get(`https://api.mercadolibre.com/items?ids=${idReq}/description`)

                //Se detecto que en ocaciones algunos productos no tienen descripcion por lo tanto la respuesta de este endpoint puede
                //ser diferente al codigo 200, en estos casos se colocara un mensaje que indique que no se incluyo una descripcion del producto
                const description = getItemDescription.data[0].code === 200 
                    ? getItemDescription.data[0].body.plain_text
                    : 'La tienda no incluyó una descripción del producto'

                
                // Se recupera la categoria de la data que viene en el primer llamado en la variable getItemInfo
                // esto con el fin de realizar un tercer llamado a un endpoint el cual despues de investigar y realizar
                // una serie de pruebas me permite traer un arreglo con el arbol de categorias que debe renderizar el componente
                // BreadCrumb en la vista detalle del producto, 
                const categoryId = getItemInfo.data[0].body.category_id

                const getCategory = await axios.get(`https://api.mercadolibre.com/categories/${categoryId}`)

                const categoriesArray = getCategory.data.path_from_root

                //Se construye un arreglo que contiene las categorias, si no hay categorias, se devuelve un arreglo vacio
                const categoriesFormat = catArray => {
                    if (catArray.length === 0) {
                        return catArray
                    } else {
                        return (
                            catArray.map(item => {
                                return item.name
                            })
                        )
                    }
                }

                const categories = categoriesFormat(categoriesArray)

                //Objeto final siguiendo la estructura solicitada en el requerimiento, se agrega la propiedad categoria para
                //que el componente BreadCrumb renderice todas las categorias
                const formatedResultsJSON = {
                    "author": {
                        "name": 'Fernando',
                        "lastname": 'Avila'
                    },
                    "categories": categories,
                    "item": {
                        "id": getItemInfo.data[0].body.id,
                        "title": getItemInfo.data[0].body.title,
                        "price": {
                            "currency": getItemInfo.data[0].body.currency_id,
                            "amount": getItemInfo.data[0].body.price,
                            "decimals": 0
                        },
                        "picture": getItemInfo.data[0].body.pictures[0].url,
                        "condition": getItemInfo.data[0].body.condition,
                        "free_shipping": getItemInfo.data[0].body.shipping.free_shipping,
                        "sold_quantity": getItemInfo.data[0].body.sold_quantity,
                        "description": description
                    }
                }
                res.send(formatedResultsJSON);
            
            // Si el codigo de respuesta de la primera peticion (detalle del producto) es diferente a 200 se devuelve un objeto 
            // con las propiedad categoria vacia y la propiedad item indicando un objeto que tiene como id Not Found
            } else {
                const formatedResultsJSON = {
                    "author": {
                        "name": 'Fernando',
                        "lastname": 'Avila'
                    },
                    "categories": [],
                    "item": { "id": 'Not Found' }
                }
                res.send(formatedResultsJSON);

            }

        } catch (error) {
            console.log(error.response.status)
            res.sendStatus(error.response.status)
        }
    }
    getData()
})

app.listen(port, () => {

    console.log(`Server is running and listengin at ${port}`);
});


