const { sign } = require("../helpers/jwt")
const { encrypt, compare } = require("../helpers/bcrypt")
const { User } = require('../models')
const {OAuth2Client} = require('google-auth-library');


class UserController {

    static async register(req,res, next) {
        try {
            const {username, email, password, phone, address} = req.body

            const createdUser = await User.create({username, email, password, phoneNumber : phone, address})
            
            res.status(201).json({id : createdUser.id, email : createdUser.email})
        } catch (error) {
            next(error)
        }
    }
    
    static async login(req,res,next) {
        try {
            const {email, password} = req.body
            if(!email || !password){
                throw {name : `invalid_input`}
            }
            const userLoggedIn = await User.findOne({where : {email}})


            if(userLoggedIn == null){
                throw {name : `invalid_credentials`}
            }

            if(userLoggedIn.role == 'admin'){
                throw {name : `invalid_account`}
            }
            const isValidPassword = compare(password, userLoggedIn.password)

            if(!isValidPassword){
                throw {name : `invalid_credentials`}
            }
            const payload = {
                id : userLoggedIn.id,
                role : userLoggedIn.role,
            }
            const access_token = sign(payload)
            const username = userLoggedIn.username

            res.status(200).json({access_token, username})
        } catch (error) {
            next(error)
        }
    }

    static async staf(req,res,next){
        try {
            const {google_token} = req.headers
            const clientId = process.env.GOOGLE_CLIENT_ID
            const client = new OAuth2Client(clientId)
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: clientId,
            })
            const payload = ticket.getPayload()
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                  username : payload.family_name + '_' + payload.given_name,
                  email : payload.email,
                  password : 'google_auth',
                  role : 'staff'
                },
                hooks : false
            })
            const username = user.username || created.username
            const access_token = sign({id : user.id, role : user.role})
            res.status(200).json({access_token, username})

        } catch (error) {
            next(error)
        }        
    }
}

module.exports = UserController