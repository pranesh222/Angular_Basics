import { Component, Input, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-cd',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-title">Default Change Detection</div>
      <p>Name: <strong>{{ user.name }}</strong></p>
      <p>Check count: <strong>{{ checkCount }}</strong></p>
      <p class="note">
        Runs on EVERY event anywhere in the app — even unrelated ones
      </p>
    </div>
  `
})
export class DefaultCdComponent implements DoCheck {
  @Input() user = { name: 'Pranesh' };

  checkCount = 0;

  // ngDoCheck fires on every CD cycle — perfect for counting
  ngDoCheck() {
    this.checkCount++;
    console.log('DefaultCD: checking... count =', this.checkCount);
  }
}