import {Component, OnInit} from '@angular/core';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {ContinentVo} from 'src/app/controller/model/referentiel/Continent.model';
import {ContinentService} from 'src/app/controller/service/referentiel/Continent.service';

import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pays-create-admin',
  templateUrl: './pays-create-admin.component.html',
  styleUrls: ['./pays-create-admin.component.css']
})
export class PaysCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPaysLibelle = true;
   _validPaysCode = true;

    _validContinentLibelle = true;
    _validContinentCode = true;



constructor(private datePipe: DatePipe, private paysService: PaysService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private continentService: ContinentService
) {

}



ngOnInit(): void {

    this.selectedContinent = new ContinentVo();
    this.continentService.findAll().subscribe((data) => this.continents = data);
}




private setValidation(value: boolean){
    this.validPaysLibelle = value;
    this.validPaysCode = value;
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
     this.paysService.save().subscribe(pays=>{
      if(pays != null){
       this.payss.push({...pays});
       this.createPaysDialog = false;
       this.submitted = false;
       this.selectedPays = new PaysVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Pays existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePaysLibelle();
this.validatePaysCode();

    }

private validatePaysLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedPays.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPaysLibelle = false;
        } else {
            this.validPaysLibelle = true;
        }
    }
private validatePaysCode(){
        if (this.stringUtilService.isEmpty(this.selectedPays.code)) {
            this.errorMessages.push('Code non valide');
            this.validPaysCode = false;
        } else {
            this.validPaysCode = true;
        }
    }











       public async openCreateContinent(continent: string) {
          const isPermistted = await this.roleService.isPermitted('Continent', 'add');
         if(isPermistted) {
         this.selectedContinent = new ContinentVo();
         this.createContinentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createPaysDialog  = false;
    this.setValidation(true);
}

get payss(): Array<PaysVo> {
    return this.paysService.payss;
       }
set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }

 get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }

   get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;

       }
    set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }

       get selectedContinent(): ContinentVo {
           return this.continentService.selectedContinent;
       }
      set selectedContinent(value: ContinentVo) {
        this.continentService.selectedContinent = value;
       }
       get continents(): Array<ContinentVo> {
           return this.continentService.continents;
       }
       set continents(value: Array<ContinentVo>) {
        this.continentService.continents = value;
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

    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
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
