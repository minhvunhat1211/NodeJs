const {decode} = require('../utils/JWT')

module.exports.authByToken = async (req,res,next) => {
    
    //Check for Authorization header
    const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null
    if(!authHeader){
        return res.status(422).json({
            errors: { body: [ 'Authorization failed', 'No Authorization header' ] }
        })
    }

    //Check if authorization type is token
    if(authHeader[0] !== 'Bearer')
        return res.status(401).json({
            errors: { body: [ 'Authorization failed', 'Token missing' ] }
        })

    //Check if token is valid
    const token = authHeader[1];
    try{
        const user = await decode(token)
        if(!user) 
            throw new Error('No user found in token')
        req.user = user
        return next()
    }catch(e) {
        return res.status(401).json({
            errors: { body: [ 'Authorization failed', e.message ] }
        })
    }
        
}
module.exports.getuser = async (tokenUser) => {
    const authHeader = tokenUser ? tokenUser.split(' ') : null
    
    const token = authHeader[1];
    try{
        const user = await decode(token)
        if(!user) 
            throw new Error('No user found in token')
        return user
    }catch(e) {
        
    }
        
}