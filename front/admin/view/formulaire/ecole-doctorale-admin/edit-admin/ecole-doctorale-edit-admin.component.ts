import {Component, OnInit} from '@angular/core';
import {EcoleDoctoraleService} from 'src/app/controller/service/formulaire/EcoleDoctorale.service';
import {EcoleDoctoraleVo} from 'src/app/controller/model/formulaire/EcoleDoctorale.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-ecole-doctorale-edit-admin',
  templateUrl: './ecole-doctorale-edit-admin.component.html',
  styleUrls: ['./ecole-doctorale-edit-admin.component.css']
})
export class EcoleDoctoraleEditAdminComponent implements OnInit {


constructor(private ecoleDoctoraleService: EcoleDoctoraleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.ecoleDoctoraleService.edit().subscribe(ecoleDoctorale=>{
    const myIndex = this.ecoleDoctorales.findIndex(e => e.id === this.selectedEcoleDoctorale.id);
    this.ecoleDoctorales[myIndex] = this.selectedEcoleDoctorale;
    this.editEcoleDoctoraleDialog = false;
    this.selectedEcoleDoctorale = new EcoleDoctoraleVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.editPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEcoleDoctoraleDialog  = false;
}

// getters and setters

get ecoleDoctorales(): Array<EcoleDoctoraleVo> {
    return this.ecoleDoctoraleService.ecoleDoctorales;
       }
set ecoleDoctorales(value: Array<EcoleDoctoraleVo>) {
        this.ecoleDoctoraleService.ecoleDoctorales = value;
       }

 get selectedEcoleDoctorale(): EcoleDoctoraleVo {
           return this.ecoleDoctoraleService.selectedEcoleDoctorale;
       }
    set selectedEcoleDoctorale(value: EcoleDoctoraleVo) {
        this.ecoleDoctoraleService.selectedEcoleDoctorale = value;
       }

   get editEcoleDoctoraleDialog(): boolean {
           return this.ecoleDoctoraleService.editEcoleDoctoraleDialog;

       }
    set editEcoleDoctoraleDialog(value: boolean) {
        this.ecoleDoctoraleService.editEcoleDoctoraleDialog = value;
       }

       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog(): boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
