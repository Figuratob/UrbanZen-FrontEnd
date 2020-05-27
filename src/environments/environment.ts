export const environment = {
  production: false,
  application: {
    name: 'urbanzen',
    angular: 'Angular 8.2.3',
    bootstrap: 'Bootstrap 4.3.1',
  },
  config: {
    /* SELECT ONE OF THOSE CONFIGURATIONS */

    /* LOCAL REST API CRUD  */
    /* api: true,
    url: 'http://localhost:5200/', */

    /* EXTERNAL REST API CRUD */
    api: true,
    url: 'http://localhost:8080/',
  },
};
