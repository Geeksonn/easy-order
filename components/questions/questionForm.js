import React from 'react';

import { Button } from 'geekson-ui';
import { FormElement, GroupedFormElement } from '@components/formElement';

const QuestionForm = ({ items, save, cancel }) => {
    const [options, setOptions] = React.useState([]);

    const saveQuestion = () => {
        let optionArray = [];
        options.forEach((opt, idx) => {
            const fieldId = `option_${idx}`;
            optionArray.push({
                option: document.getElementById(fieldId).value,
                selectedBeer: document.getElementById(`${fieldId}_beer`)?.value || '',
                nextQuestion: Number.parseInt(document.getElementById(`${fieldId}_qid`)?.value) || -1
            });
        });

        save({
            qid: document.getElementById('qid').value,
            question: document.getElementById('question').value,
            options: optionArray,
        });
    };

    const addOptionFormLine = () => {
        const currIndex = options.length;
        const fieldId = `option_${currIndex}`;
        const groupedElements = [
            {
                id: `${fieldId}_beer`,
                type: 'select',
                label: 'Bière sélectionnée',
                options: items,
            },
            {
                id: `${fieldId}_qid`,
                type: 'text',
                label: 'Prochaine Question',
            },
        ];
        const optionElement = {id: fieldId, type: 'text', label: 'Option'};

        const jsx = (
            <div key={`div_${fieldId}`} className='mt-4 border border-neutral-200 rounded-lg p-4'>
                <h3 key={`h3_${fieldId}`} className='font-bold text-lg'>{`Option n°${options.length + 1}`}</h3>
                <FormElement element={optionElement} />
                <GroupedFormElement elements={groupedElements} />
            </div>
        );
        setOptions([...options, jsx]);
    };

    return (
        <div className='form'>
            <FormElement element={{id: 'qid', type: 'text', label: 'ID'}} />
            <FormElement element={{id: 'question', type: 'text', label: 'Question'}} />
            {options.map((opt) => opt)}
            <Button label={`Ajout d'option`} accent='blue' className='mt-3' clickHandler={addOptionFormLine} />

            <div className='formActions'>
                <Button label='Save' accent='green' clickHandler={saveQuestion} />
                <Button label='Cancel' accent='red' clickHandler={cancel} />
            </div>
        </div>
    );
};

export default QuestionForm;
