import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from '../../models/page.model';
import { Title } from '@angular/platform-browser';
import { SettingsModel } from '../../models/settings.model';
import { Observable } from 'rxjs/Observable';
import { fadeInOut } from '../../animations/animations';

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations:[fadeInOut]
})
export class BlogComponent implements OnInit {

  blog;
  blogList;
  settings;
  colClass = 'col-md-12'
  slug;

  constructor( 
    private db: DbService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    if( Object.keys(this.db.data.settings).length )
      this.settings = this.db.data.settings
      
    if( Object.keys(this.db.data.blogs).length )
      this.blogList = this.db.data.blogs

    Observable.merge(this.route.params, this.db.dataEmitter).subscribe( result => {
      
      if( result['slug'] )
        this.slug = result['slug'];
      
      if( result['blogs'] && !this.blogList)
        this.blogList = result['blogs'];
      
      if(result['settings'] )
        this.settings = result['settings']

      if( this.slug && this.blogList ){
        
        this.blog = this.findBlogItem(this.slug)
        if( !this.blog )
          this.router.navigate(['../../'], {relativeTo: this.route})
      }

    })
    
    

    this.db.dataEmitter.subscribe( result => {
      if( Object.keys(result.settings).length )
        this.settings = result.settings
      
      if( Object.keys(result.blogs).length )
        this.blogList = result.blogs
    })
    
  }

  findBlogItem(itemSlug: string){
    return this.blogList.find( item => { 
      return item.url_slug === itemSlug && item.active
    })
  }

}
