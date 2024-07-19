import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable } from 'rxjs';

@Injectable()
export class RateService {

  private rate$ = new BehaviorSubject<number>(1.1);

  constructor() {
    interval(3000).pipe(map(() => this.random(0.05, -0.05))).subscribe({
      next: random => {
        this.rate$.next(this.rate$.value + random);
      }
    });
  }

  private random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  get rate(): Observable<number> {
    return this.rate$.asObservable();
  }
}
