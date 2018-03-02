import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../services/loading.service';
import { NoticeService } from '../services/notice.service';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate('200ms', style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate('200ms', style({opacity:0})) 
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  noticeMessage;

  constructor(
    private title: Title, 
    private loading: LoadingService,
    private notice: NoticeService,
    private router: Router
  ) { 
    this.title.setTitle('Dashboard')
  }

  ngOnInit() {
    this.router.events.subscribe( event => {
      if( event instanceof NavigationEnd)
        window.scrollTo(0, 0)
    })
    this.notice.noticeEmitter.subscribe( result => {
      this.noticeMessage = result
      setTimeout( () => { this.noticeMessage = false }, 2500)
    })
  }

  onNoticeClose(event){
    event.preventDefault();
    this.noticeMessage = false;
  }

}
