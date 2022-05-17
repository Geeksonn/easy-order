import React from 'react';
import Context from '../components/context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [token, setToken] = React.useState(null);
    const context = {
        tokenCtx: { token, setToken },
    };

    return (
        <Context.Provider value={context}>
            <Component {...pageProps} />
        </Context.Provider>
    );
}

export default MyApp;
