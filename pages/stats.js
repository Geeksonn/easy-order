import React from 'react';

import { listOrders } from '@lib/orders/orders';

import StateContext from '@context/stateContext';

import StatsPage from '@components/stats/statsPage';
import Login from '@components/login';

const Stats = () => {
    const { stateCtx } = React.useContext(StateContext);

    const [orders, setOrders] = React.useState([]);
    const [totalLiters, setLiters] = React.useState(0);
    const [totalEmptyWeight, setEmptyWeight] = React.useState(0);

    const authed = stateCtx.state.user ? true : false;
    const child = authed ? (
        <StatsPage orders={orders} totalLiters={totalLiters} totalEmptyWeight={totalEmptyWeight} />
    ) : (
        <Login />
    );

    React.useEffect(() => {
        initializeData();
    }, [JSON.stringify(orders)]);

    const initializeData = async () => {
        const ordersData = await listOrders({ edition: '2022-05' });
        const totalDrinks = ordersData.reduce((prev, curr) => prev + curr.items.length, 0);

        setOrders(ordersData);
        setLiters(Math.round(totalDrinks / 3));
        setEmptyWeight(Math.round(totalDrinks / 4));
    };

    return child;
};

export default Stats;
