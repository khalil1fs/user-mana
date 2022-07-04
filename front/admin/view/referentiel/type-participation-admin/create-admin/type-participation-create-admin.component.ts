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
  selector: 'app-type-participation-create-admin',
  templateUrl: './type-participation-create-admin.component.html',
  styleUrls: ['./type-participation-create-admin.component.css']
})
export class TypeParticipationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeParticipationLibelle = true;
   _validTypeParticipationCode = true;




constructor(private datePipe: DatePipe, private typeParticipationService: TypeParticipationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypeParticipationLibelle = value;
    this.validTypeParticipationCode = value;
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
     this.typeParticipationService.save().subscribe(typeParticipation=>{
      if(typeParticipation != null){
       this.typeParticipations.push({...typeParticipation});
       this.createTypeParticipationDialog = false;
       this.submitted = false;
       this.selectedTypeParticipation = new TypeParticipationVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type participation existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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










hideCreateDialog(){
    this.createTypeParticipationDialog  = false;
    this.setValidation(true);
}

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

   get createTypeParticipationDialog(): boolean {
           return this.typeParticipationService.createTypeParticipationDialog;

       }
    set createTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.createTypeParticipationDialog= value;
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
