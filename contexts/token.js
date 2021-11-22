import { createContext } from 'react';

const authContext = createContext({
    token: null,
    setToken: (token) => {}
});

export default authContext;