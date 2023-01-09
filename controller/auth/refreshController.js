import Joi from "joi";
import { REFRESH_TOKEN } from "../../config";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";

const refreshController = {
    async refresh(req,res,next){
    //   Validation
    const refreshSchema = Joi.object({
        refresh_token: Joi.string().required(),
    })

    const { error } = refreshSchema.validate(req.body);
    if(error){
        return next(error)
    }

    // Database
  let refreshToken;
    try {
       refreshToken = await RefreshToken.findOne({token: req.body.refresh_token})
      
       if(!refreshToken){
        return next(CustomErrorHandler.unAuthorized('Invalid refresh token'))
       }
       let userId;
       try {
        const {_id} = await JwtService.verify(refreshToken, REFRESH_TOKEN)
       userId = _id;  
    } catch (error) {
        return next();
       }

       const user = await User.findOne({_id:userId});
       if(!user){
        return next(CustomErrorHandler.unAuthorized('No User Found'));
       }

         // Token
         const access_token = JwtService.sign({_id: user.id, role: user.role})
         const refresh_token = JwtService.sign({_id: user.id, role: user.role},'1y', REFRESH_TOKEN)
 
         // database whitelist
         await RefreshToken.create({token: refresh_token})
         res.json((access_token, refresh_token))

       
    } catch (error) {
        return next(new Error('Something went Wong' + error.message))
    }
    }
}
export default refreshController