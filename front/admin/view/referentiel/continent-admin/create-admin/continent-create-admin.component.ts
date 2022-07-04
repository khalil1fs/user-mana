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
  selector: 'app-continent-create-admin',
  templateUrl: './continent-create-admin.component.html',
  styleUrls: ['./continent-create-admin.component.css']
})
export class ContinentCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validContinentLibelle = true;
   _validContinentCode = true;




constructor(private datePipe: DatePipe, private continentService: ContinentService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validContinentLibelle = value;
    this.validContinentCode = value;
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
     this.continentService.save().subscribe(continent=>{
      if(continent != null){
       this.continents.push({...continent});
       this.createContinentDialog = false;
       this.submitted = false;
       this.selectedContinent = new ContinentVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Continent existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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











hideCreateDialog(){
    this.createContinentDialog  = false;
    this.setValidation(true);
}

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

   get createContinentDialog(): boolean {
           return this.continentService.createContinentDialog;

       }
    set createContinentDialog(value: boolean) {
        this.continentService.createContinentDialog= value;
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
