const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize


beforeAll(() =>{
    queryInterface.bulkDelete('Users', null, {
        truncate : true,
        restartIdentity: true,
        cascade : true
    })
})



describe('post /pub/register', () =>{
    it('success post /pub/register', async() =>{
        const payload = {
            username : 'tes99',
            email : 'tes99@mail.com',
            password : 'asdf1234'
        }
        
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(201)
            await expect(result.body).toHaveProperty('id')
            await expect(result.body).toHaveProperty('email', payload.email)
    })

    it('fail post /pub/register cause the email already used', async() => {
        const payload = {
            username : 'userbelumdipakai',
            email : 'tes99@mail.com',
            password : 'asdf1234'
        }
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toHaveProperty('message', 'Email/username already registered')
    })

    it('fail post /pub/register cause the username already used', async() => {
        const payload = {
            username : 'tes99',
            email : 'emailbelumdipakai@mail.com',
            password : 'asdf1234'
        }
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toHaveProperty('message', 'Username already registered')
    })

    it('fail post /pub/register cause email format is wrong', async() => {
        const payload = {
            username : 'usernamebelumdipakai',
            email : 'emailinisalahbos',
            password : 'asdf1234',
            
        }
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toHaveProperty('message', 'Email format is wrong')
    })
    it('fail post /pub/register cause the email is not exist', async() => {
        const payload = {
            username : 'tes2',
            password : 'asdf1234',            
        }
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toHaveProperty('message', 'Email is required')
    })
    it('fail post /pub/register cause inputted password is an empty string', async() => {
        const payload = {
            username : 'tes2',
            email : 'tes99@mail.com',
            password : '',            
        }
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toHaveProperty('message', 'Password is required')
    })

    it('fail post /pub/register cause inputted email is an empty string', async() => {
        const payload = {
            username : 'tes2',
            email : '',
            password : 'asdf1234',            
        }
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toHaveProperty('message', 'Email is required')
    })



    it('fail post /pub/register cause username is not exist', async() => {
        const payload = {
            email : 'tes2@mail.com',
            password : 'asdf1234',
            
        }
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toHaveProperty('message', 'Username is required')
    })

    it('fail post /pub/register cause the password is not exist', async() => {
        const payload = {
            user : 'tes2',
            email : 'tes2@mail.com'            
        }
        const result = await request(app).post('/pub/register').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toHaveProperty('message', 'Password is required')
    })
})

describe('post /pub/login', () =>{
    it('success login ', async() =>{
        const payload = {
            email : 'tes99@mail.com',
            password : 'asdf1234'
        }
        const result = await request(app).post('/pub/login').send(payload)
            await expect(result.status).toBe(200)
            await expect(result.body).toEqual(expect.any(Object))
            await expect(result.body).toHaveProperty('access_token', expect.any(String))
    })

    it('fail login cause email is not exist', async()=>{
        const payload = {
            password : 'asdf1234'
        }

        const result = await request(app).post('/pub/login').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toEqual(expect.any(Object))
            await expect(result.body).toHaveProperty('message' , 'Email and password are required')
    })

    it('fail login cause password is not exist', async()=>{
        const payload = {
            email : 'tes99@mail.com'
        }

        const result = await request(app).post('/pub/login').send(payload)
            await expect(result.status).toBe(400)
            await expect(result.body).toEqual(expect.any(Object))
            await expect(result.body).toHaveProperty('message' , 'Email and password are required')
    })

    it('fail login cause email is not exist in database', async()=>{
        const payload = {
            email : 'tes99999@mail.com',
            password : 'asdf1234'
        }

        const result = await request(app).post('/pub/login').send(payload)
            await expect(result.status).toBe(401)
            await expect(result.body).toEqual(expect.any(Object))
            await expect(result.body).toHaveProperty('message' , 'Invalid Email or password')
    })

    it('fail login cause password is wrong', async()=>{
        const payload = {
            email : 'tes99@mail.com',
            password : 'asdf12345512'
        }

        const result = await request(app).post('/pub/login').send(payload)
            await expect(result.status).toBe(401)
            await expect(result.body).toEqual(expect.any(Object))
            await expect(result.body).toHaveProperty('message' , 'Invalid Email or password')
    })
})