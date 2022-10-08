import React from 'react';

const StateContext = React.createContext({
    state: null, 
    setState: () => {}
});

export default StateContext;