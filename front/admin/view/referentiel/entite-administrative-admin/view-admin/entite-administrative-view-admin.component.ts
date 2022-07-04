import {Component, OnInit} from '@angular/core';
import {EntiteAdministrativeService} from 'src/app/controller/service/referentiel/EntiteAdministrative.service';
import {EntiteAdministrativeVo} from 'src/app/controller/model/referentiel/EntiteAdministrative.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

import {TypeEntiteAdministrativeVo} from 'src/app/controller/model/referentiel/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from 'src/app/controller/service/referentiel/TypeEntiteAdministrative.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-entite-administrative-view-admin',
  templateUrl: './entite-administrative-view-admin.component.html',
  styleUrls: ['./entite-administrative-view-admin.component.css']
})
export class EntiteAdministrativeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private entiteAdministrativeService: EntiteAdministrativeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
    this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
}

hideViewDialog(){
    this.viewEntiteAdministrativeDialog  = false;
}

// getters and setters

get entiteAdministratives(): Array<EntiteAdministrativeVo> {
    return this.entiteAdministrativeService.entiteAdministratives;
       }
set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }

 get selectedEntiteAdministrative(): EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
    set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }

   get viewEntiteAdministrativeDialog(): boolean {
           return this.entiteAdministrativeService.viewEntiteAdministrativeDialog;

       }
    set viewEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.viewEntiteAdministrativeDialog= value;
       }

       get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives():Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get editTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog;
       }
      set editTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
