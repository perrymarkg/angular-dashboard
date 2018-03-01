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

  pages: Observable<any> | boolean = false;
  constructor( private db: DbService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Home');
    this.pages = this.db.getAllBlogs();
  }

}
