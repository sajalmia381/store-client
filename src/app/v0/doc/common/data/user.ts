import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const userDoc: Record<string, IApi> = {
  list: {
    name: 'Get all users',
    code: `fetch('${apiBaseUrl}/users')
        .then(response => response.json())
        .then(json => console.log(json))`
  },
  description: {
    name: 'Get single user',
    code: `fetch('${apiBaseUrl}/users/612e4851345dcc333ac6cb24')
        .then(response => response.json())
        .then(json => console.log(json))`
  },
  create: {
    name: 'Add new user',
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
  update: {
    name: 'Update user',
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
  destroy: {
    name: 'Delete user',
    code: `fetch('${apiBaseUrl}/users/612e4851345dcc333ac6cb24',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`
  }
};