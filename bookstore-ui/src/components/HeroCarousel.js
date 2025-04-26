import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const slides = [
    {
        title: 'Весняний розпродаж книг!',
        subtitle: 'Знижки до 50% на найкращі бестселери',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f'
    },
    {
        title: 'Новинки літератури 2024',
        subtitle: 'Поповни свою бібліотеку сучасними творами',
        image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc'
    },
    {
        title: 'Класика завжди в моді',
        subtitle: 'Обери книги, що пережили століття',
        image: 'https://i.etsystatic.com/23719212/r/il/fb0389/2660290993/il_1588xN.2660290993_tiza.jpg'
    }
];

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                zIndex: 2,
                color: '#fff',
                bgcolor: 'rgba(0,0,0,0.3)',
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
            }}
        >
            <ArrowForwardIosIcon sx={{ ml: '2px' }} />
        </IconButton>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                zIndex: 2,
                color: '#fff',
                bgcolor: 'rgba(0,0,0,0.3)',
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
            }}
        >
            <ArrowBackIosIcon sx={{ ml: '8px' }} />
        </IconButton>
    );
};

const HeroCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const handleScroll = () => {
        const element = document.getElementById('catalog');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box sx={{ mb: 4, position: 'relative' }}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            height: 300,
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative'
                        }}
                    >
                        <Box sx={{ bgcolor: 'rgba(0,0,0,0.5)', p: 2, borderRadius: 2 }}>
                            <Typography variant="h3">{slide.title}</Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>{slide.subtitle}</Typography>
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
                ))}
            </Slider>
        </Box>
    );
};

export default HeroCarousel;
