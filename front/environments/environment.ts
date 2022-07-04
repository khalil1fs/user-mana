// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {environment as environnementTemplate} from './environment.template';
export const environment = {
  production: false,
  trueValue: 'Vrai',
  falseValue: 'Faux',
  emailValidation: /[a-zA-Z0-9_.+-]+@ird\.fr/,
  emptyForExport: '-----',

  dateFormatCreate: 'dd-mm-yy',
  // dd/mm/yy

  dateFormatEdit: 'dd-mm-yy',
  dateFormatView: 'dd-mm-yy',
  dateViewTest: 'dd-MM-yyyy hh:mm',
  dateFormatViewTimeStamp: 'dd/mm/yy',
  dateFormatFr: 'dd/mm/yy HH:MM',
  dateFormatList: 'dd-MM-yyyy',

  backendUrl: `${environnementTemplate.backendUrl}`,
  baseUrl: `${environnementTemplate.backendUrl}/api/`,
  apiUrl: `${environnementTemplate.backendUrl}/api/`,
  loginUrl:  `${environnementTemplate.backendUrl}/api/`,
  rootAppUrl: 'app'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
