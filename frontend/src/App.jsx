import { useState, useEffect, useRef } from 'react';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
import { Toaster, toast } from 'react-hot-toast';

import { lightTheme, darkTheme } from './themes/theme';
import Navbar from './components/Navbar';
import SearchModal from './components/SearchModal';
import Routers from './routes/Routers';
import { fetchHandler } from './helpers/utils';

function App() {
	const [theme, setTheme] = useState("light");
	const [searchTerm, setSearchTerm] = useState([]);
	const [searchResultItems, setSearchResultItems] = useState([]);
	const [isSwitchOn, setIsSwitchOn] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();

	const changeThemeSwitch = () => {
		let newValue = null;
		newValue = !isSwitchOn;
		setIsSwitchOn(newValue);

		!newValue ? setTheme('dark') : setTheme('light');
	};

	// useEffect(() => {
	// 	const getUsersInput = setTimeout(() => {
	// 		const url = `http://localhost/reactPhp/api/searchResult?keyword=${searchTerm}`;

	// 		fetchHandler(url)
	// 			.then(items => setSearchResultItems(items.posts))
	// 			.then(err => toast.error("Fail to fetch"));
	// 	}, 100);
		
	// 	return () => clearTimeout(getUsersInput)
	// }, [searchTerm]);

	return (
		<ChakraProvider>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<BrowserRouter>
					<Toaster
						position="top-center"
						reverseOrder={false}
					/>
					<Navbar 
						theme={theme} 
						changeThemeSwitch={changeThemeSwitch} 
						isSwitchOn={isSwitchOn} 
						onOpen={onOpen} 
					/>
					<SearchModal 
						initialRef={initialRef} 
						onClose={onClose} 
						isOpen={isOpen} 
						searchResultItems={searchResultItems} 
						setSearchTerm={setSearchTerm} 
					/>
					<Routers />
				</BrowserRouter>
			</ThemeProvider>
		</ChakraProvider>
	);
}

export default App;
