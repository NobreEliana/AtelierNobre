// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //api_article_url:"http://localhost:5005/api/v1",
  api_identity_url:"http://identity-ms.hnlcompany.com/api/v1",
  api_article_url:"http://article-ms.hnlcompany.com/api/v1",
  api_email_url: "http://email-ms.hnlcompany.com/api/v1",
  api_instagram_url: "http://instagram-ms.hnlcompany.com/api/v1",
  companyId:'a0e6504b-f67d-423b-808f-a719b071a1ad'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
