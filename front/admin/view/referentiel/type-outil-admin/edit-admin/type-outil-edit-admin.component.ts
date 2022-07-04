import {Component, OnInit} from '@angular/core';
import {TypeOutilService} from 'src/app/controller/service/referentiel/TypeOutil.service';
import {TypeOutilVo} from 'src/app/controller/model/referentiel/TypeOutil.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-outil-edit-admin',
  templateUrl: './type-outil-edit-admin.component.html',
  styleUrls: ['./type-outil-edit-admin.component.css']
})
export class TypeOutilEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeOutilLibelle = true;
   _validTypeOutilCode = true;




constructor(private datePipe: DatePipe, private typeOutilService: TypeOutilService
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
    this.validTypeOutilLibelle = value;
    this.validTypeOutilCode = value;
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
     this.typeOutilService.edit().subscribe(typeOutil=>{
     const myIndex = this.typeOutils.findIndex(e => e.id === this.selectedTypeOutil.id);
     this.typeOutils[myIndex] = typeOutil;
     this.editTypeOutilDialog = false;
     this.submitted = false;
     this.selectedTypeOutil = new TypeOutilVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeOutilLibelle();
this.validateTypeOutilCode();

    }

private validateTypeOutilLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeOutil.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeOutilLibelle = false;
        } else {
            this.validTypeOutilLibelle = true;
        }
    }
private validateTypeOutilCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeOutil.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeOutilCode = false;
        } else {
            this.validTypeOutilCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editTypeOutilDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeOutils(): Array<TypeOutilVo> {
    return this.typeOutilService.typeOutils;
       }
set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }

 get selectedTypeOutil(): TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
    set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }

   get editTypeOutilDialog(): boolean {
           return this.typeOutilService.editTypeOutilDialog;

       }
    set editTypeOutilDialog(value: boolean) {
        this.typeOutilService.editTypeOutilDialog= value;
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

    get validTypeOutilLibelle(): boolean {
    return this._validTypeOutilLibelle;
    }

    set validTypeOutilLibelle(value: boolean) {
    this._validTypeOutilLibelle = value;
    }
    get validTypeOutilCode(): boolean {
    return this._validTypeOutilCode;
    }

    set validTypeOutilCode(value: boolean) {
    this._validTypeOutilCode = value;
    }

}
