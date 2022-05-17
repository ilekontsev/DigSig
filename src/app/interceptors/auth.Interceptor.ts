import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { AuthApiService } from '../services/auth-api.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authApiService: AuthApiService) {

  }

   intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
      .set('token', localStorage.getItem('token') || "")
  });
     return next.handle(authReq)
     .pipe(
       catchError(err => {
         const clonedReq = req.clone();
         if (err instanceof HttpErrorResponse) {
           if(err.status === 401) {
             //call refresh token
           }
         }
         return of(err);
       })
     )
   }
}
