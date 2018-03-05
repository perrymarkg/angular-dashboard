import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private loading: LoadingService, private title: Title) {
    this.loading.toggleLoading(false);
  }

  ngOnInit() {
    this.title.setTitle('Page Not Found');
  }

}
