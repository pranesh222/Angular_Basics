import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RxjsDemoService } from '../../services/rxjs-demo';
import { Subject, interval, fromEvent, BehaviorSubject, of, forkJoin } from 'rxjs';
import { takeUntil, take, combineLatest, debounceTime, distinctUntilChanged, filter, tap, switchMap, catchError, mergeMap, concatMap, exhaustMap, combineLatestWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.scss'
})
export class RxjsDemoComponent implements OnInit, OnDestroy {
  private rxjsService = inject(RxjsDemoService);
  private http        = inject(HttpClient);

  // ── destroy$ pattern — memory leak prevention ──────────────────
  private destroy$ = new Subject<void>();

  // ── Subject demo ───────────────────────────────────────────────
  subjectLog: string[] = [];
  subjectInput = '';

  // ── BehaviorSubject demo ───────────────────────────────────────
  behaviorLog: string[] = [];
  behaviorInput = '';

  // ── ReplaySubject demo ─────────────────────────────────────────
  replayLog: string[] = [];
  replayInput = '';

  // ── interval demo ─────────────────────────────────────────────
  timerValue = 0;
  timerRunning = false;

   // ── Flattening operators ───────────────────────────────────────
  switchMapLog:  string[] = [];
  mergeMapLog:   string[] = [];
  concatMapLog:  string[] = [];
  exhaustMapLog: string[] = [];
  operatorInput  = '';

  // For exhaustMap — track if active
  exhaustMapActive = false;

    // ── Search with debounce ───────────────────────────────────────
  searchTerm$   = new BehaviorSubject<string>('');
  searchResults: any[] = [];
  searchLoading = false;
  searchInput   = '';

  // ── Combination operators ──────────────────────────────────────
  forkJoinResult:    any = null;
  combineLatestLog:  string[] = [];
  source1$ = new BehaviorSubject<number>(1);
  source2$ = new BehaviorSubject<number>(100);

  ngOnInit() {
    // Subscribe to Subject — only future values
    this.rxjsService.subject
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.subjectLog.push(`[${new Date().toLocaleTimeString()}] ${val}`);
      });

    // Subscribe to BehaviorSubject — gets current value immediately
    this.rxjsService.behavior
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.behaviorLog.push(`[${new Date().toLocaleTimeString()}] ${val}`);
      });

    // Subscribe to ReplaySubject
    this.rxjsService.replay
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.replayLog.push(`[${new Date().toLocaleTimeString()}] ${val}`);
      });

    // Emit some replay values before subscribing in the template demo
    this.rxjsService.emitReplay('past event 1');
    this.rxjsService.emitReplay('past event 2');
    this.rxjsService.emitReplay('past event 3');


        // ── Search with debounce + switchMap ──────────────────────────
    // This is the CLASSIC real-world RxJS pattern
    this.searchTerm$.pipe(
      debounceTime(400),          // wait 400ms after user stops typing
      distinctUntilChanged(),     // ignore if same value as before
      filter(term => term.length >= 2), // min 2 chars
      tap(() => { this.searchLoading = true; }),
      switchMap(term =>           // cancel previous, use latest
        this.http.get<any[]>(
          `https://jsonplaceholder.typicode.com/posts?title=${term}`
        ).pipe(
          catchError(() => of([]))  // empty array on error
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe(results => {
      this.searchResults = results.slice(0, 5);
      this.searchLoading = false;
    });

    // ── combineLatest — emits when ANY source emits ───────────────


    this.source1$.pipe(
  combineLatestWith(this.source2$),
  takeUntil(this.destroy$)
).subscribe(([s1, s2]) => {
  this.combineLatestLog.push(`source1: ${s1}, source2: ${s2}, sum: ${s1 + s2}`);
});
  }

  // ── Subject actions ────────────────────────────────────────────
  emitSubject() {
    if (this.subjectInput) {
      this.rxjsService.emitSubject(this.subjectInput);
      this.subjectInput = '';
    }
  }

  lateSubscribeToSubject() {
    // Late subscriber — misses all past values
    this.rxjsService.subject
      .pipe(take(3)) // auto-complete after 3 values
      .subscribe(val => {
        this.subjectLog.push(`[LATE SUBSCRIBER] ${val}`);
      });
    this.subjectLog.push('--- Late subscriber joined (missed past values) ---');
  }

  // ── BehaviorSubject actions ────────────────────────────────────
  emitBehavior() {
    if (this.behaviorInput) {
      this.rxjsService.emitBehavior(this.behaviorInput);
      this.behaviorInput = '';
    }
  }

  lateSubscribeToBehavior() {
    // Late subscriber — gets LATEST value immediately
    this.rxjsService.behavior
      .pipe(take(2))
      .subscribe(val => {
        this.behaviorLog.push(`[LATE SUBSCRIBER got immediately] ${val}`);
      });
  }

  // ── ReplaySubject actions ──────────────────────────────────────
  emitReplay() {
    if (this.replayInput) {
      this.rxjsService.emitReplay(this.replayInput);
      this.replayInput = '';
    }
  }

  lateSubscribeToReplay() {
    // Late subscriber — gets last 3 buffered values immediately
    this.rxjsService.replay
      .pipe(take(3))
      .subscribe(val => {
        this.replayLog.push(`[LATE got buffered] ${val}`);
      });
    this.replayLog.push('--- Late subscriber joined ---');
  }

  // ── Timer with takeUntil ───────────────────────────────────────
  startTimer() {
    this.timerRunning = true;
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(n => { this.timerValue = n + 1; });
  }

  // ── Cleanup — takeUntil(destroy$) unsubscribes everything ─────
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
   onSearchInput(term: string) {
    this.searchTerm$.next(term);
  }
    // ── switchMap demo — CANCELS previous ─────────────────────────
  testSwitchMap() {
    const val = this.operatorInput || 'value';
    this.switchMapLog.push(`📤 Emitting: "${val}" — cancels previous request`);

    of(val).pipe(
      switchMap(v => {
        this.switchMapLog.push(`  ↳ Starting API call for "${v}"...`);
        return this.rxjsService.fakeApiCall(v, 2000);
      }),
      take(1)
    ).subscribe(result => {
      this.switchMapLog.push(`  ✅ ${result}`);
    });
  }

  // ── mergeMap demo — RUNS all concurrently ─────────────────────
  testMergeMap() {
    const val = this.operatorInput || 'value';
    this.mergeMapLog.push(`📤 Emitting: "${val}" — runs alongside others`);

    of(val).pipe(
      mergeMap(v => {
        this.mergeMapLog.push(`  ↳ Starting concurrent call for "${v}"...`);
        return this.rxjsService.fakeApiCall(v, 2000);
      }),
      take(1)
    ).subscribe(result => {
      this.mergeMapLog.push(`  ✅ ${result}`);
    });
  }

  // ── concatMap demo — QUEUES sequentially ──────────────────────
  testConcatMap() {
    const val = this.operatorInput || 'value';
    this.concatMapLog.push(`📤 Queuing: "${val}" — waits for previous`);

    of(val).pipe(
      concatMap(v => {
        this.concatMapLog.push(`  ↳ Processing "${v}" (waiting if busy)...`);
        return this.rxjsService.fakeApiCall(v, 1500);
      }),
      take(1)
    ).subscribe(result => {
      this.concatMapLog.push(`  ✅ ${result}`);
    });
  }

  // ── exhaustMap demo — IGNORES while active ────────────────────
  testExhaustMap() {
    if (this.exhaustMapActive) {
      this.exhaustMapLog.push(`🚫 IGNORED — request already active`);
      return;
    }

    this.exhaustMapActive = true;
    const val = this.operatorInput || 'value';
    this.exhaustMapLog.push(`📤 Starting: "${val}" — ignoring clicks until done`);

    of(val).pipe(
      exhaustMap(v => {
        return this.rxjsService.fakeApiCall(v, 3000);
      }),
      take(1)
    ).subscribe({
      next: result => {
        this.exhaustMapLog.push(`  ✅ ${result}`);
        this.exhaustMapActive = false;
      }
    });
  }

  // ── forkJoin — wait for ALL to complete ───────────────────────
  testForkJoin() {
    this.forkJoinResult = 'Loading...';
    forkJoin({
      posts:  this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts?_limit=3'),
      users:  this.http.get<any[]>('https://jsonplaceholder.typicode.com/users?_limit=3'),
      todos:  this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos?_limit=3'),
    }).pipe(takeUntil(this.destroy$))
      .subscribe(results => {
        this.forkJoinResult = {
          posts: results.posts.length,
          users: results.users.length,
          todos: results.todos.length,
        };
      });
  }

  // ── combineLatest sources ─────────────────────────────────────
  updateSource1(val: number) { this.source1$.next(val); }
  updateSource2(val: number) { this.source2$.next(val); }

}