import {Component, OnInit} from '@angular/core';
import {ObjetGlobalService} from 'src/app/controller/service/referentiel/ObjetGlobal.service';
import {ObjetGlobalVo} from 'src/app/controller/model/referentiel/ObjetGlobal.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-objet-global-view-admin',
  templateUrl: './objet-global-view-admin.component.html',
  styleUrls: ['./objet-global-view-admin.component.css']
})
export class ObjetGlobalViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private objetGlobalService: ObjetGlobalService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewObjetGlobalDialog  = false;
}

// getters and setters

get objetGlobals(): Array<ObjetGlobalVo> {
    return this.objetGlobalService.objetGlobals;
       }
set objetGlobals(value: Array<ObjetGlobalVo>) {
        this.objetGlobalService.objetGlobals = value;
       }

 get selectedObjetGlobal(): ObjetGlobalVo {
           return this.objetGlobalService.selectedObjetGlobal;
       }
    set selectedObjetGlobal(value: ObjetGlobalVo) {
        this.objetGlobalService.selectedObjetGlobal = value;
       }

   get viewObjetGlobalDialog(): boolean {
           return this.objetGlobalService.viewObjetGlobalDialog;

       }
    set viewObjetGlobalDialog(value: boolean) {
        this.objetGlobalService.viewObjetGlobalDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
