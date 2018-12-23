import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ThemeContext } from '../../context';
import { logout, isLoggedIn } from '../../api/UserApi';

const BASE_CLASS = 'navigation-header';

const loggedOutUserNavs = [
    { to: '/login', name: 'Login' },
    { to: '/signup', name: 'Signup' }
];

const loggedInUserNavs = [
    { to: '/auth/home', name: 'Home' },
    { to: '/auth/dashboard', name: 'Dashboard' },
    { to: '/login', name: 'Logout', onClick: logout }
];

const NavigationHeader = () => {
    const navs = isLoggedIn() ?
        loggedInUserNavs :
        loggedOutUserNavs;

    const { switchTheme } = useContext(ThemeContext);

    return (
        <nav className={BASE_CLASS}>
            <button
                className={`${BASE_CLASS}--btn-theme`}
                onClick={switchTheme}>
                Switch theme
            </button>

            {navs.map(({ name, ...props }, key) =>
                <NavLink {...{ ...props, key }}
                    className={`${BASE_CLASS}--link`}>
                    {name}
                </NavLink>
            )}
        </nav>
    );
};

export default NavigationHeader;