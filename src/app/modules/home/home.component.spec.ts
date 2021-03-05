import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavAccountComponent } from 'src/app/shared/components/nav-account/nav-account.component';
import { NavSocialComponent } from 'src/app/shared/components/nav-social/nav-social.component';
import { NavMenuComponent } from 'src/app/shared/components/nav-menu/nav-menu.component';
import { SubscribeComponent } from 'src/app/shared/components/subscribe/subscribe.component';
import { CategoriesComponent } from 'src/app/shared/components/categories/categories.component';
import { RecentPostComponent } from 'src/app/shared/components/recent-post/recent-post.component';
import { BlogComponent } from '../blog/blog.component';
import { BlogArchiveComponent } from 'src/app/shared/components/blog-archive/blog-archive.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, NavAccountComponent, NavSocialComponent, NavMenuComponent, SubscribeComponent, CategoriesComponent, RecentPostComponent, BlogComponent, BlogArchiveComponent ],
      imports:[FontAwesomeModule, FormsModule, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
