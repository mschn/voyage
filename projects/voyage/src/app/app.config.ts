import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { VoyageComponent } from './voyage.component';
import { Noir } from './theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
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
