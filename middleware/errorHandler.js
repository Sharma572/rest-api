import { DEBUG_MODE } from '../config'
//  This will helps to thrwo error message joi
import { ValidationError } from "joi";
import CustomErrorHandler from '../services/CustomErrorHandler';

const errorHandler =(err, req, res, next)=>{
    // this error message for devloper phase
let statusCode = 500;
let data = {
  message: "Internal Server Error",
  ...(DEBUG_MODE === "true" && { originalError: err.message }),
};

if (err instanceof ValidationError) {
  //  Error code for validation
  statusCode = 422;

  data = {
    message: err.message,
  };

if(err instanceof CustomErrorHandler){
   statusCode = err.status;
   data = {
       message: err.message
}
}


  // this code check 1st status code 422 if get than our error message will be shown.
  return res.status(statusCode).json(data);
}

}
export default errorHandler;