import React from 'react';

import StateContext from '@context/stateContext';

import Layout from '@components/layout';
import Login from '@components/login';
import ConfigPage from '@components/config-page';

const Config = () => {
    const { stateCtx } = React.useContext(StateContext);
    const authed = stateCtx.state.user ? true : false;
    const child = authed ? <ConfigPage /> : <Login />;

    return <Layout authenticated={authed}>{child}</Layout>;
};

export default Config;
