import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CalculationResult {
  operation: string;
  a: number;
  b: number;
  result: number;
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private http = inject(HttpClient);
  private history: CalculationResult[] = [];

  // ── Pure methods — easy to unit test ──────────────────────────
  add(a: number, b: number): number {
    const result = a + b;
    this.history.push({ operation: 'add', a, b, result });
    return result;
  }

  subtract(a: number, b: number): number {
    const result = a - b;
    this.history.push({ operation: 'subtract', a, b, result });
    return result;
  }

  multiply(a: number, b: number): number {
    const result = a * b;
    this.history.push({ operation: 'multiply', a, b, result });
    return result;
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero is not allowed');
    const result = a / b;
    this.history.push({ operation: 'divide', a, b, result });
    return result;
  }

  getHistory(): CalculationResult[] {
    return [...this.history]; // return copy — immutable
  }

  clearHistory(): void {
    this.history = [];
  }

  // ── HTTP method — needs HttpClientTestingModule ────────────────
  getRandomFact(number: number): Observable<string> {
    return this.http
      .get<{ text: string }>(`http://numbersapi.com/${number}?json`)
      .pipe(map(res => res.text));
  }
}

// Add missing inject import
import { inject } from '@angular/core';