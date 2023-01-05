// // A npm library for validation. 
// import Joi from "joi";
// import {User} from '../../models'
// import CustomErrorHandler from "../../services/CustomErrorHandler";
// const registerController = {
//  async register(req, res, next) {
//     // CHECKLIST

//     //[1] validate the request
//     //[2] authorise the request
//     //[3] check if user is in the database already
//     //[4] prepare-model
//     //[5] store-in-database
//     //[6] generate jwt token
//     //[7] send-response

//     // Validation
//     const registerSchema = Joi.object({
//       name: Joi.string().min(3).max(30).required(),
//       email: Joi.string().email().required(),
//       password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
//       repeat_password: Joi.ref("password"),
//     });

//     console.log(req.body);

//     // Joi will going to validate schema.
//     const {error} = registerSchema.validate(req.body)

//     if(error){
//         return next(error)
//     }

//     //   Check user is already register in database.
// try {
//   const exist = await User.exist({email: req.body.email});
//   if(exist){
//    return next(CustomErrorHandler.alreadyExist("This Email is already taken"))
//   }
// } catch (err) {
//   return next(err)
// }

//     res.json({ msg: "Hello From Express" });
//   },
// };
// export default registerController;

import Joi from 'joi';
import { User } from '../../models';
import bcrypt from 'bcrypt'
import CustomErrorHandler from '../../services/CustomErrorHandler';

const registerController = {
    async register(req, res, next) {
    // CHECKLIST
    // [ ] validate the request
    // [ ] authorize the request
    // [ ] check if user is in the database already
    // [ ] prepare model
    // [ ] store in database
    // [ ] generate jwt token
    // [ ] send response

        // Validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        console.log(req.body);
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
    // check if user is in the database already
    try {
        const exist = await User.exists({ email: req.body.email });
        if (exist) {
            return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
        }
    } catch(err) {
        return next(err);
    }
    
   // Hash Password
   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   const {name,email,password} = req.body
   // prepare the model
   const user = {
     name,
     email,
     password: hashedPassword
   }
   try {
    const result = await User.bulkSave();
   
    // Token 
    
    
  } catch (err) {
    return next(err)
   }
    
        res.json({ msg: "Hello From Express" });
    }
}


export default registerController;