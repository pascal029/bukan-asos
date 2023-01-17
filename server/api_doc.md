# Challenge1 API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `POST /users/staf`
- `GET /products`
- `POST /products`
- `GET /products/categories`
- `POST /products/categories`
- `DELETE /products/categories/:id`
- `GET /products/:id`
- `DELETE /products/:id`

&nbsp;


## 1. POST /users/register

Request :

-body :
```json
{
    "username":"string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address" : "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email already registered"
}
OR
{
  "message": "Email Format is wrong"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Username Already registered"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password minimum characters password is 5 and maximum is 32"
}

```

&nbsp;

## 2. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username" : "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```
_Response (401 - Unauthorized)_



```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /users/staf

Request:

- body:

```json
{
  "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username" : "string"
}
```
_Response (500- Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

## 4. GET /products

Description :
- Get all products from database and get role and id from user who access this end point

Request :

- headers :

```json
{
  "access_token": "string"
}
```

- user : 

```json
{
  "id": "integer",
  "role": "string"
}
```

_Response (200 - OK)_

```json
{
    "products" :[
            {
                "id": Integer,
                "name": String,
                "description" : String,
                "price" : integer,
                "stock" : integer,
                "imgUrl" : String,
                "categoryId" : integer,
                "authorId" : integer,
                "createdAt" : date,
                "updatedAt" : date
            }...,
        ],
    "user" : {
        "id" : integer,
        "role" : string
    }
}
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

## 5. POST /products

Request :

- headers :

```json
{
  "access_token": "string"
}
```
Request :

- body :

```json
{
  "name": "string",
  "description" : "string",
  "price" : "integer",
  "stock" : "integer",
  "imgUrl" : "string",
  "authorId" : "integer",
  "categoryId" : "integer"
}
```
_Response (200 - OK)_

```json
{
    "id": Integer,
    "name": String,
    "description" : String,
    "price" : integer,
    "stock" : integer,
    "imgUrl" : String,
    "categoryId" : integer,
    "authorId" : integer,
    "createdAt" : date,
    "updatedAt" : date
}
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

_Response (400 - Bad Request)_


```json
{
  "message": "Name can't be empty"
}
OR
{
  "message": "Description can't be empty"
}
OR
{
  "message": "Price can't be empty"
}
OR
{
  "message": "Minimum Price is 10000"
}
OR
{
  "message": "Stock can't be empty"
}
OR
{
  "message": "Minimum Stock is 1"
}

```

_Response (500- Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

## 6. GET /products/categories

Description :
- Get all categories

Request :

- headers :

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": Integer,
    "name": String,
    "createdAt" : date,
    "updatedAt" : date
  }...,
]
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

_Response (404 - NOT FOUND)_


```json
{
  "message": "Data Not Found"
}
```


## 7. POST /products/categories

Request :

- headers :

```json
{
  "access_token": "string"
}
```

- body :

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
    "message" : "Success to add Category"
}
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

_Response (400 - Bad Request)_


```json
{
  "message": "Category name can't be empty"
}
OR
{
  "message": "Category already exist"
}

```

## 8. DELETE /products/categories/:id

Request :

- headers :

```json
{
  "access_token": "string"
}
```

- params :

```json
{
  "id": "integer(required)"
}
```

_Response (200 - OK)_

```json
{
    "message" : "Success to delete"
}
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

_Response (403 - Forbidden)_


```json
{
  "message": "Forbidden Action"
}
```
_Response (404 - NOT FOUND)_


```json
{
  "message": "Data Not Found"
}
```

## 9. GET /products/:id

Request :

- headers :

```json
{
  "access_token": "string"
}
```

- params :

```json
{
  "id": "integer(required)"
}
```

_Response (200 - OK)_

```json
{
    "product" : {
        "id": Integer,
        "name": String,
        "description" : String,
        "price" : integer,
        "stock" : integer,
        "imgUrl" : String,
        "categoryId" : integer,
        "authorId" : integer,
        "createdAt" : date,
        "updatedAt" : date
    }
}
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

_Response (404 - NOT FOUND)_


```json
{
  "message": "Data Not Found"
}
```

## 10. DELETE /products/:id

Request :

- headers :

```json
{
  "access_token": "string"
}
```

- params :

```json
{
  "id": "integer(required)"
}
```

_Response (200 - OK)_

```json
{
    "message" : "<entity name> success to delete"
}
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

_Response (403 - Forbidden)_


```json
{
  "message": "Forbidden Action"
}
```
_Response (404 - NOT FOUND)_


```json
{
  "message": "Data Not Found"
}
```

## 11. PATCH /products/:id

- headers :

```json
{
  "access_token": "string"
}
```
- params :

```json
{
  "id": "integer(required)"
}
```
- body :
```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
    "message" : "entity with id <entity id> status has been updated from <entity status> to <body status>"
}
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

_Response (403 - Forbidden)_


```json
{
  "message": "Forbidden Action"
}
```
_Response (404 - NOT FOUND)_


```json
{
  "message": "Data Not Found"
}
```

## 12. PUT /products/:id

- headers :

```json
{
  "access_token": "string"
}
```
- params :

```json
{
  "id": "integer(required)"
}
```
- body : 
```json
{
  "name": "string",
  "description" : "string",
  "price" : "integer",
  "stock" : "integer",
  "imgUrl" : "string",
  "authorId" : "integer",
  "categoryId" : "integer"
}
```
_Response (200 - OK)_

```json
{
    "message" : "success to edit"
}
```

_Response (401 - Unauthorized)_


```json
{
  "message": "Please login first"
}
OR
{
  "message": "Authentication Error"
}
```

_Response (403 - Forbidden)_


```json
{
  "message": "Forbidden Action"
}
```
_Response (404 - NOT FOUND)_


```json
{
  "message": "Data Not Found"
}
```

## 13. GET /products/histories

request : 
- headers :

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": Integer,
        "name": String,
        "description" : String,
        "updatedBy" : String,
        "createdAt" : date,
        "updatedAt" : date
    }...,
]
```

## 14. POST /pub/register

Request :

-body :
```json
{
    "username":"string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address" : "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email/username already registered"
}
OR
{
  "message": "Email Format is wrong"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Email/username already registered"
}
OR
{
  "message": "Password is required"
}
OR

```

&nbsp;

## 15. POST /pub/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username" : "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```
_Response (401 - Unauthorized)_



```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "Your account can't login to this website"
}
```
&nbsp;

## 16. GET /pub/products

Description :
- Get total and all products from database which product status is active


_Response (200 - OK)_

```json
{
  "count" : Integer,
  "rows" : [
    {
      "id": Integer,
      "name": String,
      "description" : String,
      "price" : integer,
      "stock" : integer,
      "imgUrl" : String,
      "categoryId" : integer,
      "authorId" : integer,
      "createdAt" : date,
      "updatedAt" : date
    }...,
  ]
}
```

&nbsp;

## 17. GET /pub/products?page=

Description :
- Get total and all products from database which product status is active
and with the pagination limit product of 8 rows max

Request :

```json
{
  "page" : integer
}
```
_Response (200 - OK)_

```json
{
  "count" : Integer,
  "rows" : [
    {
      "id": Integer,
      "name": String,
      "description" : String,
      "price" : integer,
      "stock" : integer,
      "imgUrl" : String,
      "categoryId" : integer,
      "authorId" : integer,
      "createdAt" : date,
      "updatedAt" : date
    }...,
  ]
}
```

## 18. GET /pub/products with filter price

Description :
- Get total and all products from database which product status is active
and with the pagination limit product of 8 rows max and filter minimum price
and/or maximum price

Request :

```json
{
  "filterPriceMin" : integer
}
OR
{
  "filterPriceMax" : integer
}
```
_Response (200 - OK)_

```json
{
  "count" : Integer,
  "rows" : [
    {
      "id": Integer,
      "name": String,
      "description" : String,
      "price" : integer,
      "stock" : integer,
      "imgUrl" : String,
      "categoryId" : integer,
      "authorId" : integer,
      "createdAt" : date,
      "updatedAt" : date
    }...,
  ]
}
```

&nbsp;

## 19. Get /pub/products/:id

Description :
Get the specifil detail of product


Request :
- params :

```json
{
  "id": "integer(required)"
}
```

- query :

```json
{
  "url": "string(required)"
}
```

_Response (200 - OK)_

```json
{
    "product": {
        "id": Integer,
        "name": String,
        "description" : String,
        "price" : integer,
        "stock" : integer,
        "imgUrl" : String,
        "categoryId" : integer,
        "authorId" : integer,
        "createdAt" : date,
        "updatedAt" : date
    },
    "data": {
        "success": boolean,
        "qrcode": string,
        "size": {
            "width": integer,
            "height": integer
        }
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message" : "Data not found"
}
```
&nbsp;



## 20. Get /products/wishlists

Description :
Get all wishlist from user logged in

Request :
- headers :

```json
{
  "access_token": "string(required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": integer,
        "UserId": integer,
        "ProductId": integer,
        "createdAt": date,
        "updatedAt": date,
        "Product": {
            "id": Integer,
            "name": String,
            "description" : String,
            "price" : integer,
            "stock" : integer,
            "imgUrl" : String,
            "categoryId" : integer,
            "authorId" : integer,
            "createdAt" : date,
            "updatedAt" : date
        }
    } ...,
]
```

## 21. POST /products/wishlists/:id

Description :
Add product to wishlist from user logged in

Request :
- headers :

```json
{
  "access_token": "string(required)"
}
```

- params :

```json
{
  "id": "integer(required)"
}
```

_Response(200-OK)_

```json
{
  "message" : "success add to wishlist"
}
```

_Response(400 - Bad Request)_

```json
{
  "message" : "Product already in your wishlist"
}
```



Global Error :

_Response(403 - Forbidden)_
```json
{
  "message" : "Forbidden action"
}
```


_Response (500 - Internal Server Error)_

```json
{
  "message" : "Product already in your wishlist"
}
```