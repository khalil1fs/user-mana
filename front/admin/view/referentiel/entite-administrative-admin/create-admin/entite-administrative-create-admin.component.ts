import {Component, OnInit} from '@angular/core';
import {EntiteAdministrativeService} from 'src/app/controller/service/referentiel/EntiteAdministrative.service';
import {EntiteAdministrativeVo} from 'src/app/controller/model/referentiel/EntiteAdministrative.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {TypeEntiteAdministrativeVo} from 'src/app/controller/model/referentiel/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from 'src/app/controller/service/referentiel/TypeEntiteAdministrative.service';

import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-entite-administrative-create-admin',
  templateUrl: './entite-administrative-create-admin.component.html',
  styleUrls: ['./entite-administrative-create-admin.component.css']
})
export class EntiteAdministrativeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEntiteAdministrativeLibelleCourt = true;
   _validEntiteAdministrativeCode = true;

    _validTypeEntiteAdministrativeLibelle = true;
    _validTypeEntiteAdministrativeCode = true;



constructor(private datePipe: DatePipe, private entiteAdministrativeService: EntiteAdministrativeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
) {

}



ngOnInit(): void {

    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
    this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
}




private setValidation(value: boolean){
    this.validEntiteAdministrativeLibelleCourt = value;
    this.validEntiteAdministrativeCode = value;
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
     this.entiteAdministrativeService.save().subscribe(entiteAdministrative=>{
      if(entiteAdministrative != null){
       this.entiteAdministratives.push({...entiteAdministrative});
       this.createEntiteAdministrativeDialog = false;
       this.submitted = false;
       this.selectedEntiteAdministrative = new EntiteAdministrativeVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Entite administrative existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEntiteAdministrativeLibelleCourt();
this.validateEntiteAdministrativeCode();

    }

private validateEntiteAdministrativeLibelleCourt(){
        if (this.stringUtilService.isEmpty(this.selectedEntiteAdministrative.libelleCourt)) {
            this.errorMessages.push('Libelle court non valide');
            this.validEntiteAdministrativeLibelleCourt = false;
        } else {
            this.validEntiteAdministrativeLibelleCourt = true;
        }
    }
private validateEntiteAdministrativeCode(){
        if (this.stringUtilService.isEmpty(this.selectedEntiteAdministrative.code)) {
            this.errorMessages.push('Code non valide');
            this.validEntiteAdministrativeCode = false;
        } else {
            this.validEntiteAdministrativeCode = true;
        }
    }















       public async openCreateTypeEntiteAdministrative(typeEntiteAdministrative: string) {
          const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'add');
         if(isPermistted) {
         this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
         this.createTypeEntiteAdministrativeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createEntiteAdministrativeDialog  = false;
    this.setValidation(true);
}

get entiteAdministratives(): Array<EntiteAdministrativeVo> {
    return this.entiteAdministrativeService.entiteAdministratives;
       }
set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }

 get selectedEntiteAdministrative(): EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
    set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }

   get createEntiteAdministrativeDialog(): boolean {
           return this.entiteAdministrativeService.createEntiteAdministrativeDialog;

       }
    set createEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.createEntiteAdministrativeDialog= value;
       }

       get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get createTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog;
       }
      set createTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog= value;
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

    get validEntiteAdministrativeLibelleCourt(): boolean {
    return this._validEntiteAdministrativeLibelleCourt;
    }

    set validEntiteAdministrativeLibelleCourt(value: boolean) {
    this._validEntiteAdministrativeLibelleCourt = value;
    }
    get validEntiteAdministrativeCode(): boolean {
    return this._validEntiteAdministrativeCode;
    }

    set validEntiteAdministrativeCode(value: boolean) {
    this._validEntiteAdministrativeCode = value;
    }

    get validTypeEntiteAdministrativeLibelle(): boolean {
    return this._validTypeEntiteAdministrativeLibelle;
    }

    set validTypeEntiteAdministrativeLibelle(value: boolean) {
    this._validTypeEntiteAdministrativeLibelle = value;
    }
    get validTypeEntiteAdministrativeCode(): boolean {
    return this._validTypeEntiteAdministrativeCode;
    }

    set validTypeEntiteAdministrativeCode(value: boolean) {
    this._validTypeEntiteAdministrativeCode = value;
    }

}
