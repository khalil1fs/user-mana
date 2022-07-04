import {Component, OnInit} from '@angular/core';
import {TypeExpertService} from 'src/app/controller/service/referentiel/TypeExpert.service';
import {TypeExpertVo} from 'src/app/controller/model/referentiel/TypeExpert.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-expert-view-admin',
  templateUrl: './type-expert-view-admin.component.html',
  styleUrls: ['./type-expert-view-admin.component.css']
})
export class TypeExpertViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeExpertService: TypeExpertService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeExpertDialog  = false;
}

// getters and setters

get typeExperts(): Array<TypeExpertVo> {
    return this.typeExpertService.typeExperts;
       }
set typeExperts(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExperts = value;
       }

 get selectedTypeExpert(): TypeExpertVo {
           return this.typeExpertService.selectedTypeExpert;
       }
    set selectedTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.selectedTypeExpert = value;
       }

   get viewTypeExpertDialog(): boolean {
           return this.typeExpertService.viewTypeExpertDialog;

       }
    set viewTypeExpertDialog(value: boolean) {
        this.typeExpertService.viewTypeExpertDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
