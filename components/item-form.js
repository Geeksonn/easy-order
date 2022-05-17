import React from 'react';

import css from '../styles/item-form.module.css';

const ItemForm = ({ save, cancel, item }) => {
    const nameInput = React.useRef();
    const priceInput = React.useRef();
    const imageInput = React.useRef();
    const currencyInput = React.useRef();

    React.useEffect(() => {
        nameInput.current.value = item?.name;
        priceInput.current.value = item?.price;
        currencyInput.current.innerHTML = item?.currency;
        imageInput.current.value = item?.image;
    });

    const saveItem = () => {
        const newItem = {
            name: nameInput.current.value,
            price: priceInput.current.value,
            currency: currencyInput.current.innerHTML,
            image: imageInput.current.value,
        };

        save(newItem);
    };
    return (
        <div className={css.form}>
            <label htmlFor='name'>Name</label>
            <input ref={nameInput} className={css.normalInput} type='text' id='name' name='name' />
            <label htmlFor='price'>Price</label>
            <div className={css.priceWrapper}>
                <input ref={priceInput} className={css.priceInput} type='text' id='price' name='price' />
                <div ref={currencyInput} className={css.currency}></div>
            </div>
            <label htmlFor='image'>Image</label>
            <input ref={imageInput} className={css.normalInput} type='text' id='image' name='image' />
            <div className={css.actions}>
                <button className={css.button} onClick={saveItem}>
                    Save
                </button>
                <button className={css.forgot} onClick={cancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
    /*

                */
};

export default ItemForm;
