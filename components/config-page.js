import React from 'react';

import * as itemsAPI from '@lib/items/items';
import * as editionsAPI from '@lib/editions/editions';

import { GroupButton, Spinner } from 'geekson-ui';
import ItemsTable from './items-table';
import EditionsTable from './editionsTable';

import css from '@styles/config-page.module.css';

const ConfigPage = () => {
    const [selectedTab, setSelectedTab] = React.useState('Bières');
    const [spinner, setSpinner] = React.useState();
    const [items, setItems] = React.useState([]);
    const [editions, setEditions] = React.useState([]);
    const [defCurrency, setDefCurrency] = React.useState();

    React.useEffect(() => {
        setSpinner(true);
        getData();
    }, [JSON.stringify(items)]);

    const getData = async () => {
        await getEditions();
        await getItems();
        setSpinner(false);
    };

    const getItems = async () => {
        const retrievedItems = await itemsAPI.listItems();
        setDefCurrency(retrievedItems[0].currency);
        setItems(retrievedItems);
    };

    const getEditions = async () => {
        setEditions(await editionsAPI.listEditions());
    };

    let childJsx = <Spinner color='blue' />;
    if (!spinner) {
        if (selectedTab === 'Bières') {
            const activeEdition = editions.find((edition) => edition.active === true);
            const activeEditionItems = items.filter((item) => item.edition === activeEdition.name);
            childJsx = (
                <ItemsTable
                    items={activeEditionItems}
                    currency={defCurrency}
                    activeEdition={activeEdition}
                    refreshData={getItems}
                />
            );
        } else {
            childJsx = <EditionsTable editions={editions} refreshData={getEditions} />;
        }
    }

    return (
        <div className={css.wrapper}>
            <GroupButton
                className='mb-12'
                labels={['Bières', 'Editions']}
                clickHandler={(label) => setSelectedTab(label)}
            />
            {!spinner && childJsx}
            {spinner && <Spinner color='blue' />}
        </div>
    );
};

export default ConfigPage;
