const createSuccess =(status = null , message = null , data = null ) =>{
    const successResponse = {
    message : message,
    status : status,
    data : data
    }

    return successResponse;
} 

module.exports = createSuccess; 