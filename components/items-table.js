import React from 'react';

import * as API from '../lib/items';

import Button from './button';
import ItemModal from './item-modal';

import css from '../styles/items-table.module.css';
import Context from './context';

const ItemsTable = () => {
    const { tokenCtx } = React.useContext(Context);
    const { token } = tokenCtx;
    const [showModal, setShowModal] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState();
    const [items, setItems] = React.useState([]);
    const [defCurrency, setDefCurrency] = React.useState();

    React.useEffect(async () => {
        const retrievedItems = await API.getItems(token);
        setDefCurrency(retrievedItems[0].currency);
        setItems(retrievedItems);
    }, [JSON.stringify(items)]);

    const addNew = () => {
        setSelectedItem({
            name: '',
            image: '',
            price: '',
            currency: defCurrency,
        });
        setShowModal(true);
    };

    const modifyItem = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const delItem = (itemID) => {
        const isDeleted = API.deleteItem(token, itemID);
        if (isDeleted) {
            setItems(items.filter((item) => item._id !== itemID));
        }
    };

    const saveItem = async (item) => {
        if ('_id' in selectedItem) {
            delItem(selectedItem._id);
        }
        
        // Hack for keeping the fields in the right order
        const newItem = {
            _id: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            currency: 'token',
        };
        const newItemID = await API.putItems(token, newItem);
        item._id = newItemID[0];
        setItems([...items, item]);
        setShowModal(false);
    };

    const buildHeading = () => {
        const headers = items.length > 0 ? Object.keys(items[0]) : [];
        return (
            <thead>
                <tr>
                    {headers.map((h, i) => {
                        return (
                            <th key={i} className={css.headCell}>
                                {h === '_id' ? 'id' : h}
                            </th>
                        );
                    })}
                    <th key='head-edit' className={css.headCell}>
                        edit
                    </th>
                    <th key='head-delete' className={css.headCell}>
                        delete
                    </th>
                </tr>
            </thead>
        );
    };

    const buildRowCells = (row, index) => {
        return Object.values(row).map((r, i) => {
            return (
                <td key={'dt-' + i} className={css.cell}>
                    {i === 0 ? index : r}
                </td>
            );
        });
    };

    const buildRows = () => {
        return (
            <tbody>
                {items.map((row, index) => {
                    return (
                        <tr key={index}>
                            {buildRowCells(row, index)}
                            <td key={'edit-' + index} className={css.cell}>
                                <button onClick={() => modifyItem(row)}>
                                    edit
                                </button>
                            </td>
                            <td key={'delete-' + index} className={css.cell}>
                                <button onClick={() => delItem(row._id)}>
                                    delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    return (
        <div className={css.wrapper}>
            <div className={css.tableWrapper}>
                <table>
                    {buildHeading()}
                    {buildRows()}
                </table>
            </div>
            <div className={css.bottomTable}>
                <Button severity='normal' text='+ Add' onClick={addNew} />
            </div>
            <ItemModal
                item={selectedItem}
                show={showModal}
                save={saveItem}
                close={() => setShowModal(false)}
            />
        </div>
    );
};

export default ItemsTable;
