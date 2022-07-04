import {Component, OnInit} from '@angular/core';
import {MasterInternationalService} from 'src/app/controller/service/referentiel/MasterInternational.service';
import {MasterInternationalVo} from 'src/app/controller/model/referentiel/MasterInternational.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-master-international-view-admin',
  templateUrl: './master-international-view-admin.component.html',
  styleUrls: ['./master-international-view-admin.component.css']
})
export class MasterInternationalViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private masterInternationalService: MasterInternationalService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewMasterInternationalDialog  = false;
}

// getters and setters

get masterInternationals(): Array<MasterInternationalVo> {
    return this.masterInternationalService.masterInternationals;
       }
set masterInternationals(value: Array<MasterInternationalVo>) {
        this.masterInternationalService.masterInternationals = value;
       }

 get selectedMasterInternational(): MasterInternationalVo {
           return this.masterInternationalService.selectedMasterInternational;
       }
    set selectedMasterInternational(value: MasterInternationalVo) {
        this.masterInternationalService.selectedMasterInternational = value;
       }

   get viewMasterInternationalDialog(): boolean {
           return this.masterInternationalService.viewMasterInternationalDialog;

       }
    set viewMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.viewMasterInternationalDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
