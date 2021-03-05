import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ArticleService } from './articles.services';
import { IArticle } from 'src/app/shared/components/article/IArticle';

describe('Service Articles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        { provide: 'BASE_URL', useValue: 'http://localhost:5000/api/' }
      ],
      imports: [
        HttpClientModule,
      ],
    });
  });

  //listar todos os Articles
  it('Listar todos os Articles', async(inject([ArticleService], (service: ArticleService) => {
      let articles: IArticle[];
      service.list().subscribe(result => { 
        articles = result;
          
        spyOn(service, 'list').and.returnValue(of(articles));
      
        expect(articles).toBeTruthy();
        expect(articles).toBeDefined();
        expect(articles.length).toEqual(articles.length);
    });   
  })));

  //Get By Search Macth
  it('Get By Search Match', async(inject([ArticleService], (service: ArticleService) => {
    let articles: IArticle[];
    service.getBySearch("Jesus").subscribe(result => {
      articles = result;
      spyOn(service, 'getBySearch').and.returnValue(of(articles));

      expect(articles).toBeTruthy();
      expect(articles).toBeDefined();
      expect(articles.length).toBeGreaterThanOrEqual(1);
    });
  })));

  //Get By Search Macth
  it('Get By Search dont Match', async(inject([ArticleService], (service: ArticleService) => {
    let articles: IArticle[];
    service.getBySearch("Ypoqiwurq").subscribe(result => {
      articles = result;
      spyOn(service, 'getBySearch').and.returnValue(of(articles));

      expect(articles).toBeTruthy();
      expect(articles).toBeDefined();
      expect(articles.length).toEqual(0);
    });
  })));

  //Get By Id
  it('Get By Id', async(inject([ArticleService], (service: ArticleService) => {
    let article: IArticle;
    service.getById(1).subscribe(result => {
      article = result;
      spyOn(service, 'getById').and.returnValue(of(article));

      expect(article).toBeTruthy();
      expect(article).toBeDefined();
    });
  })));
});
