import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { VoyageComponent } from './app/voyage.component';

bootstrapApplication(VoyageComponent, appConfig).catch((err) =>
  console.error(err),
);
