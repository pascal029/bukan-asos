const ProductController = require('../controllers/productController')
const {authorization, patchAuthorization} = require('../middlewares/authorization')

const router = require('express').Router()

router.get('/', ProductController.products)
router.post('/', ProductController.addProducts)
router.get('/histories', ProductController.histories)
router.get('/categories', ProductController.categories)
router.post('/categories', ProductController.addCategory)
router.delete('/categories/:id', ProductController.deleteCategory)
router.get('/:id', ProductController.product)
router.delete('/:id',authorization, ProductController.deleteProduct)
router.put('/:id', authorization, ProductController.editAll)
router.patch('/:id', patchAuthorization, ProductController.editStatus)

module.exports = router