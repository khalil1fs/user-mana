import {Component, OnInit} from '@angular/core';
import {ContexteService} from 'src/app/controller/service/referentiel/Contexte.service';
import {ContexteVo} from 'src/app/controller/model/referentiel/Contexte.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-contexte-edit-admin',
  templateUrl: './contexte-edit-admin.component.html',
  styleUrls: ['./contexte-edit-admin.component.css']
})
export class ContexteEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validContexteLibelle = true;
   _validContexteCode = true;




constructor(private datePipe: DatePipe, private contexteService: ContexteService
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
    this.validContexteLibelle = value;
    this.validContexteCode = value;
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
     this.contexteService.edit().subscribe(contexte=>{
     const myIndex = this.contextes.findIndex(e => e.id === this.selectedContexte.id);
     this.contextes[myIndex] = contexte;
     this.editContexteDialog = false;
     this.submitted = false;
     this.selectedContexte = new ContexteVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateContexteLibelle();
this.validateContexteCode();

    }

private validateContexteLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedContexte.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validContexteLibelle = false;
        } else {
            this.validContexteLibelle = true;
        }
    }
private validateContexteCode(){
        if (this.stringUtilService.isEmpty(this.selectedContexte.code)) {
            this.errorMessages.push('Code non valide');
            this.validContexteCode = false;
        } else {
            this.validContexteCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editContexteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get contextes(): Array<ContexteVo> {
    return this.contexteService.contextes;
       }
set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }

 get selectedContexte(): ContexteVo {
           return this.contexteService.selectedContexte;
       }
    set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }

   get editContexteDialog(): boolean {
           return this.contexteService.editContexteDialog;

       }
    set editContexteDialog(value: boolean) {
        this.contexteService.editContexteDialog= value;
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

    get validContexteLibelle(): boolean {
    return this._validContexteLibelle;
    }

    set validContexteLibelle(value: boolean) {
    this._validContexteLibelle = value;
    }
    get validContexteCode(): boolean {
    return this._validContexteCode;
    }

    set validContexteCode(value: boolean) {
    this._validContexteCode = value;
    }

}
