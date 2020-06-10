

//Custom middleware to extract token
const getToken = (request, response, next) =>{

    const authorization = request.get('authorization')
  
    if(authorization){
  
      request.token =authorization;
  
    } 
  
    next()
  
  }
  
  


module.exports = {
  getToken
}