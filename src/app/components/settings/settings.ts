import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="card">
      <div class="card-title">⚙️ Settings</div>

      <!-- Child route navigation -->
      <div class="tab-bar">
        <a routerLink="profile"
           routerLinkActive="active"
           class="tab-btn">Profile</a>
        <a routerLink="account"
           routerLinkActive="active"
           class="tab-btn">Account</a>
      </div>

      <!-- Child routes render here — nested router-outlet -->
      <router-outlet></router-outlet>
    </div>
  `
})
export class SettingsComponent { }