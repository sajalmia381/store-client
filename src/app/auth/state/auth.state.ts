export interface AuthState {
  isSignedIn: boolean;
  userData: any;
  errors?: { username?: string; password?: string };
}

const locRequester = localStorage.getItem('api-requester');
const userData = locRequester ? JSON.parse(locRequester) : null;

export const initialState: AuthState = {
  isSignedIn: !!userData?.token,
  userData: userData || null,
  errors: {}
};
