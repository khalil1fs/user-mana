import {Component, OnInit} from '@angular/core';
import {RoleProjetService} from 'src/app/controller/service/referentiel/RoleProjet.service';
import {RoleProjetVo} from 'src/app/controller/model/referentiel/RoleProjet.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-role-projet-view-admin',
  templateUrl: './role-projet-view-admin.component.html',
  styleUrls: ['./role-projet-view-admin.component.css']
})
export class RoleProjetViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private roleProjetService: RoleProjetService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewRoleProjetDialog  = false;
}

// getters and setters

get roleProjets(): Array<RoleProjetVo> {
    return this.roleProjetService.roleProjets;
       }
set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }

 get selectedRoleProjet(): RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
    set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }

   get viewRoleProjetDialog(): boolean {
           return this.roleProjetService.viewRoleProjetDialog;

       }
    set viewRoleProjetDialog(value: boolean) {
        this.roleProjetService.viewRoleProjetDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
