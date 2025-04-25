import api from './api';

export const getBooks = async (search, sort, direction, page, size) => {
    const response = await api.get('/books', {
        params: { search, sort, direction, page, size }
    });
    return response.data;
};

export const addBook = async (book) => {
    return await api.post('/books', book);
};

export const updateBook = async (id, book) => {
    return await api.put(`/books/${id}`, book);
};

export const deleteBook = async (id) => {
    return await api.delete(`/books/${id}`);
};
