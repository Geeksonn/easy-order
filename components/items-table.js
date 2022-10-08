import React from 'react';

import * as API from '@lib/items/items';

import { TrashIcon, PencilIcon } from '@heroicons/react/outline';
import { Button, Spinner } from 'geekson-ui';
import ItemModal from './item-modal';

import css from '@styles/config-page.module.css';
import DataTable from './dataTable';

const ItemsTable = ({ items, currency, activeEdition, refreshData }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState();
    const [showSpinner, setShowSpinner] = React.useState(false);

    const addNew = () => {
        setSelectedItem({
            name: '',
            image: '',
            price: '',
            degree: '',
            ibu: '',
            description: '',
            currency: currency,
        });
        setShowModal(true);
    };

    const modifyItem = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const delItem = async (item) => {
        setShowSpinner(true);
        const deletedItem = await API.deleteItem(item);
        await refreshData();
        setShowSpinner(false);
    };

    const saveItem = async (item) => {
        setShowModal(false);
        setShowSpinner(true);

        if ('_id' in selectedItem) {
            item._id = selectedItem._id;
            const updatedItem = await API.modifyItem(item);
        } else {
            item.edition = activeEdition.name;
            const addedItem = await API.createItem(item);
            // TODO Toast + Error Management 

        }

        await refreshData();
        setShowSpinner(false);
    };

    let tableJsx = <Spinner color='blue' />;
    if (!showSpinner && items.length > 0) {
        const tableData = items.map((item) => {
            const editIcon = (
                <PencilIcon className='w-icon h-icon cursor-pointer' onClick={() => modifyItem(item)} />
            );

            const deleteIcon = (
                <TrashIcon className='w-icon h-icon cursor-pointer text-red-500' onClick={() => delItem(item)} />
            );

            return {
                _id: item._id,
                name: item.name,
                degree: `${item.degree} %`,
                ibu: item.ibu,
                price: `${item.price} ${item.currency}`,
                edition: item.edition,
                edit: editIcon,
                delete: deleteIcon,
            };
        });

        tableJsx = <DataTable headers={Object.keys(tableData[0])} rows={tableData} />;
    }

    return (
        <>
            {tableJsx}
            <div className={css.bottomTable}>
                <Button accent='blue' label='+ Add' clickHandler={addNew} />
            </div>
            <ItemModal item={selectedItem} show={showModal} save={saveItem} close={() => setShowModal(false)} />
        </>
    );
};

export default ItemsTable;
