import {Component, OnInit} from '@angular/core';
import {StatutMasterService} from 'src/app/controller/service/referentiel/StatutMaster.service';
import {StatutMasterVo} from 'src/app/controller/model/referentiel/StatutMaster.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-statut-master-view-admin',
  templateUrl: './statut-master-view-admin.component.html',
  styleUrls: ['./statut-master-view-admin.component.css']
})
export class StatutMasterViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private statutMasterService: StatutMasterService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStatutMasterDialog  = false;
}

// getters and setters

get statutMasters(): Array<StatutMasterVo> {
    return this.statutMasterService.statutMasters;
       }
set statutMasters(value: Array<StatutMasterVo>) {
        this.statutMasterService.statutMasters = value;
       }

 get selectedStatutMaster(): StatutMasterVo {
           return this.statutMasterService.selectedStatutMaster;
       }
    set selectedStatutMaster(value: StatutMasterVo) {
        this.statutMasterService.selectedStatutMaster = value;
       }

   get viewStatutMasterDialog(): boolean {
           return this.statutMasterService.viewStatutMasterDialog;

       }
    set viewStatutMasterDialog(value: boolean) {
        this.statutMasterService.viewStatutMasterDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
