import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient) {}

  register(userDetails: { email: string; password: string; name?: string }) {
    return this.http.post('/api/register', userDetails);
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post('/api/login', credentials, { withCredentials: true })
      .pipe(tap(() => this.isAuthenticated.next(true)));
  }

  logout() {
    return this.http
      .post('/api/logout', {}, { withCredentials: true })
      .pipe(tap(() => this.isAuthenticated.next(false)));
  }

  checkAuthStatus() {
    return this.http.get('/api/check-auth', { withCredentials: true }).pipe(
      tap(() => this.isAuthenticated.next(true)),
      tap({
        error: () => this.isAuthenticated.next(false),
      })
    );
  }
}