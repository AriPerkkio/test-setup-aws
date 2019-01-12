import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

const THEME_1 = 'theme-1';
const THEME_2 = 'theme-2';

const toggleTheme = theme =>
    theme === THEME_1 ? THEME_2 : THEME_1;

const ThemeContextProvider = ({
    children
}) => {
    const [theme, setTheme] = useState(THEME_1);

    const context = {
        theme,
        setTheme,
        switchTheme: () => setTheme(toggleTheme(theme))
    };

    return (
        <ThemeContext.Provider value={context}>
            <div id='theme-container' className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export {
    ThemeContext,
    ThemeContextProvider
};