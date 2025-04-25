import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import {getUserRole, isAuthenticated} from "../services/authService";

const BookCard = ({ book }) => {
    const {addToCart} = useCart();
    const isAdmin = getUserRole() === 'ADMIN';

    return (
        <Card sx={{maxWidth: 250}}>
            <CardMedia
                component="img"
                height="300"
                image={book.imageUrl || 'https://via.placeholder.com/150'}
                alt={book.title}
            />
            <CardContent>
                <Typography variant="h6" component="div" noWrap>{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">by {book.author}</Typography>
                <Typography variant="subtitle1" sx={{mt: 1}}>{book.price} ₴</Typography>
            </CardContent>
            {isAuthenticated() && !isAdmin && (
                <CardActions>
                    <Button size="small" variant="contained" onClick={() => addToCart(book)}>Add to Cart</Button>
                </CardActions>
            )}
        </Card>
    );
};

export default BookCard;
