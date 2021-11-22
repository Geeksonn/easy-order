import axios from 'axios';

const getItems = async (token) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/items';
    const header = { Authorization: 'Bearer ' + token };
    const items = await axios.get(url, { headers: header });

    return items.data;
}

export { getItems };