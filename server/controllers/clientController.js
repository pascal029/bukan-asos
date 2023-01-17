const {User} = require('../models')
const { encrypt, compare } = require("../helpers/bcrypt")
const {OAuth2Client} = require('google-auth-library');
const {sign} = require('../helpers/jwt')

class ClientController {
    static async register (req,res,next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body
            if(!email){
                throw {name : 'invalid_input_email'}
            }
            if(!password){
                throw {name : 'invalid_input_password'}
            }
            const [user, created] = await User.findOrCreate({
                where: {email},
                defaults : {
                    username,
                    email,
                    password : encrypt(password),
                    phoneNumber,
                    address,
                    role : 'client'
                },
                hooks : false
            })
            
            if (!created){
                throw {name : `user_exist`}
            }
            const response = {
                id : user.id,
                email : user.email 
            } 
            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
    
    static async login(req,res,next){
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

    static async google(req,res,next) {
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
                    role : 'client'
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

module.exports = ClientController