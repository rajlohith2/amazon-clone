import multer from 'multer';
import express from 'express';

const uploadRoute = express.Router();
const storage = multer.diskStorage({
    destination(req, file, cb){ //cb = call back funtion
        cb(null, 'uploads/');
    },
    filename(req, file, cb){
        cb(null,`${Date.now()}.jpg`);
    },
});
 const upload = multer({ storage });
uploadRoute.post('/', upload.single('imageFile'), (req, res) => {
  
    return res.send(`/${req.file.path}`);
});
export default uploadRoute;