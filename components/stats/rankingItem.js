import React from 'react';
import css from '@styles/stats.module.css';

const RankingItem = ({ ranking, name, number }) => {
    /*

    let itemNameClass = getClass(css.itemName, css.itemNameOne, css.itemNamePodium);
    let rankingItemClass = getClass(css.rankingItem, css.rankingItemPodium, css.rankingItemPodium);
    let itemWrapperClass = getClass(css.itemWrapper, css.itemWrapperOne, css.itemWrapperOne);
    */

    const liClass = ranking < 4 ? css.listItemPodium : '';
    const bottomBorder = ranking < 4 ? css.itemContainerPodium : '';
    let nameSize;
    let posClass;
    if (ranking === 1) {
        nameSize = 'text-4xl';
        posClass = css.posFirst;
    } else if (ranking < 4) {
        nameSize = 'text-3xl';
        posClass = css.posPodium;
    } else {
        nameSize = 'text-2xl';
        posClass = css.posNormal;
    }

    return (
        <li key={`li_${ranking}`} className={`${css.listItem} ${liClass}`}>
            <div key={`pos_${ranking}`} className='w-1/5'>
                <div key={`pos_div_${ranking}`} className={`${css.position} ${posClass}`}>{ranking}</div>
            </div>
            <div key={`itm_${ranking}`} className='w-4/5 px-4'>
                <div key={`itm_div_${ranking}`} className={`${css.itemContainer} ${bottomBorder}`}>
                    <p key={`itm_${name}`} className={`${css.itemName} ${nameSize}`}>{name}</p>
                    <p key={`itm_nb_${name}`} className='font-medium text-2xl'>{number}</p>
                </div>
            </div>
        </li>
    );
};

export default RankingItem;
