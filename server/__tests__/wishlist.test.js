const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const {encrypt} = require('../helpers/bcrypt')

const users = [
    {
        username : 'user1',
        email : 'user1@mail.com',
        password : encrypt('12345'),
        role : 'client',
        createdAt : new Date(),
        updatedAt : new Date()
    },
    {
        username : 'user2',
        email : 'user2@mail.com',
        password : encrypt('12345'),
        role : 'client',
        createdAt : new Date(),
        updatedAt : new Date()
    }
]
const categories = require('../data/category.json')
    .map(el =>{
        return { 
            ...el,
            createdAt : new Date(),
            updatedAt : new Date()
        }
    })

const products = require('../data/products.json')
    .map(el =>{
        return {
            ...el,
            createdAt : new Date(),
            updatedAt : new Date()
        }
    })

const userProducts = [
    {
        ProductId : 1,
        UserId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
    },
    {
        ProductId : 2,
        UserId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
    },
]


beforeAll(async () => {
    await queryInterface.bulkInsert('Users', users)
    await queryInterface.bulkInsert('Categories', categories)
    await queryInterface.bulkInsert('Products', products)
    await queryInterface.bulkInsert('UserProducts', userProducts)
    
})

afterAll(async () =>{
    await queryInterface.bulkDelete('Users', null, {
        truncate : true,
        restartIdentity: true,
        cascade : true
    })
    await queryInterface.bulkDelete('Categories', null, {
        truncate : true,
        restartIdentity: true,
        cascade : true
    })
    await queryInterface.bulkDelete('Products', null, {
        truncate : true,
        restartIdentity: true,
        cascade : true
    })
    await queryInterface.bulkDelete('UserProducts', null, {
        truncate : true,
        restartIdentity: true,
        cascade : true
    })
})

describe('get /pub/products/wishlists', () =>{
    it('Success to get wishlist with the user id as it wish', async() =>{
        const data = await request(app).post('/pub/login').send({email : 'user1@mail.com', password : '12345'})
        const result = await request(app).get('/pub/products/wishlists').set('access_token', data.body.access_token)   
        await expect(result.status).toBe(200)
    })
    
})
