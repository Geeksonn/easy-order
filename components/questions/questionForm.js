import React from 'react';

import { Button } from 'geekson-ui';

const DIV_CLASS = 'mt-4 border border-neutral-200 rounded-lg p-4';
const INLINE_DIV = 'my-3 flex justify-start items-center';
const OPT1_RESULT = 'option1Result';
const OPT2_RESULT = 'option2Result';
const OPT_QUESTION = 'Prochaine Question';
const OPT_BEER = 'Bière sélectionnée';

const QuestionForm = ({ items, save, cancel }) => {
    const [option1Type, setOption1Type] = React.useState(OPT_QUESTION);
    const [option2Type, setOption2Type] = React.useState(OPT_QUESTION);

    const handleResultChange = (event) => {
        const { name, value } = event.target;

        if (name === OPT1_RESULT) setOption1Type(value);
        if (name === OPT2_RESULT) setOption2Type(value);
    };

    const saveQuestion = () => {
        const opt1NextQuestion =
            option1Type === OPT_QUESTION ? document.getElementById('opt1NextQuestion').value : -1;
        const opt1SelectedBeer = option1Type === OPT_BEER ? document.getElementById('opt1SelectedBeer').value : '';
        const opt2NextQuestion =
            option2Type === OPT_QUESTION ? document.getElementById('opt2NextQuestion').value : -1;
        const opt2SelectedBeer = option2Type === OPT_BEER ? document.getElementById('opt2SelectedBeer').value : '';

        save({
            qid: document.getElementById('qid').value,
            question: document.getElementById('question').value,
            option1: document.getElementById('option1').value,
            resultOption1: {
                nextQuestion: opt1NextQuestion,
                selectedBeer: opt1SelectedBeer,
            },
            option2: document.getElementById('option2').value,
            resultOption2: {
                nextQuestion: opt2NextQuestion,
                selectedBeer: opt2SelectedBeer,
            },
        });
    };

    return (
        <div className='form'>
            <label htmlFor='qid'>ID</label>
            <input type='text' id='qid' name='qid' />

            <label htmlFor='question'>Question</label>
            <input type='text' id='question' name='question' />

            <div className={DIV_CLASS}>
                <h3 className='font-bold text-lg'>Option 1</h3>

                <label htmlFor='option1'>Option 1</label>
                <input type='text' id='option1' name='option1' />

                <p className='mt-4 font-semibold'>Résultat option 1:</p>

                <div className={INLINE_DIV}>
                    <input
                        type='radio'
                        name={OPT1_RESULT}
                        value={OPT_QUESTION}
                        checked={option1Type === OPT_QUESTION}
                        onChange={handleResultChange}
                        className='mr-3 w-fit'
                    />
                    <label htmlFor={OPT1_RESULT} className='mt-0'>
                        {OPT_QUESTION}
                    </label>
                </div>
                <div className={INLINE_DIV}>
                    <input
                        type='radio'
                        name={OPT1_RESULT}
                        value={OPT_BEER}
                        checked={option1Type === OPT_BEER}
                        onChange={handleResultChange}
                        className='mr-3 w-fit'
                    />
                    <label htmlFor={OPT1_RESULT} className='mt-0'>
                        {OPT_BEER}
                    </label>
                </div>

                {option1Type === OPT_QUESTION ? (
                    <input type='text' id='opt1NextQuestion' name='opt1NextQuestion' />
                ) : null}

                {option1Type === OPT_BEER ? (
                    <select className='w-full' id='opt1SelectedBeer' name='opt1SelectedBeer'>
                        {items.map((item) => (
                            <option key={`opt1_${item._id}`} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                ) : null}
            </div>

            <div className={DIV_CLASS}>
                <h3 className='font-bold text-lg'>Option 2</h3>

                <label htmlFor='option2'>Option 2</label>
                <input type='text' id='option2' name='option2' />

                <p className='mt-4 font-semibold'>Résultat option 2:</p>

                <div className={INLINE_DIV}>
                    <input
                        type='radio'
                        name={OPT2_RESULT}
                        value={OPT_QUESTION}
                        checked={option2Type === OPT_QUESTION}
                        onChange={handleResultChange}
                        className='mr-3 w-fit'
                    />
                    <label htmlFor={OPT2_RESULT} className='mt-0'>
                        {OPT_QUESTION}
                    </label>
                </div>
                <div className={INLINE_DIV}>
                    <input
                        type='radio'
                        name={OPT2_RESULT}
                        value={OPT_BEER}
                        checked={option2Type === OPT_BEER}
                        onChange={handleResultChange}
                        className='mr-3 w-fit'
                    />
                    <label htmlFor={OPT2_RESULT} className='mt-0'>
                        {OPT_BEER}
                    </label>
                </div>

                {option2Type === OPT_QUESTION ? (
                    <input type='text' id='opt2NextQuestion' name='opt2NextQuestion' />
                ) : null}

                {option2Type === OPT_BEER ? (
                    <select className='w-full' id='opt2SelectedBeer' name='opt2SelectedBeer'>
                        {items.map((item) => (
                            <option key={`opt2_${item._id}`} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                ) : null}
            </div>

            <div className='formActions'>
                <Button label='Save' accent='green' clickHandler={saveQuestion} />
                <Button label='Cancel' accent='red' clickHandler={cancel} />
            </div>
        </div>
    );
};

export default QuestionForm;
