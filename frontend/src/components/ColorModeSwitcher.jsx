import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ColorModeSwitcher (props) {
    const { toggleColorMode } = useColorMode();
    const text =  useColorModeValue('dark', 'light');
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <IconButton 
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={toggleColorMode}
            icon={<SwitchIcon/>}
            {...props}
        />
    );
}