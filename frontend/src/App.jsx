import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

import { SetThemeProvider } from './context/themeContext';
import Navbar from './components/Navbar';
import Routers from './routes/Routers';

function App() {	
	return (
		<ChakraProvider>
			<SetThemeProvider>
				<BrowserRouter>
					<Toaster 
						position="top-center"
						reverseOrder={false} 
					/>
					<Navbar />
					<Routers />
				</BrowserRouter>
			</SetThemeProvider>
		</ChakraProvider>
	);
}

export default App;
