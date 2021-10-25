import axios from 'axios';

const getItems = async () => {
    const items = await axios.get(process.env.API_BASE_URL + '/api/items');

    return items.data;
}

export { getItems };