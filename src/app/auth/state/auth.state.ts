import JwtService from "@shared/helper/JwtService";

export interface AuthState {
  isSignedIn: boolean;
  userData: any;
  errors?: { username?: string; password?: string };
}

const access_token = localStorage.getItem('access_token');
const refresh_token = localStorage.getItem('refresh_token');
let userData: any;
if (refresh_token) {
  const [valid, payload] = JwtService.describeToken(refresh_token)
  if (!valid) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } else {
    userData = {access_token, refresh_token, userInfo: payload}
  }
}

export const initialState: AuthState = {
  isSignedIn: !!userData?.refresh_token,
  userData: userData || null,
  errors: {}
};
