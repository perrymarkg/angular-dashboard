import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AngularFireList } from 'angularfire2/database';
import { LoginService } from '../../services/login.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo: string;
  blogTitle: string;

  settings;
  settingsObj: AngularFireList<any>;
  constructor( 
    private db: DbService, 
    private login: LoginService,
    private title: Title
  ) { }

  ngOnInit() {
    this.db.initSettings();
    this.db.settingsEmitter.subscribe( result => {
      this.settings = result;
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
