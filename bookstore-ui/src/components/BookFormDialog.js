import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const BookFormDialog = ({ open, handleClose, handleSave, initialData }) => {
    const [book, setBook] = useState({ title: '', author: '', isbn: '', price: '', stockQuantity: '', imageUrl: '', description: '' });

    useEffect(() => {
        if (initialData) {
            setBook(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{initialData ? 'Edit Book' : 'Add Book'}</DialogTitle>
            <DialogContent>
                <TextField label="Title" name="title" value={book.title} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Author" name="author" value={book.author} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="ISBN" name="isbn" value={book.isbn} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Price" name="price" value={book.price} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Stock Quantity" name="stockQuantity" value={book.stockQuantity} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Image URL" name="imageUrl" value={book.imageUrl} onChange={handleChange} fullWidth margin="dense"/>
                <TextField label="Description" name="description" value={book.description} onChange={handleChange} fullWidth margin="dense" multiline rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSave(book)} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookFormDialog;
