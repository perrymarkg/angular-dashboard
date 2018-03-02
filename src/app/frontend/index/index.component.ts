import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  pages;
  constructor( private db: DbService, private title: Title) { }

  ngOnInit() {
    this.db.dataEmitter.subscribe( results => {
      if( results.blogs.length !== 0){
        this.pages = results.blogs;
      }
    })
    //this.pages = this.db.blogsEmitter
    this.title.setTitle('Home');
  }

}
