import {Component, OnInit} from '@angular/core';
import {MasterService} from 'src/app/controller/service/referentiel/Master.service';
import {MasterVo} from 'src/app/controller/model/referentiel/Master.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-master-view-admin',
  templateUrl: './master-view-admin.component.html',
  styleUrls: ['./master-view-admin.component.css']
})
export class MasterViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private masterService: MasterService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewMasterDialog  = false;
}

// getters and setters

get masters(): Array<MasterVo> {
    return this.masterService.masters;
       }
set masters(value: Array<MasterVo>) {
        this.masterService.masters = value;
       }

 get selectedMaster(): MasterVo {
           return this.masterService.selectedMaster;
       }
    set selectedMaster(value: MasterVo) {
        this.masterService.selectedMaster = value;
       }

   get viewMasterDialog(): boolean {
           return this.masterService.viewMasterDialog;

       }
    set viewMasterDialog(value: boolean) {
        this.masterService.viewMasterDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
