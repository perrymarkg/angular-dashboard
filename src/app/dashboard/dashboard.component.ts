import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private title: Title, private loading: LoadingService) { 
    this.title.setTitle('Dashboard')
  }

  ngOnInit() {
    
  }

}
