import React from 'react';

import * as lib from '@lib/editions/editions';

import Modal from '@components/modal';
import { CheckIcon, CheckCircleIcon, XCircleIcon, TrashIcon } from '@heroicons/react/outline';
import DataTable from '../dataTable';
import { Button, Spinner } from 'geekson-ui';

import css from '@styles/configPage.module.css';
import EditionForm from './editionForm';

const EditionsTable = ({ editions, refreshData }) => {
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const addNew = () => {
        setShowModal(true);
    };

    const saveEdition = async (edition) => {
        setShowModal(false);
        setShowSpinner(true);

        const addedEdition = await lib.createEdition(edition);
        if (addedEdition.error) {
            console.error('Error while adding a new edition: ', addedEdition.error);
        } else {
            await refreshData();
        }
        setShowSpinner(false);
    };

    const activateEdition = async (edition) => {
        if (!edition.active) {
            setShowSpinner(true);
            await lib.activateEdition(edition);
            refreshData();
            setShowSpinner(false);
        }
    };

    const deleteEdition = async (edition) => {
        setShowSpinner(true);
        await lib.deleteEdition(edition);
        refreshData();
        setShowSpinner(false);
    };

    let tableJsx = <Spinner color='blue' />;
    if (!showSpinner && editions.length > 0) {
        const editionsList = editions.map((edition) => {
            const { year, month } = edition.date;
            const dateStr = month < 10 ? `${year}-0${month}` : `${year}-${month}`;
            const activateIcon = !edition.active ? (
                <CheckIcon className='w-icon h-icon cursor-pointer' onClick={() => activateEdition(edition)} />
            ) : (
                <></>
            );
            const status = edition.active ? (
                <CheckCircleIcon className='w-icon h-icon text-green-500' />
            ) : (
                <XCircleIcon className='w-icon h-icon text-red-500' />
            );
            const deleteIcon = (
                <TrashIcon
                    className='w-icon h-icon text-red-500 cursor-pointer'
                    onClick={() => deleteEdition(edition)}
                />
            );

            return {
                _id: edition._id,
                name: edition.name,
                date: new Date(dateStr).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'long',
                }),
                status: status,
                activate: activateIcon,
                delete: deleteIcon,
            };
        });
        tableJsx = <DataTable headers={Object.keys(editionsList[0])} rows={editionsList} />;
    }

    return (
        <>
            {tableJsx}
            <div className={css.bottomTable}>
                <Button label='+ Add' accent='blue' clickHandler={addNew} />
            </div>
            <Modal title='Ajouter une édition' show={showModal} close={() => setShowModal(false)}>
                <EditionForm save={saveEdition} cancel={() => setShowModal(false)} />
            </Modal>
        </>
    );
};

export default EditionsTable;
