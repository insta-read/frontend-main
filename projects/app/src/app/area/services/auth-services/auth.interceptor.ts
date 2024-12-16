import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Clone the request to include credentials
  const modifiedReq = req.clone({ withCredentials: true });

  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Navigate to login if unauthorized
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};