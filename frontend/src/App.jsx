import { useState, useEffect, useRef } from 'react';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';

import { Toaster, toast } from 'react-hot-toast';

import {  SetThemeProvider } from './context/themeContext';
import Navbar from './components/Navbar';
import SearchModal from './components/SearchModal';
import Routers from './routes/Routers';
import { fetchDataHandler } from './helpers/utils';

function App() {
	const [searchTerm, setSearchTerm] = useState([]);
	const [searchResultItems, setSearchResultItems] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();

	useEffect(() => {
		const getUsersInput = setTimeout(() => {
			let url = `/searchResult?keyword=${searchTerm}`;

			fetchDataHandler(url)
				.then(items => setSearchResultItems(items.posts))
				.catch(err => toast.error("Fail to fetch"));
		}, 100);
		
		return () => clearTimeout(getUsersInput);
	}, [searchTerm]);

	return (
		<ChakraProvider>
			<SetThemeProvider>
				<BrowserRouter>
					<Toaster
						position="top-center"
						reverseOrder={false}
					/>
					<Navbar onOpen={onOpen} />
					<SearchModal 
						initialRef={initialRef} 
						onClose={onClose} 
						isOpen={isOpen} 
						searchResultItems={searchResultItems} 
						setSearchTerm={setSearchTerm} 
					/>
					<Routers />
				</BrowserRouter>
			</SetThemeProvider>
		</ChakraProvider>
	);
}

export default App;
