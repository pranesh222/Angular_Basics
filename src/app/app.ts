import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StructuralDirectives } from './components/structural-directives/structural-directives';
import { ServicesAndDI } from './components/services-and-di/services-and-di';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { getAuthState, toggleAuth } from './guards/auth-guard';
import { RouterDemo } from './components/router-demo/router-demo';
import { HttpDemoComponent } from './components/http-demo/http-demo';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule,StructuralDirectives,ServicesAndDI,RouterOutlet, RouterLink, RouterLinkActive,RouterDemo,HttpDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private router = inject(Router)

  // ── Tab control ────────────────────────────────────────────────
  activeTab = 'binding';

  tabs = [
    { id: 'binding',    label: '1. Data Binding' },
    { id: 'structural', label: '2. Structural Directives' },
    { id: 'attribute',  label: '3. Attribute Directives' },
    { id: 'pipes',      label: '4. Pipes' },
    { id: 'services',    label: '5. Services & DI' },
    { id: 'router',      label: '6. Router' },

    { id: 'http',      label: '7. HTTP' },
    
    
  ];

  setTab(id: string) {
    this.activeTab = id;
  }
  ngDoCheck(){
    console.log('Change detection running... Current tab:', this.activeTab);
  }

  // ── Tab 1: Data Binding ────────────────────────────────────────
  name = 'Pranesh';
  role = 'Angular Developer';
  imageUrl = 'https://i.pravatar.cc/100';
  isDisabled = true;
  clickCount = 0;
  lastKey = '';
  inputValue = '';
  searchText = '';

  onButtonClick() { this.clickCount++; }
  onKeyUp(event: KeyboardEvent) { this.lastKey = event.key; }
  onInputChange(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }
  greetUser(name: string) { alert(`Hello, ${name}!`); }

  // ── Tab 2: Structural Directives ───────────────────────────────
  isLoggedIn = true;
  skills = ['Angular', 'React', 'Python', 'FastAPI', 'TypeScript'];
  products = [
    { id: 1, name: 'Laptop',   price: 999, inStock: true  },
    { id: 2, name: 'Mouse',    price: 29,  inStock: false },
    { id: 3, name: 'Keyboard', price: 79,  inStock: true  },
  ];
  currentRole = 'admin';

  toggleLogin() { this.isLoggedIn = !this.isLoggedIn; }
  removeSkill(index: number) { this.skills.splice(index, 1); }
  trackByProductId(_: number, p: any) { return p.id; }

  // ── Tab 3: Attribute Directives ────────────────────────────────
  isActive = false;
  isAdmin = true;
  alertType = 'success';
  fontSize = 16;
  textColor = '#333333';
  isBold = false;
  notifications = [
    { id: 1, message: 'Build succeeded',   type: 'success', read: false },
    { id: 2, message: 'Disk space low',    type: 'warning', read: true  },
    { id: 3, message: 'Deployment failed', type: 'error',   read: false },
    { id: 4, message: 'PR approved',       type: 'success', read: true  },
  ];

  toggleActive() { this.isActive = !this.isActive; }
  markAsRead(id: number) {
    const n = this.notifications.find(n => n.id === id);
    if (n) n.read = true;
  }

  // ── Tab 4: Pipes ───────────────────────────────────────────────
  pipeDate = new Date();
  pipeAmount = 4599.5;
  pipeText = 'angular pipes are powerful';
  pipeRating = 4.6789;

  get authState() { return getAuthState(); }
toggleAuth()    { toggleAuth(); }

routeToForms(){
  this.router.navigate(['/reactive-forms']);
}
}