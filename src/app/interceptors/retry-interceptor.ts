import { HttpInterceptorFn, HttpRequest,
         HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { retry, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const retryInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {

  // Only retry GET requests — never retry POST/PUT/DELETE
  // (retrying a POST could create duplicate records!)
  if (req.method !== 'GET') {
    return next(req);
  }

  return next(req).pipe(
    // retry with exponential backoff
    retry({
      count: 3, // max 3 retries
      delay: (error: HttpErrorResponse, retryCount: number) => {

        // Don't retry client errors (4xx) — only server errors (5xx)
        // and network errors (status 0)
        if (error.status >= 400 && error.status < 500) {
          throw error; // rethrow immediately, no retry
        }

        const delayMs = retryCount * 1000; // 1s, 2s, 3s
        console.warn(
          `⚠️ Retry ${retryCount}/3 for ${req.url} in ${delayMs}ms`
        );

        // timer(delayMs) waits before retrying
        return timer(delayMs);
      }
    })
  );
};