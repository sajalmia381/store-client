import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';

const apiBaseUrl = environment.apiBaseUrl;
const APIs: Record<string, IApi[]> = {
  product: [
    {
      name: 'Get all products',
      description: '💡 Available filter query params: q: string, categoryId: string, userId: string',
      code: `fetch('${apiBaseUrl}/products')
        .then(response => response.json())
        .then(json => console.log(json))`,
      output: `{
        "data": [
          {
            "_id": "...",
            "title": "...",
            "price": ...,
            "category": {
                ...
            },
            "description": "...",
            "createdBy": {
                ...
            },
            "createdAt": "...",
            "updatedAt": "...",
            "slug": "...",
            "image": ""
          },
          ...
        ],
        "status": 200,
        "message": "Success"
      }`
    },
    {
      name: 'Get a single product',
      code: `fetch('${apiBaseUrl}/products/running-sneaker')
        .then(response => response.json())
        .then(json => console.log(json))`,
      output: `{
        "data": {
          "_id": "...",
          "title": "..",
          "price": 200,
          "category": {
            "_id": "...",
            "name": "...",
            "slug": "..."
          },
          "description": "...",
          "createdBy": {
            "role": "...",
            "_id": "...",
            "name": "..."
          },
          "createdAt": "...",
          "updatedAt": "...",
          "slug": "..."
        },
        "status": 200,
        "message": "Success! Product Description"
      }`
    },
    {
      name: 'Pagination results',
      code: `fetch('${apiBaseUrl}/products?limit=10&page=1')
        .then(response => response.json())
        .then(json => console.log(json))`,
      output: `{
        "metadata": {
          "currentPage": 1,
          "totalProducts": 20,
          "nextPage": 2,
          "totalPages": 3
        },
        "data": [
          {
            "_id": "...",
            "title": "..",
            "price": 200,
            "category": {
              "_id": "...",
              "name": "...",
              "slug": "..."
            },
            "description": "...",
            "createdBy": {
              "role": "...",
              "_id": "...",
              "name": "..."
            },
            "createdAt": "...",
            "updatedAt": "...",
            "slug": "..."
          },
          ...
        ],
        "status": 200,
        "message": "Success: Product list with pagination"
      }`
    },
    {
      name: 'Create product',
      code: `fetch('${apiBaseUrl}/products',
        {
            method: 'POST',
            body: JSON.stringify({
              title: 'Men Boxer Sneakers For Men  (Black)',
              price: 799,
              description: 'Lorem Ipsum is simply dummy text of the printing',
              category: "612e42d755b07f20de9ec6a5"
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
      output: `{
        "data": {
          "_id": "6582fac0f66e0b31fbc635ec",
          "title": "Men Boxer Sneakers For Men  (Black)",
          "slug": "men-boxer-sneakers-for-men-(black)",
          "price": 799,
          "category": "612e42d755b07f20de9ec6a5",
          "description": "Lorem Ipsum is simply dummy text of the printing",
          "createdBy": "612e48e3345dcc333ac6cb2b"
        },
        "status": 201,
        "message": "Success! product created"
      }`
    },
    {
      name: 'Update product',
      code: `fetch('${apiBaseUrl}/products/running-sneaker',
        {
            method: 'PUT',
            body: JSON.stringify({
              title: 'Men Boxer Sneakers For Men  (Black)',
              price: 799,
              description: 'Lorem Ipsum is simply dummy text of the printing',
              category: "612e42d755b07f20de9ec6a5"
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
      output: `{
        "data": {
          "_id": "6582fac0f66e0b31fbc635ec",
          "title": "Men Boxer Sneakers For Men  (Black)",
          "slug": "men-boxer-sneakers-for-men-(black)",
          "price": 799,
          "category": "612e42d755b07f20de9ec6a5",
          "description": "Lorem Ipsum is simply dummy text of the printing",
          "createdBy": "612e48e3345dcc333ac6cb2b"
        },
        "status": 201,
        "message": "Success! product created"
      }`
    },
    {
      name: 'Delete product',
      code: `fetch('${apiBaseUrl}/products/running-sneaker',
        {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
      output: `{
        "status":202,
        "message":"Success! Product deleted"
      }`
    }
  ],
  category: [
    {
      name: 'Get Categories',
      code: `fetch('${apiBaseUrl}/categories')
        .then(response => response.json())
        .then(json => console.log(json))`,
      output: `{
        "data": [
          {
            "products": [
              "61ab420c0f34753bcedfa787",
              "61ab42600f34753bcedfa78b",
              "61ab42790f34753bcedfa78f",
              "6550f9a2ce93a372021baf09"
            ],
            "_id": "61ab1ca64a0fef3f27dc663f",
            "name": "men's fashion",
            "slug": "mens-fashion"
          },
          ...
        ],
        "status": 200,
        "message": "Success! Category list"
      }`
    },
    {
      name: 'Get Single Category',
      code: `fetch('${apiBaseUrl}/categories/mens-cloths')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Add New Category',
      code: `fetch('${apiBaseUrl}/categories', 
        {
            method: 'POST',
            body: JSON.stringify({
              name: 'mens-cloths',
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Update Category',
      code: `fetch('${apiBaseUrl}/categories/mens-cloths',
        {
          method: 'PUT',
          body: JSON.stringify({
            name: 'Mens Fashion',
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Delete Category',
      code: `fetch('${apiBaseUrl}/categories/mens-cloths',
        {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    }
  ],
  cart: [
    {
      name: 'Get Cart',
      code: `fetch('${apiBaseUrl}/carts')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Get Single Cart',
      code: `fetch('${apiBaseUrl}/carts/6572b9c1f610af2847fcba15')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Add New Cart',
      code: `fetch('${apiBaseUrl}/carts', 
        {
            method: 'POST',
            body: JSON.stringify({
              "userId": "612e48bf345dcc333ac6cb28",
              "products": [
                {
                  "productId": "61ab43350f34753bcedfa7aa",
                  "quantity": 5
                },
                {
                  "productId": "61ab434b0f34753bcedfa7ae",
                  "quantity": 7
                } 
              ]
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Update Cart',
      code: `fetch('${apiBaseUrl}/carts/6572b9c1f610af2847fcba15',
        {
            method: 'PUT',
            body: JSON.stringify({
              "products": [
                { "productId": "61ab42d00f34753bcedfa79e", "quantity": 5 },
                { "productId": "61ab42e90f34753bcedfa7a2", "quantity": 3 }
              ]
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Delete Cart',
      code: `fetch('${apiBaseUrl}/carts/6572b9c1f610af2847fcba15',
        {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    }
  ],

  user: [
    {
      name: 'Get User',
      code: `fetch('${apiBaseUrl}/users')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Get Single User',
      code: `fetch('${apiBaseUrl}/users/612e4851345dcc333ac6cb24')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Add New User',
      code: `fetch('${apiBaseUrl}/users', 
        {
            method: 'POST',
            body: JSON.stringify({
                name: 'Ron Bin Nawaz',
                email: 'ron@gmail.com',
                number: 72342341,
                password: 'pass12345',
                password_repeat: 'pass12345'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Update User',
      code: `fetch('${apiBaseUrl}/users/612e4851345dcc333ac6cb24',
        {
            method: 'PUT',
            body: JSON.stringify({
                name: 'Alex Pi',
                number: 12025550108,
                password: 'Simple12345'
                password_repeat: 'Simple12345'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Delete User',
      code: `fetch('${apiBaseUrl}/users/612e4851345dcc333ac6cb24',
        {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    }
  ],
  auth: [
    {
      name: 'Login',
      code: `fetch('${apiBaseUrl}/auth/login',
        {
            method: 'POST',
            body: JSON.stringify({
                email: 'marklyan@gmail.com',
                password: 'simple_password'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Registration',
      code: `fetch('${apiBaseUrl}/auth/register',
        {
            method: 'POST',
            body: JSON.stringify({
                name: 'Alex Pi',
                email: 'example@mail.com',
                number: 12025550108,
                password: 'Simple12345'
                password_repeat: 'Simple12345'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Refresh Token',
      code: `fetch('${apiBaseUrl}/auth/refresh',
        {
          method: 'POST',
          body: JSON.stringify({
              refresh_token: 'asd0909asf99f.0sd9fs9df09sd0fi4as4sd0909asf99f0sd9f.s9df09sd0fi',
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    }
  ],
  todo: [
    {
      name: 'Get Todos',
      code: `fetch('${apiBaseUrl}/todos')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Add New Todo',
      code: `fetch('${apiBaseUrl}/todos', 
        {
            method: 'POST',
            body: JSON.stringify({
              "title": "Conduct code reviews regularly",
              "status": "TODO",
              "description": "Some description"
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Update Todo',
      code: `fetch('${apiBaseUrl}/todos/654fbbee25a4902cc1fc7032', 
        {
            method: 'PUT',
            body: JSON.stringify({
              "status": "IN_PROGRESS",
              "description": "Update description"
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Delete Todo',
      code: `fetch('${apiBaseUrl}/todos/654fbbee25a4902cc1fc7032',
        {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`
    }
  ]
};
export default APIs;
