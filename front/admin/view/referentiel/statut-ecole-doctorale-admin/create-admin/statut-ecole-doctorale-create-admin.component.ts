import {Component, OnInit} from '@angular/core';
import {StatutEcoleDoctoraleService} from 'src/app/controller/service/formulaire/StatutEcoleDoctorale.service';
import {StatutEcoleDoctoraleVo} from 'src/app/controller/model/referentiel/StatutEcoleDoctorale.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-statut-ecole-doctorale-create-admin',
  templateUrl: './statut-ecole-doctorale-create-admin.component.html',
  styleUrls: ['./statut-ecole-doctorale-create-admin.component.css']
})
export class StatutEcoleDoctoraleCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStatutEcoleDoctoraleLibelle = true;
   _validStatutEcoleDoctoraleCode = true;




constructor(private datePipe: DatePipe, private statutEcoleDoctoraleService: StatutEcoleDoctoraleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validStatutEcoleDoctoraleLibelle = value;
    this.validStatutEcoleDoctoraleCode = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.statutEcoleDoctoraleService.save().subscribe(statutEcoleDoctorale=>{
      if(statutEcoleDoctorale != null){
       this.statutEcoleDoctorales.push({...statutEcoleDoctorale});
       this.createStatutEcoleDoctoraleDialog = false;
       this.submitted = false;
       this.selectedStatutEcoleDoctorale = new StatutEcoleDoctoraleVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Statut ecole doctorale existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateStatutEcoleDoctoraleLibelle();
this.validateStatutEcoleDoctoraleCode();

    }

private validateStatutEcoleDoctoraleLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStatutEcoleDoctorale.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStatutEcoleDoctoraleLibelle = false;
        } else {
            this.validStatutEcoleDoctoraleLibelle = true;
        }
    }
private validateStatutEcoleDoctoraleCode(){
        if (this.stringUtilService.isEmpty(this.selectedStatutEcoleDoctorale.code)) {
            this.errorMessages.push('Code non valide');
            this.validStatutEcoleDoctoraleCode = false;
        } else {
            this.validStatutEcoleDoctoraleCode = true;
        }
    }










hideCreateDialog(){
    this.createStatutEcoleDoctoraleDialog  = false;
    this.setValidation(true);
}

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

   get createStatutEcoleDoctoraleDialog(): boolean {
           return this.statutEcoleDoctoraleService.createStatutEcoleDoctoraleDialog;

       }
    set createStatutEcoleDoctoraleDialog(value: boolean) {
        this.statutEcoleDoctoraleService.createStatutEcoleDoctoraleDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatCreate;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validStatutEcoleDoctoraleLibelle(): boolean {
    return this._validStatutEcoleDoctoraleLibelle;
    }

    set validStatutEcoleDoctoraleLibelle(value: boolean) {
    this._validStatutEcoleDoctoraleLibelle = value;
    }
    get validStatutEcoleDoctoraleCode(): boolean {
    return this._validStatutEcoleDoctoraleCode;
    }

    set validStatutEcoleDoctoraleCode(value: boolean) {
    this._validStatutEcoleDoctoraleCode = value;
    }


}
