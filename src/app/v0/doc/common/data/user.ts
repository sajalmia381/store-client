import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const userDoc: Record<string, IApi> = {
  list: {
    name: 'Get All Users',
    code: `fetch('${apiBaseUrl}/users')
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "status": 200,
      "message": "Success! User List",
      "data": [
        {
          "role": "ROLE_CUSTOMER",
          "_id": "612e4851345dcc333ac6cb24",
          "name": "Robert Gonzalez",
          "email": "robertgonzalez@gmail.com",
          "number": 7729248883,
          "password": "$2b$10$VNrU4oX2aqRYQDQsecpTiO37oQZTnVE43JFKXQXCDWHq2PcVWHz9e",
          "createdAt": "2021-08-31T15:18:41.876Z",
          "updatedAt": "2021-08-31T15:18:41.876Z"
        },
        ...
      ]
    }`
  },
  description: {
    name: 'Get Single User',
    code: `fetch('${apiBaseUrl}/users/612e4851345dcc333ac6cb24')
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: {
      status: 200,
      message: 'Success! User description',
      data: {
        role: 'ROLE_CUSTOMER',
        _id: '612e4851345dcc333ac6cb24',
        name: 'Robert Gonzalez',
        email: 'robertgonzalez@gmail.com',
        number: 7729248883,
        password: '$2b$10$VNrU4oX2aqRYQDQsecpTiO37oQZTnVE43JFKXQXCDWHq2PcVWHz9e',
        createdAt: '2021-08-31T15:18:41.876Z',
        updatedAt: '2021-08-31T15:18:41.876Z'
      }
    }
  },
  create: {
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
        .then(json => console.log(json))`,
    output: {
      status: 201,
      message: 'Success! User created',
      data: {
        role: 'ROLE_CUSTOMER',
        _id: '664f74967efe9d6a74ab1318',
        name: 'Ron Bin Nawaz',
        email: 'ron@gmail.com',
        number: 72342341,
        password: '*********'
      }
    }
  },
  update: {
    name: 'Update User',
    code: `fetch('${apiBaseUrl}/users/612e4851345dcc333ac6cb24',
        {
          method: 'PUT',
          body: JSON.stringify({
              name: 'Alex Pi',
              number: '12025550108'
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: {
      status: 202,
      message: 'Success! User updated',
      data: {
        name: 'Alex Pi',
        email: 'robertgonzalez@gmail.com',
        number: '12025550108',
        role: 'ROLE_CUSTOMER'
      }
    }
  },
  destroy: {
    name: 'Delete User',
    code: `fetch('${apiBaseUrl}/users/612e4851345dcc333ac6cb24',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: {
      status: 202,
      message: 'Success! User deleted'
    }
  }
};
