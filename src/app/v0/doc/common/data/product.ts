import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const productDoc: Record<string, IApi> = {
  list: {
    name: 'Get All Products',
    description: 'Available filter query params: ?q=string&categoryId=string&userId=string',
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
      "message": "Success! Product list"
    }`
  },
  description: {
    name: 'Get Single Product',
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
      "message": "Success! Product description"
    }`
  },
  pagination: {
    name: 'Pagination Results',
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
      "message": "Success! Product list with pagination"
    }`
  },
  create: {
    name: 'Create Product',
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
      "message": "Success! Product created"
    }`
  },
  update: {
    name: 'Update Product',
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
      "message": "Success! Product updated"
    }`
  },
  destroy: {
    name: 'Delete Product',
    code: `fetch('${apiBaseUrl}/products/running-sneaker',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "status": 202,
      "message":"Success! Product deleted"
    }`
  }
};
