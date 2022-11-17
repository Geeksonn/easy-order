import React from 'react';

import { Button } from 'geekson-ui';
import { FormElement } from '../formElement';

const ItemForm = ({ save, cancel, item }) => {
    React.useEffect(() => {
        document.getElementById('name').value = item?.name;
        document.getElementById('type').value = item?.type;
        document.getElementById('brewery').value = item?.brewery;
        document.getElementById('price').value = item?.price;
        //document.getElementById('currency').innerHTML = item?.currency;
        if (item?.image) {
            document.getElementById('image').hidden = true;
            document.getElementById('imageCard').hidden = true;
            //document.getElementById('imageLabel').hidden = true;
            //document.getElementById('imageCardLabel').hidden = true;
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
            //currency: document.getElementById('currency').innerHTML,
            image: document.getElementById('image').files[0],
            imageCard: document.getElementById('imageCard').files[0],
            degree: document.getElementById('degree').value,
            ibu: document.getElementById('ibu').value,
            description: document.getElementById('description').value,
        };

        save(newItem);
    };
    return (
        <div className='form'>
            <FormElement element={{ id: 'name', type: 'text', label: 'Nom' }} />
            <FormElement element={{ id: 'type', type: 'text', label: 'Type' }} />
            <FormElement element={{ id: 'brewery', type: 'text', label: 'Brasserie' }} />
            <FormElement element={{ id: 'price', type: 'number', label: `Prix (${item.currency})` }} />
            <FormElement element={{ id: 'image', type: 'file', label: 'Etiquette' }} />
            <FormElement element={{ id: 'imageCard', type: 'file', label: 'Bouteille' }} />
            <FormElement element={{ id: 'degree', type: 'number', label: '% Alcool' }} />
            <FormElement element={{ id: 'ibu', type: 'number', label: 'IBU' }} />

            <label htmlFor='description' className='mt-5'>
                Description
            </label>
            <textarea id='description' name='description'></textarea>

            <div className={'formActions'}>
                <Button label='Save' accent='green' clickHandler={saveItem} />
                <Button label='Cancel' accent='red' clickHandler={cancel} />
            </div>
        </div>
    );
};

export default ItemForm;
