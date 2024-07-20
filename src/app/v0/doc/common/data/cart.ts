import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const cartDoc: Record<string, IApi> = {
  list: {
    name: 'Get All Carts',
    code: `fetch('${apiBaseUrl}/carts')
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "status": 200,
      "message": "Success, Cart list",
      "data": [
        {
          "_id": "6572b6bcf610af2847fcb9d0",
          "user": {
            "role": "ROLE_CUSTOMER",
            "_id": "612e4851345dcc333ac6cb24",
            "name": "Robert Gonzalez",
            "email": "robertgonzalez@gmail.com"
          },
          "products": [
            {
              "product": {
                "_id": "61ab420c0f34753bcedfa787",
                "title": "special cotton shirt for men",
                "slug": "special-cotton-shirt-for-men",
                "price": 15
              },
              "quantity": 6
            },
            ...
          ],
          "createdAt": "2023-12-08T06:25:00.722Z",
          "updatedAt": "2023-12-08T06:25:00.722Z"
        },
        ...
      ]
    }`
  },
  description: {
    name: 'Get Single Cart',
    code: `fetch('${apiBaseUrl}/carts/6572b9c1f610af2847fcba15')
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "status": 200,
      "message": "Success, Cart Description",
      "data": {
        "_id": "6572b9c1f610af2847fcba15",
        "user": {
          "role": "ROLE_CUSTOMER",
          "_id": "61e944df2cefb5a72936696a",
          "name": "Torine Walker",
          "email": "torinewalker@gmail.com"
        },
        "products": [
          {
            "product": {
              "_id": "61ab42d00f34753bcedfa79e",
              "title": "cotton pullover embroidery sweatshirt women",
              "slug": "cotton-pullover-embroidery-sweatshirt-women",
              "price": 100
            },
            "quantity": 1
          },
          ...
        ],
        "createdAt": "2023-12-08T06:37:53.271Z",
        "updatedAt": "2023-12-08T06:37:53.271Z"
      }
    }`
  },
  create: {
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
  update: {
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
        .then(json => console.log(json))`,
    output: `{
      "data": {
        "_id": "6572b9c1f610af2847fcba15",
        "user": {
          "_id": "61e944df2cefb5a72936696a",
          "name": "Torine Walker",
          "email": "torinewalker@gmail.com"
        },
        "products": [
          {
            "product": {
              "_id": "61ab42d00f34753bcedfa79e",
              "title": "cotton pullover embroidery sweatshirt women",
              "slug": "cotton-pullover-embroidery-sweatshirt-women",
              "price": 100
            },
            "quantity": 5
          },
          {
            "product": {
              "_id": "61ab42e90f34753bcedfa7a2",
              "title": "breast button belt sur collar winter coat women",
              "slug": "breast-button-belt-sur-collar-winter-coat-women",
              "price": 120
            },
            "quantity": 3
          }
        ],
        "createdAt": "2023-12-08T06:37:53.271Z",
        "updatedAt": "2023-12-08T06:37:53.271Z"
      },
      "status": 200,
      "message": "Success! Cart updated"
    }`
  },
  destroy: {
    name: 'Delete Cart',
    code: `fetch('${apiBaseUrl}/carts/6572b9c1f610af2847fcba15',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "status": 202,
      "message": "Success! Cart deleted"
    }`
  }
};
