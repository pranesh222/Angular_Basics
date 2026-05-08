import { createAction, props } from '@ngrx/store';

// Actions are plain objects describing WHAT happened
// Convention: '[Source] Event Description'

export const increment   = createAction('[Counter] Increment');
export const decrement   = createAction('[Counter] Decrement');
export const reset       = createAction('[Counter] Reset');
export const incrementBy = createAction(
  '[Counter] Increment By',
  props<{ amount: number }>()  // action with payload
);