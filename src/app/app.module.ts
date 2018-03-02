import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Directives
import { TitleDirective } from './dashboard/directives/title.directive';
// Custom Services
import { NoticeService } from './services/notice.service';
import { LoginService } from './services/login.service';
import { DbService } from './services/db.service';
import { LoadingService } from './services/loading.service';
// Custom Guard
import { AuthGuard } from './services/authguard.service';
// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { env } from './env/env';
// Dashboard
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
// Frontend
import { IndexComponent } from './frontend/index/index.component';
import { BlogComponent as BlogFrontendComponent } from './frontend/blog/blog.component';
// General
import { LoadingComponent } from './ui/loading/loading.component';
import { PaginationService } from './services/pagination.service';




const appRoutes: Routes = [
  { path: '', component: FrontendComponent, children: [
      {path: '', component: IndexComponent },
      {path: 'blog/:slug', component: BlogFrontendComponent }
  ]},
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
    { path: '', component:HomeComponent },
    { path: 'blog', component:BlogComponent },
    { path: 'blog/:page', component:BlogComponent },
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
    BlogFrontendComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    DbService,
    LoadingService,
    NoticeService,
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
