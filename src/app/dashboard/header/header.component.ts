import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AngularFireList } from 'angularfire2/database';
import { LoginService } from '../../services/login.service';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  settings;

  constructor( 
    private db: DbService, 
    private login: LoginService,
    private title: Title,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    if( this.db.data.settings.length )
      this.settings = this.db.data.settings;

    this.db.dataEmitter.subscribe( result => {
     
      if( Object.keys(result.settings).length ){
        this.settings = result.settings
        this.loading.toggleLoading(false);
      }
    })
    
    
  }

  onLogOut(event){
    event.preventDefault();
    this.login.logOut();
  }

  viewFrontend(event){
    event.preventDefault()
    window.open("/", "_blank");
  }

}
