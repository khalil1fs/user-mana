import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {RoleDeveloppementDeSavoirVo} from 'src/app/controller/model/referentiel/RoleDeveloppementDeSavoir.model';
import {environment} from 'src/environments/environment';
import {RoleDeveloppementDeSavoirService} from 'src/app/controller/service/referentiel/RoleDeveloppementDeSavoir.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-role-developpement-de-savoir-edit-admin',
  templateUrl: './role-dev-de-savoir-edit-admin.component.html',
  styleUrls: ['./role-dev-de-savoir-edit-admin.component.css']
})
export class RoleDeveloppementDeSavoirEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRoleDeveloppementDeSavoirLibelle = true;
   _validRoleDeveloppementDeSavoirCode = true;




constructor(private datePipe: DatePipe, private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
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
    this.validRoleDeveloppementDeSavoirLibelle = value;
    this.validRoleDeveloppementDeSavoirCode = value;
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
     this.roleDeveloppementDeSavoirService.edit().subscribe(roleDeveloppementDeSavoir=>{
     const myIndex = this.roleDeveloppementDeSavoirs.findIndex(e => e.id === this.selectedRoleDeveloppementDeSavoir.id);
     this.roleDeveloppementDeSavoirs[myIndex] = roleDeveloppementDeSavoir;
     this.editRoleDeveloppementDeSavoirDialog = false;
     this.submitted = false;
     this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateRoleDeveloppementDeSavoirLibelle();
this.validateRoleDeveloppementDeSavoirCode();

    }

private validateRoleDeveloppementDeSavoirLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedRoleDeveloppementDeSavoir.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRoleDeveloppementDeSavoirLibelle = false;
        } else {
            this.validRoleDeveloppementDeSavoirLibelle = true;
        }
    }
private validateRoleDeveloppementDeSavoirCode(){
        if (this.stringUtilService.isEmpty(this.selectedRoleDeveloppementDeSavoir.code)) {
            this.errorMessages.push('Code non valide');
            this.validRoleDeveloppementDeSavoirCode = false;
        } else {
            this.validRoleDeveloppementDeSavoirCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editRoleDeveloppementDeSavoirDialog  = false;
    this.setValidation(true);
}

// getters and setters

get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
    return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }

 get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }

   get editRoleDeveloppementDeSavoirDialog(): boolean {
           return this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog;

       }
    set editRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog= value;
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

    get validRoleDeveloppementDeSavoirLibelle(): boolean {
    return this._validRoleDeveloppementDeSavoirLibelle;
    }

    set validRoleDeveloppementDeSavoirLibelle(value: boolean) {
    this._validRoleDeveloppementDeSavoirLibelle = value;
    }
    get validRoleDeveloppementDeSavoirCode(): boolean {
    return this._validRoleDeveloppementDeSavoirCode;
    }

    set validRoleDeveloppementDeSavoirCode(value: boolean) {
    this._validRoleDeveloppementDeSavoirCode = value;
    }

}
