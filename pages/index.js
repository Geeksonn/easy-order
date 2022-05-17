import React from 'react';

import Login from '../components/login';
import Order from '../components/order';
import Context from '../components/context';
import Link from 'next/link';
import Layout from '../components/layout';

const Home = () => {
    const { tokenCtx } = React.useContext(Context);
    const { token } = tokenCtx;

    if (!token) {
        return (
            <Layout>
                <Login />
            </Layout>
        );
    } else {
        return (
            <Layout>
                <Order />
            </Layout>
        );
    }
};

export default Home;
