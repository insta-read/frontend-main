import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './area/services/api.interceptor';
import { authInterceptor } from './area/services/auth-services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(withInterceptors([apiInterceptor, authInterceptor])), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
