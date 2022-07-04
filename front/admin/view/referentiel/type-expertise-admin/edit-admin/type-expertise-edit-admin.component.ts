import {Component, OnInit} from '@angular/core';
import {TypeExpertiseService} from 'src/app/controller/service/referentiel/TypeExpertise.service';
import {TypeExpertiseVo} from 'src/app/controller/model/referentiel/TypeExpertise.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-expertise-edit-admin',
  templateUrl: './type-expertise-edit-admin.component.html',
  styleUrls: ['./type-expertise-edit-admin.component.css']
})
export class TypeExpertiseEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeExpertiseLibelle = true;
   _validTypeExpertiseCode = true;




constructor(private datePipe: DatePipe, private typeExpertiseService: TypeExpertiseService
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
    this.validTypeExpertiseLibelle = value;
    this.validTypeExpertiseCode = value;
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
     this.typeExpertiseService.edit().subscribe(typeExpertise=>{
     const myIndex = this.typeExpertises.findIndex(e => e.id === this.selectedTypeExpertise.id);
     this.typeExpertises[myIndex] = typeExpertise;
     this.editTypeExpertiseDialog = false;
     this.submitted = false;
     this.selectedTypeExpertise = new TypeExpertiseVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeExpertiseLibelle();
this.validateTypeExpertiseCode();

    }

private validateTypeExpertiseLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeExpertise.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeExpertiseLibelle = false;
        } else {
            this.validTypeExpertiseLibelle = true;
        }
    }
private validateTypeExpertiseCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeExpertise.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeExpertiseCode = false;
        } else {
            this.validTypeExpertiseCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editTypeExpertiseDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeExpertises(): Array<TypeExpertiseVo> {
    return this.typeExpertiseService.typeExpertises;
       }
set typeExpertises(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertises = value;
       }

 get selectedTypeExpertise(): TypeExpertiseVo {
           return this.typeExpertiseService.selectedTypeExpertise;
       }
    set selectedTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.selectedTypeExpertise = value;
       }

   get editTypeExpertiseDialog(): boolean {
           return this.typeExpertiseService.editTypeExpertiseDialog;

       }
    set editTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.editTypeExpertiseDialog= value;
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

    get validTypeExpertiseLibelle(): boolean {
    return this._validTypeExpertiseLibelle;
    }

    set validTypeExpertiseLibelle(value: boolean) {
    this._validTypeExpertiseLibelle = value;
    }
    get validTypeExpertiseCode(): boolean {
    return this._validTypeExpertiseCode;
    }

    set validTypeExpertiseCode(value: boolean) {
    this._validTypeExpertiseCode = value;
    }

}
