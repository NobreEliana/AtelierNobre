import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/articles.services';
import { CategoriasService } from 'src/app/core/services/categorias/categorias.service';
import { WriterService } from 'src/app/core/services/writer/writer.service';
import { __importDefault } from 'tslib';
import { IArticle } from '../article/IArticle';
import { IArchive } from '../blog-archive/IArchive';
import { ICategory } from '../categories/ICategory';

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


  constructor(private route: ActivatedRoute, private _service_article:ArticleService, private _service_writer:WriterService, private _service_categoria: CategoriasService ) { }

  ngOnInit() {
    
    this._service_writer.get().then(data=>{
      this.writer=data;
    });
    
    this._service_categoria.list().then(data=>{
      this.categories=data;
    });

    this._service_article.listFull().then(data=>{
      this.articles=data;
    });

    this._service_article.getArchive().then(data=>{
      this.archives=data;
    });
  }
}
