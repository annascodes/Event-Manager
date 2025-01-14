export const errHandler = (statusCode, message)=>{
    const error = new Error();
    // console.log(`<${statusCode}-${message}>`)
    error.statusCode = statusCode;
    error.message = message;
    return error;
}