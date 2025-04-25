import React, { useEffect, useState } from 'react';
import { Grid, TextField, Box, TablePagination } from '@mui/material';
import { getBooks } from '../services/bookService';
import BookCard from '../components/BookCard';

const CatalogPage = () => {
    const [books, setBooks] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);  // Наприклад, 12 карток на сторінку

    useEffect(() => {
        loadBooks();
    }, [page, rowsPerPage]);

    const loadBooks = async () => {
        const data = await getBooks(search, 'title', 'asc', page, rowsPerPage);
        setBooks(data.content);
        setTotalElements(data.totalElements);
    };

    return (
        <Box sx={{ mt: 4, px: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <TextField
                    label="Search books"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') { setPage(0); loadBooks(); } }}
                    sx={{ width: '50%' }}
                />
            </Box>

            <Grid container spacing={3}>
                {books.map(book => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <TablePagination
                    component="div"
                    count={totalElements}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                    rowsPerPageOptions={[6, 12, 24]}
                />
            </Box>
        </Box>
    );
};

export default CatalogPage;
