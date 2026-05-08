import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StructuralDirectives } from '../structural-directives/structural-directives';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfileComponent {

  // ── Interpolation ──────────────────────────────────────────────
  name = 'Pranesh';
  role = 'Angular Developer';

  // ── Property binding ───────────────────────────────────────────
  imageUrl = 'https://i.pravatar.cc/100';
  isDisabled = true;

  // ── Event binding ──────────────────────────────────────────────
  clickCount = 0;
  lastKey = '';
  inputValue = '';

  // ── Two-way binding ────────────────────────────────────────────
  searchText = '';

  // ── Template reference variable ────────────────────────────────
  // (no class property needed — handled entirely in template)

  // ── Methods ────────────────────────────────────────────────────
  onButtonClick() {
    this.clickCount++;
  }

  onKeyUp(event: KeyboardEvent) {
    this.lastKey = event.key;
  }

  onInputChange(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  greetUser(name: string) {
    alert(`Hello, ${name}!`);
  }
}