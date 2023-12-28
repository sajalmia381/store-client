export interface AuthState {
  isSignedIn: boolean;
  userData: any;
  errors?: { username?: string; password?: string };
}

export const initialState: AuthState = {
  isSignedIn: false,
  userData: null,
  errors: {}
};
