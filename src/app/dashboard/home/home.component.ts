import { Component, OnInit } from '@angular/core';
import { fadeInOut, fadeInOutCustom } from '../../animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOut, fadeInOutCustom()]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
