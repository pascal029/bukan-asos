const {Product} = require('../models')

const authorization = async (req,res,next) => {
    try {
        
        const {id} = req.params
        const {role} = req.user
        const product = await Product.findByPk(id)

        if(!product){
            throw{name : `Data not found`}
        }
        if(role == `staff`){
            if(req.user.id != product.authorId){
                throw{name : `Forbidden`}
            }
        } 
        next()
    } catch (error) {
        next(error)
    }
} 

const patchAuthorization = async(req,res,next) => {
    try {
        const {role} = req.user
        if(role != `admin`){
            throw{name : `Forbidden`}
        }
        next()
    } catch (error) {
        next(error)
    }
}

const clientAuthorization = async(req,res,next) =>{
    try {
        const {role} = req.user
        if(role != 'client'){
            throw{name : `Forbidden`}
        }
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = {authorization, patchAuthorization, clientAuthorization}