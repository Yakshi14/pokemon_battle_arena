import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // Ensure this matches the filename app.ts
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));