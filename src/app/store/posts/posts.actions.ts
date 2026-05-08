import { createAction, props } from '@ngrx/store';
import { Post } from '../../services/posts';

// Load Posts
export const loadPosts        = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>()
);

// Add Post
export const addPost        = createAction('[Posts] Add Post', props<{ post: Post }>());
export const addPostSuccess = createAction('[Posts] Add Post Success', props<{ post: Post }>());
export const addPostFailure = createAction('[Posts] Add Post Failure', props<{ error: string }>());

// Delete Post
export const deletePost        = createAction('[Posts] Delete Post', props<{ id: number }>());
export const deletePostSuccess = createAction('[Posts] Delete Post Success', props<{ id: number }>());
export const deletePostFailure = createAction('[Posts] Delete Post Failure', props<{ error: string }>());