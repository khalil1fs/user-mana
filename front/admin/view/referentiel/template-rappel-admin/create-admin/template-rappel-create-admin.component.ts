import {Component, OnInit} from '@angular/core';
import {TemplateRappelService} from 'src/app/controller/service/referentiel/TemplateRappel.service';
import {TemplateRappelVo} from 'src/app/controller/model/referentiel/TemplateRappel.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-rappel-create-admin',
  templateUrl: './template-rappel-create-admin.component.html',
  styleUrls: ['./template-rappel-create-admin.component.css']
})
export class TemplateRappelCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateRappelCode = true;




constructor(private datePipe: DatePipe, private templateRappelService: TemplateRappelService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTemplateRappelCode = value;
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
     this.templateRappelService.save().subscribe(templateRappel=>{
      if(templateRappel != null){
       this.templateRappels.push({...templateRappel});
       this.createTemplateRappelDialog = false;
       this.submitted = false;
       this.selectedTemplateRappel = new TemplateRappelVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Template rappel existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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











hideCreateDialog(){
    this.createTemplateRappelDialog  = false;
    this.setValidation(true);
}

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

   get createTemplateRappelDialog(): boolean {
           return this.templateRappelService.createTemplateRappelDialog;

       }
    set createTemplateRappelDialog(value: boolean) {
        this.templateRappelService.createTemplateRappelDialog= value;
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

    get validTemplateRappelCode(): boolean {
    return this._validTemplateRappelCode;
    }

    set validTemplateRappelCode(value: boolean) {
    this._validTemplateRappelCode = value;
    }


}
