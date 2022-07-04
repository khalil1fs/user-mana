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
  selector: 'app-publique-principal-edit-admin',
  templateUrl: './publique-principal-edit-admin.component.html',
  styleUrls: ['./publique-principal-edit-admin.component.css']
})
export class PubliquePrincipalEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPubliquePrincipalLibelle = true;
   _validPubliquePrincipalCode = true;




constructor(private datePipe: DatePipe, private publiquePrincipalService: PubliquePrincipalService
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
    this.validPubliquePrincipalLibelle = value;
    this.validPubliquePrincipalCode = value;
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
     this.publiquePrincipalService.edit().subscribe(publiquePrincipal=>{
     const myIndex = this.publiquePrincipals.findIndex(e => e.id === this.selectedPubliquePrincipal.id);
     this.publiquePrincipals[myIndex] = publiquePrincipal;
     this.editPubliquePrincipalDialog = false;
     this.submitted = false;
     this.selectedPubliquePrincipal = new PubliquePrincipalVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
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









//openPopup
// methods

hideEditDialog(){
    this.editPubliquePrincipalDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editPubliquePrincipalDialog(): boolean {
           return this.publiquePrincipalService.editPubliquePrincipalDialog;

       }
    set editPubliquePrincipalDialog(value: boolean) {
        this.publiquePrincipalService.editPubliquePrincipalDialog= value;
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
