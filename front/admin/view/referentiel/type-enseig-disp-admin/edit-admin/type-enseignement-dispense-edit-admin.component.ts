import {Component, OnInit} from '@angular/core';
import {TypeEnseignementDispenseService} from 'src/app/controller/service/referentiel/TypeEnseignementDispense.service';
import {TypeEnseignementDispenseVo} from 'src/app/controller/model/referentiel/TypeEnseignementDispense.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-enseignement-dispense-edit-admin',
  templateUrl: './type-enseignement-dispense-edit-admin.component.html',
  styleUrls: ['./type-enseignement-dispense-edit-admin.component.css']
})
export class TypeEnseignementDispenseEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeEnseignementDispenseLibelle = true;
   _validTypeEnseignementDispenseCode = true;




constructor(private datePipe: DatePipe, private typeEnseignementDispenseService: TypeEnseignementDispenseService
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
    this.validTypeEnseignementDispenseLibelle = value;
    this.validTypeEnseignementDispenseCode = value;
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
     this.typeEnseignementDispenseService.edit().subscribe(typeEnseignementDispense=>{
     const myIndex = this.typeEnseignementDispenses.findIndex(e => e.id === this.selectedTypeEnseignementDispense.id);
     this.typeEnseignementDispenses[myIndex] = typeEnseignementDispense;
     this.editTypeEnseignementDispenseDialog = false;
     this.submitted = false;
     this.selectedTypeEnseignementDispense = new TypeEnseignementDispenseVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeEnseignementDispenseLibelle();
this.validateTypeEnseignementDispenseCode();

    }

private validateTypeEnseignementDispenseLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEnseignementDispense.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeEnseignementDispenseLibelle = false;
        } else {
            this.validTypeEnseignementDispenseLibelle = true;
        }
    }
private validateTypeEnseignementDispenseCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEnseignementDispense.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeEnseignementDispenseCode = false;
        } else {
            this.validTypeEnseignementDispenseCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editTypeEnseignementDispenseDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeEnseignementDispenses(): Array<TypeEnseignementDispenseVo> {
    return this.typeEnseignementDispenseService.typeEnseignementDispenses;
       }
set typeEnseignementDispenses(value: Array<TypeEnseignementDispenseVo>) {
        this.typeEnseignementDispenseService.typeEnseignementDispenses = value;
       }

 get selectedTypeEnseignementDispense(): TypeEnseignementDispenseVo {
           return this.typeEnseignementDispenseService.selectedTypeEnseignementDispense;
       }
    set selectedTypeEnseignementDispense(value: TypeEnseignementDispenseVo) {
        this.typeEnseignementDispenseService.selectedTypeEnseignementDispense = value;
       }

   get editTypeEnseignementDispenseDialog(): boolean {
           return this.typeEnseignementDispenseService.editTypeEnseignementDispenseDialog;

       }
    set editTypeEnseignementDispenseDialog(value: boolean) {
        this.typeEnseignementDispenseService.editTypeEnseignementDispenseDialog= value;
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

    get validTypeEnseignementDispenseLibelle(): boolean {
    return this._validTypeEnseignementDispenseLibelle;
    }

    set validTypeEnseignementDispenseLibelle(value: boolean) {
    this._validTypeEnseignementDispenseLibelle = value;
    }
    get validTypeEnseignementDispenseCode(): boolean {
    return this._validTypeEnseignementDispenseCode;
    }

    set validTypeEnseignementDispenseCode(value: boolean) {
    this._validTypeEnseignementDispenseCode = value;
    }

}
