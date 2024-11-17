import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { JwtModule } from '@auth0/angular-jwt';
export function tokenGetter() {
  return sessionStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['closetlabbackend.onrender.com'],
          disallowedRoutes: ['https://closetlabbackend.onrender.com/landing/forget'],
        },
      })
    ), provideAnimationsAsync(),
  ]
    
};
