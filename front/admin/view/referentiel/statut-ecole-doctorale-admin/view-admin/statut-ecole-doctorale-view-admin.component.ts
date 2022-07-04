import {Component, OnInit} from '@angular/core';
import {StatutEcoleDoctoraleService} from 'src/app/controller/service/formulaire/StatutEcoleDoctorale.service';
import {StatutEcoleDoctoraleVo} from 'src/app/controller/model/referentiel/StatutEcoleDoctorale.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-statut-ecole-doctorale-view-admin',
  templateUrl: './statut-ecole-doctorale-view-admin.component.html',
  styleUrls: ['./statut-ecole-doctorale-view-admin.component.css']
})
export class StatutEcoleDoctoraleViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private statutEcoleDoctoraleService: StatutEcoleDoctoraleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStatutEcoleDoctoraleDialog  = false;
}

// getters and setters

get statutEcoleDoctorales(): Array<StatutEcoleDoctoraleVo> {
    return this.statutEcoleDoctoraleService.statutEcoleDoctorales;
       }
set statutEcoleDoctorales(value: Array<StatutEcoleDoctoraleVo>) {
        this.statutEcoleDoctoraleService.statutEcoleDoctorales = value;
       }

 get selectedStatutEcoleDoctorale(): StatutEcoleDoctoraleVo {
           return this.statutEcoleDoctoraleService.selectedStatutEcoleDoctorale;
       }
    set selectedStatutEcoleDoctorale(value: StatutEcoleDoctoraleVo) {
        this.statutEcoleDoctoraleService.selectedStatutEcoleDoctorale = value;
       }

   get viewStatutEcoleDoctoraleDialog(): boolean {
           return this.statutEcoleDoctoraleService.viewStatutEcoleDoctoraleDialog;

       }
    set viewStatutEcoleDoctoraleDialog(value: boolean) {
        this.statutEcoleDoctoraleService.viewStatutEcoleDoctoraleDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
