import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLoading: boolean = true;
  constructor(private loading: LoadingService){
    this.loading.toggleLoadingEmitter.subscribe( val => this.showLoading = val)
  }
}
