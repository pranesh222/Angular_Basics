import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorService, CalculationResult } from '../../services/calculator';

@Component({
  selector: 'app-testing-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testing-demo.html',
  styleUrl: './testing-demo.scss'
})
export class TestingDemoComponent {
  private calculatorService = inject(CalculatorService);

  a = signal(0);
  b = signal(0);
  result = signal<number | null>(null);
  error  = signal('');
  history = signal<CalculationResult[]>([]);

  calculate(operation: string) {
    this.error.set('');
    try {
      let res: number;
      switch (operation) {
        case 'add':      res = this.calculatorService.add(this.a(), this.b());      break;
        case 'subtract': res = this.calculatorService.subtract(this.a(), this.b()); break;
        case 'multiply': res = this.calculatorService.multiply(this.a(), this.b()); break;
        case 'divide':   res = this.calculatorService.divide(this.a(), this.b());   break;
        default: return;
      }
      this.result.set(res);
      this.history.set(this.calculatorService.getHistory());
    } catch (e: any) {
      this.error.set(e.message);
      this.result.set(null);
    }
  }

  clearHistory() {
    this.calculatorService.clearHistory();
    this.history.set([]);
    this.result.set(null);
  }
}