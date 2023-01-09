import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req, res, next) => {
    // Get token form headers 
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized())
    }
    // authHeader contains bearer and token we use split to get token.
    const token = authHeader.split(' ')[1]
    // console.log(token);
    try {
        const {_id,role} = await JwtService.verify(token);
        const user = {
            _id,
            role
        }
        req.user = user;
        next();

    } catch (error) {
        return next(CustomErrorHandler.unAuthorized()) 
    }
}
export default auth; 