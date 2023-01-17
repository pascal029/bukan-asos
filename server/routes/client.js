const ClientController = require('../controllers/clientController')
const UserController = require('../controllers/userController')
const router = require('express').Router()


router.post('/register', ClientController.register)
router.post('/login', UserController.login)
router.post('/google', ClientController.google)


module.exports = router