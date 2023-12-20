import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const authDoc: Record<string, IApi> = {
  login: {
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
  registration: {
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
  refreshToken: {
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
};
