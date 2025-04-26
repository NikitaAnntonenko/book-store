import React, { useState } from 'react';
import { Paper, Typography, Slider, Button, Checkbox, FormControlLabel } from '@mui/material';

const authorsList = ['Джордж Орвелл', 'Джоан Роулінг', 'Ернест Хемінгуей', 'Френсіс Фіцджеральд'];

const CatalogSidebar = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState([100, 500]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        triggerFilterChange(newValue, selectedAuthors);
    };

    const handleAuthorChange = (author) => {
        const updatedAuthors = selectedAuthors.includes(author)
            ? selectedAuthors.filter(a => a !== author)
            : [...selectedAuthors, author];

        setSelectedAuthors(updatedAuthors);
        triggerFilterChange(priceRange, updatedAuthors);
    };

    const clearFilters = () => {
        setPriceRange([100, 500]);
        setSelectedAuthors([]);
        triggerFilterChange([100, 500], []);
    };

    const triggerFilterChange = (price, authors) => {
        onFilterChange({ priceRange: price, authors });
    };

    return (
        <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>Фільтри</Typography>

            <Typography gutterBottom>Ціна (₴)</Typography>
            <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
            />

            <Typography sx={{ mt: 2 }}>Автори</Typography>
            {authorsList.map(author => (
                <FormControlLabel
                    key={author}
                    control={
                        <Checkbox
                            checked={selectedAuthors.includes(author)}
                            onChange={() => handleAuthorChange(author)}
                        />
                    }
                    label={author}
                />
            ))}

            <Button variant="outlined" fullWidth sx={{ mt: 3 }} onClick={clearFilters}>
                Очистити фільтри
            </Button>
        </Paper>
    );
};

export default CatalogSidebar;
