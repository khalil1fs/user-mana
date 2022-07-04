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
  selector: 'app-corps-edit-admin',
  templateUrl: './corps-edit-admin.component.html',
  styleUrls: ['./corps-edit-admin.component.css']
})
export class CorpsEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCorpsLibelle = true;
   _validCorpsCode = true;




constructor(private datePipe: DatePipe, private corpsService: CorpsService
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
    this.validCorpsLibelle = value;
    this.validCorpsCode = value;
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
     this.corpsService.edit().subscribe(corps=>{
     const myIndex = this.corpss.findIndex(e => e.id === this.selectedCorps.id);
     this.corpss[myIndex] = corps;
     this.editCorpsDialog = false;
     this.submitted = false;
     this.selectedCorps = new CorpsVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
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











//openPopup
// methods

hideEditDialog(){
    this.editCorpsDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editCorpsDialog(): boolean {
           return this.corpsService.editCorpsDialog;

       }
    set editCorpsDialog(value: boolean) {
        this.corpsService.editCorpsDialog= value;
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
