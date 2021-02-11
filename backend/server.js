import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './util/config';
import mongoose from 'mongoose';
import route from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import bodyParser from 'body-parser';
import orderRouter from './routes/orderRouter';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use('/api/users', route);
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res)=>{
    return res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.listen(5000,()=> { console.log(`Server started at https:localhost:5000`) });
