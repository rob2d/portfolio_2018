import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { getTheme } from './themeDefs';

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
    const [themeType, setThemeType] = useState(() => 'light');
    const themeApplied = useMemo(() => getTheme(themeType), [themeType]);
    const context = useMemo(() => ({
        themeType, setThemeType, themeApplied
    }), [themeType, setThemeType]);

    return (
        <ThemeContext.Provider value={ context }>
            <ThemeProvider theme={ themeApplied }>
                { children }
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
