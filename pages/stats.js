import React from 'react';

import { listOrders } from '@lib/orders/orders';

import StateContext from '@context/stateContext';

import StatsPage from '@components/stats/statsPage';
import Login from '@components/login';
import { listEditions } from '@lib/editions/editions';
import { listItems } from '@lib/items/items';

const Stats = () => {
    const { stateCtx } = React.useContext(StateContext);

    const [orders, setOrders] = React.useState([]);
    const [totalLiters, setLiters] = React.useState(0);
    const [totalEmptyWeight, setEmptyWeight] = React.useState(0);
    const [items, setItems] = React.useState([]);
    const [activeEdition, setActiveEdition] = React.useState();

    const authed = stateCtx.state.user ? true : false;
    const child = authed ? (
        <StatsPage orders={orders} items={items} totalLiters={totalLiters} totalEmptyWeight={totalEmptyWeight} />
    ) : (
        <Login />
    );

    React.useEffect(() => {
        initializeData();
    }, [JSON.stringify(orders)]);

    //ça c'est duplicated
    const getEditions = async () => {
        const editions = await listEditions();
        if (editions.error) {
            // TODO Toast
            console.error(editions.error);
        } else {
            return editions;
        }
    };

    //ça c'est duplicated
    const getItems = async () => {
        const editions = await getEditions();
        const activeEdition = editions.find((ed) => ed.active === true);
        setActiveEdition(activeEdition);

        const items = await listItems({ edition: activeEdition.name });
        if (items.error) {
            // TODO Toast or somethign
            console.error(items.error);
        } else {
            setItems(items);
        }
    };

    const initializeData = async () => {
        await getItems();
        const ordersData = await listOrders({ edition: activeEdition.name });
        const totalDrinks = ordersData.reduce((prev, curr) => prev + curr.items.length, 0);
        setOrders(ordersData);
        setLiters(Math.round(totalDrinks / 3));
        setEmptyWeight(Math.round(totalDrinks / 4));
    };

    return child;
};

export default Stats;
