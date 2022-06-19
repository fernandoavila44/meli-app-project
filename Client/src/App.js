import { Routes, Route, } from "react-router-dom";
import SearchResult from "./components/pages/SearchResult";
import Details from "./components/pages/Details";
import NoMatch from './components/pages/NoMatch'
import './App.css';
import Layout from "./components/layout/Layout";


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

export default App;
