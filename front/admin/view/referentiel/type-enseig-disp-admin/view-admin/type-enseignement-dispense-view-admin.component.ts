import {Component, OnInit} from '@angular/core';
import {TypeEnseignementDispenseService} from 'src/app/controller/service/referentiel/TypeEnseignementDispense.service';
import {TypeEnseignementDispenseVo} from 'src/app/controller/model/referentiel/TypeEnseignementDispense.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-enseignement-dispense-view-admin',
  templateUrl: './type-enseignement-dispense-view-admin.component.html',
  styleUrls: ['./type-enseignement-dispense-view-admin.component.css']
})
export class TypeEnseignementDispenseViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEnseignementDispenseService: TypeEnseignementDispenseService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeEnseignementDispenseDialog  = false;
}

// getters and setters

get typeEnseignementDispenses(): Array<TypeEnseignementDispenseVo> {
    return this.typeEnseignementDispenseService.typeEnseignementDispenses;
       }
set typeEnseignementDispenses(value: Array<TypeEnseignementDispenseVo>) {
        this.typeEnseignementDispenseService.typeEnseignementDispenses = value;
       }

 get selectedTypeEnseignementDispense(): TypeEnseignementDispenseVo {
           return this.typeEnseignementDispenseService.selectedTypeEnseignementDispense;
       }
    set selectedTypeEnseignementDispense(value: TypeEnseignementDispenseVo) {
        this.typeEnseignementDispenseService.selectedTypeEnseignementDispense = value;
       }

   get viewTypeEnseignementDispenseDialog(): boolean {
           return this.typeEnseignementDispenseService.viewTypeEnseignementDispenseDialog;

       }
    set viewTypeEnseignementDispenseDialog(value: boolean) {
        this.typeEnseignementDispenseService.viewTypeEnseignementDispenseDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
