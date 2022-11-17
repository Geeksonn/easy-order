import React from 'react';

import * as lib from '@lib/routes/routes';

import DataTable from '../dataTable';
import Modal from '@components/modal';
import { TrashIcon, PencilIcon } from '@heroicons/react/outline';
import { Spinner, Button } from 'geekson-ui';
import RouteForm from './routeForm';

import css from '@styles/configPage.module.css';

const RoutesTable = ({ routes, items, activeEdition, refreshData }) => {
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [selectedRoute, setSelectedRoute] = React.useState();
    const [showModal, setShowModal] = React.useState(false);

    const addNew = () => {
        setShowModal(true);
    };

    const saveRoute = async (route) => {
        route.edition = activeEdition.name;
        setShowModal(false);
        setShowSpinner(true);
        const addedRoute = await lib.addRoute(route);
        if (addedRoute.error) {
            // TODO Toast
            console.error('Error while adding a route', addedRoute.error);
        }
        await refreshData();
        setShowSpinner(false);
    };

    const deleteRoute = async (route) => {
        setShowSpinner(true);
        const deletedRoute = await lib.deleteRoute(route);

        if (deletedRoute.error) {
            // TODO Toast
            console.error('Error while deleting a route', deletedRoute.error);
        }

        await refreshData();
        setShowSpinner(false);
    };

    let tableJsx = <Spinner color='blue' />;
    if (!showSpinner && routes.length > 0) {
        const routesList = routes.map((route) => {
            const nbOfBeers = route.beers.length;
            /* TODO Later 
            const modifyIcon = (
                <PencilIcon
                    className='w-icon h-icon cursor-pointer'
                    onClick={() => console.log('Modify: ', route)}
                />
            ); */
            const deleteIcon = (
                <TrashIcon
                    className='w-icon h-icon cursor-pointer text-red-500'
                    onClick={() => deleteRoute(route)}
                />
            );

            return {
                _id: route._id,
                name: route.name,
                beers: nbOfBeers,
                edition: route.edition,
                //modify: modifyIcon,
                delete: deleteIcon,
            };
        });

        tableJsx = <DataTable headers={Object.keys(routesList[0])} rows={routesList} />;
    }

    return (
        <>
            {tableJsx}
            <div className={css.bottomTable}>
                <Button label='+ Add' accent='blue' clickHandler={addNew} />
            </div>
            <Modal
                title={selectedRoute ? `Modifier une route` : `Ajouter une route`}
                show={showModal}
                close={() => setShowModal(false)}>
                <RouteForm
                    save={saveRoute}
                    cancel={() => setShowModal(false)}
                    route={selectedRoute}
                    items={items}
                />
            </Modal>
        </>
    );
};

export default RoutesTable;
