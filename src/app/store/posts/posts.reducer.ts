import { createReducer, on } from '@ngrx/store';
import { Post } from '../../services/posts';
import {
  loadPosts, loadPostsSuccess, loadPostsFailure,
  addPostSuccess, deletePostSuccess
} from './posts.actions';

export interface PostsState {
  posts:   Post[];
  loading: boolean;
  error:   string | null;
}

export const initialState: PostsState = {
  posts:   [],
  loading: false,
  error:   null
};

export const postsReducer = createReducer(
  initialState,

  // Load
  on(loadPosts, state => ({
    ...state, loading: true, error: null
  })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state, loading: false, posts
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  // Add
  on(addPostSuccess, (state, { post }) => ({
    ...state, posts: [post, ...state.posts]
  })),

  // Delete
  on(deletePostSuccess, (state, { id }) => ({
    ...state, posts: state.posts.filter(p => p.id !== id)
  })),
);