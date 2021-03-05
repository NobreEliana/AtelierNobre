export interface IArticle {
    id: number;
    categoryId: number,
    category: string,
    day: number;
    month: number;
    year: number;
    data: Date,
    title: string,
    author: string,
    content: string,
    summary:string,
    img: string
  }
  