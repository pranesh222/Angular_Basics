import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectAllPosts   = createSelector(selectPostsState, s => s.posts);
export const selectLoading    = createSelector(selectPostsState, s => s.loading);
export const selectError      = createSelector(selectPostsState, s => s.error);
export const selectPostsCount = createSelector(selectAllPosts, posts => posts.length);

// Parameterized selector — select post by id
export const selectPostById = (id: number) => createSelector(
  selectAllPosts,
  posts => posts.find(p => p.id === id)
);