import React from 'react';
import Image from 'next/image';

import css from '@styles/item-card.module.css';

export default function ItemCard({ index, item, quantity, cardClick }) {
    const IMG_SIZE = 130;

    const { name, image } = item;

    return (
        <div className={css.itemCard} onClick={() => cardClick(item)}>
            <div className={css.itemName}>{name}</div>
            <img className={css.itemImage} src={process.env.NEXT_PUBLIC_IMG_CDN_URL + image + '/'} />
            <div className={css.itemQuantity}>{quantity}</div>
        </div>
    );
}
