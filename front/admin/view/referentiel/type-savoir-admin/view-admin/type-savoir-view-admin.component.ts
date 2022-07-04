import {Component, OnInit} from '@angular/core';
import {TypeSavoirService} from 'src/app/controller/service/referentiel/TypeSavoir.service';
import {TypeSavoirVo} from 'src/app/controller/model/referentiel/TypeSavoir.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-savoir-view-admin',
  templateUrl: './type-savoir-view-admin.component.html',
  styleUrls: ['./type-savoir-view-admin.component.css']
})
export class TypeSavoirViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeSavoirService: TypeSavoirService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeSavoirDialog  = false;
}

// getters and setters

get typeSavoirs(): Array<TypeSavoirVo> {
    return this.typeSavoirService.typeSavoirs;
       }
set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }

 get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
    set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }

   get viewTypeSavoirDialog(): boolean {
           return this.typeSavoirService.viewTypeSavoirDialog;

       }
    set viewTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.viewTypeSavoirDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
