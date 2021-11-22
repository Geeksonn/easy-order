import { useState } from 'react';
import authContext from '../contexts/token';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [token, setToken] = useState(null);

  return (
    <authContext.Provider value={{ token, setToken }}>
      <Component {...pageProps} />
    </authContext.Provider>
  );
}

export default MyApp
