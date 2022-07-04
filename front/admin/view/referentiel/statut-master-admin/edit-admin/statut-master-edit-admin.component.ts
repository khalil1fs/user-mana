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
  selector: 'app-statut-master-edit-admin',
  templateUrl: './statut-master-edit-admin.component.html',
  styleUrls: ['./statut-master-edit-admin.component.css']
})
export class StatutMasterEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStatutMasterLibelle = true;
   _validStatutMasterCode = true;




constructor(private datePipe: DatePipe, private statutMasterService: StatutMasterService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validStatutMasterLibelle = value;
    this.validStatutMasterCode = value;
    }


public edit(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.editWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public editWithShowOption(showList: boolean){
     this.statutMasterService.edit().subscribe(statutMaster=>{
     const myIndex = this.statutMasters.findIndex(e => e.id === this.selectedStatutMaster.id);
     this.statutMasters[myIndex] = statutMaster;
     this.editStatutMasterDialog = false;
     this.submitted = false;
     this.selectedStatutMaster = new StatutMasterVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
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









//openPopup
// methods

hideEditDialog(){
    this.editStatutMasterDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editStatutMasterDialog(): boolean {
           return this.statutMasterService.editStatutMasterDialog;

       }
    set editStatutMasterDialog(value: boolean) {
        this.statutMasterService.editStatutMasterDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatEdit;
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
