import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './components/router/Home';
import NoMatch from './components/router/NoMatch'
import AvailablesProducts from './components/Products/AvailablesProducts';
import ProductDetails from './components/Products/ProductDetails';
import SearchProvider from "./store/SearchCartProvider";
import './App.css';


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

export default App;
