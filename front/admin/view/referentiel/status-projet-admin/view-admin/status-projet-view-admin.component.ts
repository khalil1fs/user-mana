import {Component, OnInit} from '@angular/core';
import {StatusProjetService} from 'src/app/controller/service/referentiel/StatusProjet.service';
import {StatusProjetVo} from 'src/app/controller/model/referentiel/StatusProjet.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-status-projet-view-admin',
  templateUrl: './status-projet-view-admin.component.html',
  styleUrls: ['./status-projet-view-admin.component.css']
})
export class StatusProjetViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private statusProjetService: StatusProjetService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStatusProjetDialog  = false;
}

// getters and setters

get statusProjets(): Array<StatusProjetVo> {
    return this.statusProjetService.statusProjets;
       }
set statusProjets(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjets = value;
       }

 get selectedStatusProjet(): StatusProjetVo {
           return this.statusProjetService.selectedStatusProjet;
       }
    set selectedStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.selectedStatusProjet = value;
       }

   get viewStatusProjetDialog(): boolean {
           return this.statusProjetService.viewStatusProjetDialog;

       }
    set viewStatusProjetDialog(value: boolean) {
        this.statusProjetService.viewStatusProjetDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
