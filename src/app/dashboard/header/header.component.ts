import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AngularFireList } from 'angularfire2/database';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo: string;
  blogTitle: string;

  settingsObj: AngularFireList<any>;
  constructor( 
    private db: DbService, 
    private login: LoginService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.settingsObj = this.db.getObject('settings/settings');
    this.settingsObj.snapshotChanges()
    .map( result => {
      
      const generalSettings = result.find( element => {
        if( element.key === 'generalSettings' )
          return true
      }).payload.val()

      this.logo = generalSettings.blogLogo
      this.blogTitle = generalSettings.blogName
      
      this.title.setTitle( generalSettings.blogTitle + ' || ' + this.title.getTitle());
      
      return result
    })
    .subscribe()
  }

  onLogOut(event){
    event.preventDefault();
    this.login.logOut();
  }

}
