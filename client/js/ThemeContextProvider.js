import { useState, useMemo, createContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { getTheme } from './themeDefs';

const DARK_THEME_Q = '(prefers-color-scheme: dark)';
const mediaQ = window.matchMedia(DARK_THEME_Q);

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
    const [themeType, setThemeType] = useState(() =>
        mediaQ?.matches ? 'dark' : 'light'
    );
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
