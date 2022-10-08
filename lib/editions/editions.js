import { REALM_GRAPHQL_ENDPOINT, generateHeaders } from '@lib/realmClient';
import * as queries from './queries';

const listEditions = async () => {
    try {
        const options = {
            method: 'POST',
            headers: await generateHeaders(),
            body: JSON.stringify({
                query: queries.LIST_EDITIONS,
                variables: {
                    sort: 'NAME_ASC',
                },
            }),
        };

        const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
        const result = await response.json();

        return result.data.editions;
    } catch (error) {
        return { error: error };
    }
};

const activateEdition = async (edition) => {
    // Step 1: deactivate all editions
    try {
        const options = {
            method: 'POST',
            headers: await generateHeaders(),
            body: JSON.stringify({
                query: queries.UPDATE_ALL_EDITIONS,
                variables: {
                    set: {
                        active: false,
                    },
                },
            }),
        };

        const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
        const result = await response.json();
    } catch (error) {
        return { error: error };
    }

    // Step 2: activate the concerned edition
    try {
        const options = {
            method: 'POST',
            headers: await generateHeaders(),
            body: JSON.stringify({
                query: queries.UPDATE_EDITION,
                variables: {
                    query: { _id: edition._id },
                    set: { active: true },
                },
            }),
        };

        const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
        const result = await response.json();

        return result.data.edition;
    } catch (error) {
        return { error: error };
    }
};

const deleteEdition = async (edition) => {
    try {
        const options = {
            method: 'POST',
            headers: await generateHeaders(),
            body: JSON.stringify({
                query: queries.DELETE_EDITION,
                variables: {
                    query: { _id: edition._id },
                },
            }),
        };

        const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
        const result = await response.json();

        return result.data.edition;
    } catch (error) {
        return { error: error };
    }
};

export { listEditions, activateEdition, deleteEdition };
