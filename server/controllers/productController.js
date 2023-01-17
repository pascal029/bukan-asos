const {Product, User, Category, History} = require('../models')


class ProductController {
    static async products(req,res,next){
        try {
            
            const products =  await Product.findAll({include : {model : User, attributes :['username', 'email', 'id','role']}})
            if(!products){
                throw {name : `Data not found`}
            }
            const user =  {
                id : req.user.id,
                role : req.user.role
            }
            res.status(200).json({products, user})
        } catch (error) {
            next(error)
        }
        
    }

    static async addProducts(req,res,next){
        try {
            const {name, description,price, stock,imgUrl,categoryId} = req.body
            const {username} = req.user
            const {id} = req.user
            const productAdded = await Product.create({
                name, description,price, stock,imgUrl,categoryId,authorId : id
            })
            await History.create({name : `POST`, description : `new entity with id ${productAdded.id} created`, updatedBy : username})
            res.status(201).json(productAdded)
        } catch (error) { 
            next(error)            
        }
    }
    static async histories(req,res,next){
        try {
            const histories = await History.findAll({order : [['createdAt', 'DESC']]})
            if(!histories){
                throw {name : `Data not found`}
            }

            res.status(200).json(histories)
        } catch (error) {
            next(error)
        }
    }

    static async product(req,res,next){
        try {
            const {id} = req.params
            const product = await Product.findByPk(+id)
            if(product == null){
                throw {name : `Data not found`}
            } 
            
            res.status(200).json(product)    
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req,res,next){
        try {
            const {id} = req.params
            const product = await Product.findByPk(+id)
            const deletedProduct = await Product.destroy({
                where : {id : +id}
            })
            
            if(product == null){
                throw {name : `Data not found`}
            } 
            res.status(200).json({message : `${product.name} success to delete`})
        } catch (error) {
            next(error)            
        }
    }

    static async categories(req,res,next){
        try {
            const categories = await Category.findAll()
            if(!categories){
                throw {name : 'Data not found'}
            }

            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    static async addCategory(req,res,next){
        try {
            const {name} = req.body
            await Category.create({name})

            res.status(201).json({message : `Success to add Category`})
        } catch (error) {
            next(error)
        }
    }
    static async deleteCategory(req,res,next){
        try {
            const {id} = req.params
            await Category.destroy({where : {id}})
            res.status(200).json({message : `Success to delete`})
        } catch (error) {
            next(error)
        }
    }

    static async editStatus(req,res,next){
        try {
            const statusEdit = req.body.status
            const username = req.user.username
            const id = req.params.id
            const edit = await Product.findByPk(id)
            if(!edit){
                throw {name : `Data not found`}
            }
            await Product.update({status : statusEdit}, {where : {id}})
            const description = `entity with id ${edit.id} status has been updated from ${edit.status} to ${statusEdit}`
            await History.create({name : `PATCH`, description , updatedBy : username})
            res.status(200).json({message : description})
        } catch (error) {
            next(error)
        }
    }

    static async editAll(req,res,next){
        try {
            const {name, description,price, stock,imgUrl,categoryId} = req.body
            const id = req.params.id
            const {username} = req.user
            const isValid = await Product.findByPk(id)
            if(isValid == null){
                throw {name : `Data not found`}
            }
            const editedProduct = await Product.update({name, description,price, stock,imgUrl,categoryId, updatedAt : new Date()}, {where : {id : req.params.id}})
            
            await History.create({name : 'PUT', description : `entity with id ${isValid.id} updated`, updatedBy : username})
            res.status(200).json({message : `Success to edit`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController