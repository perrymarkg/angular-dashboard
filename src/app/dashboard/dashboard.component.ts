import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../services/loading.service';
import { NoticeService } from '../services/notice.service';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noticeMessage;

  constructor(
    private title: Title, 
    private loading: LoadingService,
    private notice: NoticeService
  ) { 
    this.title.setTitle('Dashboard')
  }

  ngOnInit() {
    this.notice.noticeEmitter.subscribe( result => {
      this.noticeMessage = result
    })
  }

  onNoticeClose(event){
    event.preventDefault();
    this.noticeMessage = false;
  }

}
