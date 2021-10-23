import axios from 'axios';

const getItems = async () => {
    const items = await axios.get('http://localhost:3000/api/items');

    return items.data;
}

export { getItems };