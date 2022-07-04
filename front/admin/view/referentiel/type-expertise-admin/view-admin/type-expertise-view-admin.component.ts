import {Component, OnInit} from '@angular/core';
import {TypeExpertiseService} from 'src/app/controller/service/referentiel/TypeExpertise.service';
import {TypeExpertiseVo} from 'src/app/controller/model/referentiel/TypeExpertise.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-expertise-view-admin',
  templateUrl: './type-expertise-view-admin.component.html',
  styleUrls: ['./type-expertise-view-admin.component.css']
})
export class TypeExpertiseViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeExpertiseService: TypeExpertiseService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeExpertiseDialog  = false;
}

// getters and setters

get typeExpertises(): Array<TypeExpertiseVo> {
    return this.typeExpertiseService.typeExpertises;
       }
set typeExpertises(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertises = value;
       }

 get selectedTypeExpertise(): TypeExpertiseVo {
           return this.typeExpertiseService.selectedTypeExpertise;
       }
    set selectedTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.selectedTypeExpertise = value;
       }

   get viewTypeExpertiseDialog(): boolean {
           return this.typeExpertiseService.viewTypeExpertiseDialog;

       }
    set viewTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.viewTypeExpertiseDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
