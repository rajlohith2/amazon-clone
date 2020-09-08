import express from 'express';
import data from './data';

const app = express();

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
