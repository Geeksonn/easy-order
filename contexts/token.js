import { createContext } from 'react';

const authContext = createContext({
    token: null,
    setToken: () => {}
});

export default authContext;