import { Outlet } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

function Home(props) {

	return (
		<>
			<SearchBar />
            <Outlet />
		</>
	);
}

export default Home;