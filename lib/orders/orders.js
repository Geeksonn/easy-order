import { REALM_GRAPHQL_ENDPOINT, generateHeaders } from '@lib/realmClient';
import * as queries from './queries';

const listOrders = async (query) => {
    try {
        const options = {
            method: 'POST',
            headers: await generateHeaders(),
            body: JSON.stringify({
                query: queries.LIST_ORDERS,
                variables: {
                    sort: 'DATE_ASC',
                    query: query
                },
            }),
        };

        const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
        const result = await response.json();

        return result.data.orders;
    } catch (error) {
        return { error: error };
    }
};

const createOrder = async (order) => {
    try {
        const options = {
            method: 'POST',
            headers: await generateHeaders(),
            body: JSON.stringify({
                query: queries.ADD_ORDER,
                variables: {
                    input: order,
                },
            }),
        };

        const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
        const result = await response.json();

        return result.data.addedOrder;
    } catch (error) {
        return { error: error };
    }
};

export { listOrders, createOrder };
