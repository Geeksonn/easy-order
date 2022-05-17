import React from 'react';

const Context = React.createContext({
    tokenCtx: {
        token: null,
        setToken: () => {}
    },
});

export default Context;