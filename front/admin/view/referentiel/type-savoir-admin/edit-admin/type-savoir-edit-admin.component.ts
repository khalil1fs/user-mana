import {Component, OnInit} from '@angular/core';
import {TypeSavoirService} from 'src/app/controller/service/referentiel/TypeSavoir.service';
import {TypeSavoirVo} from 'src/app/controller/model/referentiel/TypeSavoir.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-savoir-edit-admin',
  templateUrl: './type-savoir-edit-admin.component.html',
  styleUrls: ['./type-savoir-edit-admin.component.css']
})
export class TypeSavoirEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeSavoirLibelle = true;
   _validTypeSavoirCode = true;




constructor(private datePipe: DatePipe, private typeSavoirService: TypeSavoirService
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
    this.validTypeSavoirLibelle = value;
    this.validTypeSavoirCode = value;
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
     this.typeSavoirService.edit().subscribe(typeSavoir=>{
     const myIndex = this.typeSavoirs.findIndex(e => e.id === this.selectedTypeSavoir.id);
     this.typeSavoirs[myIndex] = typeSavoir;
     this.editTypeSavoirDialog = false;
     this.submitted = false;
     this.selectedTypeSavoir = new TypeSavoirVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeSavoirLibelle();
this.validateTypeSavoirCode();

    }

private validateTypeSavoirLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeSavoir.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeSavoirLibelle = false;
        } else {
            this.validTypeSavoirLibelle = true;
        }
    }
private validateTypeSavoirCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeSavoir.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeSavoirCode = false;
        } else {
            this.validTypeSavoirCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editTypeSavoirDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeSavoirs(): Array<TypeSavoirVo> {
    return this.typeSavoirService.typeSavoirs;
       }
set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }

 get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
    set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }

   get editTypeSavoirDialog(): boolean {
           return this.typeSavoirService.editTypeSavoirDialog;

       }
    set editTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.editTypeSavoirDialog= value;
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

    get validTypeSavoirLibelle(): boolean {
    return this._validTypeSavoirLibelle;
    }

    set validTypeSavoirLibelle(value: boolean) {
    this._validTypeSavoirLibelle = value;
    }
    get validTypeSavoirCode(): boolean {
    return this._validTypeSavoirCode;
    }

    set validTypeSavoirCode(value: boolean) {
    this._validTypeSavoirCode = value;
    }

}
