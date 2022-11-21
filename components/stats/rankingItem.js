import React, {useEffect} from 'react';
import css from '@styles/stats.module.css';

const RankingItem = ({ranking, name, number}) => {


    const getClass = (normal, one, podium) => {
        return ranking !== 1 ? (ranking !== 2 && ranking !== 3 ? normal : podium ) : one;
    }

    let itemNameClass = getClass(css.itemName, css.itemNameOne, css.itemNamePodium);
    let rankingItemClass = getClass(css.rankingItem, css.rankingItemOne, css.rankingItemOne);
    let itemWrapperClass = getClass(css.itemWrapper, css.itemWrapperOne, css.itemWrapperOne);

    return <li className={rankingItemClass} key={ranking}>
        <div className={css.rankingPosition}>
            <p>
                {ranking}
            </p>
        </div>

        <div className={itemWrapperClass}>
            <div className={itemNameClass}>{name}</div>
            <div className={css.itemNumber}>{number}</div>
        </div>
    </li>

}

export default RankingItem;