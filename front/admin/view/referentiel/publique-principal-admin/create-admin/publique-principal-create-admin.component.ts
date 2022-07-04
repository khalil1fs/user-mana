import {Component, OnInit} from '@angular/core';
import {PubliquePrincipalService} from 'src/app/controller/service/referentiel/PubliquePrincipal.service';
import {PubliquePrincipalVo} from 'src/app/controller/model/referentiel/PubliquePrincipal.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-publique-principal-create-admin',
  templateUrl: './publique-principal-create-admin.component.html',
  styleUrls: ['./publique-principal-create-admin.component.css']
})
export class PubliquePrincipalCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPubliquePrincipalLibelle = true;
   _validPubliquePrincipalCode = true;




constructor(private datePipe: DatePipe, private publiquePrincipalService: PubliquePrincipalService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validPubliquePrincipalLibelle = value;
    this.validPubliquePrincipalCode = value;
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
     this.publiquePrincipalService.save().subscribe(publiquePrincipal=>{
      if(publiquePrincipal != null){
       this.publiquePrincipals.push({...publiquePrincipal});
       this.createPubliquePrincipalDialog = false;
       this.submitted = false;
       this.selectedPubliquePrincipal = new PubliquePrincipalVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Publique principal existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePubliquePrincipalLibelle();
this.validatePubliquePrincipalCode();

    }

private validatePubliquePrincipalLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedPubliquePrincipal.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPubliquePrincipalLibelle = false;
        } else {
            this.validPubliquePrincipalLibelle = true;
        }
    }
private validatePubliquePrincipalCode(){
        if (this.stringUtilService.isEmpty(this.selectedPubliquePrincipal.code)) {
            this.errorMessages.push('Code non valide');
            this.validPubliquePrincipalCode = false;
        } else {
            this.validPubliquePrincipalCode = true;
        }
    }










hideCreateDialog(){
    this.createPubliquePrincipalDialog  = false;
    this.setValidation(true);
}

get publiquePrincipals(): Array<PubliquePrincipalVo> {
    return this.publiquePrincipalService.publiquePrincipals;
       }
set publiquePrincipals(value: Array<PubliquePrincipalVo>) {
        this.publiquePrincipalService.publiquePrincipals = value;
       }

 get selectedPubliquePrincipal(): PubliquePrincipalVo {
           return this.publiquePrincipalService.selectedPubliquePrincipal;
       }
    set selectedPubliquePrincipal(value: PubliquePrincipalVo) {
        this.publiquePrincipalService.selectedPubliquePrincipal = value;
       }

   get createPubliquePrincipalDialog(): boolean {
           return this.publiquePrincipalService.createPubliquePrincipalDialog;

       }
    set createPubliquePrincipalDialog(value: boolean) {
        this.publiquePrincipalService.createPubliquePrincipalDialog= value;
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

    get validPubliquePrincipalLibelle(): boolean {
    return this._validPubliquePrincipalLibelle;
    }

    set validPubliquePrincipalLibelle(value: boolean) {
    this._validPubliquePrincipalLibelle = value;
    }
    get validPubliquePrincipalCode(): boolean {
    return this._validPubliquePrincipalCode;
    }

    set validPubliquePrincipalCode(value: boolean) {
    this._validPubliquePrincipalCode = value;
    }


}
