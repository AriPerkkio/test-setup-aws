import React from 'react';

import { withContext } from '../../context';
import { withAuthentication } from '../../api/UserApi';

const AuthPage = () => {
    return (
        <div>
            <h2>Auth page</h2>
        </div>
    );
};

export default withAuthentication(withContext(AuthPage));