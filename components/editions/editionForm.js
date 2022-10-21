import React from 'react';

import Modal from '@components/modal';
import { Button } from 'geekson-ui';

const EditionForm = ({ save, cancel }) => {
    const saveEdition = () => {
        save({
            active: false,
            date: {
                month: Number(document.getElementById('month').value),
                year: Number(document.getElementById('year').value),
            },
            name: document.getElementById('name').value,
        });
    };

    return (
        <div className='form'>
            <label htmlFor='name'>Nom</label>
            <input type='text' id='name' name='name' />

            <label htmlFor='month'>Date</label>
            <div className='flex justify-evenly'>
                <input type='text' id='month' name='month' placeholder='Mois' />
                <input type='text' id='year' name='year' placeholder='Année' />
            </div>

            <div className='formActions'>
                <Button label='Save' accent='green' clickHandler={saveEdition} />
                <Button label='Cancel' accent='red' clickHandler={cancel} />
            </div>
        </div>
    );
};

export default EditionForm;
