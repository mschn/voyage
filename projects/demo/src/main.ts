import { bootstrapApplication } from '@angular/platform-browser';
import { DemoComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(DemoComponent, appConfig).catch((err) =>
  console.error(err),
);
