import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './util/config';
import mongoose from 'mongoose';
import route from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import bodyParser from 'body-parser';
import orderRouter from './routes/orderRouter';
import uploadRoute from './routes/uploadRouter';
import path from 'path';

dotenv.config();
const mongodbUrl = 'mongodb+srv://jz:amazona12@cluster0.mmjph.mongodb.net/amazona?retryWrites=true&w=majority'
// const mongodbUrl = config.MONGODB_URL;


mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use('/api/uploads', uploadRoute);
app.use('/api/users', route);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));
app.get('/api/config/paypal', (req, res)=>{
    return res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res)=>res.status(200).send(process.env.GOOGLE_MAP_API_KEY || ''));


app.listen(config.PORT,()=> { console.log(`Server started at ${3000} DB connection is ${mongodbUrl}`) });
