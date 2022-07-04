import {Component, OnInit} from '@angular/core';
import {StatutMasterService} from 'src/app/controller/service/referentiel/StatutMaster.service';
import {StatutMasterVo} from 'src/app/controller/model/referentiel/StatutMaster.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-statut-master-create-admin',
  templateUrl: './statut-master-create-admin.component.html',
  styleUrls: ['./statut-master-create-admin.component.css']
})
export class StatutMasterCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStatutMasterLibelle = true;
   _validStatutMasterCode = true;




constructor(private datePipe: DatePipe, private statutMasterService: StatutMasterService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validStatutMasterLibelle = value;
    this.validStatutMasterCode = value;
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
     this.statutMasterService.save().subscribe(statutMaster=>{
      if(statutMaster != null){
       this.statutMasters.push({...statutMaster});
       this.createStatutMasterDialog = false;
       this.submitted = false;
       this.selectedStatutMaster = new StatutMasterVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Statut master existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateStatutMasterLibelle();
this.validateStatutMasterCode();

    }

private validateStatutMasterLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStatutMaster.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStatutMasterLibelle = false;
        } else {
            this.validStatutMasterLibelle = true;
        }
    }
private validateStatutMasterCode(){
        if (this.stringUtilService.isEmpty(this.selectedStatutMaster.code)) {
            this.errorMessages.push('Code non valide');
            this.validStatutMasterCode = false;
        } else {
            this.validStatutMasterCode = true;
        }
    }










hideCreateDialog(){
    this.createStatutMasterDialog  = false;
    this.setValidation(true);
}

get statutMasters(): Array<StatutMasterVo> {
    return this.statutMasterService.statutMasters;
       }
set statutMasters(value: Array<StatutMasterVo>) {
        this.statutMasterService.statutMasters = value;
       }

 get selectedStatutMaster(): StatutMasterVo {
           return this.statutMasterService.selectedStatutMaster;
       }
    set selectedStatutMaster(value: StatutMasterVo) {
        this.statutMasterService.selectedStatutMaster = value;
       }

   get createStatutMasterDialog(): boolean {
           return this.statutMasterService.createStatutMasterDialog;

       }
    set createStatutMasterDialog(value: boolean) {
        this.statutMasterService.createStatutMasterDialog= value;
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

    get validStatutMasterLibelle(): boolean {
    return this._validStatutMasterLibelle;
    }

    set validStatutMasterLibelle(value: boolean) {
    this._validStatutMasterLibelle = value;
    }
    get validStatutMasterCode(): boolean {
    return this._validStatutMasterCode;
    }

    set validStatutMasterCode(value: boolean) {
    this._validStatutMasterCode = value;
    }


}
