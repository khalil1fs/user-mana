import {Component, OnInit} from '@angular/core';
import {InstrumentIrdService} from 'src/app/controller/service/referentiel/InstrumentIrd.service';
import {InstrumentIrdVo} from 'src/app/controller/model/referentiel/InstrumentIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {TypeInstrumentIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentIrd.service';

import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-instrument-ird-create-admin',
  templateUrl: './instrument-ird-create-admin.component.html',
  styleUrls: ['./instrument-ird-create-admin.component.css']
})
export class InstrumentIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validInstrumentIrdLibelle = true;
   _validInstrumentIrdCode = true;

    _validTypeInstrumentIrdLibelle = true;
    _validTypeInstrumentIrdCode = true;



constructor(private datePipe: DatePipe, private instrumentIrdService: InstrumentIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeInstrumentIrdService: TypeInstrumentIrdService
) {

}



ngOnInit(): void {

    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
}




private setValidation(value: boolean){
    this.validInstrumentIrdLibelle = value;
    this.validInstrumentIrdCode = value;
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
     this.instrumentIrdService.save().subscribe(instrumentIrd=>{
      if(instrumentIrd != null){
       this.instrumentIrds.push({...instrumentIrd});
       this.createInstrumentIrdDialog = false;
       this.submitted = false;
       this.selectedInstrumentIrd = new InstrumentIrdVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Instrument ird existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateInstrumentIrdLibelle();
this.validateInstrumentIrdCode();

    }

private validateInstrumentIrdLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedInstrumentIrd.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validInstrumentIrdLibelle = false;
        } else {
            this.validInstrumentIrdLibelle = true;
        }
    }
private validateInstrumentIrdCode(){
        if (this.stringUtilService.isEmpty(this.selectedInstrumentIrd.code)) {
            this.errorMessages.push('Code non valide');
            this.validInstrumentIrdCode = false;
        } else {
            this.validInstrumentIrdCode = true;
        }
    }










       public async openCreateTypeInstrumentIrd(typeInstrumentIrd: string) {
          const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'add');
         if(isPermistted) {
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
         this.createTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createInstrumentIrdDialog  = false;
    this.setValidation(true);
}

get instrumentIrds(): Array<InstrumentIrdVo> {
    return this.instrumentIrdService.instrumentIrds;
       }
set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }

 get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
    set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }

   get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;

       }
    set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
       }

       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
      set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
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

    get validInstrumentIrdLibelle(): boolean {
    return this._validInstrumentIrdLibelle;
    }

    set validInstrumentIrdLibelle(value: boolean) {
    this._validInstrumentIrdLibelle = value;
    }
    get validInstrumentIrdCode(): boolean {
    return this._validInstrumentIrdCode;
    }

    set validInstrumentIrdCode(value: boolean) {
    this._validInstrumentIrdCode = value;
    }

    get validTypeInstrumentIrdLibelle(): boolean {
    return this._validTypeInstrumentIrdLibelle;
    }

    set validTypeInstrumentIrdLibelle(value: boolean) {
    this._validTypeInstrumentIrdLibelle = value;
    }
    get validTypeInstrumentIrdCode(): boolean {
    return this._validTypeInstrumentIrdCode;
    }

    set validTypeInstrumentIrdCode(value: boolean) {
    this._validTypeInstrumentIrdCode = value;
    }

}
