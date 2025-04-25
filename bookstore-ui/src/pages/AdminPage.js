import React, { useEffect, useState } from 'react';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Box, TableSortLabel, Dialog, DialogTitle, DialogActions, Snackbar, Alert } from '@mui/material';
import { getBooks, deleteBook, addBook, updateBook } from '../services/bookService';
import BookFormDialog from '../components/BookFormDialog';
import { getUserRole } from '../services/authService';

const AdminPage = () => {
    const [books, setBooks] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const isAdmin = getUserRole() === 'ADMIN';

    const loadBooks = async () => {
        const data = await getBooks(search, sortField, sortDirection, page, rowsPerPage);
        setBooks(data.content);
        setTotalElements(data.totalElements);
    };

    useEffect(() => {
        loadBooks();
    }, [page, rowsPerPage, sortField, sortDirection]);



    const handleSort = (field) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const handleSave = async (book) => {
        if (book.id) {
            await updateBook(book.id, book);
            setSnackbarMessage('Book updated successfully');
        } else {
            await addBook(book);
            setSnackbarMessage('Book added successfully');
        }
        setSnackbarOpen(true);
        setOpenDialog(false);
        loadBooks();
    };

    const handleDeleteClick = (book) => {
        setBookToDelete(book);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        await deleteBook(bookToDelete.id);
        setSnackbarMessage(`Book "${bookToDelete.title}" deleted successfully`);
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
        loadBooks();
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <TextField
                    label="Search by title or author"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') { setPage(0); loadBooks(); } }}
                />
                {isAdmin && (
                    <Button variant="contained" onClick={() => { setSelectedBook(null); setOpenDialog(true); }}>
                        Add Book
                    </Button>
                )}
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sortField === 'title'}
                                direction={sortField === 'title' ? sortDirection : 'asc'}
                                onClick={() => handleSort('title')}
                            >
                                Title
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortField === 'author'}
                                direction={sortField === 'author' ? sortDirection : 'asc'}
                                onClick={() => handleSort('author')}
                            >
                                Author
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortField === 'price'}
                                direction={sortField === 'price' ? sortDirection : 'asc'}
                                onClick={() => handleSort('price')}
                            >
                                Price
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Stock</TableCell>
                        {isAdmin && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map(book => (
                        <TableRow key={book.id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.imageUrl && <img src={book.imageUrl} alt={book.title} width="50" />}</TableCell>
                            <TableCell>{book.price} $</TableCell>
                            <TableCell>{book.stock_quantity}</TableCell>
                            {isAdmin && (
                                <TableCell>
                                    <Button size="small" onClick={() => { setSelectedBook(book); setOpenDialog(true); }}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => handleDeleteClick(book)}>Delete</Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={totalElements}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            />

            <BookFormDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleSave={handleSave}
                initialData={selectedBook}
            />

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Are you sure you want to delete "{bookToDelete?.title}"?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button color="error" onClick={confirmDelete}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AdminPage;
