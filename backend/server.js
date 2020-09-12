import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import route from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
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

app.use('/api/users/', route);
app.use('/api/products', productRoutes);



app.listen(5000,()=> { console.log(`Server started at https:localhost:5000`) });
