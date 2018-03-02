import { Component, OnInit } from '@angular/core';
import { fadeInOutCustom } from '../../animations/animations';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOutCustom()]
})
export class HomeComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
    
  }

}
