import {Component, OnInit} from '@angular/core';
import {TemplateClotureService} from 'src/app/controller/service/referentiel/TemplateCloture.service';
import {TemplateClotureVo} from 'src/app/controller/model/referentiel/TemplateCloture.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-cloture-create-admin',
  templateUrl: './template-cloture-create-admin.component.html',
  styleUrls: ['./template-cloture-create-admin.component.css']
})
export class TemplateClotureCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateClotureCode = true;




constructor(private datePipe: DatePipe, private templateClotureService: TemplateClotureService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTemplateClotureCode = value;
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
     this.templateClotureService.save().subscribe(templateCloture=>{
      if(templateCloture != null){
       this.templateClotures.push({...templateCloture});
       this.createTemplateClotureDialog = false;
       this.submitted = false;
       this.selectedTemplateCloture = new TemplateClotureVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Template cloture existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateClotureCode();

    }

private validateTemplateClotureCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateCloture.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateClotureCode = false;
        } else {
            this.validTemplateClotureCode = true;
        }
    }











hideCreateDialog(){
    this.createTemplateClotureDialog  = false;
    this.setValidation(true);
}

get templateClotures(): Array<TemplateClotureVo> {
    return this.templateClotureService.templateClotures;
       }
set templateClotures(value: Array<TemplateClotureVo>) {
        this.templateClotureService.templateClotures = value;
       }

 get selectedTemplateCloture(): TemplateClotureVo {
           return this.templateClotureService.selectedTemplateCloture;
       }
    set selectedTemplateCloture(value: TemplateClotureVo) {
        this.templateClotureService.selectedTemplateCloture = value;
       }

   get createTemplateClotureDialog(): boolean {
           return this.templateClotureService.createTemplateClotureDialog;

       }
    set createTemplateClotureDialog(value: boolean) {
        this.templateClotureService.createTemplateClotureDialog= value;
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

    get validTemplateClotureCode(): boolean {
    return this._validTemplateClotureCode;
    }

    set validTemplateClotureCode(value: boolean) {
    this._validTemplateClotureCode = value;
    }


}
