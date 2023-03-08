import { Link } from 'react-router-dom';
import { Switch , HStack, Stack, Flex, Box, Spacer } from '@chakra-ui/react';
import { MoonIcon, SunIcon, Search2Icon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';

import {  useTheme } from '../context/themeContext';
import { GlobalStyles } from '../themes/theme';
import SearchModal from './SearchModal';

export default function Navbar() {
    const {theme, isSwitchOn, changeThemeSwitch } = useTheme();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <GlobalStyles/>
            <Box 
                bg={ theme === "light" ? '#333' : '#fff' }
                borderBottom={theme === "light" ? 'solid 1px #333' : 'solid 1px #fff'}
                color={theme === "light" ? '#fff' : '#333'} 
                px={4}
            >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}> 
                    <HStack spacing={16} alignItems={'left'}>
                        <HStack 
                            as={'nav'}
                            spacing={6}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            <Link to="/">Home</Link>
                        </HStack>
                    </HStack>

                    <Search2Icon onClick={onOpen}></Search2Icon>
                    
                    <Flex alignItems={'center'}>
                        <Spacer></Spacer>
                        <Stack direction={'row'} spacing={7}>
                            <Switch onChange={changeThemeSwitch}>
                                {isSwitchOn ? (<MoonIcon mr="5"/>) : (<SunIcon mr="5"/>)}
                            </Switch>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
            <SearchModal onClose={onClose} isOpen={isOpen} />
        </>
    );
}