import { createAction, props } from '@ngrx/store';

// Loading Actions
export const setLoading = createAction('[shared] set loading', props<{ status: boolean }>());

export const setThemeMode = createAction('[share] set theme mode', props<{ theme: string }>());
