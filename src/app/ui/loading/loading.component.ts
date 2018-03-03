import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {


  @Input() text: string | boolean = false;
  @Input() type: string = 'ui-loading';
  @Input() style: string = 'dark';
  timeout;
  constructor() { }

  ngOnInit() {
    clearTimeout(this.timeout)

    this.timeout = setInterval( () => {
      this.text = '<br/>Error occured while connecting to google firebase. <br/>Please restart the app or try again in a while'
    }, 10000)
  }

  ngOnDestroy(){
    clearTimeout(this.timeout)
  }

}
