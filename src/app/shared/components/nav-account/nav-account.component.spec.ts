import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavAccountComponent } from './nav-account.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


describe('NavAccountComponent', () => {
  let component: NavAccountComponent;
  let fixture: ComponentFixture<NavAccountComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAccountComponent ],
      imports:[FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
