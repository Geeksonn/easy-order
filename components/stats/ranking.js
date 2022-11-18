// ./components/LineChart.js

import React, {useEffect} from 'react';
import css from '@styles/stats.module.css'
import RankingItem from "@components/stats/rankingItem";


const Ranking = ({orders}) => {
    const ordersMap = new Map();
    let sortedOrders;

    const initializeData = () => {
        let listItems = [];
        orders.map(order => order.items.forEach(item => addToMap(item.name)));
        //On trie celon le nombre de ordersMap
        //todo change in .value()
        sortedOrders = new Map([...ordersMap.entries()].sort((a, b) => b[1] - a[1]));
        let i = 0;
        sortedOrders.forEach((x, y) => listItems.push(<RankingItem ranking={++i} name={y} number={x} />));
        return listItems
    }

    const addToMap = (name) => {
        ordersMap.set(name, (ordersMap.has(name) ? ordersMap.get(name) : 0) + 1);
    }

    return (
        <div>
            <ol className='bg-dark-beige'>
            {initializeData()}
            </ol>

        </div>
    );


};

export default Ranking;