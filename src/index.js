import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.scss';

const appRoot = document.getElementById('app-root');

ReactDOM.render(<App />, appRoot);

// Wrap with development mode block so webpack removes it during production build
if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept('./App', () => {
            const ReloadedApp = require('./App').default;

            ReactDOM.render(
                <ReloadedApp />,
                appRoot
            );
        });
    }
}
