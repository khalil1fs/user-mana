import {Component, OnInit} from '@angular/core';
import {TypeReclamationService} from 'src/app/controller/service/referentiel/TypeReclamation.service';
import {TypeReclamationVo} from 'src/app/controller/model/referentiel/TypeReclamation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-reclamation-create-admin',
  templateUrl: './type-reclamation-create-admin.component.html',
  styleUrls: ['./type-reclamation-create-admin.component.css']
})
export class TypeReclamationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeReclamationLibelle = true;
   _validTypeReclamationCode = true;




constructor(private datePipe: DatePipe, private typeReclamationService: TypeReclamationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypeReclamationLibelle = value;
    this.validTypeReclamationCode = value;
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
     this.typeReclamationService.save().subscribe(typeReclamation=>{
      if(typeReclamation != null){
       this.typeReclamations.push({...typeReclamation});
       this.createTypeReclamationDialog = false;
       this.submitted = false;
       this.selectedTypeReclamation = new TypeReclamationVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type reclamation existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeReclamationLibelle();
this.validateTypeReclamationCode();

    }

private validateTypeReclamationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeReclamation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeReclamationLibelle = false;
        } else {
            this.validTypeReclamationLibelle = true;
        }
    }
private validateTypeReclamationCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeReclamation.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeReclamationCode = false;
        } else {
            this.validTypeReclamationCode = true;
        }
    }










hideCreateDialog(){
    this.createTypeReclamationDialog  = false;
    this.setValidation(true);
}

get typeReclamations(): Array<TypeReclamationVo> {
    return this.typeReclamationService.typeReclamations;
       }
set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }

 get selectedTypeReclamation(): TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
    set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }

   get createTypeReclamationDialog(): boolean {
           return this.typeReclamationService.createTypeReclamationDialog;

       }
    set createTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.createTypeReclamationDialog= value;
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

    get validTypeReclamationLibelle(): boolean {
    return this._validTypeReclamationLibelle;
    }

    set validTypeReclamationLibelle(value: boolean) {
    this._validTypeReclamationLibelle = value;
    }
    get validTypeReclamationCode(): boolean {
    return this._validTypeReclamationCode;
    }

    set validTypeReclamationCode(value: boolean) {
    this._validTypeReclamationCode = value;
    }


}
