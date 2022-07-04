import {Component, OnInit} from '@angular/core';
import {ObjetGlobalService} from 'src/app/controller/service/referentiel/ObjetGlobal.service';
import {ObjetGlobalVo} from 'src/app/controller/model/referentiel/ObjetGlobal.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-objet-global-edit-admin',
  templateUrl: './objet-global-edit-admin.component.html',
  styleUrls: ['./objet-global-edit-admin.component.css']
})
export class ObjetGlobalEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validObjetGlobalLibelle = true;
   _validObjetGlobalCode = true;




constructor(private datePipe: DatePipe, private objetGlobalService: ObjetGlobalService
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
    this.validObjetGlobalLibelle = value;
    this.validObjetGlobalCode = value;
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
     this.objetGlobalService.edit().subscribe(objetGlobal=>{
     const myIndex = this.objetGlobals.findIndex(e => e.id === this.selectedObjetGlobal.id);
     this.objetGlobals[myIndex] = objetGlobal;
     this.editObjetGlobalDialog = false;
     this.submitted = false;
     this.selectedObjetGlobal = new ObjetGlobalVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateObjetGlobalLibelle();
this.validateObjetGlobalCode();

    }

private validateObjetGlobalLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedObjetGlobal.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validObjetGlobalLibelle = false;
        } else {
            this.validObjetGlobalLibelle = true;
        }
    }
private validateObjetGlobalCode(){
        if (this.stringUtilService.isEmpty(this.selectedObjetGlobal.code)) {
            this.errorMessages.push('Code non valide');
            this.validObjetGlobalCode = false;
        } else {
            this.validObjetGlobalCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editObjetGlobalDialog  = false;
    this.setValidation(true);
}

// getters and setters

get objetGlobals(): Array<ObjetGlobalVo> {
    return this.objetGlobalService.objetGlobals;
       }
set objetGlobals(value: Array<ObjetGlobalVo>) {
        this.objetGlobalService.objetGlobals = value;
       }

 get selectedObjetGlobal(): ObjetGlobalVo {
           return this.objetGlobalService.selectedObjetGlobal;
       }
    set selectedObjetGlobal(value: ObjetGlobalVo) {
        this.objetGlobalService.selectedObjetGlobal = value;
       }

   get editObjetGlobalDialog(): boolean {
           return this.objetGlobalService.editObjetGlobalDialog;

       }
    set editObjetGlobalDialog(value: boolean) {
        this.objetGlobalService.editObjetGlobalDialog= value;
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

    get validObjetGlobalLibelle(): boolean {
    return this._validObjetGlobalLibelle;
    }

    set validObjetGlobalLibelle(value: boolean) {
    this._validObjetGlobalLibelle = value;
    }
    get validObjetGlobalCode(): boolean {
    return this._validObjetGlobalCode;
    }

    set validObjetGlobalCode(value: boolean) {
    this._validObjetGlobalCode = value;
    }

}
