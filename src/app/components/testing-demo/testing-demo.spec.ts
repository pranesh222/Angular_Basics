import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting }
  from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CalculatorService } from '../../services/calculator';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service  = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service.clearHistory();
  });

  // ══════════════════════════════════════════════════════════════
  // Existence
  // ══════════════════════════════════════════════════════════════
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ══════════════════════════════════════════════════════════════
  // add()
  // ══════════════════════════════════════════════════════════════
  describe('add()', () => {
    it('should add two positive numbers', () => {
      expect(service.add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(service.add(-2, -3)).toBe(-5);
    });

    it('should add zero', () => {
      expect(service.add(5, 0)).toBe(5);
    });
  });

  // ══════════════════════════════════════════════════════════════
  // subtract()
  // ══════════════════════════════════════════════════════════════
  describe('subtract()', () => {
    it('should subtract correctly', () => {
      expect(service.subtract(10, 3)).toBe(7);
    });

    it('should return negative when b > a', () => {
      expect(service.subtract(3, 10)).toBe(-7);
    });
  });

  // ══════════════════════════════════════════════════════════════
  // multiply()
  // ══════════════════════════════════════════════════════════════
  describe('multiply()', () => {
    it('should multiply two numbers', () => {
      expect(service.multiply(4, 5)).toBe(20);
    });

    it('should return zero when multiplying by zero', () => {
      expect(service.multiply(5, 0)).toBe(0);
    });
  });

  // ══════════════════════════════════════════════════════════════
  // divide()
  // ══════════════════════════════════════════════════════════════
  describe('divide()', () => {
    it('should divide correctly', () => {
      expect(service.divide(10, 2)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(service.divide(10, 3)).toBeCloseTo(3.333);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => service.divide(10, 0))
        .toThrowError('Division by zero is not allowed');
    });
  });

  // ══════════════════════════════════════════════════════════════
  // getHistory()
  // ══════════════════════════════════════════════════════════════
  describe('getHistory()', () => {
    it('should record operations in history', () => {
      service.add(2, 3);
      service.multiply(4, 5);

      const history = service.getHistory();

      expect(history.length).toBe(2);
      expect(history[0]).toEqual({
        operation: 'add', a: 2, b: 3, result: 5
      });
      expect(history[1]).toEqual({
        operation: 'multiply', a: 4, b: 5, result: 20
      });
    });

    it('should return a copy — not the original array', () => {
      service.add(1, 2);
      const history = service.getHistory();
      history.push({ operation: 'fake', a: 0, b: 0, result: 0 });

      expect(service.getHistory().length).toBe(1);
    });
  });

  // ══════════════════════════════════════════════════════════════
  // clearHistory()
  // ══════════════════════════════════════════════════════════════
  describe('clearHistory()', () => {
    it('should clear all history', () => {
      service.add(1, 2);
      service.subtract(5, 3);
      service.clearHistory();

      expect(service.getHistory().length).toBe(0);
    });
  });

  // ══════════════════════════════════════════════════════════════
  // getRandomFact() — HTTP testing
  // ══════════════════════════════════════════════════════════════
  describe('getRandomFact()', () => {
    it('should fetch a fact for a number', () => {
      const mockResponse = { text: '42 is the answer to life.' };
      let result = '';

      service.getRandomFact(42).subscribe(fact => {
        result = fact;
      });

      const req = httpMock.expectOne('http://numbersapi.com/42?json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(result).toBe('42 is the answer to life.');
    });

    it('should handle HTTP error gracefully', () => {
      let errorOccurred = false;

      service.getRandomFact(42).subscribe({
        next: () => {},
        error: () => { errorOccurred = true; }
      });

      const req = httpMock.expectOne('http://numbersapi.com/42?json');
      req.flush('Server error', {
        status: 500, statusText: 'Internal Server Error'
      });

      expect(errorOccurred).toBe(true);
    });
  });
});