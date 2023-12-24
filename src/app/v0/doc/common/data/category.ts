import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const categoryDoc: Record<string, IApi> = {
  list: {
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
  description: {
    name: 'Get Single Category',
    code: `fetch('${apiBaseUrl}/categories/mens-cloths')
        .then(response => response.json())
        .then(json => console.log(json))`
  },
  create: {
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
  update: {
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
  destroy: {
    name: 'Delete Category',
    code: `fetch('${apiBaseUrl}/categories/mens-cloths',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`
  }
};
