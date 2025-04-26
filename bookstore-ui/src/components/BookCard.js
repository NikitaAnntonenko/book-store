import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { useCart } from '../context/CartContext';
import { getUserRole, isAuthenticated } from "../services/authService";

const BookCard = ({ book }) => {
    const { addToCart } = useCart();
    const isAdmin = getUserRole() === 'ADMIN';

    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: 1,
                '&:hover': {
                    zIndex: 10
                },
                '&:hover .expand-text': {
                    whiteSpace: 'normal'
                }
            }}
        >
            <Card
                sx={{
                    maxWidth: 250,
                    minHeight: 400,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    transformOrigin: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 6
                    }
                }}
            >
                <CardMedia
                    component="img"
                    height="300"
                    image={book.imageUrl || 'https://via.placeholder.com/150'}
                    alt={book.title}
                />
                <CardContent sx={{ p: 2 }}>
                    <Typography
                        variant="h6"
                        className="expand-text"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {book.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className="expand-text"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        by {book.author}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        className="expand-text"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            transition: 'all 0.3s ease',
                            mt: 1
                        }}
                    >
                        {book.price} ₴
                    </Typography>
                </CardContent>

                {isAuthenticated() && !isAdmin && (
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button size="small" variant="contained" onClick={() => addToCart(book)}>
                            Додати в кошик
                        </Button>
                    </CardActions>
                )}
            </Card>
        </Box>
    );
};

export default BookCard;
