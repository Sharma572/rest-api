import {Product} from "../models";
import multer from "multer";
import path from 'path'
import CustomErrorHandler from "../services/CustomErrorHandler";
import  fs  from "fs";

const storage = multer.diskStorage({
    destination: (req,file,cb)=> cb(null,'uploads/'),
    filename: (req,file,cb)=> {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
});

const handleMultipleData = multer({storage, limits: { fileSize: 100000 * 5 } }).single('image');


const productController ={
    async store(req,res,next){
    //  for image upload multipart form data

    handleMultipleData(req,res,(err)=>{
        console.log(req.file);
      if(err){
        return next(CustomErrorHandler.serverError())
      }
      const filePath = req.file.path;

       // Validation
       const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
    })

    const { error } = productSchema.validate(req.body);

    if(error){
    //  Delete the upload file
    fs.unlink(`${appRoot}/${filePath}`)
    }

    res.json({})
    })
}
}
export default productController;