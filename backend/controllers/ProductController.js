 const createProduct = async (req, res) => {
    const {
        name, 
        brand, 
        image, 
        price, 
        category, 
        countInStock, 
        description, 
         } = req.body;
    
        const product = new Product({
            name, 
            brand, 
            image, 
            price, 
            category, 
            countInStock, 
            description,  
        });
    const newProduct = await product.save();
    if(newProduct) {
        return res.status(201).send({
                msg: 'New product is created',
                data: newProduct
            });
    }
    return res.status(500).send({msg: 'Error in creating Product'});
}
export {createProduct};