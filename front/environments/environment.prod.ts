import {environment as environnementTemplate} from './environment.template';

export const environment = {

    production: true,

    dateFormatCreate: 'dd-mm-yy',
    dateFormatEdit: 'dd-mm-yy',
    dateFormatView: 'dd-mm-yy',
    dateFormatList: 'dd-MM-yyyy',
    backendUrl: window['env']['ENV_BACKEND_URI'],
    baseUrl: `${environnementTemplate.backendUrl}/api/`,
    apiUrl: `${environnementTemplate.backendUrl}/api/`,
    loginUrl: `${environnementTemplate.backendUrl}/`,
    rootAppUrl: 'app',

    trueValue: 'Vrai',
    falseValue: 'Faux',
    emptyForExport: '-----',


};
