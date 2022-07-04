import {Component, OnInit} from '@angular/core';
import {CorpsService} from 'src/app/controller/service/referentiel/Corps.service';
import {CorpsVo} from 'src/app/controller/model/referentiel/Corps.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-corps-create-admin',
  templateUrl: './corps-create-admin.component.html',
  styleUrls: ['./corps-create-admin.component.css']
})
export class CorpsCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCorpsLibelle = true;
   _validCorpsCode = true;




constructor(private datePipe: DatePipe, private corpsService: CorpsService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validCorpsLibelle = value;
    this.validCorpsCode = value;
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
     this.corpsService.save().subscribe(corps=>{
      if(corps != null){
       this.corpss.push({...corps});
       this.createCorpsDialog = false;
       this.submitted = false;
       this.selectedCorps = new CorpsVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Corps existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCorpsLibelle();
this.validateCorpsCode();

    }

private validateCorpsLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCorps.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCorpsLibelle = false;
        } else {
            this.validCorpsLibelle = true;
        }
    }
private validateCorpsCode(){
        if (this.stringUtilService.isEmpty(this.selectedCorps.code)) {
            this.errorMessages.push('Code non valide');
            this.validCorpsCode = false;
        } else {
            this.validCorpsCode = true;
        }
    }












hideCreateDialog(){
    this.createCorpsDialog  = false;
    this.setValidation(true);
}

get corpss(): Array<CorpsVo> {
    return this.corpsService.corpss;
       }
set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }

 get selectedCorps(): CorpsVo {
           return this.corpsService.selectedCorps;
       }
    set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }

   get createCorpsDialog(): boolean {
           return this.corpsService.createCorpsDialog;

       }
    set createCorpsDialog(value: boolean) {
        this.corpsService.createCorpsDialog= value;
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

    get validCorpsLibelle(): boolean {
    return this._validCorpsLibelle;
    }

    set validCorpsLibelle(value: boolean) {
    this._validCorpsLibelle = value;
    }
    get validCorpsCode(): boolean {
    return this._validCorpsCode;
    }

    set validCorpsCode(value: boolean) {
    this._validCorpsCode = value;
    }


}
