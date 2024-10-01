import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('/api/');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};