import axios from 'axios';

const addOrder = async (order) => {
    await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/orders', order);
}

export { addOrder };