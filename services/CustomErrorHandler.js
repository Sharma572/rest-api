class CustomErrorHandler extends Error {
    constructor(status,msg){
      super();
     this.status = status;
     this.message = msg;
 
    }
    static alreadyExist(message){
      return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message = "Username or Password is Invalid"){
      return new CustomErrorHandler(401, message);
    }

    static unAuthorized(message = "UnAuthorized"){
      return new CustomErrorHandler(401, message);
    }
    static notFound(message = "Not Found"){
      return new CustomErrorHandler(404, message);
    }
}

export default CustomErrorHandler