import React from 'react';

import Modal from '@components/modal';
import { Button } from 'geekson-ui';
import { FormElement } from '@components/formElement';

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
            <FormElement element={{ id: 'name', type: 'text', label: 'Nom'}} />
            <FormElement element={{ id: 'month', type: 'text', label: 'Mois'}} />
            <FormElement element={{ id: 'year', type: 'text', label: 'Année'}} />

            <div className='formActions'>
                <Button label='Save' accent='green' clickHandler={saveEdition} />
                <Button label='Cancel' accent='red' clickHandler={cancel} />
            </div>
        </div>
    );
};

export default EditionForm;
