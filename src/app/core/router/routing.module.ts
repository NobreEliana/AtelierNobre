import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../modules/home/home.component';
import { BlogComponent } from '../../modules/blog/blog.component';
import { ContactComponent } from '../../modules/contact/contact.component';
import { AboutComponent } from '../../modules/about/about.component';
import { APIResolverArticle } from 'src/app/shared/helpers/api-resolver';
import { BlogArticleComponent } from 'src/app/modules/blog-article/blog-article.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { VerifyEmailComponent } from 'src/app/shared/components/verify-email/verify-email.component';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { RegisterComponent } from 'src/app/shared/components/register/register.component';
 
 
const routes: Routes = [
  { path: '', component: HomeComponent, resolve: {articles: APIResolverArticle}, data: {article: "list"}},
  { path: 'blog', component: BlogComponent, resolve: {article: APIResolverArticle}, data: {article: "list"}},
  { path: 'blog/:article', component: BlogArticleComponent},
  { path: 'search', component: BlogComponent, resolve: {article: APIResolverArticle}, data: {article: "search"}},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'sidebar', component: SidebarComponent},
  { path: 'verify-email', component:VerifyEmailComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'store', redirectTo: '' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'top' }) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
