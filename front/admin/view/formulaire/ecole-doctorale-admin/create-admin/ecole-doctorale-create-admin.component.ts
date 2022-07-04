import {Component, OnInit, Input} from '@angular/core';
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
  selector: 'app-ecole-doctorale-create-admin',
  templateUrl: './ecole-doctorale-create-admin.component.html',
  styleUrls: ['./ecole-doctorale-create-admin.component.css']
})
export class EcoleDoctoraleCreateAdminComponent implements OnInit {

constructor(private ecoleDoctoraleService: EcoleDoctoraleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.ecoleDoctoraleService.save().subscribe(ecoleDoctorale=>{
       this.ecoleDoctorales.push({...ecoleDoctorale});
       this.createEcoleDoctoraleDialog = false;
       this.selectedEcoleDoctorale = new EcoleDoctoraleVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEcoleDoctoraleDialog  = false;
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

   get createEcoleDoctoraleDialog(): boolean {
           return this.ecoleDoctoraleService.createEcoleDoctoraleDialog;

       }
    set createEcoleDoctoraleDialog(value: boolean) {
        this.ecoleDoctoraleService.createEcoleDoctoraleDialog= value;
       }

       get selectedPays(): PaysVo {
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
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
