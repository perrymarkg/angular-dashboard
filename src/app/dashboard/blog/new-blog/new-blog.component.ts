import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from '../../../models/page.model'
import { DbService } from '../../../services/db.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  options = {
    show: false,
    editMode: false,
    pageTitle: 'New Blog',
    btnTitle: 'Save',
    submitDisabled: false
  }

  pageId: string;
  page: PageModel = new PageModel();
  obj: AngularFireList<any>;
  pageObj = {};

  constructor(
    private db: DbService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.route.params
    .map( param => {
      
      if( param.id ){
        this.pageId = param.id;
        this.obj = this.db.getObject('pages/'+param.id)
        this.obj.snapshotChanges()
        .subscribe( result => {
          if( !result.length )
            this.router.navigate(['../../'], {relativeTo:this.route})
            
          result.forEach( item => {
            this.pageObj[item.key] = item.payload.val();
          })
          Object.assign(this.page, this.pageObj);
          this.options.pageTitle = 'Edit Blog';
          this.options.editMode = true;
          this.options.show = true;
          this.options.btnTitle = 'Update'
        })
      }
      else {
        this.options.show = true;
      }
      return param;
    })
    .subscribe()
  }

  onSubmit( form: NgForm ){
    if( !form.valid ){
      // send errors  
    }
    
    if( !this.options.editMode )
      this.addPage(form);
    
    if( this.options.editMode )
      this.updatePage(form);
  }

  goBackToBlogListPage(event){
    event.preventDefault()
    if( !this.options.editMode )
      this.router.navigate(['../'], {relativeTo: this.route} )
    else
      this.router.navigate(['../blog'], {relativeTo: this.route} )
  }

  addPage(form: NgForm){
    this.page.title = form.controls['title'].value
    this.page.content = form.controls['content'].value
    this.page.created = new Date().getTime()
    this.page.updated = new Date().getTime()

    this.db.addPage(this.page).then( r => {
      if( r ){
        form.reset()
        this.router.navigate(['../edit/'+ r.key], {relativeTo: this.route} );
      }
    })
  }

  updatePage(form: NgForm){
    this.options.submitDisabled = true;
    this.page.title = form.controls['title'].value
    this.page.content = form.controls['content'].value
    this.page.updated = new Date().getTime()

    this.db.updatePage(this.pageId, this.page)
    .then( error => {
      if( !error )
        this.options.submitDisabled = false;      
    })
  }

  deletePage(event){
    this.options.submitDisabled = true;
    event.preventDefault();
    this.db.deletePage(this.pageId).catch( error => {
      if( !error )
        this.router.navigate(['dashboard']);

      this.options.submitDisabled = false;
    })
  }

}
