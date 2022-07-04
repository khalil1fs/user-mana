import {Component, OnInit} from '@angular/core';
import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-sexe-edit-admin',
  templateUrl: './sexe-edit-admin.component.html',
  styleUrls: ['./sexe-edit-admin.component.css']
})
export class SexeEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validSexeLibelle = true;
   _validSexeCode = true;




constructor(private datePipe: DatePipe, private sexeService: SexeService
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
    this.validSexeLibelle = value;
    this.validSexeCode = value;
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
     this.sexeService.edit().subscribe(sexe=>{
     const myIndex = this.sexes.findIndex(e => e.id === this.selectedSexe.id);
     this.sexes[myIndex] = sexe;
     this.editSexeDialog = false;
     this.submitted = false;
     this.selectedSexe = new SexeVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateSexeLibelle();
this.validateSexeCode();

    }

private validateSexeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedSexe.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSexeLibelle = false;
        } else {
            this.validSexeLibelle = true;
        }
    }
private validateSexeCode(){
        if (this.stringUtilService.isEmpty(this.selectedSexe.code)) {
            this.errorMessages.push('Code non valide');
            this.validSexeCode = false;
        } else {
            this.validSexeCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editSexeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get sexes(): Array<SexeVo> {
    return this.sexeService.sexes;
       }
set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }

 get selectedSexe(): SexeVo {
           return this.sexeService.selectedSexe;
       }
    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }

   get editSexeDialog(): boolean {
           return this.sexeService.editSexeDialog;

       }
    set editSexeDialog(value: boolean) {
        this.sexeService.editSexeDialog= value;
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

    get validSexeLibelle(): boolean {
    return this._validSexeLibelle;
    }

    set validSexeLibelle(value: boolean) {
    this._validSexeLibelle = value;
    }
    get validSexeCode(): boolean {
    return this._validSexeCode;
    }

    set validSexeCode(value: boolean) {
    this._validSexeCode = value;
    }

}
