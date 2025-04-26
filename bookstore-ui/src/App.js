import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from '@mui/material';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import {CartProvider} from "./context/CartContext";
import Header from "./components/Header";

function App() {
    return (
        <CartProvider>
            <Router>
                <Header />
                <Container maxWidth={false} sx={{mt: 4}}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/catalog" element={<CatalogPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/admin" element={
                            <PrivateRoute>
                                <AdminPage/>
                            </PrivateRoute>
                        }/>
                        <Route path="/cart" element={<CartPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                    </Routes>
                </Container>
            </Router>
        </CartProvider>
    );
}

export default App;