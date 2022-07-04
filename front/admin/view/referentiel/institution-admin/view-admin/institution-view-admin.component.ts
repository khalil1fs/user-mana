import {Component, OnInit} from '@angular/core';
import {InstitutionService} from 'src/app/controller/service/referentiel/Institution.service';
import {InstitutionVo} from 'src/app/controller/model/referentiel/Institution.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-institution-view-admin',
  templateUrl: './institution-view-admin.component.html',
  styleUrls: ['./institution-view-admin.component.css']
})
export class InstitutionViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private institutionService: InstitutionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewInstitutionDialog  = false;
}

// getters and setters

get institutions(): Array<InstitutionVo> {
    return this.institutionService.institutions;
       }
set institutions(value: Array<InstitutionVo>) {
        this.institutionService.institutions = value;
       }

 get selectedInstitution(): InstitutionVo {
           return this.institutionService.selectedInstitution;
       }
    set selectedInstitution(value: InstitutionVo) {
        this.institutionService.selectedInstitution = value;
       }

   get viewInstitutionDialog(): boolean {
           return this.institutionService.viewInstitutionDialog;

       }
    set viewInstitutionDialog(value: boolean) {
        this.institutionService.viewInstitutionDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
