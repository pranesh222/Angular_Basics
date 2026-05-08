import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';
import { loggingInterceptor } from './interceptors/logging-interceptor';
import { retryInterceptor } from './interceptors/retry-interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { PostsEffects } from './store/posts/posts.effects';
import { counterReducer } from './store/counter/counter.reducer';
import { postsReducer } from './store/posts/posts.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([
        authInterceptor,
        loggingInterceptor,
        retryInterceptor,
    ])),
    provideStore(
       { counter: counterReducer,  // ← was missing!
      posts:   postsReducer,}
    ),
    provideEffects([PostsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })

]
};
