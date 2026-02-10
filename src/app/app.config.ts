import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { Noir } from './theme';
import { VoyageComponent } from './voyage.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter([
      {
        path: '**',
        component: VoyageComponent,
      },
    ]),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Noir,
      },
    }),
  ],
};
