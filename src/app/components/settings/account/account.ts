import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div style="margin-top: 16px;">
      <div class="card-title">🔐 Account Settings</div>

      <div class="form-row" style="flex-direction: column; gap: 12px;">

        <div>
          <label>Current Password</label>
          <input type="password" [(ngModel)]="passwords.current"
                 placeholder="Current password" />
        </div>
        <div>
          <label>New Password</label>
          <input type="password" [(ngModel)]="passwords.newPass"
                 placeholder="New password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" [(ngModel)]="passwords.confirm"
                 placeholder="Confirm password" />
          <span class="badge error" *ngIf="passwordMismatch">
            Passwords do not match!
          </span>
        </div>

        <button [disabled]="passwordMismatch" (click)="changePassword()">
          Change Password
        </button>

        <hr style="margin: 8px 0;" />

        <div class="card" style="background: #fff0f0; border-color: #f5c6cb;">
          <div class="card-title" style="color: #721c24;">⚠️ Danger Zone</div>
          <p style="font-size: 13px; color: #721c24; margin-bottom: 10px;">
            Deleting your account is irreversible.
          </p>
          <button class="danger" (click)="deleteAccount()">Delete Account</button>
        </div>

      </div>

      <p class="note">
        Sibling child route to /settings/profile — both share
        the Settings parent layout without re-rendering it.
      </p>
    </div>
  `
})
export class AccountComponent {
  passwords = {
    current: '',
    newPass: '',
    confirm: ''
  };

  get passwordMismatch(): boolean {
    return this.passwords.newPass.length > 0 &&
           this.passwords.newPass !== this.passwords.confirm;
  }

  changePassword() {
    if (!this.passwords.current || !this.passwords.newPass) {
      alert('Please fill in all fields.');
      return;
    }
    alert('Password changed successfully!');
    this.passwords = { current: '', newPass: '', confirm: '' };
  }

  deleteAccount() {
    if (confirm('Are you sure? This cannot be undone.')) {
      alert('Account deleted. (Demo only)');
    }
  }
}