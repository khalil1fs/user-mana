import {Component, OnInit} from '@angular/core';
import {TypeInstanceService} from 'src/app/controller/service/referentiel/TypeInstance.service';
import {TypeInstanceVo} from 'src/app/controller/model/referentiel/TypeInstance.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-instance-view-admin',
  templateUrl: './type-instance-view-admin.component.html',
  styleUrls: ['./type-instance-view-admin.component.css']
})
export class TypeInstanceViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstanceService: TypeInstanceService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeInstanceDialog  = false;
}

// getters and setters

get typeInstances(): Array<TypeInstanceVo> {
    return this.typeInstanceService.typeInstances;
       }
set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }

 get selectedTypeInstance(): TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
    set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }

   get viewTypeInstanceDialog(): boolean {
           return this.typeInstanceService.viewTypeInstanceDialog;

       }
    set viewTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.viewTypeInstanceDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
