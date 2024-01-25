export interface SharedState {
  loading: boolean;
  themeMode: string;
}

export const initialState: SharedState = {
  loading: false,
  themeMode: 'dark'
};
