import React from 'react';

import * as lib from '@lib/questions/questions';

import { TrashIcon } from '@heroicons/react/outline';
import { Spinner, Button } from 'geekson-ui';
import DataTable from '@components/dataTable';
import Modal from '@components/modal';

import css from '@styles/config-page.module.css';
import QuestionForm from './questionForm';

const QuestionsTable = ({ questions, items, activeEdition, refreshData }) => {
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const addNew = () => {
        setShowModal(true);
    };

    const saveQuestion = async (question) => {
        question.edition = activeEdition.name;
        setShowModal(false);
        setShowSpinner(true);

        const addedQuestion = await lib.addQuestion(question);
        if (addedQuestion.error) {
            // TODO Toast
            console.error('Error while adding a new question: ', addedQuestion.error);
        }

        await refreshData();
        setShowSpinner(false);
    };

    const deleteQuestion = async (question) => {
        setShowSpinner(true);

        const deletedQuestion = await lib.deleteQuestion(question);
        if (deletedQuestion.error) {
            // TODO Toast
            console.error('Error while deleting a question: ', deletedQuestion.error);
        }

        await refreshData();
        setShowSpinner(false);
    };

    let tableJsx = <Spinner color='blue' />;
    if (!showSpinner && questions.length > 0) {
        const multipleLineDivClass = 'flex flex-col';
        const multipleLineTextClass = 'border-b border-neutral-200 pb-2';
        const multipleLineTextClassBelow = 'pt-2';

        const questionsList = questions.map((question) => {
            const options = (
                <div className={multipleLineDivClass}>
                    <p className={multipleLineTextClass}>{question.option1}</p>
                    <p className={multipleLineTextClassBelow}>{question.option2}</p>
                </div>
            );

            const rOpt1 = question.resultOption1;
            const rOpt2 = question.resultOption2;
            const result1 =
                rOpt1.nextQuestion === -1 ? `Bière: ${rOpt1.selectedBeer}` : `-> Question n°${rOpt1.nextQuestion}`;
            const result2 =
                rOpt2.nextQuestion === -1 ? `Bière: ${rOpt2.selectedBeer}` : `-> Question n°${rOpt2.nextQuestion}`;
            const results = (
                <div className={multipleLineDivClass}>
                    <p className={multipleLineTextClass}>{result1}</p>
                    <p className={multipleLineTextClassBelow}>{result2}</p>
                </div>
            );

            const deleteIcon = (
                <TrashIcon
                    className='w-icon h-icon cursor-pointer text-red-500'
                    onClick={() => deleteQuestion(question)}
                />
            );

            return {
                _id: question._id,
                qid: question.qid,
                question: question.question,
                options: options,
                reponses: results,
                delete: deleteIcon,
            };
        });

        tableJsx = <DataTable headers={Object.keys(questionsList[0])} rows={questionsList} />;
    }

    return (
        <>
            {tableJsx}
            <div className={css.bottomTable}>
                <Button label='+ Add' accent='blue' clickHandler={addNew} />
            </div>
            <Modal
                title={false ? `Modifier une route` : `Ajouter une route`}
                show={showModal}
                close={() => setShowModal(false)}>
                <QuestionForm items={items} save={saveQuestion} cancel={() => setShowModal(false)} />
            </Modal>
        </>
    );
};

export default QuestionsTable;
