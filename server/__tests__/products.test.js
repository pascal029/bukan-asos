const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

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

beforeAll(async () =>{
    await queryInterface.bulkInsert('Categories', categories)
    await queryInterface.bulkInsert('Products', products)
})

afterAll(async () =>{
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
})

describe('get /pub/products', () =>{
    it('success to get all products without access_token and params get /pub/products' , async() =>{
        const result = await request(app).get('/pub/products')
            await expect(result.status).toBe(200)
            await expect(result.body).toHaveProperty('count', expect.any(Number))
            await expect(result.body).toHaveProperty('rows', expect.any(Array))
    })

    it('success to get all products without access_token and with 1 params get /pub/products', async() =>{

        const result = await request(app).get('/pub/products').query({filterPriceMin : 1900000})
            await expect(result.status).toBe(200)
            await expect(result.body).toHaveProperty('count', expect.any(Number))
            await expect(result.body).toHaveProperty('rows', expect.arrayContaining([]))
    })

    it('success to get all products without access_token and with pagination get /pub/products', async() =>{
        const expectedRows = [
            {
                "id": 9,
                "name": "Symers",
                "description": "L",
                "price": 900000,
                "stock": 34,
                "imgUrl": "https://images.asos-media.com/products/asos-design-heavyweight-oversized-sweatshirt-in-yellow/202882271-1-palebanana?$n_320w$&wid=317&fit=constrain",
                "categoryId": 1,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-10-08T09:20:26.923Z",
                "updatedAt": "2022-10-08T09:20:26.923Z"
            },
            {
                "id": 10,
                "name": "Firmin",
                "description": "2XL",
                "price": 1000000,
                "stock": 30,
                "imgUrl": "https://images.asos-media.com/products/asos-design-heavyweight-oversized-joggers-in-forest-green/202882407-1-pondarosapine?$n_320w$&wid=317&fit=constrain",
                "categoryId": 2,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-10-08T09:20:26.923Z",
                "updatedAt": "2022-10-08T09:20:26.923Z"
            },
            {
                "id": 11,
                "name": "McLean",
                "description": "2XL",
                "price": 1100000,
                "stock": 70,
                "imgUrl": "https://images.asos-media.com/products/asos-design-heavyweight-oversized-hoodie-in-beige/202888509-1-whitepepper?$n_320w$&wid=317&fit=constrain",
                "categoryId": 2,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-10-08T09:20:26.923Z",
                "updatedAt": "2022-10-08T09:20:26.923Z"
            },
            {
                "id": 12,
                "name": "Summerfield",
                "description": "2XL",
                "price": 1200000,
                "stock": 50,
                "imgUrl": "https://images.asos-media.com/products/asos-design-heavyweight-oversized-sweatshirt-in-off-white/202883884-1-whisperwhite?$n_320w$&wid=317&fit=constrain",
                "categoryId": 3,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-10-08T09:20:26.923Z",
                "updatedAt": "2022-10-08T09:20:26.923Z"
            },
            {
                "id": 13,
                "name": "Gress",
                "description": "XS",
                "price": 1300000,
                "stock": 92,
                "imgUrl": "https://images.asos-media.com/products/asos-design-heavyweight-oversized-hoodie-in-washed-brown/202888298-1-peppercorn?$n_320w$&wid=317&fit=constrain",
                "categoryId": 4,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-10-08T09:20:26.923Z",
                "updatedAt": "2022-10-08T09:20:26.923Z"
            },
            {
                "id": 14,
                "name": "Maryon",
                "description": "L",
                "price": 1400000,
                "stock": 75,
                "imgUrl": "https://images.asos-media.com/products/asos-design-heavyweight-oversized-joggers-in-washed-black/202884115-1-asphalt?$n_320w$&wid=317&fit=constrain",
                "categoryId": 4,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-10-08T09:20:26.923Z",
                "updatedAt": "2022-10-08T09:20:26.923Z"
            },
            {
                "id": 15,
                "name": "Getch",
                "description": "3XL",
                "price": 1500000,
                "stock": 16,
                "imgUrl": "https://images.asos-media.com/products/asos-design-heavyweight-oversized-hoodie-in-pastel-blue/202888397-1-skywriting?$n_320w$&wid=317&fit=constrain",
                "categoryId": 2,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-10-08T09:20:26.923Z",
                "updatedAt": "2022-10-08T09:20:26.923Z"
            },
            {
                "id": 16,
                "name": "Baskwell",
                "description": "M",
                "price": 1600000,
                "stock": 87,
                "imgUrl": "https://images.asos-media.com/products/asos-design-heavyweight-oversized-zip-through-hoodie-in-washed-purple/202888482-1-nirvana?$n_320w$&wid=317&fit=constrain",
                "categoryId": 1,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-10-08T09:20:26.923Z",
                "updatedAt": "2022-10-08T09:20:26.923Z"
            }
        ]
        const result = await request(app).get('/pub/products').query({page : 2})
            await expect(result.status).toBe(200)
            await expect(result.body).toHaveProperty('count', 20)
            await expect(result.body).toHaveProperty('rows'), expect.arrayContaining(expectedRows)
    })

    it('success to get one products with params id', async () =>{
        
        const result = await request(app).get('/pub/products/2').query({url : 'http://localhost:5173/products/2'})
            await expect(result.status).toBe(200)
            await expect(result.body).toHaveProperty('product', expect.any(Object))
            await expect(result.body).toHaveProperty('data', expect.any(Object))
    })

    it('fail to get one products because the params id is not found in database', async() =>{
        const result = await request(app).get('/pub/products/200').query({url : 'http://localhost:5173/products/'})
            await expect(result.status).toBe(404)
            await expect(result.body).toHaveProperty('message', 'Data not found')
    })
})