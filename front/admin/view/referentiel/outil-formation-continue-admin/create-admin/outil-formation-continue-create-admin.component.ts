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
  selector: 'app-outil-formation-continue-create-admin',
  templateUrl: './outil-formation-continue-create-admin.component.html',
  styleUrls: ['./outil-formation-continue-create-admin.component.css']
})
export class OutilFormationContinueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validOutilFormationContinueLibelle = true;
   _validOutilFormationContinueCode = true;




constructor(private datePipe: DatePipe, private outilFormationContinueService: OutilFormationContinueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validOutilFormationContinueLibelle = value;
    this.validOutilFormationContinueCode = value;
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
     this.outilFormationContinueService.save().subscribe(outilFormationContinue=>{
      if(outilFormationContinue != null){
       this.outilFormationContinues.push({...outilFormationContinue});
       this.createOutilFormationContinueDialog = false;
       this.submitted = false;
       this.selectedOutilFormationContinue = new OutilFormationContinueVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Outil formation continue existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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










hideCreateDialog(){
    this.createOutilFormationContinueDialog  = false;
    this.setValidation(true);
}

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

   get createOutilFormationContinueDialog(): boolean {
           return this.outilFormationContinueService.createOutilFormationContinueDialog;

       }
    set createOutilFormationContinueDialog(value: boolean) {
        this.outilFormationContinueService.createOutilFormationContinueDialog= value;
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
