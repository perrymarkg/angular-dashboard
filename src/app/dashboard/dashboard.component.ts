import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../services/loading.service';
import { NoticeService } from '../services/notice.service';
import { Router, NavigationEnd } from '@angular/router';
import { fadeInOut, flyInFromLeft } from '../animations/animations';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [fadeInOut, flyInFromLeft]
})
export class DashboardComponent implements OnInit {

  noticeMessage;

  constructor(
    private title: Title,
    private loading: LoadingService,
    private notice: NoticeService,
    private router: Router,
    private db: DbService
  ) {
    this.title.setTitle('Dashboard');
  }

  ngOnInit() {

    this.db.initBlogs();

    this.router.events.subscribe( event => {
      if ( event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.notice.noticeEmitter.subscribe( result => {
      this.noticeMessage = result;
      setTimeout( () => { this.noticeMessage = false; }, 2500);
    });

  }

  onNoticeClose(event) {
    event.preventDefault();
    this.noticeMessage = false;
  }

}
