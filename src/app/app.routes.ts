import { Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { StructuralDirectives } from './components/structural-directives/structural-directives';
import { App } from './app';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: App },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'structural-directive', component: StructuralDirectives },
     { path: 'product/:id', component: UserProfileComponent },

  // Route with OPTIONAL query params — /products?category=Electronics
  // Query params don't need to be declared in routes
  { path: 'products', component: StructuralDirectives },

  // PROTECTED route — guard runs before component loads
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/dashboard/dashboard')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'reactive-forms',
    loadComponent: () =>
      import('./components/reactive-forms/reactive-forms')
        .then(m => m.ReactiveForms)
  },
  { path: 'rxjs', loadComponent: () => import('./components/rxjs-demo/rxjs-demo').then(m => m.RxjsDemoComponent) },
  // app.routes.ts

{ path: 'forms', loadComponent: () =>
    import('./components/forms-demo/forms-demo').then(m => m.FormsDemoComponent) },

    { path: 'ngrx', loadComponent: () =>
    import('./components/ngrx-demo/ngrx-demo').then(m => m.NgrxDemoComponent) },
    
    // app.routes.ts
{ path: 'performance', loadComponent: () =>
    import('./components/change-detection-demo/change-detection-demo')
    .then(m => m.ChangeDetectionDemoComponent) },


  // NESTED / CHILD routes — /dashboard/profile, /dashboard/settings
  {
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/settings')
        .then(m => m.SettingsComponent),
    children: [
      { path: '',         redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile',  loadComponent: () => import('./components/settings/profile/profile').then(m => m.ProfileComponent) },
      { path: 'account',  loadComponent: () => import('./components/settings/account/account').then(m => m.AccountComponent) },
    ]
  },

  // REDIRECT
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // WILDCARD — must always be last
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found')
        .then(m => m.NotFoundComponent)
  },
];
