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

  blogs;
  constructor( private db: DbService, private title: Title) { }

  ngOnInit() {
    if( Object.keys(this.db.data.blogs).length )
      this.blogs = this.db.data.blogs

    this.db.dataEmitter.subscribe( results => {
      if( Object.keys(results.blogs).length ){
        this.blogs = results.blogs;
      }
    })
    this.title.setTitle('Home');
  }

}
