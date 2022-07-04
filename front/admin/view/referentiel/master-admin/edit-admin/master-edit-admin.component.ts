import {Component, OnInit} from '@angular/core';
import {MasterService} from 'src/app/controller/service/referentiel/Master.service';
import {MasterVo} from 'src/app/controller/model/referentiel/Master.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-master-edit-admin',
  templateUrl: './master-edit-admin.component.html',
  styleUrls: ['./master-edit-admin.component.css']
})
export class MasterEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validMasterIntitule = true;
   _validMasterCode = true;




constructor(private datePipe: DatePipe, private masterService: MasterService
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
    this.validMasterIntitule = value;
    this.validMasterCode = value;
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
     this.masterService.edit().subscribe(master=>{
     const myIndex = this.masters.findIndex(e => e.id === this.selectedMaster.id);
     this.masters[myIndex] = master;
     this.editMasterDialog = false;
     this.submitted = false;
     this.selectedMaster = new MasterVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateMasterIntitule();
this.validateMasterCode();

    }

private validateMasterIntitule(){
        if (this.stringUtilService.isEmpty(this.selectedMaster.intitule)) {
            this.errorMessages.push('Intitule non valide');
            this.validMasterIntitule = false;
        } else {
            this.validMasterIntitule = true;
        }
    }
private validateMasterCode(){
        if (this.stringUtilService.isEmpty(this.selectedMaster.code)) {
            this.errorMessages.push('Code non valide');
            this.validMasterCode = false;
        } else {
            this.validMasterCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editMasterDialog  = false;
    this.setValidation(true);
}

// getters and setters

get masters(): Array<MasterVo> {
    return this.masterService.masters;
       }
set masters(value: Array<MasterVo>) {
        this.masterService.masters = value;
       }

 get selectedMaster(): MasterVo {
           return this.masterService.selectedMaster;
       }
    set selectedMaster(value: MasterVo) {
        this.masterService.selectedMaster = value;
       }

   get editMasterDialog(): boolean {
           return this.masterService.editMasterDialog;

       }
    set editMasterDialog(value: boolean) {
        this.masterService.editMasterDialog= value;
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

    get validMasterIntitule(): boolean {
    return this._validMasterIntitule;
    }

    set validMasterIntitule(value: boolean) {
    this._validMasterIntitule = value;
    }
    get validMasterCode(): boolean {
    return this._validMasterCode;
    }

    set validMasterCode(value: boolean) {
    this._validMasterCode = value;
    }

}
