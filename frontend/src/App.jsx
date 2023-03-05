import { ChakraProvider, Container, Switch , HStack,
  Modal, ModalOverlay, ModalContent, ModalHeader,ModalFooter,
  ModalBody, ModalCloseButton, Stack, Center, Flex, Box, Spacer, Text,
  useDisclosure,Button, FormControl, Input, ListItem, UnorderedList, Grid, VStack } from '@chakra-ui/react'

import ColorModeSwitcher from "./ColorModeSwitcher";

function App() {

	return (
		<ChakraProvider>
			<Box textAlign="center" fontSize="xl">
				<Grid minH="100vh" p={3}>
					<ColorModeSwitcher justifySelf="flex-end" />
					<VStack spacing={8}>
						<Text>Some Content</Text>
						<Link>
							Explore More
						</Link>
					</VStack>
				</Grid>
			</Box>
		</ChakraProvider>
	);
}

export default App;
