import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor() {}

  ngOnInit() {
    // this.sub = interval(1000).subscribe((x) => {
    //   console.log(x);
    // });
    const customIntervalObservable = Observable.create((observer) => {
      let x = 0;
      setInterval(() => {
        observer.next(x);
        if (x === 5) {
          observer.complete();
        }
        if (x > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        x++;
      }, 1000);
    });

    this.sub = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => {
          return 'Round: ' + (data + 1);
        })
      )
      .subscribe(
        (x) => {
          console.log(x);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log('Completed');
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
