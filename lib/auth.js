import axios from 'axios';

const authenticate = async (authInfo) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/auth';
    const items = await axios.post(url, authInfo);

    return items.data;
}

export { authenticate };