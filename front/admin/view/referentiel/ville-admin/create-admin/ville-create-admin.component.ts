import {Component, OnInit} from '@angular/core';
import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ville-create-admin',
  templateUrl: './ville-create-admin.component.html',
  styleUrls: ['./ville-create-admin.component.css']
})
export class VilleCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validVilleLibelle = true;
   _validVilleCode = true;

    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private villeService: VilleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private paysService: PaysService
) {

}



ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}




private setValidation(value: boolean){
    this.validVilleLibelle = value;
    this.validVilleCode = value;
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
     this.villeService.save().subscribe(ville=>{
      if(ville != null){
       this.villes.push({...ville});
       this.createVilleDialog = false;
       this.submitted = false;
       this.selectedVille = new VilleVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Ville existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateVilleLibelle();
this.validateVilleCode();

    }

private validateVilleLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedVille.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validVilleLibelle = false;
        } else {
            this.validVilleLibelle = true;
        }
    }
private validateVilleCode(){
        if (this.stringUtilService.isEmpty(this.selectedVille.code)) {
            this.errorMessages.push('Code non valide');
            this.validVilleCode = false;
        } else {
            this.validVilleCode = true;
        }
    }










       public async openCreatePays(pays: string) {
          const isPermistted = await this.roleService.isPermitted('Pays', 'add');
         if(isPermistted) {
         this.selectedPays = new PaysVo();
         this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createVilleDialog  = false;
    this.setValidation(true);
}

get villes(): Array<VilleVo> {
    return this.villeService.villes;
       }
set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }

 get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }

   get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;

       }
    set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }

       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
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

    get validVilleLibelle(): boolean {
    return this._validVilleLibelle;
    }

    set validVilleLibelle(value: boolean) {
    this._validVilleLibelle = value;
    }
    get validVilleCode(): boolean {
    return this._validVilleCode;
    }

    set validVilleCode(value: boolean) {
    this._validVilleCode = value;
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

}
