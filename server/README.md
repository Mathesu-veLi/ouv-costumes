# OUV-Trajes (Back-end)

## API Reference


### User

#### Create user

```http
  POST /users
```

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `body`    | `object` | **Required**. User data |


```typescript
{
    "name": string,
    "email": string,
    "password": string
}
```


| Response  |  Description                                                                                                        |
| :------------------- | :------------------------------------------------------------------ |
| `400 Bad Request` | Your body doesn't meet the requirements *(see message array)* |
| `409 Conflict`    | User already registered                                                                           |

#### Get all users

```http
  GET /users
```


#### Get user

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

| Response        | Description     |
| :-------------- | :-------------- |
| `404 Not Found` | User not exists |

#### Update user

```http
  PATCH /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

| Response           | Description                             |
| :----------------- | :-------------------------------------- |
| `404 Not Found`    | User not exists                         |
| `401 Unauthorized` | Unauthorized route due to lack of token |


#### Delete user

```http
  DELETE /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |


| Response           | Description                             |
| :----------------- | :-------------------------------------- |
| `404 Not Found`    | User not exists                         |
| `401 Unauthorized` | Unauthorized route due to lack of token |

### Token

#### Create Token

```http
  POST /token
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body`    | `object` | **Required**. Product data |

```typescript
{
    "email": string,
    "password": string
}
```

| Response  |  Description                                                                                                        |
| :------------------- | :------------------------------------------------------------------ |
| `400 Bad Request` | Your body doesn't meet the requirements *(see message array)* |
| `404 Not Found`    | User not exists                         |
| `401 Unauthorized` | Incorrect password |


### Product

#### Create product

```http
  POST /products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body`    | `object` | **Required**. Product data |


```typescript
{
    "name": string,
    "img": string,
    "price": number,
    "stock": number
}
```


| Response          | Description                |
| :---------------- | :------------------------- |
| `409 Conflict`    | Product already registered |

#### Get all products

```http
  GET /products
```


#### Get product

```http
  GET /products/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of product to fetch |

| Response        | Description        |
| :-------------- | :----------------- |
| `404 Not Found` | Product not exists |

#### Update product

```http
  PATCH /products/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of product to fetch |

| Response        | Description        |
| :-------------- | :----------------- |
| `404 Not Found` | Product not exists |


#### Delete product

```http
  DELETE /products/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of product to fetch |

| Response        | Description        |
| :-------------- | :----------------- |
| `404 Not Found` | Product not exists |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env

`DATABASE_URL`: URL to connect to the database

`TOKEN_SECRET`: Key for creating user token

`TOKEN_EXPIRATION`: Token expiration time (e.g.: "4d")

`STRIPE_KEY`: Secret key to the store in the stripe
