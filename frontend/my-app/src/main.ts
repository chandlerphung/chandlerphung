import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { HomeComponent } from './app/pages/home/home';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      // add more routes later
    ]),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
