import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() text: string | boolean = false;
  @Input() type: string = 'ui-loading';
  @Input() style: string = 'dark';

  constructor() { }

  ngOnInit() {
  }

}
