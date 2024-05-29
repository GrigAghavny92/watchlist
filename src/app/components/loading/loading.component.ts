import {Component} from '@angular/core';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@Component({
  selector: 'loading',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent{
}
