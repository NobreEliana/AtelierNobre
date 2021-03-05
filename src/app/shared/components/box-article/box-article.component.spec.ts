import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxArticleComponent } from './box-article.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoxArticleComponent', () => {
  let component: BoxArticleComponent;
  let fixture: ComponentFixture<BoxArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create', () => {
    //expect(component).toBeTruthy();
  //});
});
