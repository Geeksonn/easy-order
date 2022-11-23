import React from 'react';

import Graph from '@components/stats/graph';
import Ranking from '@components/stats/ranking';
import FunStats from '@components/stats/funStats';

const StatsPage = ({ orders, items, totalLiters, totalEmptyWeight }) => {
    return (
        <div className='flex'>
            <div className='w-1/3'>
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
    );
};

export default StatsPage;
