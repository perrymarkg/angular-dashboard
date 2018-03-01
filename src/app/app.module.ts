import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TitleDirective } from './dashboard/directives/title.directive';

import { LoginService } from './services/login.service';
import { DbService } from './services/db.service';

import { AuthGuard } from './services/authguard.service';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { env } from './env/env';

import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { LoginComponent } from './login/login.component';
import { FrontendComponent} from './frontend/frontend.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { BlogComponent } from './dashboard/blog/blog.component';
import { NewBlogComponent } from './dashboard/blog/new-blog/new-blog.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { HeaderComponent } from './dashboard/header/header.component';

import { IndexComponent } from './frontend/index/index.component';
import { BlogComponent as BlogFrontendComponent } from './frontend/blog/blog.component';


const appRoutes: Routes = [
  { path: '', component: FrontendComponent, children: [
      {path: '', component: IndexComponent },
      {path: 'blog/:slug', component: BlogFrontendComponent }
  ]},
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
    { path: '', component:HomeComponent },
    { path: 'blog', component:BlogComponent },
    { path: 'blog/new', component: NewBlogComponent },
    { path: 'blog/edit/:id', component: NewBlogComponent },
    { path: 'settings', component: SettingsComponent }
  ]},
  { path: 'login', component: LoginComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    LoginComponent,
    DashboardComponent,
    FrontendComponent,
    HomeComponent,
    TitleDirective,
    SidebarComponent,
    BlogComponent,
    NewBlogComponent,
    SettingsComponent,
    HeaderComponent,
    IndexComponent,
    BlogFrontendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(env.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    LoginService, 
    AuthGuard, 
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
