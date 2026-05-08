import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCdComponent } from '../default-cd/default-cd';
import { OnpushCdComponent } from '../onpush-cd/onpush-cd';

@Component({
  selector: 'app-change-detection-demo',
  standalone: true,
  imports: [CommonModule, DefaultCdComponent, OnpushCdComponent],
  template: `
    <div>
      <h2>⚡ Change Detection Demo</h2>

      <div class="card">
        <div class="card-title">Trigger Change Detection</div>

        <!-- Unrelated button — triggers CD on Default, not OnPush -->
        <button (click)="unrelatedClick()">
          Unrelated Click ({{ clickCount() }})
        </button>

        <!-- Mutate object — OnPush WON'T detect (same reference) -->
        <button (click)="mutateName()" class="ml">
          Mutate Name (bad for OnPush)
        </button>

        <!-- Replace object — OnPush WILL detect (new reference) -->
        <button (click)="replaceName()" class="ml">
          Replace Name (good for OnPush)
        </button>
      </div>

      <!-- Default — checks every click -->
      <app-default-cd [user]="currentUser"></app-default-cd>

      <!-- OnPush — only checks on @Input reference change -->
      <app-onpush-cd [user]="currentUser"></app-onpush-cd>
    </div>
  `
})
export class ChangeDetectionDemoComponent {
  clickCount = signal(0);
  currentUser = { name: 'Pranesh' };

  unrelatedClick() {
    this.clickCount.update(n => n + 1);
    // Default CD checks both components
    // OnPush CD skips — no @Input changed
  }

  mutateName() {
    // ❌ Bad for OnPush — SAME object reference
    // OnPush won't detect this change!
    this.currentUser.name = 'Mutated Name';
  }

  replaceName() {
    // ✅ Good for OnPush — NEW object reference
    // OnPush WILL detect and re-render
    this.currentUser = { ...this.currentUser, name: 'Replaced Name' };
  }
}