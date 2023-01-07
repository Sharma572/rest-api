import Joi from "joi"
import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import bcrypt from 'bcrypt'
import JwtService from "../../services/JwtService";

const logInController = {
    async login(req,res,next){

        // Validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        const { error } = loginSchema.validate(req.body);
        if(error){
        return next(error)
        }
        try{
            const user = await User.findOne({email: req.body.email})
        
            if(!user){
             return next(CustomErrorHandler.wrongCredentials())
            }
            // Compare The Password
            const match = await bcrypt.compare(req.body.password, user.password);
            if(!match){
                return next(CustomErrorHandler.wrongCredentials())
            }

            // Token
            const access_token = JwtService.sign({_id: user.id, role: user.role})
        
            res.json((access_token))

        }catch(err){
         return next(err)
        }

        
    }
}

export default logInController