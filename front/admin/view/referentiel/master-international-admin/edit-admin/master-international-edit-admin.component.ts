import {Component, OnInit} from '@angular/core';
import {MasterInternationalService} from 'src/app/controller/service/referentiel/MasterInternational.service';
import {MasterInternationalVo} from 'src/app/controller/model/referentiel/MasterInternational.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-master-international-edit-admin',
  templateUrl: './master-international-edit-admin.component.html',
  styleUrls: ['./master-international-edit-admin.component.css']
})
export class MasterInternationalEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validMasterInternationalLibelle = true;
   _validMasterInternationalCode = true;




constructor(private datePipe: DatePipe, private masterInternationalService: MasterInternationalService
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
    this.validMasterInternationalLibelle = value;
    this.validMasterInternationalCode = value;
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
     this.masterInternationalService.edit().subscribe(masterInternational=>{
     const myIndex = this.masterInternationals.findIndex(e => e.id === this.selectedMasterInternational.id);
     this.masterInternationals[myIndex] = masterInternational;
     this.editMasterInternationalDialog = false;
     this.submitted = false;
     this.selectedMasterInternational = new MasterInternationalVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateMasterInternationalLibelle();
this.validateMasterInternationalCode();

    }

private validateMasterInternationalLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedMasterInternational.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validMasterInternationalLibelle = false;
        } else {
            this.validMasterInternationalLibelle = true;
        }
    }
private validateMasterInternationalCode(){
        if (this.stringUtilService.isEmpty(this.selectedMasterInternational.code)) {
            this.errorMessages.push('Code non valide');
            this.validMasterInternationalCode = false;
        } else {
            this.validMasterInternationalCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editMasterInternationalDialog  = false;
    this.setValidation(true);
}

// getters and setters

get masterInternationals(): Array<MasterInternationalVo> {
    return this.masterInternationalService.masterInternationals;
       }
set masterInternationals(value: Array<MasterInternationalVo>) {
        this.masterInternationalService.masterInternationals = value;
       }

 get selectedMasterInternational(): MasterInternationalVo {
           return this.masterInternationalService.selectedMasterInternational;
       }
    set selectedMasterInternational(value: MasterInternationalVo) {
        this.masterInternationalService.selectedMasterInternational = value;
       }

   get editMasterInternationalDialog(): boolean {
           return this.masterInternationalService.editMasterInternationalDialog;

       }
    set editMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.editMasterInternationalDialog= value;
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

    get validMasterInternationalLibelle(): boolean {
    return this._validMasterInternationalLibelle;
    }

    set validMasterInternationalLibelle(value: boolean) {
    this._validMasterInternationalLibelle = value;
    }
    get validMasterInternationalCode(): boolean {
    return this._validMasterInternationalCode;
    }

    set validMasterInternationalCode(value: boolean) {
    this._validMasterInternationalCode = value;
    }

}
