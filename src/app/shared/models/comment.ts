export class Comment {
    commentId: string;
    companyId: string;
    articleId : string;
    userId: string;
    user: string;
    parentId: string;
    content: string;
    createDate: string;
    publishDate: string;
    childrenList:CommentDTO[];
}

export class CommentDTO {
    commentId: string;
    companyId: string;
    articleId : string;
    userId: string;
    user: string;
    parentId: string;
    content: string;
    createDate: string;
    publishDate: string;
    childrenList:CommentDTO[];
}

