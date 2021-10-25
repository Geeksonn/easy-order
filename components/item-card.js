
import React from 'react';
import Image from 'next/image';

import styles from '../styles/item-card.module.css';

export default function ItemCard({ index, item, quantity, cardClick }) {
    const IMG_SIZE = 130;

    const { name, image } = item;

    return (
        <div className={styles.itemCard} onClick={() => cardClick(index, item)}>
            <div className={styles.itemImage}>
                <Image className={styles.image} src={'/' + image} width={IMG_SIZE} height={IMG_SIZE} />
            </div>
            <div className={styles.itemName}>{name}</div>
            <div className={styles.itemQuantity}>
                <div className={styles.quantity}>{quantity}</div>
            </div>
        </div>
    );
}