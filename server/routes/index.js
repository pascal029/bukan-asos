const router = require('express').Router()
const products = require('./products')
const admin = require('./user.js')
const client = require('./client')
const authentication = require('../middlewares/authentication')
const clientProduct = require('./clientProduct')

router.get('/', (req,res) =>{
    res.status(200).json({message : 'ok'})
})

router.use('/pub', client)
router.use('/users', admin)
router.use('/pub/products', clientProduct)

router.use(authentication)

router.use('/products', products)

module.exports = router