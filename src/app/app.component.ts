import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WatchlistComponent} from "./components/watchlist/watchlist.component";
import {LoadingComponent} from "./components/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    WatchlistComponent,
    LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo-app';
}
