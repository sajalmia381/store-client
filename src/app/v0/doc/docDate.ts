import { environment } from '@env/environment';
const apiBaseUrl = environment.apiBaseUrl;
export default {
  product: [
    {
      name: 'Get all Products',
      code: `fetch('${apiBaseUrl}/products')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      name: 'Get a single product',
      code: `fetch('${apiBaseUrl}/products/running-sneaker')
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      name: 'Pagination results',
      code: `fetch('${apiBaseUrl}/products?limit=10&page=1')
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      name: 'Create product',
      code: `fetch('${apiBaseUrl}/products',
      {
          method: 'POST',
          body: JSON.stringify({
            title: 'Men Boxer Sneakers For Men  (Black)',
            price: 799
            description: 'Lorem Ipsum is simply dummy text of the printing',
            category: "612e42d755b07f20de9ec6a5"
          }),
          headers: {
            'Content-type': 'multipart/form-data',
          },
      })
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      name: 'Update product',
      code: `fetch('${apiBaseUrl}/products/running-sneaker',
      {
          method: 'PUT',
          body: JSON.stringify({
            title: 'Men Boxer Sneakers For Men  (Black)',
            price: 799
            description: 'Lorem Ipsum is simply dummy text of the printing',
            category: "612e42d755b07f20de9ec6a5"
          }),
          headers: {
            'Content-type': 'multipart/form-data',
          },
      })
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      name: 'Delete product',
      code: `fetch('${apiBaseUrl}/products/running-sneaker',
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
      }
  )
  .then(response => response.json())
  .then(json => console.log(json))`
    }
  ],
  category: [
    {
      name: 'Get Categories',
      code: `fetch('${apiBaseUrl}/categories')
      .then(response => response.json())
      .then(json => console.log(json))`
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
      }
  )
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
  ]
};
