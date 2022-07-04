import {Component, OnInit} from '@angular/core';
import {EcoleDoctoraleService} from 'src/app/controller/service/formulaire/EcoleDoctorale.service';
import {EcoleDoctoraleVo} from 'src/app/controller/model/formulaire/EcoleDoctorale.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-ecole-doctorale-view-admin',
  templateUrl: './ecole-doctorale-view-admin.component.html',
  styleUrls: ['./ecole-doctorale-view-admin.component.css']
})
export class EcoleDoctoraleViewAdminComponent implements OnInit {


constructor(private ecoleDoctoraleService: EcoleDoctoraleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewEcoleDoctoraleDialog  = false;
}

// getters and setters

get ecoleDoctorales(): Array<EcoleDoctoraleVo> {
    return this.ecoleDoctoraleService.ecoleDoctorales;
       }
set ecoleDoctorales(value: Array<EcoleDoctoraleVo>) {
        this.ecoleDoctoraleService.ecoleDoctorales = value;
       }

 get selectedEcoleDoctorale():EcoleDoctoraleVo {
           return this.ecoleDoctoraleService.selectedEcoleDoctorale;
       }
    set selectedEcoleDoctorale(value: EcoleDoctoraleVo) {
        this.ecoleDoctoraleService.selectedEcoleDoctorale = value;
       }

   get viewEcoleDoctoraleDialog():boolean {
           return this.ecoleDoctoraleService.viewEcoleDoctoraleDialog;

       }
    set viewEcoleDoctoraleDialog(value: boolean) {
        this.ecoleDoctoraleService.viewEcoleDoctoraleDialog= value;
       }

       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
