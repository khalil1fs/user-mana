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
  selector: 'app-master-international-create-admin',
  templateUrl: './master-international-create-admin.component.html',
  styleUrls: ['./master-international-create-admin.component.css']
})
export class MasterInternationalCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validMasterInternationalLibelle = true;
   _validMasterInternationalCode = true;




constructor(private datePipe: DatePipe, private masterInternationalService: MasterInternationalService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validMasterInternationalLibelle = value;
    this.validMasterInternationalCode = value;
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
     this.masterInternationalService.save().subscribe(masterInternational=>{
      if(masterInternational != null){
       this.masterInternationals.push({...masterInternational});
       this.createMasterInternationalDialog = false;
       this.submitted = false;
       this.selectedMasterInternational = new MasterInternationalVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Master international existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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










hideCreateDialog(){
    this.createMasterInternationalDialog  = false;
    this.setValidation(true);
}

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

   get createMasterInternationalDialog(): boolean {
           return this.masterInternationalService.createMasterInternationalDialog;

       }
    set createMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.createMasterInternationalDialog= value;
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
