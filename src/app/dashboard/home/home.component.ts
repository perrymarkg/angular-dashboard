import { Component, OnInit } from '@angular/core';
import { fadeInOutMed } from '../../animations/animations';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ fadeInOutMed ]
})
export class HomeComponent implements OnInit {


  constructor() {}

  ngOnInit() {}

}
