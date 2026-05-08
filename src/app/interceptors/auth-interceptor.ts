import { HttpInterceptorFn, HttpRequest,
         HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

const DEMO_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  // Step 1 — Add token to outgoing request
  const publicUrls = ['/auth/login', '/auth/register'];
  const isPublic = publicUrls.some(url => req.url.includes(url));

  const authReq = isPublic ? req : req.clone({
    headers: req.headers.set('Authorization', `Bearer ${DEMO_TOKEN}`)
  });

  // Step 2 — Handle 401 on incoming response
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expired or invalid — redirect to login
        console.warn('401 Unauthorised — redirecting to login');
        router.navigate(['/login'], {
          queryParams: { returnUrl: router.url }
        });
      }
      return throwError(() => error);
    })
  );
};