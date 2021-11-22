import axios from 'axios';

const addOrder = async (token, order) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/orders';
    const header = { Authorization: 'Bearer ' + token };
    await axios.post(url, order, { headers: header });
}

export { addOrder };