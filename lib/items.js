import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/items';

const getItems = async (token) => {
    const header = { Authorization: 'Bearer ' + token };
    const items = await axios.get(URL, { headers: header });

    return items.data;
};

const putItems = async (token, items) => {
    const header = { Authorization: 'Bearer ' + token };
    if (!Array.isArray(items)) {
        items = [items];
    }
    const res = await axios.post(URL, items, { headers: header });

    return res.data.insertedIds;
};

const deleteItem = async (token, itemID) => {
    const header = { Authorization: 'Bearer ' + token };
    const res = await axios.delete(URL, { headers: header, data: {itemID} });

    return res.status === 200;
}

export { getItems, putItems, deleteItem };
