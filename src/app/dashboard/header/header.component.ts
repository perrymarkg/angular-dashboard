import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AngularFireList } from 'angularfire2/database';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo: string;

  settingsObj: AngularFireList<any>;
  constructor( 
    private db: DbService, 
    private login: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.settingsObj = this.db.getObject('settings/settings');
    this.settingsObj.snapshotChanges()
    .map( result => {
      
      this.logo = result.find( element => {
        if( element.key === 'generalSettings' )
          return true
      })
      .payload
      .val()
      .blogLogo;
      
      return result
    })
    .subscribe()
  }

  onLogOut(event){
    event.preventDefault();
    this.login.logOut('dashboard');
  }

}
