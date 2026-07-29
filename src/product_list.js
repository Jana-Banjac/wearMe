import buttonsImg from './assets/buttons.jpg';
import converseImg from './assets/converse.jpg';
import dressImg from './assets/dress.jpg';
import jeansImg from './assets/jeans.jpg';
import longsleeveImg from './assets/longsleeve.jpg';
import pantsImg from './assets/pants.jpg';
import sandalsImg from './assets/sandals.jpg';
import shortsImg from './assets/shorts.jpg';
import shortsleeveImg from './assets/shortsleeve.jpg';
import slipdressImg from './assets/brown dress.jpg';
import denimskirtImg from './assets/denim skirt.jpg';
import skirtImg from './assets/skirt.jpg';

const products = [
    {
        _id: '1',
        name: 'Denim Shorts',
        image: shortsImg,
        description:
            'Comfortable denim shorts perfect for summer. Made from high-quality denim material, these shorts are designed to provide a stylish and relaxed fit.',
        category: 'Bottoms',
        price: 25.00,
        countInStock: 29,
        rating: 5.0,
        numReviews: 129,
    },
    {
        _id: '2',
        name: 'Jeans',
        image: jeansImg,
        description:
            'Trendy jeans with a modern fit. These jeans are made from durable denim fabric and feature a classic design that can be dressed up or down.',
        category: 'Bottoms',
        price: 35.00,
        countInStock: 37,
        rating: 4.5,
        numReviews: 183,
    },
    {
        _id: '3',
        name: 'Pants',
        image: pantsImg,
        description:
            'Pants suitable for any occasion. Made from comfortable and breathable fabric, these pants are perfect for both casual and formal wear.',
        category: 'Bottoms',
        price: 40.00,
        countInStock: 35,
        rating: 4.8,
        numReviews: 231,
    },
    {
        _id: '4',
        name: 'Long Sleeve Shirt',
        image: longsleeveImg,
        description:
            'This long sleeve shirt is perfect for cooler weather. Made from soft and warm fabric, it provides comfort and style for any occasion.',
        category: 'Tops',
        price: 20.00,
        countInStock: 51,
        rating: 5,
        numReviews: 452,
    },
    {
        _id: '5',
        name: 'Short Sleeve Shirt',
        image: shortsleeveImg,
        description:
            'A classic short sleeve shirt that is perfect for everyday wear. Made from lightweight and breathable fabric, it offers comfort and style for any occasion.',
        category: 'Tops',
        price: 15.00,
        countInStock: 78,
        rating: 4.9,
        numReviews: 387,
    },
    {
        _id: '6',
        name: 'Button-Up Shirt',
        image: buttonsImg,
        description:
            'This stylish button-up shirt is perfect for both casual and formal occasions. Made from high-quality fabric, it offers a comfortable fit and a polished look.',
        category: 'Tops',
        price: 35.00,
        countInStock: 117,
        rating: 4.4,
        numReviews: 212,
    },
    {
        _id: '7',
        name: 'Black Converse',
        image: converseImg,
        description:
            'These sneakers are a must-have for any casual wardrobe. Made from durable materials, they provide comfort and style for everyday wear.',
        category: 'Shoes',
        price: 70.00,
        countInStock: 63,
        rating: 4.2,
        numReviews: 243,
    },
    {
        _id: '8',
        name: 'Sandals',
        image: sandalsImg,
        description:
            'These sandals are perfect for spring and summer. Made from comfortable materials, they provide a stylish and breathable option for warm weather.',
        category: 'Shoes',
        price: 100.00,
        countInStock: 9,
        rating: 4,
        numReviews: 117,
    },
    {
        _id: '9',
        name: 'Dress',
        image: dressImg,
        description:
            'This casual dress is a perfect choice for a day out. Made from lightweight and breathable fabric, it offers comfort and style for any casual occasion.',
        category: 'Skirts and Dresses',
        price: 60.00,
        countInStock: 87,
        rating: 4.7,
        numReviews: 129,
    },
    {
        _id: '10',
        name: 'Slip-On Dress',
        image: slipdressImg,
        description:
            'This dress is perfect for dressing it up or down. Made from luxurious fabric, it offers a chic look.',
        category: 'Skirts and Dresses',
        price: 75.00,
        countInStock: 13,
        rating: 4.4,
        numReviews: 228,
    },
    {
        _id: '11',
        name: 'Denim Skirt',
        image: denimskirtImg,
        description:
            'This denim skirt is a perfect choice for a night out. Made from high-quality denim, it offers comfort and style for any casual occasion.',
        category: 'Dresses',
        price: 32.00,
        countInStock: 70,
        rating: 4.8,
        numReviews: 123,
    },
    {
        _id: '12',
        name: 'Skirt',
        image: skirtImg,
        description:
            'This bold skirt is perfect for bold and cool outfits. Made from durable fabric, it offers comfort and style for any casual occasion.',
        category: 'Skirts and Dresses',
        price: 37.00,
        countInStock: 57,
        rating: 4.8,
        numReviews: 159,
    },
]

export default products