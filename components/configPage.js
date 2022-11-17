import React from 'react';

import * as itemsAPI from '@lib/items/items';
import * as editionsAPI from '@lib/editions/editions';
import * as routesAPI from '@lib/routes/routes';
import * as questionsAPI from '@lib/questions/questions';

import { GroupButton, Spinner } from 'geekson-ui';
import ItemsTable from './items/itemsTable';
import EditionsTable from './editions/editionsTable';

import css from '@styles/configPage.module.css';
import RoutesTable from './routes/routesTable';
import QuestionsTable from './questions/questionsTable';

const BEER_TAB = 'Bières';
const EDITION_TAB = 'Editions';
const ROUTE_TAB = 'Routes';
const CHOICE_TAB = 'Arbre';

const ConfigPage = () => {
    const [selectedTab, setSelectedTab] = React.useState('Bières');
    const [spinner, setSpinner] = React.useState();
    const [items, setItems] = React.useState([]);
    const [editions, setEditions] = React.useState([]);
    const [routes, setRoutes] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [defCurrency, setDefCurrency] = React.useState();

    React.useEffect(() => {
        setSpinner(true);
        getData();
    }, [JSON.stringify(items)]);

    const getData = async () => {
        await getEditions();
        await getItems();
        await getRoutes();
        await getQuestions();
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

    const getRoutes = async () => {
        setRoutes(await routesAPI.listRoutes());
    };

    const getQuestions = async () => {
        setQuestions(await questionsAPI.listQuestions());
    };

    let childJsx = <Spinner color='blue' />;
    if (!spinner) {
        const activeEdition = editions.find((edition) => edition.active === true);
        const activeEditionItems = items.filter((item) => item.edition === activeEdition.name);

        if (selectedTab === BEER_TAB) {
            childJsx = (
                <ItemsTable
                    items={activeEditionItems}
                    currency={defCurrency}
                    activeEdition={activeEdition}
                    refreshData={getItems}
                />
            );
        } else if (selectedTab === EDITION_TAB) {
            childJsx = <EditionsTable editions={editions} refreshData={getEditions} />;
        } else if (selectedTab === ROUTE_TAB) {
            const activeEditionRoutes = routes.filter((route) => route.edition === activeEdition.name);
            childJsx = (
                <RoutesTable
                    routes={activeEditionRoutes}
                    items={activeEditionItems}
                    activeEdition={activeEdition}
                    refreshData={getRoutes}
                />
            );
        } else {
            const activeEditionQuestions = questions.filter((question) => question.edition === activeEdition.name);
            childJsx = (
                <QuestionsTable
                    questions={activeEditionQuestions}
                    items={activeEditionItems}
                    activeEdition={activeEdition}
                    refreshData={getQuestions}
                />
            );
        }
    }

    return (
        <div className={css.wrapper}>
            <GroupButton
                className='mb-12'
                labels={[BEER_TAB, EDITION_TAB, ROUTE_TAB, CHOICE_TAB]}
                clickHandler={(label) => setSelectedTab(label)}
            />
            {!spinner && childJsx}
            {spinner && <Spinner color='blue' />}
        </div>
    );
};

export default ConfigPage;
