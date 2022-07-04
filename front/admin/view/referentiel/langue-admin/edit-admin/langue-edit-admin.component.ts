import {Component, OnInit} from '@angular/core';
import {LangueService} from 'src/app/controller/service/referentiel/Langue.service';
import {LangueVo} from 'src/app/controller/model/referentiel/Langue.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-langue-edit-admin',
  templateUrl: './langue-edit-admin.component.html',
  styleUrls: ['./langue-edit-admin.component.css']
})
export class LangueEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validLangueLibelle = true;
   _validLangueCode = true;




constructor(private datePipe: DatePipe, private langueService: LangueService
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
    this.validLangueLibelle = value;
    this.validLangueCode = value;
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
     this.langueService.edit().subscribe(langue=>{
     const myIndex = this.langues.findIndex(e => e.id === this.selectedLangue.id);
     this.langues[myIndex] = langue;
     this.editLangueDialog = false;
     this.submitted = false;
     this.selectedLangue = new LangueVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateLangueLibelle();
this.validateLangueCode();

    }

private validateLangueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedLangue.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validLangueLibelle = false;
        } else {
            this.validLangueLibelle = true;
        }
    }
private validateLangueCode(){
        if (this.stringUtilService.isEmpty(this.selectedLangue.code)) {
            this.errorMessages.push('Code non valide');
            this.validLangueCode = false;
        } else {
            this.validLangueCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editLangueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get langues(): Array<LangueVo> {
    return this.langueService.langues;
       }
set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }

 get selectedLangue(): LangueVo {
           return this.langueService.selectedLangue;
       }
    set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }

   get editLangueDialog(): boolean {
           return this.langueService.editLangueDialog;

       }
    set editLangueDialog(value: boolean) {
        this.langueService.editLangueDialog= value;
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

    get validLangueLibelle(): boolean {
    return this._validLangueLibelle;
    }

    set validLangueLibelle(value: boolean) {
    this._validLangueLibelle = value;
    }
    get validLangueCode(): boolean {
    return this._validLangueCode;
    }

    set validLangueCode(value: boolean) {
    this._validLangueCode = value;
    }

}
