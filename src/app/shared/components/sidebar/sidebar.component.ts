import { Component, Inject, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/core/services/articles/articles.services';
import { CategoriasService } from 'src/app/core/services/categorias/categorias.service';
import { WriterService } from 'src/app/core/services/writer/writer.service';
import { IArticle } from '../article/IArticle';
import { IArchive } from '../blog-archive/IArchive';
import { ICategory } from '../categories/ICategory';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  articles:IArticle[];
  writer:any;
  categories:ICategory[];
  archives:IArchive;

  constructor(@Inject("COMPANY_ID") private COMPANY_ID: string, private _service_article:ArticleService, private _service_writer:WriterService, private _service_categoria: CategoriasService ) { }

  ngOnInit() {
    
    this._service_writer.getById(this.COMPANY_ID).then(result=>{
      this.writer=result.data;
    });
    
    this._service_categoria.GetList().then(result=>{
      this.categories=result;
    });
    
    this._service_article.GetList().then((result)=>{
      this.articles=result.data;
    });
    
    this._service_article.getArchive().then((result)=>{
      this.archives=result.data;
    });
  }
}
