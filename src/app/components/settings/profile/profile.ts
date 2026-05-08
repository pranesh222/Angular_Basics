import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="margin-top: 16px;">
      <div class="card-title">👤 Profile Settings</div>

      <div class="form-row" style="flex-direction: column; gap: 12px;">
        <div>
          <label>Full Name</label>
          <input [(ngModel)]="profile.name" placeholder="Full name" />
        </div>
        <div>
          <label>Email</label>
          <input [(ngModel)]="profile.email" placeholder="Email" />
        </div>
        <div>
          <label>Bio</label>
          <input [(ngModel)]="profile.bio" placeholder="Short bio" />
        </div>
        <button (click)="save()">Save Profile</button>
      </div>

      <p class="note">
        This is a CHILD route of /settings — rendered inside
        Settings component's router-outlet.
      </p>
    </div>
  `
})
export class ProfileComponent {
  profile = {
    name:  'Pranesh',
    email: 'pranesh@example.com',
    bio:   'Angular Developer'
  };

  save() { alert('Profile saved: ' + JSON.stringify(this.profile)); }
}