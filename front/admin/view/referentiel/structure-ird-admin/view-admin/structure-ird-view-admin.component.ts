import {Component, OnInit} from '@angular/core';
import {StructureIrdService} from 'src/app/controller/service/referentiel/StructureIrd.service';
import {StructureIrdVo} from 'src/app/controller/model/referentiel/StructureIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-structure-ird-view-admin',
  templateUrl: './structure-ird-view-admin.component.html',
  styleUrls: ['./structure-ird-view-admin.component.css']
})
export class StructureIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private structureIrdService: StructureIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStructureIrdDialog  = false;
}

// getters and setters

get structureIrds(): Array<StructureIrdVo> {
    return this.structureIrdService.structureIrds;
       }
set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }

 get selectedStructureIrd(): StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
    set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }

   get viewStructureIrdDialog(): boolean {
           return this.structureIrdService.viewStructureIrdDialog;

       }
    set viewStructureIrdDialog(value: boolean) {
        this.structureIrdService.viewStructureIrdDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
