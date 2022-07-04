import {Component, OnInit} from '@angular/core';
import {TypeParticipationService} from 'src/app/controller/service/referentiel/TypeParticipation.service';
import {TypeParticipationVo} from 'src/app/controller/model/referentiel/TypeParticipation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-participation-edit-admin',
  templateUrl: './type-participation-edit-admin.component.html',
  styleUrls: ['./type-participation-edit-admin.component.css']
})
export class TypeParticipationEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeParticipationLibelle = true;
   _validTypeParticipationCode = true;




constructor(private datePipe: DatePipe, private typeParticipationService: TypeParticipationService
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
    this.validTypeParticipationLibelle = value;
    this.validTypeParticipationCode = value;
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
     this.typeParticipationService.edit().subscribe(typeParticipation=>{
     const myIndex = this.typeParticipations.findIndex(e => e.id === this.selectedTypeParticipation.id);
     this.typeParticipations[myIndex] = typeParticipation;
     this.editTypeParticipationDialog = false;
     this.submitted = false;
     this.selectedTypeParticipation = new TypeParticipationVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeParticipationLibelle();
this.validateTypeParticipationCode();

    }

private validateTypeParticipationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeParticipation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeParticipationLibelle = false;
        } else {
            this.validTypeParticipationLibelle = true;
        }
    }
private validateTypeParticipationCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeParticipation.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeParticipationCode = false;
        } else {
            this.validTypeParticipationCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editTypeParticipationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeParticipations(): Array<TypeParticipationVo> {
    return this.typeParticipationService.typeParticipations;
       }
set typeParticipations(value: Array<TypeParticipationVo>) {
        this.typeParticipationService.typeParticipations = value;
       }

 get selectedTypeParticipation(): TypeParticipationVo {
           return this.typeParticipationService.selectedTypeParticipation;
       }
    set selectedTypeParticipation(value: TypeParticipationVo) {
        this.typeParticipationService.selectedTypeParticipation = value;
       }

   get editTypeParticipationDialog(): boolean {
           return this.typeParticipationService.editTypeParticipationDialog;

       }
    set editTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.editTypeParticipationDialog= value;
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

    get validTypeParticipationLibelle(): boolean {
    return this._validTypeParticipationLibelle;
    }

    set validTypeParticipationLibelle(value: boolean) {
    this._validTypeParticipationLibelle = value;
    }
    get validTypeParticipationCode(): boolean {
    return this._validTypeParticipationCode;
    }

    set validTypeParticipationCode(value: boolean) {
    this._validTypeParticipationCode = value;
    }

}
