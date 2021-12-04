export interface SharedState {
  loading: boolean;
  themeMode: string;
}

const clintCurrentMode = localStorage.getItem('theme-mode');
export const initialState: SharedState = {
  loading: false,
  themeMode: clintCurrentMode || 'dark'
};
