import { LoginService } from '../service/login.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getToken();
    const noAuthRoutes = ['/api/customer', '/users/save','api/Employer'];

    // Check if the request URL matches any no-auth route
    const isNoAuthRoute = noAuthRoutes.some(route => request.url.includes(route));

    if (token && !isNoAuthRoute) {
      console.log("Intercepto!!");
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Token added to request:', cloned.headers.get('Authorization'));
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Forbidden) {
            alert("NO TIENES PERMISOS!");
            return EMPTY;
          } else {
            return throwError(() => error);
          }
        })
      );
    }

    return next.handle(request);
  }
}
