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
        .then(json => console.log(json))`,
    output: `{
      "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxMmU0OWViMzQ1ZGNjMzMzYWM2Y2I0NyIsIm5hbWUiOiJNYXJrIEx5YW4iLCJyb2xlIjoiUk9MRV9DVVNUT01FUiIsImVtYWlsIjoibWFya2x5YW5AZ21haWwuY29tIn0sImlhdCI6MTcxNjQ4MzUwOSwiZXhwIjoxNzE2NDg0NDA5fQ.Hy5CeXen1dLbiYuPaOpewjrNVBYsFZO-QRxRiSSatYM",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxMmU0OWViMzQ1ZGNjMzMzYWM2Y2I0NyIsIm5hbWUiOiJNYXJrIEx5YW4iLCJyb2xlIjoiUk9MRV9DVVNUT01FUiIsImVtYWlsIjoibWFya2x5YW5AZ21haWwuY29tIn0sImlhdCI6MTcxNjQ4MzUwOSwiZXhwIjoxNzE2NTY5OTA5fQ.E4lfOV77HiZNUU19QSy_ishl_exXPKBu7AcpGAuPWQY"
      },
      "message": "Sign in success",
      "status": 200
    }`
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
            password: 'Simple12345',
            password_repeat: 'Simple12345'
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "status": 201,
      "message": "User created",
      "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY2NGY3NWY3N2VmZTlkYzJmZWFiMTMxZiIsIm5hbWUiOiJBbGV4IFBpIiwicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20ifSwiaWF0IjoxNzE2NDgzNTc1LCJleHAiOjE3MTY0ODQ0NzV9.qrexhDpWknEObE1qrA_s4iALP-C4qW9sOnuo-lcBB8Y",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY2NGY3NWY3N2VmZTlkYzJmZWFiMTMxZiIsIm5hbWUiOiJBbGV4IFBpIiwicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20ifSwiaWF0IjoxNzE2NDgzNTc1LCJleHAiOjE3MTcwODgzNzV9.QcYOn2Xtr-zyLT4WTk3Z1JvKVCvrxk1hW__8wAIogrM"
      }
    }`
  },
  refreshToken: {
    name: 'Refresh Token',
    code: `fetch('${apiBaseUrl}/auth/refresh',
        {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY2NGY3NWY3N2VmZTlkYzJmZWFiMTMxZiIsIm5hbWUiOiJBbGV4IFBpIiwicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20ifSwiaWF0IjoxNzE2NDgzNTc1LCJleHAiOjE3MTcwODgzNzV9.QcYOn2Xtr-zyLT4WTk3Z1JvKVCvrxk1hW__8wAIogrM',
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
        "status": 201,
        "message": "Success! New Token geneated",
        "data": {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY2NGY3NWY3N2VmZTlkYzJmZWFiMTMxZiIsIm5hbWUiOiJBbGV4IFBpIiwicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20ifSwiaWF0IjoxNzE2NDgzNTc1LCJleHAiOjE3MTY0ODQ0NzV9.qrexhDpWknEObE1qrA_s4iALP-C4qW9sOnuo-lcBB8Y",
          "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY2NGY3NWY3N2VmZTlkYzJmZWFiMTMxZiIsIm5hbWUiOiJBbGV4IFBpIiwicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20ifSwiaWF0IjoxNzE2NDgzNTc1LCJleHAiOjE3MTcwODgzNzV9.QcYOn2Xtr-zyLT4WTk3Z1JvKVCvrxk1hW__8wAIogrM"
        }
    }`
  }
};
