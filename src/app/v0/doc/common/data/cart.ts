import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const cartDoc: Record<string, IApi> = {
  list: {
    name: 'Get all carts',
    code: `fetch('${apiBaseUrl}/carts')
        .then(response => response.json())
        .then(json => console.log(json))`
  },
  description: {
    name: 'Get Single Cart',
    code: `fetch('${apiBaseUrl}/carts/6572b9c1f610af2847fcba15')
        .then(response => response.json())
        .then(json => console.log(json))`
  },
  create: {
    name: 'Add new cart',
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
    name: 'Update cart',
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
  destroy: {
    name: 'Delete cart',
    code: `fetch('${apiBaseUrl}/carts/6572b9c1f610af2847fcba15',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`
  }
};