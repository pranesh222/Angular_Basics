import { Component, Input, ChangeDetectionStrategy,
         ChangeDetectorRef, DoCheck, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onpush-cd',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <div class="card-title">OnPush Change Detection</div>
      <p>Name: <strong>{{ user.name }}</strong></p>
      <p>Check count: <strong>{{ checkCount }}</strong></p>
      <button (click)="manualCheck()">Force Check</button>
      <p class="note">
        Only runs when: @Input reference changes, async pipe emits,
        event inside THIS component, or markForCheck() called
      </p>
    </div>
  `
})
export class OnpushCdComponent implements DoCheck {
  @Input() user = { name: 'Pranesh' };
  private cdr = inject(ChangeDetectorRef);

  checkCount = 0;

  // ngDoCheck fires when CD runs on this component
  ngDoCheck() {
    this.checkCount++;
    console.log('OnPushCD: checking... count =', this.checkCount);
  }

  manualCheck() {
    this.cdr.markForCheck();
  }
}