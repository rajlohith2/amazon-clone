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
const mongodbUrl = config.MONGODB_URL;

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
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'/frontend/build/index.html'));
})

app.get('/api/config/paypal', (req, res)=>{
    return res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});


app.listen(5000,()=> { console.log(`Server started at https:localhost:5000`) });
