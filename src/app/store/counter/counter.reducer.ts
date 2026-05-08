import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, incrementBy } from './counter.actions';

// State interface
export interface CounterState {
  count: number;
}

// Initial state
export const initialState: CounterState = {
  count: 0
};

// Reducer — pure function: (currentState, action) => newState
// NEVER mutate state — always return new object
export const counterReducer = createReducer(
  initialState,

  on(increment,   state => ({ ...state, count: state.count + 1 })),
  on(decrement,   state => ({ ...state, count: state.count - 1 })),
  on(reset,       state => ({ ...state, count: 0 })),
  on(incrementBy, (state, { amount }) => ({
    ...state,
    count: state.count + amount
  })),
);