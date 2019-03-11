import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ThemeContext, AuthContext } from '../../context';
import { logout } from '../../api/UserApi';

const BASE_CLASS = 'navigation-header';

const loggedOutUserNavs = [
    { to: '/login', name: 'Login' },
    { to: '/signup', name: 'Signup' },
];

const loggedInUserNavs = [
    { to: '/auth/home', name: 'Home' },
    { to: '/auth/dashboard', name: 'Dashboard' },
    { to: '/auth/playground', name: 'Playground' },
];

const NavigationHeader = () => {
    const { isAuthenticated, setAuthToken } = useContext(AuthContext);
    const { switchTheme } = useContext(ThemeContext);

    const onLogOut = () => {
        logout();
        setAuthToken(null);
    };

    const navs = isAuthenticated
        ? loggedInUserNavs.concat({
              to: '/login',
              name: 'Logout',
              onClick: onLogOut,
          })
        : loggedOutUserNavs;

    return (
        <nav className={BASE_CLASS}>
            <button className={`${BASE_CLASS}-btn-theme`} onClick={switchTheme}>
                Switch theme
            </button>

            {navs.map(({ name, ...props }) => (
                <NavLink
                    {...{ ...props, key: name }}
                    className={`${BASE_CLASS}-link`}>
                    {name}
                </NavLink>
            ))}
        </nav>
    );
};

export default NavigationHeader;
