import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatTabsModule, MatProgressBarModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule,MatFormFieldModule,MatInputModule } from '@angular/material';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';



import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { RoutingModule } from './core/router/routing.module';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { ContactComponent } from './modules/contact/contact.component';
import { BlogComponent } from './modules/blog/blog.component';
import { BlogArticleComponent} from './modules/blog-article/blog-article.component'

import { SanitizeHtmlPipe } from './shared/pipes/sanitizeHtml/sanitize-html.pipe';
import { ArticleComponent } from './shared/components/article/article.component';
import { ArticlesComponent } from './shared/components/articles/articles.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { BoxArticleComponent } from './shared/components/box-article/box-article.component';
import { NavAccountComponent } from './shared/components/nav-account/nav-account.component';
import { NavSocialComponent } from './shared/components/nav-social/nav-social.component';
import { RecentPostComponent } from './shared/components/recent-post/recent-post.component';
import { CategoriesComponent } from './shared/components/categories/categories.component';
import { SubscribeComponent } from './shared/components/subscribe/subscribe.component';
import { BlogArchiveComponent } from './shared/components/blog-archive/blog-archive.component';
import { NgHnlSliderModule } from './shared/libs/ng-hnl-slider/ng-hnl-slider.module';
import { ArticleService } from './core/services/articles/articles.services';
import { CategoriasService } from './core/services/categorias/categorias.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CookieService } from 'ngx-cookie-service';
import { Interceptor } from './shared/helpers/interceptor';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './shared/components/register/register.component';
import { LoginComponent } from './shared/components/login/login.component';
import { VerifyEmailComponent } from './shared/components/verify-email/verify-email.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommentsComponent } from './shared/components/comments/comments.component';
import { UserMenuComponent } from './shared/components/user-menu/user-menu.component';
import { CommentBoxComponent } from './shared/components/comment-box/comment-box.component';
import { CommentItemComponent } from './shared/components/comment-item/comment-item.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    BlogComponent,
    BlogArticleComponent,
    AboutComponent,
    SanitizeHtmlPipe,
    BlogArchiveComponent,
    BoxArticleComponent,
    ArticlesComponent,
    ArticleComponent,
    NavMenuComponent,
    NavAccountComponent,
    NavSocialComponent,
    RecentPostComponent,
    CategoriesComponent,
    SubscribeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    CommentsComponent,
    UserMenuComponent,
    CommentBoxComponent,
    CommentItemComponent,
    
  ],
  entryComponents:[
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule ,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    NgHnlSliderModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor( private library:FaIconLibrary) {
    library.addIconPacks(far, fas, fab);
  }
 }


