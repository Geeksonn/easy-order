import React from 'react';

import Login from '@components/login';
import Order from '@components/order';
import Layout from '@components/layout';
import StateContext from '@context/stateContext';

const Home = () => {
    const { stateCtx } = React.useContext(StateContext);
    
    if (!stateCtx.state.user) {
        return (
            <Layout>
                <Login />
            </Layout>
        );
    } else {
        return (
            <Layout authenticated>
                <Order />
            </Layout>
        );
    }
};

export default Home;
