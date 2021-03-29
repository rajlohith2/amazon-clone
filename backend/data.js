
import  bcrypt  from "bcrypt";

const data = null;
try {
    data ={
        users: [
            {
                name: 'Janvier',
                email: 'janvier@example.net',
                password: bcrypt.hashSync('1234', 8),
                isAdmin: true,
                isSeller: true,
                seller: {
                    name: 'adidas',
                    logo: '/images/logo1.png',
                    description: 'best seller',
                    rating: 4.5,
                    numReviews: 120
                }
            },
            { 
                name: 'John',
                email:'someuser@gmail.com',
                password: bcrypt.hashSync('1234'),
                isAdmin: false
            }
        ],
        products: [
            {
                _id: 1,
                name: 'slim shirt',
                category: 'shirts',
                image: '/images/d1.jpg',
                price: 30,
                brand: 'Nike',
                rating: '3',
                numReviews: 10,
                numInStock: 3,
            },
            {
                _id: 2,
                name:'Fit Pant',
                category: 'Pants',
                image: '/images/d2.jpg',
                price: 60,
                brand: 'Nike',
                rating: '3',
                numReviews: 1,
                numInStock: 5,
    
        }, 
        {
            _id: 3,
            name: 'Best T-shirts',
            category: 'T-shirt',
            image: '/images/d3.jpg',
            price: 14,
            brand: 'Nike',
            rating: '3',
            numReviews: 15,
            numInStock: 12,
    
        }
    
        ]
    }
} catch (error) {
    console.log(error.message)
}

export default data;