import React from 'react';
import Image from 'next/image';

import css from '../styles/item-card.module.css';

export default function ItemCard({ index, item, quantity, cardClick }) {
    const IMG_SIZE = 130;

    const { name, image } = item;

    return (
        <div className={css.itemCard} onClick={() => cardClick(index, item)}>
            <img className={css.itemImage} src={'/' + image} />
            <div className={css.itemQuantity}>{quantity}</div>
        </div>
    );
}
