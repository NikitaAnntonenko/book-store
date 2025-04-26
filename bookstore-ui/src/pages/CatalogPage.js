import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TablePagination,
    TextField
} from '@mui/material';
import {getBooks} from '../services/bookService';
import BookCard from '../components/BookCard';
import HeroCarousel from "../components/HeroCarousel";
import CatalogSidebar from "../components/CatalogSidebar";
import SearchIcon from '@mui/icons-material/Search';

const CatalogPage = () => {
    const [books, setBooks] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [sortField, setSortField] = useState('');
    const [filters, setFilters] = useState({});

    useEffect(() => {
        loadBooks();
    }, [page, rowsPerPage, sortField, filters]);

    const loadBooks = async () => {
        const data = await getBooks(search, sortField, 'asc', page, rowsPerPage);
        setBooks(data.content);
        setTotalElements(data.totalElements);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <Container id="rootCatalog" maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 12 } }} >
            <HeroCarousel />

            <Box id="catalog" sx={{ display: 'flex', gap: 3 }}>
                {/* Sidebar */}
                <Box sx={{ width: '250px', flexShrink: 0 }}>
                    <CatalogSidebar onFilterChange={handleFilterChange} />
                </Box>

                {/* Main Content */}
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <TextField
                            label="Пошук"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') loadBooks(); }}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={loadBooks}
                            sx={{ minWidth: '56px', px: 2 }}
                        >
                            <SearchIcon />
                        </Button>
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortField}
                                label="Sort By"
                                onChange={(e) => setSortField(e.target.value)}
                            >
                                <MenuItem value="title">Title</MenuItem>
                                <MenuItem value="price">Price</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Grid container spacing={3}>
                        {books.map(book => (
                            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ position: 'relative', height: 450 }}>
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
            </Box>
        </Container>
    );
};

export default CatalogPage;
