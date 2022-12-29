// A npm library for validation. 
import Joi from "joi";
const registerControler = {
 async register(req, res, next) {
    // CHECKLIST

    //[1] validate the request
    //[2] authorise the request
    //[3] check if user is in the database already
    //[4] prepare-model
    //[5] store-in-database
    //[6] generate jwt token
    //[7] send-response

    // Validation
    const regiterSchema = joi.object({
      name: Joi.string.min(3).max(30).required(),
      email: Joi.string().email().required() ,
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3-30}$')).required(),
      repeat_password: Joi.ref('password'),
    });

    // Joi will going to validate schema.
    const {error} = regiterSchema.validate(req.body)

    if(error){
        return next(error)
    }

    res.json({ msg: "Hello From Express" });
  },
};
export default registerControler;
