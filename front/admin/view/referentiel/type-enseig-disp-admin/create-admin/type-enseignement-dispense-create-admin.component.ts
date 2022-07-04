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
  selector: 'app-type-enseignement-dispense-create-admin',
  templateUrl: './type-enseignement-dispense-create-admin.component.html',
  styleUrls: ['./type-enseignement-dispense-create-admin.component.css']
})
export class TypeEnseignementDispenseCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeEnseignementDispenseLibelle = true;
   _validTypeEnseignementDispenseCode = true;




constructor(private datePipe: DatePipe, private typeEnseignementDispenseService: TypeEnseignementDispenseService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypeEnseignementDispenseLibelle = value;
    this.validTypeEnseignementDispenseCode = value;
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
     this.typeEnseignementDispenseService.save().subscribe(typeEnseignementDispense=>{
      if(typeEnseignementDispense != null){
       this.typeEnseignementDispenses.push({...typeEnseignementDispense});
       this.createTypeEnseignementDispenseDialog = false;
       this.submitted = false;
       this.selectedTypeEnseignementDispense = new TypeEnseignementDispenseVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type enseignement dispense existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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










hideCreateDialog(){
    this.createTypeEnseignementDispenseDialog  = false;
    this.setValidation(true);
}

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

   get createTypeEnseignementDispenseDialog(): boolean {
           return this.typeEnseignementDispenseService.createTypeEnseignementDispenseDialog;

       }
    set createTypeEnseignementDispenseDialog(value: boolean) {
        this.typeEnseignementDispenseService.createTypeEnseignementDispenseDialog= value;
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
