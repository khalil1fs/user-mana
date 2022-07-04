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
  selector: 'app-contexte-create-admin',
  templateUrl: './contexte-create-admin.component.html',
  styleUrls: ['./contexte-create-admin.component.css']
})
export class ContexteCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validContexteLibelle = true;
   _validContexteCode = true;




constructor(private datePipe: DatePipe, private contexteService: ContexteService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validContexteLibelle = value;
    this.validContexteCode = value;
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
     this.contexteService.save().subscribe(contexte=>{
      if(contexte != null){
       this.contextes.push({...contexte});
       this.createContexteDialog = false;
       this.submitted = false;
       this.selectedContexte = new ContexteVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Contexte existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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










hideCreateDialog(){
    this.createContexteDialog  = false;
    this.setValidation(true);
}

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

   get createContexteDialog(): boolean {
           return this.contexteService.createContexteDialog;

       }
    set createContexteDialog(value: boolean) {
        this.contexteService.createContexteDialog= value;
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
