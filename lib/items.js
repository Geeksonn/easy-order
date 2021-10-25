import axios from 'axios';

const getItems = async () => {
    const items = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/items');

    return items.data;
}

export { getItems };