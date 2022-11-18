import React, {useEffect} from 'react';
import css from '@styles/stats.module.css';

const RankingItem = ({ranking, name, number}) => {


    return <li className={css.rankingItem} key={ranking}>
        <div className={css.rankingPosition}>
            <p>
                {ranking}
            </p>
        </div>

        <div className={css.itemWrapper}>
            <div className={css.itemName}>{name}</div>
            <div className={css.itemNumber}>{number}</div>
        </div>
    </li>

}

export default RankingItem;