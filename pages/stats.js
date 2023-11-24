import React from 'react';

import StateContext from '@context/stateContext';

import StatsPage from '@components/stats/statsPage';
import Login from '@components/login';

const Stats = () => {
    const { stateCtx } = React.useContext(StateContext);

    //const authed = stateCtx.state.user ? true : false;

    //return authed ? <StatsPage /> : <Login />;
    return <StatsPage />;
};

export default Stats;
