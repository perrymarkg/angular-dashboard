import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from '../../../models/page.model'
import { DbService } from '../../../services/db.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
import { LoadingService } from '../../../services/loading.service';
import { NoticeService } from '../../../services/notice.service';
import { fadeInOutCustom } from '../../../animations/animations';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css'],
  animations:[fadeInOutCustom()]
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
  blogs;

  constructor(
    private db: DbService, 
    private route: ActivatedRoute,
    private router: Router,
    private loading: LoadingService,
    private notice: NoticeService
  ) {}

  ngOnInit() {
       
    this.pageId = this.route.snapshot.params['id'];

    if( this.pageId ){
      if( Object.keys(this.db.data.blogs).length ){
        this.setEditMode()
      }
      
      this.db.dataEmitter.subscribe( results => {
        if( Object.keys(results.blogs).length ){
          this.setEditMode()        
        }
      })
    }
    else {
      this.options.show = true;
    }
    
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
      this.router.navigate(['../../'], {relativeTo: this.route} )

    
  }

  addPage(form: NgForm){
    window.scrollTo(0, 0)
    this.page.created = new Date().getTime()
    this.page.updated = new Date().getTime()

    this.db.addPage(this.page).then( r => {
      if( r ){
        form.reset()
        this.notice.setNotice('Page added succesfully!')
        this.router.navigate(['../edit/'+ r.key], {relativeTo: this.route} );
      }
      else {
        this.notice.setNotice('Unable to add page')
      }
    })
  }

  updatePage(form: NgForm){
    
    this.options.submitDisabled = true;
    this.page.updated = new Date().getTime()
    
    this.db.updatePage(this.pageId, this.page)
    .then( error => {
      if( !error ){
        this.notice.setNotice('Page updated succesfully!')
        this.options.submitDisabled = false;
      }
    })
  }

  deletePage(event){
    this.options.submitDisabled = true;
    this.notice.setNotice('Page deleted successfully!')
    event.preventDefault();
    this.db.deletePage(this.pageId).catch( error => {
      if( !error )
        this.router.navigate(['dashboard']);

      this.options.submitDisabled = false;
    })
  }

  findPageItem(itemKey: string){
    return this.blogs.find( item => { 
      return item.key === itemKey
    })
  }

  setEditMode(){
    this.blogs = this.db.data.blogs;
    this.page = this.findPageItem(this.pageId)
    if( !this.page )
      return this.router.navigate(['../../'], {relativeTo: this.route})
    
    this.options.pageTitle = 'Edit Blog';
    this.options.editMode = true;
    this.options.show = true;
    this.options.btnTitle = 'Update'
  }

}
