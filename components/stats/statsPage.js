import React from 'react';

import { listEditions } from '@lib/editions/editions';
import { listItems } from '@lib/items/items';
import { listOrders } from '@lib/orders/orders';

import Graph from '@components/stats/graph';
import Ranking from '@components/stats/ranking';
import FunStats from '@components/stats/funStats';

const StatsPage = () => {
    const [orders, setOrders] = React.useState([]);
    const [totalLiters, setLiters] = React.useState(0);
    const [totalEmptyWeight, setEmptyWeight] = React.useState(0);
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        const interval = setInterval(initializeData, 5000);

        return () => clearInterval(interval);
    }, [JSON.stringify(orders)]);

    const initializeData = async () => {
        // TODO Error
        const editions = await listEditions();
        const active = editions.find((ed) => ed.active === true);
        const items = await listItems({ edition: active.name });
        const ordersData = await listOrders({ edition: active.name });
        const totalDrinks = ordersData.reduce((prev, curr) => prev + curr.items.length, 0);

        setItems(items);
        setOrders(ordersData);
        setLiters(Math.round(totalDrinks / 3));
        setEmptyWeight(Math.round(totalDrinks / 4));
    };

    return items.length > 0 ? (
        <div className='flex'>
            <div className='w-1/3 bg-dark-beige h-screen'>
                <Ranking orders={orders} items={items} />
            </div>
            <div className='w-2/3 flex flex-col'>
                <div className='flex justify-evenly'>
                    <FunStats amount={totalLiters} unit='L' label='Litres de bière écoulés'></FunStats>
                    <FunStats amount={totalEmptyWeight} unit='Kg' label='Poids total des vidanges'></FunStats>
                </div>
                <div className='mt-5'>
                    <Graph orders={orders} />
                </div>
            </div>
        </div>
    ) : (
        <div>Loading ...</div>
    );
};

export default StatsPage;
