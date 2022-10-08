import * as crypto from 'crypto';
import { UploadClient } from '@uploadcare/upload-client';
import { UploadcareAuthSchema, deleteFile } from '@uploadcare/rest-client';

import { REALM_GRAPHQL_ENDPOINT, generateHeaders } from '@lib/realmClient';
import * as queries from './queries';

const listItems = async (query) => {
    try {
        const options = {
            method: 'POST',
            headers: await generateHeaders(),
            body: JSON.stringify({
                query: queries.LIST_ITEMS,
                variables: {
                    query: query,
                    sort: 'NAME_ASC',
                },
            }),
        };

        const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
        const result = await response.json();

        return result.data.items;
    } catch (error) {
        return { error: error };
    }
};

const uploadImage = async (image) => {
    const secret = process.env.NEXT_PUBLIC_IMG_SECRET;
    const expire = Math.round(Date.now() / 1000) + 120;

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(expire.toString());
    const client = new UploadClient({
        publicKey: process.env.NEXT_PUBLIC_IMG_API_KEY,
        secureSignature: hmac.digest('hex'),
        secureExpire: expire,
    });

    // TODO Error management
    return await client.uploadFile(image);
};

const createItem = async (item) => {
    // Step 1: Upload image
    item.image = (await uploadImage(item.image)).uuid;

    // Step 2: Store item
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.ADD_ITEM,
            variables: {
                input: item,
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    return result.data.addedItem;
};

const deleteItem = async (item) => {
    // Step 1: Delete image
    const client = new UploadcareAuthSchema({
        publicKey: process.env.NEXT_PUBLIC_IMG_API_KEY,
        secretKey: process.env.NEXT_PUBLIC_IMG_SECRET,
    });
    const deleteResult = await deleteFile({ uuid: item.image }, { authSchema: client });
    // TODO Error management

    // Step 2: Remove item
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.DEL_ITEM,
            variables: {
                input: { _id: item._id },
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    return result.data.deletedItem;
};

const modifyItem = async (item) => {
    const options = {
        method: 'POST',
        headers: await generateHeaders(),
        body: JSON.stringify({
            query: queries.UPDATE_ITEM,
            variables: {
                query: { _id: item._id },
                set: {
                    name: item.name,
                    degree: item.degree,
                    ibu: item.ibu,
                    price: item.price,
                    description: item.description,
                },
            },
        }),
    };

    const response = await fetch(REALM_GRAPHQL_ENDPOINT, options);
    const result = await response.json();

    return result.data.updatedItem;
};

export { listItems, createItem, deleteItem, modifyItem };
