import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SettingsModel } from '../models/settings.model';
import { Observable } from '@firebase/util';
import { LoadingService } from '../services/loading.service';
import { flyInFromTop, grow } from '../animations/animations';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
  animations:[flyInFromTop, grow]
})
export class FrontendComponent implements OnInit {
  
  settings;
  constructor(
    private db: DbService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.db.initActiveBlogs();
    if( Object.keys(this.db.data.settings).length ){
      this.settings = this.db.data.settings;      
      this.loading.toggleLoading(false);
    }

    this.db.dataEmitter.subscribe( results => {
      if( Object.keys(results.settings).length ){
        this.settings = results.settings;
        this.loading.toggleLoading(false);
      }
    })
    
  }

}
