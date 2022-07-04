import {Component, OnInit} from '@angular/core';
import {TypeEntiteAdministrativeService} from 'src/app/controller/service/referentiel/TypeEntiteAdministrative.service';
import {TypeEntiteAdministrativeVo} from 'src/app/controller/model/referentiel/TypeEntiteAdministrative.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-entite-administrative-view-admin',
  templateUrl: './type-entite-administrative-view-admin.component.html',
  styleUrls: ['./type-entite-administrative-view-admin.component.css']
})
export class TypeEntiteAdministrativeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeEntiteAdministrativeDialog  = false;
}

// getters and setters

get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
    return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }

 get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
    set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }

   get viewTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.viewTypeEntiteAdministrativeDialog;

       }
    set viewTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.viewTypeEntiteAdministrativeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
