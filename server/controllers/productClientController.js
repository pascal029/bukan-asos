const {Product, UserProduct} = require('../models')
const { Op } = require("sequelize")
const axios = require('axios')
const apiHappi = process.env.API_HAPPI

class ProductClientController {
    static async fetchPagination(req,res,next){
        try {
            let option = {where : {
                status : 'active'
            }}
            let {page, filterPriceMin, filterPriceMax} = req.query
            if(filterPriceMin && filterPriceMax){
                option.where.price = {
                    [Op.between] : [filterPriceMin, filterPriceMax]
                }
            } else if(filterPriceMin){
                option.where.price = {
                    [Op.gte] : filterPriceMin
                }
            } else if(filterPriceMax){
                option.where.price = {
                    [Op.lte] : filterPriceMax 
                }
            }

            if(!page && filterPriceMax || !page && filterPriceMin || !page && filterPriceMax && filterPriceMin){
                page = 1
            }

            if(page){
                option.limit = 8
                option.offset = 8 * page - 8
            }
            
            const products = await Product.findAndCountAll(option)


            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async wishlist (req,res,next){
        try {
            const UserId = req.user.id
            const wishlist = await UserProduct.findAll({ where : {UserId}, include :Product})
            res.status(200).json(wishlist)
        } catch (error) {
            next(error)
        }
    }

    static async addWishlist (req,res,next){
        try {
            const authorId = req.user.id
            const id = req.body.id

            const alreadyExist = await UserProduct.findOne({where : {UserId : authorId, ProductId : id}})
            if(alreadyExist){
                throw {name : 'data_exist'}
            }
            const wishlist = await UserProduct.create({UserId : authorId, ProductId : id})
            res.status(201).json('success add to wishlist')
        } catch (error) {
            next(error)
        }
    }

    static async detail(req,res,next){
        try {
            const basedUrl = `https://api.happi.dev/v1/qrcode`
            const paramsQuery = req.query.url
            const id = req.params.id

            const product = await Product.findByPk(id)
            if(!product){
                throw {name : 'Data not found'}
            }
            const {data} = await axios({
                url : basedUrl,
                method: 'get',
                params : {
                    data : paramsQuery
                },
                headers : {
                    'x-happi-key' : apiHappi
                }
            })
            res.status(200).json({product, data})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductClientController