const ProductClientController = require('../controllers/productClientController')
const authentication = require('../middlewares/authentication')
const {clientAuthorization} = require('../middlewares/authorization')

const router = require('express').Router()


router.get('/', ProductClientController.fetchPagination)
router.get('/wishlists', authentication, clientAuthorization , ProductClientController.wishlist)
router.post('/wishlists', authentication, clientAuthorization, ProductClientController.addWishlist)
router.get('/:id', ProductClientController.detail)


module.exports = router