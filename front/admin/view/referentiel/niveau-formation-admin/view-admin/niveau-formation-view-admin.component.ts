import {Component, OnInit} from '@angular/core';
import {NiveauFormationService} from 'src/app/controller/service/referentiel/NiveauFormation.service';
import {NiveauFormationVo} from 'src/app/controller/model/referentiel/NiveauFormation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-niveau-formation-view-admin',
  templateUrl: './niveau-formation-view-admin.component.html',
  styleUrls: ['./niveau-formation-view-admin.component.css']
})
export class NiveauFormationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauFormationService: NiveauFormationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNiveauFormationDialog  = false;
}

// getters and setters

get niveauFormations(): Array<NiveauFormationVo> {
    return this.niveauFormationService.niveauFormations;
       }
set niveauFormations(value: Array<NiveauFormationVo>) {
        this.niveauFormationService.niveauFormations = value;
       }

 get selectedNiveauFormation(): NiveauFormationVo {
           return this.niveauFormationService.selectedNiveauFormation;
       }
    set selectedNiveauFormation(value: NiveauFormationVo) {
        this.niveauFormationService.selectedNiveauFormation = value;
       }

   get viewNiveauFormationDialog(): boolean {
           return this.niveauFormationService.viewNiveauFormationDialog;

       }
    set viewNiveauFormationDialog(value: boolean) {
        this.niveauFormationService.viewNiveauFormationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
