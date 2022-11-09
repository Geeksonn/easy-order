import React from 'react';

import css from '@styles/forms.module.css';
import { Button } from 'geekson-ui';

const ItemForm = ({ save, cancel, item }) => {
    React.useEffect(() => {
        document.getElementById('name').value = item?.name;
        document.getElementById('type').value = item?.type;
        document.getElementById('brewery').value = item?.brewery;
        document.getElementById('price').value = item?.price;
        document.getElementById('currency').innerHTML = item?.currency;
        if (item?.image) {
            document.getElementById('image').hidden = true;
            document.getElementById('imageCard').hidden = true;
            document.getElementById('imageLabel').hidden = true;
            document.getElementById('imageCardLabel').hidden = true;
        }
        document.getElementById('degree').value = item?.degree;
        document.getElementById('ibu').value = item?.ibu;
        document.getElementById('description').value = item?.description;
    });

    const saveItem = () => {
        const newItem = {
            name: document.getElementById('name').value,
            type: document.getElementById('type').value,
            brewery: document.getElementById('brewery').value,
            price: document.getElementById('price').value,
            currency: document.getElementById('currency').innerHTML,
            image: document.getElementById('image').files[0],
            imageCard: document.getElementById('imageCard').files[0],
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

            <label htmlFor='type'>Type</label>
            <input type='text' id='type' name='type' />

            <label htmlFor='brewery'>Brasserie</label>
            <input type='text' id='brewery' name='brewery' />

            <label htmlFor='price'>Prix</label>
            <div className={css.priceWrapper}>
                <input className={css.priceInput} type='number' id='price' name='price' />
                <div id='currency' className={css.currency}></div>
            </div>

            <label htmlFor='image' id='imageLabel'>
                Image
            </label>
            <input type='file' accept='image/*' id='image' name='image' />

            <label htmlFor='imageCard' id='imageCardLabel'>
                Image pour la carte
            </label>
            <input type='file' accept='image/*' id='imageCard' name='imageCard' />

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
