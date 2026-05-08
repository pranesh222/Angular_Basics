import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toggleAuth, getAuthState } from '../../guards/auth-guard';
import { inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-title">🔒 Dashboard — Protected Route</div>
      <p>You are logged in! This page is protected by authGuard.</p>
      <button (click)="logout()">Logout & go home</button>
    </div>
  `
})
export class DashboardComponent {
  private router = inject(Router);

  logout() {
    toggleAuth(); // sets isLoggedIn = false
    this.router.navigate(['']);
  }
}