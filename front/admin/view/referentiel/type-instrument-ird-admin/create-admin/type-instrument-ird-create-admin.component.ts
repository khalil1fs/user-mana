import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentIrd.service';
import {TypeInstrumentIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-instrument-ird-create-admin',
  templateUrl: './type-instrument-ird-create-admin.component.html',
  styleUrls: ['./type-instrument-ird-create-admin.component.css']
})
export class TypeInstrumentIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeInstrumentIrdLibelle = true;
   _validTypeInstrumentIrdCode = true;




constructor(private datePipe: DatePipe, private typeInstrumentIrdService: TypeInstrumentIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypeInstrumentIrdLibelle = value;
    this.validTypeInstrumentIrdCode = value;
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
     this.typeInstrumentIrdService.save().subscribe(typeInstrumentIrd=>{
      if(typeInstrumentIrd != null){
       this.typeInstrumentIrds.push({...typeInstrumentIrd});
       this.createTypeInstrumentIrdDialog = false;
       this.submitted = false;
       this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type instrument ird existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeInstrumentIrdLibelle();
this.validateTypeInstrumentIrdCode();

    }

private validateTypeInstrumentIrdLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstrumentIrd.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeInstrumentIrdLibelle = false;
        } else {
            this.validTypeInstrumentIrdLibelle = true;
        }
    }
private validateTypeInstrumentIrdCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstrumentIrd.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeInstrumentIrdCode = false;
        } else {
            this.validTypeInstrumentIrdCode = true;
        }
    }










hideCreateDialog(){
    this.createTypeInstrumentIrdDialog  = false;
    this.setValidation(true);
}

get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
    return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }

 get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
    set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
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
