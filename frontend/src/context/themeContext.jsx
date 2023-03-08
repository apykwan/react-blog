import { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from '../themes/theme';

const ThemeContext = createContext();

const SetThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [isSwitchOn, setIsSwitchOn] = useState(true);

    const changeThemeSwitch = () => {
		let newValue = null;
		newValue = !isSwitchOn;
		setIsSwitchOn(newValue);

		!newValue ? setTheme('dark') : setTheme('light');
	};

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ theme, isSwitchOn, changeThemeSwitch }}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, SetThemeProvider };