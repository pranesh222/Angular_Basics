import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// ── Interfaces — always type your HTTP responses ───────────────────────────
export interface Post {
  id:     number;
  userId: number;
  title:  string;
  body:   string;
}

export interface Comment {
  id:     number;
  postId: number;
  name:   string;
  email:  string;
  body:   string;
}

// CreatePost omits id — server generates it
export type CreatePost = Omit<Post, 'id'>;

// UpdatePost makes all fields optional except id
export type UpdatePost = Partial<Post> & { id: number };

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  // ── GET — fetch all posts ──────────────────────────────────────────────
  // Observable<Post[]> — TypeScript knows exactly what comes back
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      tap(posts => console.log(`Fetched ${posts.length} posts`)),
      catchError(this.handleError)
    );
  }

  // ── GET — fetch i post by id ──────────────────────────────────────
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // ── GET — with query params ────────────────────────────────────────────
  // GET /posts?userId=1
  getPostsByUser(userId: number): Observable<Post[]> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // ── GET — comments for a post ──────────────────────────────────────────
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.baseUrl}/posts/${postId}/comments`
    ).pipe(
      catchError(this.handleError)
    );
  }

  // ── POST — create a new post ───────────────────────────────────────────
  createPost(post: CreatePost): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Post>(`${this.baseUrl}/posts`, post, { headers }).pipe(
      tap(created => console.log('Created post:', created)),
      catchError(this.handleError)
    );
  }

  // ── PUT — full update (replace entire resource) ────────────────────────
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(
      `${this.baseUrl}/posts/${post.id}`, post
    ).pipe(
      tap(updated => console.log('Updated post:', updated)),
      catchError(this.handleError)
    );
  }

  // ── PATCH — partial update (only changed fields) ───────────────────────
  patchPost(update: UpdatePost): Observable<Post> {
    return this.http.patch<Post>(
      `${this.baseUrl}/posts/${update.id}`, update
    ).pipe(
      catchError(this.handleError)
    );
  }

  // ── DELETE — remove a post ─────────────────────────────────────────────
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
      tap(() => console.log(`Deleted post ${id}`)),
      catchError(this.handleError)
    );
  }

  // ── GET with response transformation using map ─────────────────────────
  // Only return titles, not full post objects
  getPostTitles(): Observable<string[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      map(posts => posts.map(p => p.title)),
      catchError(this.handleError)
    );
  }

  // ── Centralised error handler ──────────────────────────────────────────
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.status === 0) {
      // Client-side or network error
      errorMessage = `Network error: ${error.message}`;
    } else {
      // Server returned an error response
      switch (error.status) {
        case 400: errorMessage = 'Bad request — check your data';       break;
        case 401: errorMessage = 'Unauthorised — please log in';        break;
        case 403: errorMessage = 'Forbidden — insufficient permissions'; break;
        case 404: errorMessage = `Resource not found`;                  break;
        case 500: errorMessage = 'Server error — try again later';      break;
        default:  errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error('HTTP Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}