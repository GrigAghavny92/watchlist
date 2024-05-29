import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {DemoWatchlistService} from "./service/demo-watchlist.service";
import {WatchListService} from "./service/api/watchlist.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, BrowserModule),
    { provide: WatchListService, useClass: DemoWatchlistService }
  ]
};
