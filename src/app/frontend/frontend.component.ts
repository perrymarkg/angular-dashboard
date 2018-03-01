import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PageModel } from '../models/page.model';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  
  pageObj: AngularFireList<any>;
  pages: Observable<any> | boolean = false;

  constructor(private db: DbService) { }

  ngOnInit() {
    this.db.getBlogByTitle('Here we').subscribe( result => {
      console.log(result);
    })
    this.pages = this.db.getAllBlogs();
    /* this.pageObj = this.db.getObject('pages')
    this.pages = this.pageObj.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }) */
  }

}
