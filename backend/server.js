import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import route from './routes/userRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use('/api/users/', route)

app.get('/api/products',(req, res)=>{
    return res.send(data.products);
});
app.get('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find( product => product._id === parseInt(productId));
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({msg: 'Product Not Found..'});
    }
});
app.listen(5000,()=> { console.log(`Server started at https:localhost:5000`) });
