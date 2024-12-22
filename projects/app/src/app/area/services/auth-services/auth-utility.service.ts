import { HttpClient } from '@angular/common/http';
import { Globals } from 'projects/common/src/lib/services/global';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';

export class AuthService {
  private logging = false;

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {
    this.listenForRefreshTokenExpired();
    this.listenForLogout();
    this.listenForGoToLoginPage();
  }

  triggerAuthorizationFlow = () => {};

  // Exchange Authorization Code for Access Token
  async getAccessTokenFromAuthorizationCode(
    code: string,
    state: string
  ): Promise<void> {
    if (this.logging) return;

    this.logging = true;
    const codeVerifier = this.cookieService.get('code_verifier');
    if (!codeVerifier) {
      this.logout('Missing code_verifier');
      return;
    }

    try {
      const tokenResponse = await this.http
        .post('<TOKEN_ENDPOINT>', {
          client_id: '<CLIENT_ID>',
          grant_type: 'authorization_code',
          code,
          code_verifier: codeVerifier,
          redirect_uri: '<REDIRECT_URI>',
        })
        .toPromise();

      this.saveTokens(tokenResponse);
      this.sharedService.broadcast({ name: 'login', obj: true });
      window.location.href = state || '/';
    } catch (error) {
      console.error('Token exchange failed:', error);
      this.logout();
    } finally {
      this.logging = false;
    }
  }

  // Authenticate the user
  async authenticate(): Promise<void> {
    const authData = this.cookieService.get('auth');
    if (authData) {
      this.globals.auth_data = JSON.parse(authData);
      return;
    }

    try {
      const token = this.cookieService.get('access_token');
      if (token) {
        this.globals.auth_data = this.decodeToken(token);
      } else {
        this.triggerAuthorizationFlow();
      }
    } catch {
      this.triggerAuthorizationFlow();
    }
  }

  // Refresh Access Token
  async refreshToken(): Promise<void> {
    const refreshToken = this.cookieService.get('refresh_token');
    if (!refreshToken) {
      this.logout('Missing refresh_token');
      return;
    }

    try {
      const tokenResponse = await this.http
        .post('<TOKEN_ENDPOINT>', {
          client_id: '<CLIENT_ID>',
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        })
        .toPromise();

      this.saveTokens(tokenResponse);
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
    }
  }

  // Logout user
  logout(reason?: string): void {
    this.cookieService.delete('auth');
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    this.sharedService.broadcast({
      name: 'logout',
      obj: reason || 'User logged out',
    });
    window.location.href = '<LOGIN_PAGE>';
  }

  // Private helper methods
  private saveTokens(tokenResponse: any): void {
    const { access_token, refresh_token } = tokenResponse;
    this.cookieService.set('access_token', access_token);
    this.cookieService.set('refresh_token', refresh_token);
    this.globals.auth_data = this.decodeToken(access_token);
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  private listenForRefreshTokenExpired(): void {
    this.sharedService.on('refreshTokenExpired', () =>
      this.logout('Token expired')
    );
  }

  private listenForLogout(): void {
    this.sharedService.on('logout', () => this.logout());
  }

  private listenForGoToLoginPage(): void {
    this.sharedService.on('goToLoginPage', () => {
      window.location.href = '<LOGIN_PAGE>';
    });
  }
}
