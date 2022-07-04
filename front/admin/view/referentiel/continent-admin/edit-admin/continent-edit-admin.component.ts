import {Component, OnInit} from '@angular/core';
import {ContinentService} from 'src/app/controller/service/referentiel/Continent.service';
import {ContinentVo} from 'src/app/controller/model/referentiel/Continent.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-continent-edit-admin',
  templateUrl: './continent-edit-admin.component.html',
  styleUrls: ['./continent-edit-admin.component.css']
})
export class ContinentEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validContinentLibelle = true;
   _validContinentCode = true;




constructor(private datePipe: DatePipe, private continentService: ContinentService
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
    this.validContinentLibelle = value;
    this.validContinentCode = value;
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
     this.continentService.edit().subscribe(continent=>{
     const myIndex = this.continents.findIndex(e => e.id === this.selectedContinent.id);
     this.continents[myIndex] = continent;
     this.editContinentDialog = false;
     this.submitted = false;
     this.selectedContinent = new ContinentVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateContinentLibelle();
this.validateContinentCode();

    }

private validateContinentLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedContinent.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validContinentLibelle = false;
        } else {
            this.validContinentLibelle = true;
        }
    }
private validateContinentCode(){
        if (this.stringUtilService.isEmpty(this.selectedContinent.code)) {
            this.errorMessages.push('Code non valide');
            this.validContinentCode = false;
        } else {
            this.validContinentCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editContinentDialog  = false;
    this.setValidation(true);
}

// getters and setters

get continents(): Array<ContinentVo> {
    return this.continentService.continents;
       }
set continents(value: Array<ContinentVo>) {
        this.continentService.continents = value;
       }

 get selectedContinent(): ContinentVo {
           return this.continentService.selectedContinent;
       }
    set selectedContinent(value: ContinentVo) {
        this.continentService.selectedContinent = value;
       }

   get editContinentDialog(): boolean {
           return this.continentService.editContinentDialog;

       }
    set editContinentDialog(value: boolean) {
        this.continentService.editContinentDialog= value;
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

    get validContinentLibelle(): boolean {
    return this._validContinentLibelle;
    }

    set validContinentLibelle(value: boolean) {
    this._validContinentLibelle = value;
    }
    get validContinentCode(): boolean {
    return this._validContinentCode;
    }

    set validContinentCode(value: boolean) {
    this._validContinentCode = value;
    }

}
