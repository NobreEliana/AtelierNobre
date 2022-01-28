export interface IArticle {
  articleId: string;
  category: string;
  author: string;
  title: string;
  summary: string;
  content: string;
  imageHigh: string;
  videoHigh:string;
  articleStatus: string;
  createDate: string;
  publishDate: string;
}
  
export class Article {
  articleId: string;
  category: string;
  author: string;
  title: string;
  summary: string;
  content: string;
  imageHigh: string;
  videoHigh:string;
  articleStatus: string;
  createDate: string;
  publishDate: string;
}