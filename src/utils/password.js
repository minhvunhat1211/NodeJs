const bcrypt = require("bcryptjs")

const SALT_ROUNDS = 10

module.exports.matchPassword = (hash,password) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare(password,hash,(err,same) => {
            if(err)
                return reject(err)
            resolve(same)
        })
    })
}

//TESTING
/* async function test() {
    const pass = 'asdf'
    const hash = await hashPassword(pass)
    console.log("HASH:",hash); 
    const match = await matchPassword(hash,'asdf')
    console.log("Password matches:",match);
}

test(); */