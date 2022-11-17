import React from 'react';

import * as lib from '@lib/questions/questions';

import { TrashIcon } from '@heroicons/react/outline';
import { Spinner, Button } from 'geekson-ui';
import DataTable from '@components/dataTable';
import Modal from '@components/modal';
import QuestionForm from './questionForm';

import css from '@styles/configPage.module.css';

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
        

        const questionsList = questions.map((question) => {
            let optionArray = [];
            let resultArray = [];

            question.options.forEach((opt, ind) => {
                optionArray.push(
                    <p key={`opt_${ind}`} className={css.multipleLineTextClass}>
                        {opt.option}
                    </p>
                );
                resultArray.push(
                    <p key={`res_${ind}`} className={css.multipleLineTextClass}>
                        {opt.nextQuestion > 0 ? `-> Question n°${opt.nextQuestion}` : `Bière: ${opt.selectedBeer}`}
                    </p>
                );
            });

            const options = <div className={css.multipleLineDivClass}>{optionArray}</div>;
            const results = <div className={css.multipleLineDivClass}>{resultArray}</div>;

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
                title={false ? `Modifier une question` : `Ajouter une question`}
                show={showModal}
                close={() => setShowModal(false)}>
                <QuestionForm items={items} save={saveQuestion} cancel={() => setShowModal(false)} />
            </Modal>
        </>
    );
};

export default QuestionsTable;
