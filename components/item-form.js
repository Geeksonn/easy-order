import React from 'react';

import css from '@styles/item-form.module.css';
import { Button } from 'geekson-ui';

const ItemForm = ({ save, cancel, item }) => {
    React.useEffect(() => {
        document.getElementById('name').value = item?.name;
        document.getElementById('price').value = item?.price;
        document.getElementById('currency').innerHTML = item?.currency;
        //document.getElementById('image').value = item?.image;
        if (item?.image) document.getElementById('image').hidden = true;
        if (item?.image) document.getElementById('imageLabel').hidden = true;
        document.getElementById('degree').value = item?.degree;
        document.getElementById('ibu').value = item?.ibu;
        document.getElementById('description').value = item?.description;
    });

    const saveItem = () => {
        const newItem = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            currency: document.getElementById('currency').innerHTML,
            image: document.getElementById('image').files[0],
            degree: document.getElementById('degree').value,
            ibu: document.getElementById('ibu').value,
            description: document.getElementById('description').value,
        };

        save(newItem);
    };
    return (
        <div className={css.form}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' />

            <label htmlFor='price'>Price</label>
            <div className={css.priceWrapper}>
                <input className={css.priceInput} type='number' id='price' name='price' />
                <div id='currency' className={css.currency}></div>
            </div>

            <label htmlFor='image' id='imageLabel'>Image</label>
            <input type='file' accept='image/*' id='image' name='image' />

            <label htmlFor='degree'>% Alcohol</label>
            <input type='number' id='degree' name='degree' />

            <label htmlFor='ibu'>IBU</label>
            <input type='number' id='ibu' name='ibu' />

            <label htmlFor='description'>Description</label>
            <textarea id='description' name='description'></textarea>

            <div className={css.actions}>
                <Button label='Save' accent='green' clickHandler={saveItem} />
                <Button label='Cancel' accent='red' clickHandler={cancel} />
            </div>
        </div>
    );
};

export default ItemForm;
