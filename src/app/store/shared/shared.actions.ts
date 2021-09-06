import { createAction, props } from '@ngrx/store';

// Loading Actions
export const setLoading = createAction('[shared] set loading', props<{ status: boolean }>());
