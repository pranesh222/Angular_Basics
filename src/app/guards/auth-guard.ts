import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Simulate auth state — in real app this comes from AuthService
let isLoggedIn = false;

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isLoggedIn) {
    return true; // ✅ allow navigation
  }

  // ❌ block navigation, redirect to home with a return URL
  router.navigate([''], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

// Helper to toggle for demo purposes
export const toggleAuth = () => { isLoggedIn = !isLoggedIn; };
export const getAuthState = () => isLoggedIn;