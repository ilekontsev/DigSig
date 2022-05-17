import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthApiService } from '../services/auth-api.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
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
         if (err instanceof HttpErrorResponse) {
           if(err.status === 401) {
            return this.handle401Error(authReq, next);
           }else {
            return throwError(err);
            }
         }
         return of(err);
       })
     )
   }
   private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);
    
    return this.authApiService.refreshToken().pipe(
    switchMap((token: any) => {
    this.isRefreshing = false;
    this.refreshTokenSubject.next(token.token);
    return next.handle(this.addToken(request, token.access_token));
    }),
    );
    } else {
    return this.refreshTokenSubject.pipe(
    filter((token) => token != null),
    take(1),
    switchMap((jwt) => {
    return next.handle(this.addToken(request, jwt));
    }),
    );
    }
    }

    private addToken(request: HttpRequest<any>, token: string) {
      const url = request.urlWithParams;
      if (url.includes('?')) {
      const origin = url.split('?')[0];
      const httpParams = new HttpParams({ fromString: url.split('?')[1] }).set('access_token', token);
      return request.clone({ url: origin, params: httpParams });
      }
      return request.clone({ url: this.setAccessTokenUrl(request.url, token) });
      }

      private setAccessTokenUrl(url: string, token: string): string {
        return `${url}${url.includes('?') ? '&' : '?'}access_token=${token}`;
        }
}