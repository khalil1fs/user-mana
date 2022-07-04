import {Component, OnInit} from '@angular/core';
import {OutilFormationContinueService} from 'src/app/controller/service/formulaire/OutilFormationContinue.service';
import {OutilFormationContinueVo} from 'src/app/controller/model/referentiel/OutilFormationContinue.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-outil-formation-continue-edit-admin',
  templateUrl: './outil-formation-continue-edit-admin.component.html',
  styleUrls: ['./outil-formation-continue-edit-admin.component.css']
})
export class OutilFormationContinueEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validOutilFormationContinueLibelle = true;
   _validOutilFormationContinueCode = true;




constructor(private datePipe: DatePipe, private outilFormationContinueService: OutilFormationContinueService
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
    this.validOutilFormationContinueLibelle = value;
    this.validOutilFormationContinueCode = value;
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
     this.outilFormationContinueService.edit().subscribe(outilFormationContinue=>{
     const myIndex = this.outilFormationContinues.findIndex(e => e.id === this.selectedOutilFormationContinue.id);
     this.outilFormationContinues[myIndex] = outilFormationContinue;
     this.editOutilFormationContinueDialog = false;
     this.submitted = false;
     this.selectedOutilFormationContinue = new OutilFormationContinueVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateOutilFormationContinueLibelle();
this.validateOutilFormationContinueCode();

    }

private validateOutilFormationContinueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedOutilFormationContinue.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validOutilFormationContinueLibelle = false;
        } else {
            this.validOutilFormationContinueLibelle = true;
        }
    }
private validateOutilFormationContinueCode(){
        if (this.stringUtilService.isEmpty(this.selectedOutilFormationContinue.code)) {
            this.errorMessages.push('Code non valide');
            this.validOutilFormationContinueCode = false;
        } else {
            this.validOutilFormationContinueCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editOutilFormationContinueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get outilFormationContinues(): Array<OutilFormationContinueVo> {
    return this.outilFormationContinueService.outilFormationContinues;
       }
set outilFormationContinues(value: Array<OutilFormationContinueVo>) {
        this.outilFormationContinueService.outilFormationContinues = value;
       }

 get selectedOutilFormationContinue(): OutilFormationContinueVo {
           return this.outilFormationContinueService.selectedOutilFormationContinue;
       }
    set selectedOutilFormationContinue(value: OutilFormationContinueVo) {
        this.outilFormationContinueService.selectedOutilFormationContinue = value;
       }

   get editOutilFormationContinueDialog(): boolean {
           return this.outilFormationContinueService.editOutilFormationContinueDialog;

       }
    set editOutilFormationContinueDialog(value: boolean) {
        this.outilFormationContinueService.editOutilFormationContinueDialog= value;
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

    get validOutilFormationContinueLibelle(): boolean {
    return this._validOutilFormationContinueLibelle;
    }

    set validOutilFormationContinueLibelle(value: boolean) {
    this._validOutilFormationContinueLibelle = value;
    }
    get validOutilFormationContinueCode(): boolean {
    return this._validOutilFormationContinueCode;
    }

    set validOutilFormationContinueCode(value: boolean) {
    this._validOutilFormationContinueCode = value;
    }

}
