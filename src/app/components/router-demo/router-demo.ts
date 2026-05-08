import { Component } from '@angular/core';
import { getAuthState, toggleAuth } from '../../guards/auth-guard';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-router-demo',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './router-demo.html',
  styleUrl: './router-demo.scss',
})
export class RouterDemo {
get authState() { return getAuthState(); }
toggleAuth()    { toggleAuth(); }

}
