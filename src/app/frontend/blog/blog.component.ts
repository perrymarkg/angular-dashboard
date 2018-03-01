import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from '../../models/page.model';
import { Title } from '@angular/platform-browser';
import { SettingsModel } from '../../models/settings.model';

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blog;
  blogList;
  settings;
  

  urlSlug: string;

  constructor( 
    private db: DbService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    
   }

  ngOnInit() {
    this.urlSlug = this.route.snapshot.params['slug']
    this.db.getBlogByUrlSlug( this.urlSlug ).subscribe( result => {
      this.blog = result;
      this.title.setTitle(this.blog.title)
    })
    this.db.getSettings().subscribe(result => {
      this.settings = result;
    })
    this.blogList = this.db.getAllBlogs();    
  }

}
