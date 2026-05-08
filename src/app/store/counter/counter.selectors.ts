import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

// Feature selector — gets the 'counter' slice from global store
export const selectCounterState = createFeatureSelector<CounterState>('counter');

// Derived selectors — memoized (only recalculate when input changes)
export const selectCount = createSelector(
  selectCounterState,
  state => state.count
);

export const selectIsPositive = createSelector(
  selectCount,
  count => count > 0
);

export const selectIsNegative = createSelector(
  selectCount,
  count => count < 0
);

export const selectCountDoubled = createSelector(
  selectCount,
  count => count * 2
);