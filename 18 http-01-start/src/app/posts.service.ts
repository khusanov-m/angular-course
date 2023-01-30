import { Post } from './post.model';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>(
        'https://angular-course-60a46-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [k: string]: Post }>(
        'https://angular-course-60a46-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json',
        }
      )
      .pipe(
        map(
          (res) => {
            const posts: Post[] = [];
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                posts.push({ ...res[key], id: key });
              }
            }
            return posts;
          },
          catchError((errorRes) => {
            // Send to analytics server
            return throwError(errorRes);
          })
        )
      );
  }

  deletePosts() {
    return this.http
      .delete(
        'https://angular-course-60a46-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
          responseType: 'text',
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
