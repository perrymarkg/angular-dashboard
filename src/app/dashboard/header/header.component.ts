import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AngularFireList } from 'angularfire2/database';
import { LoginService } from '../../services/login.service';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';
import { flyInFromTop } from '../../animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [flyInFromTop]
})
export class HeaderComponent implements OnInit {

  settings;

  constructor(
    private db: DbService,
    private login: LoginService,
    private title: Title,
    private loading: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {

    if ( Object.keys(this.db.data.settings).length ) {
      this.settings = this.db.data.settings;
    }

    this.db.dataEmitter.subscribe( result => {

      if ( Object.keys(result.settings).length ) {
        this.settings = result.settings;
        this.loading.toggleLoading(false);
      }

    });

  }

  onLogOut(event) {
    event.preventDefault();
    this.login.logOut();
  }

  viewFrontend(event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

}
