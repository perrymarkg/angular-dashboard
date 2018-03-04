import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SettingsModel } from '../models/settings.model';
import { Observable } from '@firebase/util';
import { LoadingService } from '../services/loading.service';
import { grow, fadeInOut } from '../animations/animations';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
  animations: [grow, fadeInOut]
})
export class FrontendComponent implements OnInit {

  settings;
  crumb;
  searchResults;
  timeout;

  constructor(
    private db: DbService,
    private loading: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {

    this.crumb = this.getBlogTitleFromUrl(this.router.url);

    this.router.events.subscribe( events => {
      if ( events instanceof NavigationEnd) {
        this.crumb = this.getBlogTitleFromUrl(events.url);
      }
    });

    this.db.initActiveBlogs();

    if ( Object.keys(this.db.data.settings).length ) {
      this.settings = this.db.data.settings;
      this.loading.toggleLoading(false);
    }

    this.db.dataEmitter.subscribe( results => {
      if ( Object.keys(results.settings).length ) {
        this.settings = results.settings;
        this.loading.toggleLoading(false);
      }
    });

  }

  getBlogTitleFromUrl(url) {
    let title: string = url.split('/').pop();
    title = title.replace(/-/g, ' ');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return title;
  }

  toggleSearch(event: any) {
    this.searchResults = false;

    if ( event.target.value.length !== '' ) {
      clearTimeout(this.timeout);
        this.timeout = setTimeout( () => {
          this.searchResults = this.search(event.target.value);
        }, 500);
    }

  }

  hideSearch() {
    clearTimeout(this.timeout);
    // Give time for the routerLink to process
    this.timeout = setTimeout( () => {
      this.searchResults = false;
    }, 500);

  }

  search(query: string) {
     return this.db.data.activeBlogs.filter( item => {
      return ( item.title.toLowerCase().search(query.toLowerCase()) !== -1
      || item.content.toLowerCase().search(query.toLowerCase())  !== -1 );
    });
  }

}
