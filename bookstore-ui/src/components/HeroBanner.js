import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const HeroBanner = () => {
    const handleScroll = () => {
        const element = document.getElementById('catalog');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box
            sx={{
                height: 300,
                backgroundImage: 'url(https://images.unsplash.com/photo-1512820790803-83ca734da794)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                mb: 4,
                position: 'relative'
            }}
        >
            <Box sx={{ bgcolor: 'rgba(0,0,0,0.5)', p: 2, borderRadius: 2 }}>
                <Typography variant="h3" component="h1">
                    Відкрий світ книжок з Book Shop
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Знижки на бестселери та новинки сезону
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3 }}
                    onClick={handleScroll}
                    endIcon={<ArrowDownwardIcon />}
                >
                    До каталогу
                </Button>
            </Box>
        </Box>
    );
};

export default HeroBanner;
