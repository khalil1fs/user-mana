import {Component, OnInit} from '@angular/core';
import {TypeExpertService} from 'src/app/controller/service/referentiel/TypeExpert.service';
import {TypeExpertVo} from 'src/app/controller/model/referentiel/TypeExpert.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-expert-edit-admin',
  templateUrl: './type-expert-edit-admin.component.html',
  styleUrls: ['./type-expert-edit-admin.component.css']
})
export class TypeExpertEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeExpertLibelle = true;
   _validTypeExpertCode = true;




constructor(private datePipe: DatePipe, private typeExpertService: TypeExpertService
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
    this.validTypeExpertLibelle = value;
    this.validTypeExpertCode = value;
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
     this.typeExpertService.edit().subscribe(typeExpert=>{
     const myIndex = this.typeExperts.findIndex(e => e.id === this.selectedTypeExpert.id);
     this.typeExperts[myIndex] = typeExpert;
     this.editTypeExpertDialog = false;
     this.submitted = false;
     this.selectedTypeExpert = new TypeExpertVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeExpertLibelle();
this.validateTypeExpertCode();

    }

private validateTypeExpertLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeExpert.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeExpertLibelle = false;
        } else {
            this.validTypeExpertLibelle = true;
        }
    }
private validateTypeExpertCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeExpert.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeExpertCode = false;
        } else {
            this.validTypeExpertCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editTypeExpertDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeExperts(): Array<TypeExpertVo> {
    return this.typeExpertService.typeExperts;
       }
set typeExperts(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExperts = value;
       }

 get selectedTypeExpert(): TypeExpertVo {
           return this.typeExpertService.selectedTypeExpert;
       }
    set selectedTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.selectedTypeExpert = value;
       }

   get editTypeExpertDialog(): boolean {
           return this.typeExpertService.editTypeExpertDialog;

       }
    set editTypeExpertDialog(value: boolean) {
        this.typeExpertService.editTypeExpertDialog= value;
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

    get validTypeExpertLibelle(): boolean {
    return this._validTypeExpertLibelle;
    }

    set validTypeExpertLibelle(value: boolean) {
    this._validTypeExpertLibelle = value;
    }
    get validTypeExpertCode(): boolean {
    return this._validTypeExpertCode;
    }

    set validTypeExpertCode(value: boolean) {
    this._validTypeExpertCode = value;
    }

}
