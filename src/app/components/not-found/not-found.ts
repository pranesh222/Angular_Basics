import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="card" style="text-align:center; padding: 40px;">
      <h1 style="font-size:64px; color:#2E75B6;">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button (click)="goHome()">Go Home</button>
    </div>
  `
})
export class NotFoundComponent {
  private router = inject(Router);
  goHome() { this.router.navigate(['']); }
}