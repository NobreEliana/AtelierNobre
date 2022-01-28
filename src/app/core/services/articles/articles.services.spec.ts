import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ArticleService } from './articles.services';
import { IArticle } from 'src/app/shared/components/article/IArticle';
import { Result } from 'src/app/shared/models/result';

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
      service.GetList().then(result => { 
        articles = result.data;
          
        spyOn(service, 'GetList').and.returnValue(new Promise<Result<IArticle[]>>((resolve)=>{ return resolve(result)}));
      
        expect(articles).toBeTruthy();
        expect(articles).toBeDefined();
        expect(articles.length).toEqual(articles.length);
    });   
  })));

  //Get By Search Macth
  it('Get By Search Match', async(inject([ArticleService], (service: ArticleService) => {
    let articles: IArticle[];
    service.getBySearch("Jesus").then(result => {
      articles = result.data;

      spyOn(service, 'getBySearch').and.returnValue(new Promise<Result<IArticle[]>>((resolve)=>{ return resolve(result)}));

      expect(articles).toBeTruthy();
      expect(articles).toBeDefined();
      expect(articles.length).toBeGreaterThanOrEqual(1);
    });
  })));

  //Get By Search Macth
  it('Get By Search dont Match', async(inject([ArticleService], (service: ArticleService) => {
    let articles: IArticle[];
    service.getBySearch("Ypoqiwurq").then(result => {
      articles = result.data;
      spyOn(service, 'getBySearch').and.returnValue(new Promise<Result<IArticle[]>>((resolve)=>{ return resolve(result)}));

      expect(articles).toBeTruthy();
      expect(articles).toBeDefined();
      expect(articles.length).toEqual(0);
    });
  })));

  //Get By Id
  it('Get By Id', async(inject([ArticleService], (service: ArticleService) => {
    let article: IArticle;
    service.getById("2e8d062f-1f84-45e0-847e-2f76f61b3b60").then(result => {
      article = result.data;
      spyOn(service, 'getById').and.returnValue(new Promise<Result<IArticle>>((resolve)=>{ return resolve(result)}));

      expect(article).toBeTruthy();
      expect(article).toBeDefined();
    });
  })));
});
