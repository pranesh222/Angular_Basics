import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, of, delay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RxjsDemoService {

  // ── Subject ────────────────────────────────────────────────────
  // Plain event emitter — subscribers only get FUTURE values
  // New subscriber misses everything emitted before subscription
  private subject$ = new Subject<string>();
  subject = this.subject$.asObservable();
  emitSubject(val: string) { this.subject$.next(val); }

  // ── BehaviorSubject ────────────────────────────────────────────
  // Stores LATEST value — new subscribers get it immediately
  // Must have an initial value
  private behavior$ = new BehaviorSubject<string>('initial value');
  behavior = this.behavior$.asObservable();
  get behaviorValue() { return this.behavior$.getValue(); } // sync read
  emitBehavior(val: string) { this.behavior$.next(val); }

  // ── ReplaySubject ──────────────────────────────────────────────
  // Replays last N values to new subscribers
  // No initial value needed
  private replay$ = new ReplaySubject<string>(3); // buffer last 3
  replay = this.replay$.asObservable();
  emitReplay(val: string) { this.replay$.next(val); }

   fakeApiCall(value: string, delayMs: number): Observable<string> {
    return of(`Result for: "${value}"`).pipe(
      delay(delayMs),
      tap(() => console.log(`✅ API call completed for: ${value}`))
    );
  }
}