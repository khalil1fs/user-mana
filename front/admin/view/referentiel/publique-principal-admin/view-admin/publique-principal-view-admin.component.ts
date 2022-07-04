import {Component, OnInit} from '@angular/core';
import {PubliquePrincipalService} from 'src/app/controller/service/referentiel/PubliquePrincipal.service';
import {PubliquePrincipalVo} from 'src/app/controller/model/referentiel/PubliquePrincipal.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-publique-principal-view-admin',
  templateUrl: './publique-principal-view-admin.component.html',
  styleUrls: ['./publique-principal-view-admin.component.css']
})
export class PubliquePrincipalViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private publiquePrincipalService: PubliquePrincipalService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewPubliquePrincipalDialog  = false;
}

// getters and setters

get publiquePrincipals(): Array<PubliquePrincipalVo> {
    return this.publiquePrincipalService.publiquePrincipals;
       }
set publiquePrincipals(value: Array<PubliquePrincipalVo>) {
        this.publiquePrincipalService.publiquePrincipals = value;
       }

 get selectedPubliquePrincipal(): PubliquePrincipalVo {
           return this.publiquePrincipalService.selectedPubliquePrincipal;
       }
    set selectedPubliquePrincipal(value: PubliquePrincipalVo) {
        this.publiquePrincipalService.selectedPubliquePrincipal = value;
       }

   get viewPubliquePrincipalDialog(): boolean {
           return this.publiquePrincipalService.viewPubliquePrincipalDialog;

       }
    set viewPubliquePrincipalDialog(value: boolean) {
        this.publiquePrincipalService.viewPubliquePrincipalDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
