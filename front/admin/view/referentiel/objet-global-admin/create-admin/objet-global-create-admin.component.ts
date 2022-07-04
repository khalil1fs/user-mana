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
  selector: 'app-objet-global-create-admin',
  templateUrl: './objet-global-create-admin.component.html',
  styleUrls: ['./objet-global-create-admin.component.css']
})
export class ObjetGlobalCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validObjetGlobalLibelle = true;
   _validObjetGlobalCode = true;




constructor(private datePipe: DatePipe, private objetGlobalService: ObjetGlobalService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validObjetGlobalLibelle = value;
    this.validObjetGlobalCode = value;
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
     this.objetGlobalService.save().subscribe(objetGlobal=>{
      if(objetGlobal != null){
       this.objetGlobals.push({...objetGlobal});
       this.createObjetGlobalDialog = false;
       this.submitted = false;
       this.selectedObjetGlobal = new ObjetGlobalVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Objet global existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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










hideCreateDialog(){
    this.createObjetGlobalDialog  = false;
    this.setValidation(true);
}

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

   get createObjetGlobalDialog(): boolean {
           return this.objetGlobalService.createObjetGlobalDialog;

       }
    set createObjetGlobalDialog(value: boolean) {
        this.objetGlobalService.createObjetGlobalDialog= value;
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
