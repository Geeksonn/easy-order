import React, { useContext, useState } from 'react';

import Login from '../components/login';
import Order from '../components/order';

import authContext from '../contexts/token';
import { getItems } from '../lib/items';
import { authenticate } from '../lib/auth';

const Home = () => {
  const { token, setToken } = useContext(authContext);
  const [items, setItems] = useState([]);

  const login = async (username, password) => {
    const authInfo = {
      username: username,
      password: password
    };
    const newToken = await authenticate(authInfo);

    setToken(newToken);
    setItems(await getItems(newToken));
  }

  if (!token) {
    return (<Login loginMethod={login} />)
  }
  else {
    return (<Order items={items} />)
  }
}

export default Home;