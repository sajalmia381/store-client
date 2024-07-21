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
    code: `fetch('${apiBaseUrl}/categories/phone-and-tablets')
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: {
      data: {
        products: [
          {
            _id: '61ab475a0f34753bcedfa847',
            title: 'iphone 13 pro black color 512gb storage',
            price: 999,
            description: null,
            imageSource: null,
            createdBy: '612e4959345dcc333ac6cb35',
            createdAt: '2021-12-04T10:47:54.509Z',
            updatedAt: '2021-12-04T10:47:54.509Z',
            slug: 'iphone-13-pro-black-color-512gb-storage'
          }
        ],
        _id: '61ab1d3b4a0fef3f27dc6654',
        name: 'phone & tablets',
        slug: 'phone-and-tablets'
      },
      status: 200,
      message: 'Success! Category description'
    }
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
        .then(json => console.log(json))`,
    output: {
      data: {
        _id: '664f71a17efe9dddd5ab12d0',
        name: 'mens-cloths',
        slug: 'mens-cloths'
      },
      status: 201,
      message: 'Success! Category created'
    }
  },
  update: {
    name: 'Update Category',
    code: `fetch('${apiBaseUrl}/categories/phone-and-tablets',
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
        .then(json => console.log(json))`,
    output: {
      data: {
        _id: '61ab1d3b4a0fef3f27dc6654',
        name: 'Mens Fashion',
        slug: 'phone-and-tablets',
        product: ['61ab475a0f34753bcedfa847', '61ab47c20f34753bcedfa853']
      },
      status: 202,
      message: 'Success! Category updated'
    }
  },
  destroy: {
    name: 'Delete Category',
    code: `fetch('${apiBaseUrl}/categories/phone-and-tablets',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: {
      status: 202,
      message: 'Success! Category deleted'
    }
  }
};
