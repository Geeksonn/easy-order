// ./components/LineChart.js

import React from 'react';
import Graph from "@components/stats/graph";
import Ranking from "@components/stats/ranking";
import FunStats from "@components/stats/funStats";
import {listOrders} from "@lib/orders/orders";


const Stats = () => {
    let totalDrinks = 0;
    const [orders, setOrders] = React.useState([]);
    const [totalLiters, setLiters] = React.useState(0);
    const [totalEmptyWeight, setEmptyWeight] = React.useState(0);
    //
    React.useEffect(() => {
        initializeData()
    }, [JSON.stringify(orders)]);

    const initializeData = async () => {
        await setOrders(await listOrders({edition: "2022-05"}));
        orders.forEach(x => totalDrinks = (totalDrinks +   x.items.length));

        console.log("total drinks", totalDrinks);
        setLiters(Math.round(totalDrinks / 3));
        setEmptyWeight(Math.round(totalDrinks / 4));

        console.log("total liters", totalLiters);
        console.log("total emptyWeight", totalEmptyWeight);
    }

    return (
        <div className='flex'>
            <div className='w-1/3 mr-5'>
            <Ranking orders={orders}/>
            </div>
            <div className='w-2/3 flex flex-col'>
                <div className='flex'>
                    <div className='w-1/2'>
                        <FunStats amount={totalLiters} unity='l' label='Litres de bière écoulé'></FunStats>
                    </div>
                    <div className='w-1/2'>
                        <FunStats amount={totalEmptyWeight} unity='kg' label='Poids total des vidanges'></FunStats>
                    </div>
                </div>
                <div className='mt-5'>
                <Graph orders={orders} />
                </div>
            </div>
        </div>
    );

};

export default Stats;