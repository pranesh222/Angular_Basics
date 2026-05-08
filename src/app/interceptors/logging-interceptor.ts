import { HttpInterceptorFn, HttpRequest,
         HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const startTime = Date.now();
  const reqId = Math.random().toString(36).slice(2, 7); // short unique id

  console.group(`📤 [${reqId}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers.keys());
  console.log('Body:', req.body);
  console.groupEnd();

  return next(req).pipe(

    // tap lets you peek at the value without changing it
    tap({
      next: event => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          console.group(`📥 [${reqId}] ${event.status} ${req.url} (${duration}ms)`);
          console.log('Response body:', event.body);
          console.groupEnd();
        }
      },
      error: error => {
        const duration = Date.now() - startTime;
        console.group(`❌ [${reqId}] ERROR ${req.url} (${duration}ms)`);
        console.log('Status:', error.status);
        console.log('Message:', error.message);
        console.groupEnd();
      }
    }),

    // finalize always runs — success OR error
    finalize(() => {
      console.log(`🏁 [${reqId}] Request complete`);
    })
  );
};