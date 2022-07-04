import {Component, OnInit} from '@angular/core';
import {PublicCibleService} from 'src/app/controller/service/referentiel/PublicCible.service';
import {PublicCibleVo} from 'src/app/controller/model/referentiel/PublicCible.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-public-cible-edit-admin',
  templateUrl: './public-cible-edit-admin.component.html',
  styleUrls: ['./public-cible-edit-admin.component.css']
})
export class PublicCibleEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPublicCibleLibelle = true;
   _validPublicCibleCode = true;




constructor(private datePipe: DatePipe, private publicCibleService: PublicCibleService
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
    this.validPublicCibleLibelle = value;
    this.validPublicCibleCode = value;
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
     this.publicCibleService.edit().subscribe(publicCible=>{
     const myIndex = this.publicCibles.findIndex(e => e.id === this.selectedPublicCible.id);
     this.publicCibles[myIndex] = publicCible;
     this.editPublicCibleDialog = false;
     this.submitted = false;
     this.selectedPublicCible = new PublicCibleVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePublicCibleLibelle();
this.validatePublicCibleCode();

    }

private validatePublicCibleLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedPublicCible.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPublicCibleLibelle = false;
        } else {
            this.validPublicCibleLibelle = true;
        }
    }
private validatePublicCibleCode(){
        if (this.stringUtilService.isEmpty(this.selectedPublicCible.code)) {
            this.errorMessages.push('Code non valide');
            this.validPublicCibleCode = false;
        } else {
            this.validPublicCibleCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editPublicCibleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get publicCibles(): Array<PublicCibleVo> {
    return this.publicCibleService.publicCibles;
       }
set publicCibles(value: Array<PublicCibleVo>) {
        this.publicCibleService.publicCibles = value;
       }

 get selectedPublicCible(): PublicCibleVo {
           return this.publicCibleService.selectedPublicCible;
       }
    set selectedPublicCible(value: PublicCibleVo) {
        this.publicCibleService.selectedPublicCible = value;
       }

   get editPublicCibleDialog(): boolean {
           return this.publicCibleService.editPublicCibleDialog;

       }
    set editPublicCibleDialog(value: boolean) {
        this.publicCibleService.editPublicCibleDialog= value;
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

    get validPublicCibleLibelle(): boolean {
    return this._validPublicCibleLibelle;
    }

    set validPublicCibleLibelle(value: boolean) {
    this._validPublicCibleLibelle = value;
    }
    get validPublicCibleCode(): boolean {
    return this._validPublicCibleCode;
    }

    set validPublicCibleCode(value: boolean) {
    this._validPublicCibleCode = value;
    }

}
