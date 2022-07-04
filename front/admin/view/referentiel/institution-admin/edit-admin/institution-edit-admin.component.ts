import {Component, OnInit} from '@angular/core';
import {InstitutionService} from 'src/app/controller/service/referentiel/Institution.service';
import {InstitutionVo} from 'src/app/controller/model/referentiel/Institution.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-institution-edit-admin',
  templateUrl: './institution-edit-admin.component.html',
  styleUrls: ['./institution-edit-admin.component.css']
})
export class InstitutionEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validInstitutionLibelle = true;
   _validInstitutionCode = true;




constructor(private datePipe: DatePipe, private institutionService: InstitutionService
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
    this.validInstitutionLibelle = value;
    this.validInstitutionCode = value;
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
     this.institutionService.edit().subscribe(institution=>{
     const myIndex = this.institutions.findIndex(e => e.id === this.selectedInstitution.id);
     this.institutions[myIndex] = institution;
     this.editInstitutionDialog = false;
     this.submitted = false;
     this.selectedInstitution = new InstitutionVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateInstitutionLibelle();
this.validateInstitutionCode();

    }

private validateInstitutionLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedInstitution.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validInstitutionLibelle = false;
        } else {
            this.validInstitutionLibelle = true;
        }
    }
private validateInstitutionCode(){
        if (this.stringUtilService.isEmpty(this.selectedInstitution.code)) {
            this.errorMessages.push('Code non valide');
            this.validInstitutionCode = false;
        } else {
            this.validInstitutionCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editInstitutionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get institutions(): Array<InstitutionVo> {
    return this.institutionService.institutions;
       }
set institutions(value: Array<InstitutionVo>) {
        this.institutionService.institutions = value;
       }

 get selectedInstitution(): InstitutionVo {
           return this.institutionService.selectedInstitution;
       }
    set selectedInstitution(value: InstitutionVo) {
        this.institutionService.selectedInstitution = value;
       }

   get editInstitutionDialog(): boolean {
           return this.institutionService.editInstitutionDialog;

       }
    set editInstitutionDialog(value: boolean) {
        this.institutionService.editInstitutionDialog= value;
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

    get validInstitutionLibelle(): boolean {
    return this._validInstitutionLibelle;
    }

    set validInstitutionLibelle(value: boolean) {
    this._validInstitutionLibelle = value;
    }
    get validInstitutionCode(): boolean {
    return this._validInstitutionCode;
    }

    set validInstitutionCode(value: boolean) {
    this._validInstitutionCode = value;
    }

}
