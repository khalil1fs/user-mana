import {Component, OnInit} from '@angular/core';
import {TemplateOuvertureService} from 'src/app/controller/service/referentiel/TemplateOuverture.service';
import {TemplateOuvertureVo} from 'src/app/controller/model/referentiel/TemplateOuverture.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-ouverture-edit-admin',
  templateUrl: './template-ouverture-edit-admin.component.html',
  styleUrls: ['./template-ouverture-edit-admin.component.css']
})
export class TemplateOuvertureEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateOuvertureCode = true;




constructor(private datePipe: DatePipe, private templateOuvertureService: TemplateOuvertureService
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
    this.validTemplateOuvertureCode = value;
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
     this.templateOuvertureService.edit().subscribe(templateOuverture=>{
     const myIndex = this.templateOuvertures.findIndex(e => e.id === this.selectedTemplateOuverture.id);
     this.templateOuvertures[myIndex] = templateOuverture;
     this.editTemplateOuvertureDialog = false;
     this.submitted = false;
     this.selectedTemplateOuverture = new TemplateOuvertureVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateOuvertureCode();

    }

private validateTemplateOuvertureCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateOuverture.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateOuvertureCode = false;
        } else {
            this.validTemplateOuvertureCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editTemplateOuvertureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get templateOuvertures(): Array<TemplateOuvertureVo> {
    return this.templateOuvertureService.templateOuvertures;
       }
set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
       }

 get selectedTemplateOuverture(): TemplateOuvertureVo {
           return this.templateOuvertureService.selectedTemplateOuverture;
       }
    set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
       }

   get editTemplateOuvertureDialog(): boolean {
           return this.templateOuvertureService.editTemplateOuvertureDialog;

       }
    set editTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.editTemplateOuvertureDialog= value;
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

    get validTemplateOuvertureCode(): boolean {
    return this._validTemplateOuvertureCode;
    }

    set validTemplateOuvertureCode(value: boolean) {
    this._validTemplateOuvertureCode = value;
    }

}
