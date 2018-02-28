import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service'
import { PageModel } from '../../models/page.model'
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  pages: Observable<any> | boolean = false;

  constructor(private db: DbService) { }

  ngOnInit() {
    this.pages = this.db.getBlogs();
  }

}
