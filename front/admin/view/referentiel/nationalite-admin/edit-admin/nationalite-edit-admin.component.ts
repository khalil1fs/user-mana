import {Component, OnInit} from '@angular/core';
import {NationaliteService} from 'src/app/controller/service/referentiel/Nationalite.service';
import {NationaliteVo} from 'src/app/controller/model/referentiel/Nationalite.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-nationalite-edit-admin',
  templateUrl: './nationalite-edit-admin.component.html',
  styleUrls: ['./nationalite-edit-admin.component.css']
})
export class NationaliteEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNationaliteLibelle = true;
   _validNationaliteCode = true;




constructor(private datePipe: DatePipe, private nationaliteService: NationaliteService
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
    this.validNationaliteLibelle = value;
    this.validNationaliteCode = value;
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
     this.nationaliteService.edit().subscribe(nationalite=>{
     const myIndex = this.nationalites.findIndex(e => e.id === this.selectedNationalite.id);
     this.nationalites[myIndex] = nationalite;
     this.editNationaliteDialog = false;
     this.submitted = false;
     this.selectedNationalite = new NationaliteVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNationaliteLibelle();
this.validateNationaliteCode();

    }

private validateNationaliteLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNationalite.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNationaliteLibelle = false;
        } else {
            this.validNationaliteLibelle = true;
        }
    }
private validateNationaliteCode(){
        if (this.stringUtilService.isEmpty(this.selectedNationalite.code)) {
            this.errorMessages.push('Code non valide');
            this.validNationaliteCode = false;
        } else {
            this.validNationaliteCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editNationaliteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get nationalites(): Array<NationaliteVo> {
    return this.nationaliteService.nationalites;
       }
set nationalites(value: Array<NationaliteVo>) {
        this.nationaliteService.nationalites = value;
       }

 get selectedNationalite(): NationaliteVo {
           return this.nationaliteService.selectedNationalite;
       }
    set selectedNationalite(value: NationaliteVo) {
        this.nationaliteService.selectedNationalite = value;
       }

   get editNationaliteDialog(): boolean {
           return this.nationaliteService.editNationaliteDialog;

       }
    set editNationaliteDialog(value: boolean) {
        this.nationaliteService.editNationaliteDialog= value;
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

    get validNationaliteLibelle(): boolean {
    return this._validNationaliteLibelle;
    }

    set validNationaliteLibelle(value: boolean) {
    this._validNationaliteLibelle = value;
    }
    get validNationaliteCode(): boolean {
    return this._validNationaliteCode;
    }

    set validNationaliteCode(value: boolean) {
    this._validNationaliteCode = value;
    }

}
