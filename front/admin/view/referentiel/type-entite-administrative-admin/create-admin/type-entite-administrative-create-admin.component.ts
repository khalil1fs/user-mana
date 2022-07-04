import {Component, OnInit} from '@angular/core';
import {TypeEntiteAdministrativeService} from 'src/app/controller/service/referentiel/TypeEntiteAdministrative.service';
import {TypeEntiteAdministrativeVo} from 'src/app/controller/model/referentiel/TypeEntiteAdministrative.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-entite-administrative-create-admin',
  templateUrl: './type-entite-administrative-create-admin.component.html',
  styleUrls: ['./type-entite-administrative-create-admin.component.css']
})
export class TypeEntiteAdministrativeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeEntiteAdministrativeLibelle = true;
   _validTypeEntiteAdministrativeCode = true;




constructor(private datePipe: DatePipe, private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypeEntiteAdministrativeLibelle = value;
    this.validTypeEntiteAdministrativeCode = value;
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
     this.typeEntiteAdministrativeService.save().subscribe(typeEntiteAdministrative=>{
      if(typeEntiteAdministrative != null){
       this.typeEntiteAdministratives.push({...typeEntiteAdministrative});
       this.createTypeEntiteAdministrativeDialog = false;
       this.submitted = false;
       this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type entite administrative existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeEntiteAdministrativeLibelle();
this.validateTypeEntiteAdministrativeCode();

    }

private validateTypeEntiteAdministrativeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEntiteAdministrative.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeEntiteAdministrativeLibelle = false;
        } else {
            this.validTypeEntiteAdministrativeLibelle = true;
        }
    }
private validateTypeEntiteAdministrativeCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEntiteAdministrative.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeEntiteAdministrativeCode = false;
        } else {
            this.validTypeEntiteAdministrativeCode = true;
        }
    }










hideCreateDialog(){
    this.createTypeEntiteAdministrativeDialog  = false;
    this.setValidation(true);
}

get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
    return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }

 get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
    set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }

   get createTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog;

       }
    set createTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog= value;
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

    get validTypeEntiteAdministrativeLibelle(): boolean {
    return this._validTypeEntiteAdministrativeLibelle;
    }

    set validTypeEntiteAdministrativeLibelle(value: boolean) {
    this._validTypeEntiteAdministrativeLibelle = value;
    }
    get validTypeEntiteAdministrativeCode(): boolean {
    return this._validTypeEntiteAdministrativeCode;
    }

    set validTypeEntiteAdministrativeCode(value: boolean) {
    this._validTypeEntiteAdministrativeCode = value;
    }


}
