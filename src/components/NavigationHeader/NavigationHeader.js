import React from 'react';
import { NavLink } from 'react-router-dom';

import { logout, isLoggedIn } from '../../api/UserApi';

const loggedOutUserNavs = [
    { to: '/login', name: 'Login' },
    { to: '/signup', name: 'Signup' }
];

const loggedInUserNavs = [
    { to: '/auth-page', name: 'Auth Page' },
    { to: 'login', name: 'Logout', onClick: logout }
];

const NavigationHeader = () => {
    const navs = isLoggedIn() ?
        loggedInUserNavs :
        loggedOutUserNavs;

    return (
        <nav className="navigation-header">
            {navs.map(({ name, ...props }, key) =>
                <NavLink { ...{...props, key} }>
                    {name}
                </NavLink>
            )}
        </nav>
    );
};

export default NavigationHeader;