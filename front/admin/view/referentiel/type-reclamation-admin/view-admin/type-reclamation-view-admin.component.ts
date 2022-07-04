import {Component, OnInit} from '@angular/core';
import {TypeReclamationService} from 'src/app/controller/service/referentiel/TypeReclamation.service';
import {TypeReclamationVo} from 'src/app/controller/model/referentiel/TypeReclamation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-reclamation-view-admin',
  templateUrl: './type-reclamation-view-admin.component.html',
  styleUrls: ['./type-reclamation-view-admin.component.css']
})
export class TypeReclamationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeReclamationService: TypeReclamationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeReclamationDialog  = false;
}

// getters and setters

get typeReclamations(): Array<TypeReclamationVo> {
    return this.typeReclamationService.typeReclamations;
       }
set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }

 get selectedTypeReclamation(): TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
    set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }

   get viewTypeReclamationDialog(): boolean {
           return this.typeReclamationService.viewTypeReclamationDialog;

       }
    set viewTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.viewTypeReclamationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
