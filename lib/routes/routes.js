import { REALM_GRAPHQL_ENDPOINT, generateHeaders } from '@lib/realmClient';
import * as queries from './queries';

const listRoutes = async (query) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.LIST_ROUTES,
            variables: {
                query: query,
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    if (result.errors) {
        return { error: result.errors };
    } else {
        return result.data.routes;
    }
};

const addRoute = async (route) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.ADD_ROUTE,
            variables: {
                input: route,
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    if (result.errors) {
        return { error: result.errors };
    } else {
        return result.data.addedRoute;
    }
};

const deleteRoute = async (route) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.DEL_ROUTE,
            variables: {
                query: { _id: route._id },
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    if (result.errors) {
        return { error: result.errors };
    } else {
        return result.data.deletedRoute;
    }
};

const updateRoute = async (route) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.UPDATE_ROUTE,
            variables: {
                query: { _id: route._id },
                set: {
                    name: route.name,
                    beers: route.beers,
                    edition: route.edition,
                },
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    if (result.errors) {
        return { error: error };
    } else {
        return result.data.updatedRoute;
    }
};

export { listRoutes, addRoute, deleteRoute, updateRoute };
