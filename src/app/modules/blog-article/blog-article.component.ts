import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/articles.services';
import { IArticle } from 'src/app/shared/components/article/IArticle';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.less']
})
export class BlogArticleComponent implements OnInit {
//https://www.djamware.com/post/5d58b409bcc156d4a8a3df8f/angular-8-tutorial-routing-navigation-example
  article:IArticle;
  list_articles:IArticle[];
  settings:any;
  constructor( public _service_article:ArticleService, private route: ActivatedRoute) {}
  
  apiKey = '';
  tinymce = {
    height: 1000,
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    plugins: [
      'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
    ],
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_class_list: [
     { title: 'None', value: '' },
     { title: 'Responsive', value: 'img-responsive' },
     { title: 'Circulo', value: 'img-radio' },
     { title: 'Quadrado', value: 'img-quadro' }
   ],
   templates: [
     { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' }
    ],
   template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
   template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',    
   image_caption: true,
   quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
   noneditable_noneditable_class: 'mceNonEditable',
   toolbar_mode: 'sliding',
   contextmenu: 'link image imagetools table'
  };

  ngOnInit() {
    window.scroll(0,240);

    this.settings = {
      layout: "full",
      listagem:false
    }

    this._service_article.getById(this.route.snapshot.params.article).then(data=>{
      this.article = data;
    });  
  }
}
