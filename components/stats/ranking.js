import React from 'react';
import RankingItem from '@components/stats/rankingItem';

const Ranking = ({ orders, items }) => {
    const ordersMap = new Map();

    const addToMap = (name) => {
        ordersMap.set(name, (ordersMap.has(name) ? ordersMap.get(name) : 0) + 1);
    };

    const buildJsx = () => {
        let listItems = [];
        let i = 0;

        items.forEach(x => ordersMap.set(x.name, 0));
        orders.forEach((order) => order.items.forEach((item) => addToMap(item.name)));
        const sortedOrders = new Map([...ordersMap.entries()].sort((a, b) => b[1] - a[1]));
        sortedOrders.forEach((value, key) =>
            listItems.push(<RankingItem key={`ri_${i}`} ranking={++i} name={key} number={value} />)
        );
        return listItems;
    };

    return (
        <div>
            <ol className='bg-dark-beige'>{buildJsx()}</ol>
        </div>
    );
};

export default Ranking;
