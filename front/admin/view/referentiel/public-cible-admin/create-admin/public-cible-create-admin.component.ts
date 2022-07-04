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
  selector: 'app-public-cible-create-admin',
  templateUrl: './public-cible-create-admin.component.html',
  styleUrls: ['./public-cible-create-admin.component.css']
})
export class PublicCibleCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPublicCibleLibelle = true;
   _validPublicCibleCode = true;




constructor(private datePipe: DatePipe, private publicCibleService: PublicCibleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validPublicCibleLibelle = value;
    this.validPublicCibleCode = value;
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
     this.publicCibleService.save().subscribe(publicCible=>{
      if(publicCible != null){
       this.publicCibles.push({...publicCible});
       this.createPublicCibleDialog = false;
       this.submitted = false;
       this.selectedPublicCible = new PublicCibleVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Public cible existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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










hideCreateDialog(){
    this.createPublicCibleDialog  = false;
    this.setValidation(true);
}

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

   get createPublicCibleDialog(): boolean {
           return this.publicCibleService.createPublicCibleDialog;

       }
    set createPublicCibleDialog(value: boolean) {
        this.publicCibleService.createPublicCibleDialog= value;
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
