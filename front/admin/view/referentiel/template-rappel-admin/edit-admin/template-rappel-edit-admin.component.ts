import {Component, OnInit} from '@angular/core';
import {TemplateRappelService} from 'src/app/controller/service/referentiel/TemplateRappel.service';
import {TemplateRappelVo} from 'src/app/controller/model/referentiel/TemplateRappel.model';
import {environment} from 'src/environments/environment';


import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-rappel-edit-admin',
  templateUrl: './template-rappel-edit-admin.component.html',
  styleUrls: ['./template-rappel-edit-admin.component.css']
})
export class TemplateRappelEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateRappelCode = true;




constructor(private datePipe: DatePipe, private templateRappelService: TemplateRappelService
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
    this.validTemplateRappelCode = value;
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
     this.templateRappelService.edit().subscribe(templateRappel=>{
     const myIndex = this.templateRappels.findIndex(e => e.id === this.selectedTemplateRappel.id);
     this.templateRappels[myIndex] = this.selectedTemplateRappel;
     this.editTemplateRappelDialog = false;
     this.submitted = false;
     this.selectedTemplateRappel = new TemplateRappelVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateRappelCode();

    }

private validateTemplateRappelCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateRappel.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateRappelCode = false;
        } else {
            this.validTemplateRappelCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editTemplateRappelDialog  = false;
    this.setValidation(true);
}

// getters and setters

get templateRappels(): Array<TemplateRappelVo> {
    return this.templateRappelService.templateRappels;
       }
set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }

 get selectedTemplateRappel(): TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
    set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }

   get editTemplateRappelDialog(): boolean {
           return this.templateRappelService.editTemplateRappelDialog;

       }
    set editTemplateRappelDialog(value: boolean) {
        this.templateRappelService.editTemplateRappelDialog= value;
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

    get validTemplateRappelCode(): boolean {
    return this._validTemplateRappelCode;
    }

    set validTemplateRappelCode(value: boolean) {
    this._validTemplateRappelCode = value;
    }

}
