import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-structural-directives',
  imports: [CommonModule,FormsModule],
  templateUrl: './structural-directives.html',
  styleUrl: './structural-directives.scss',
})
export class StructuralDirectives {
    // ── ngIf data ──────────────────────────────────────────────────
  isLoggedIn = true;
  user = { name: 'Pranesh', age: 25 };

  // ── ngFor data ─────────────────────────────────────────────────
  skills = ['Angular', 'React', 'Python', 'FastAPI', 'TypeScript'];

  products = [
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Mouse',  price: 29,  inStock: false },
    { id: 3, name: 'Keyboard', price: 79, inStock: true },
  ];

  // ── ngSwitch data ──────────────────────────────────────────────
  currentRole = 'admin';

  // ── methods ────────────────────────────────────────────────────
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }
trackByProductId(index: number, product: any): number {
  return product.id;
} 

}
