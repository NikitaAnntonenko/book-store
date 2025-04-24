import api from './api';

export const getAllBooks = async () => {
    const response = await api.get('/books');
    return response.data;
};
