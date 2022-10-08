import React from 'react';

import StateContext from '@context/stateContext';

import '@styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [state, setState] = React.useState({});
    const context = {
        stateCtx: { state, setState },
    };

    return (
        <StateContext.Provider value={context}>
            <Component {...pageProps} />
        </StateContext.Provider>
    );
}

export default MyApp;
