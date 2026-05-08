import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Post } from '../../services/posts';
import {
  loadPosts, loadPostsSuccess, loadPostsFailure,
  addPost, addPostSuccess, addPostFailure,
  deletePost, deletePostSuccess, deletePostFailure
} from './posts.actions';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private http     = inject(HttpClient);
  private baseUrl  = 'https://jsonplaceholder.typicode.com';

  // ── Load Posts Effect ──────────────────────────────────────────
  // Listens for loadPosts action → makes HTTP call → dispatches success/failure
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),           // filter: only handle loadPosts action
      switchMap(() =>              // cancel previous, use latest
        this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
          map(posts =>
            loadPostsSuccess({ posts: posts.slice(0, 10) }) // dispatch success
          ),
          catchError(error =>
            of(loadPostsFailure({ error: error.message }))  // dispatch failure
          )
        )
      )
    )
  );

  // ── Add Post Effect ────────────────────────────────────────────
  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      switchMap(({ post }) =>
        this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(
          map(newPost => addPostSuccess({ post: newPost })),
          catchError(error => of(addPostFailure({ error: error.message })))
        )
      )
    )
  );

  // ── Delete Post Effect ─────────────────────────────────────────
  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap(({ id }) =>
        this.http.delete(`${this.baseUrl}/posts/${id}`).pipe(
          map(() => deletePostSuccess({ id })),
          catchError(error => of(deletePostFailure({ error: error.message })))
        )
      )
    )
  );
}