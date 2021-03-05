import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavSocialComponent } from './nav-social.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';


describe('NavSocialComponent', () => {
  let component: NavSocialComponent;
  let fixture: ComponentFixture<NavSocialComponent>;
  
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavSocialComponent, NavMenuComponent ],
      imports:[FontAwesomeModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
