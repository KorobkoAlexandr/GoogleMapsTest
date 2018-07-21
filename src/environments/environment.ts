// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fireConfig: {
      apiKey: 'AIzaSyDbuUQ50lSp1zkB7F8NH0Jb7cx8hpCNMFA',
      authDomain: 'vine-app.firebaseapp.com',
      databaseURL: 'https://vine-app.firebaseio.com',
      projectId: 'vine-app',
      storageBucket: 'vine-app.appspot.com',
      messagingSenderId: '401477327695'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
