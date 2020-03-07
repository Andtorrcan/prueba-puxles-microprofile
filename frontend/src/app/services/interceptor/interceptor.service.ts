import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from '@angular/router';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json"),

      });
    }
    request = request.clone({
      url: 'http:localhost:8080/' + request.url
    });
    //console.log(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.router.navigate([""]);
        }else if (error.status == 401) {
          this.router.navigate([""]);
        }
        return throwError(error);
      })
    );
  }
}
