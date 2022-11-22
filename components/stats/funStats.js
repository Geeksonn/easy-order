import React from 'react';
import css from '@styles/stats.module.css';

const FunStats = ({ amount, unit, label }) => {
    return (
        <div className={css.funStatWrapper}>
            <div className='flex justify-around items-baseline'>
                <p className={css.funStatAmount}>{amount}</p>
                <p className={css.funStatUnit}>{unit}</p>
            </div>
            <div className={css.funStatLabel}>{label}</div>
        </div>
    );
};

export default FunStats;
