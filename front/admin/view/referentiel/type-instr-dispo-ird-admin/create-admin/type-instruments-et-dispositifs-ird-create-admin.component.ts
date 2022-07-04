import {Component, OnInit} from '@angular/core';
import {TypeInstrumentsEtDispositifsIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentsEtDispositifsIrd.service';
import {TypeInstrumentsEtDispositifsIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentsEtDispositifsIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-instruments-et-dispositifs-ird-create-admin',
  templateUrl: './type-instruments-et-dispositifs-ird-create-admin.component.html',
  styleUrls: ['./type-instruments-et-dispositifs-ird-create-admin.component.css']
})
export class TypeInstrumentsEtDispositifsIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeInstrumentsEtDispositifsIrdLibelle = true;
   _validTypeInstrumentsEtDispositifsIrdCode = true;




constructor(private datePipe: DatePipe, private typeInstrumentsEtDispositifsIrdService: TypeInstrumentsEtDispositifsIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypeInstrumentsEtDispositifsIrdLibelle = value;
    this.validTypeInstrumentsEtDispositifsIrdCode = value;
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
     this.typeInstrumentsEtDispositifsIrdService.save().subscribe(typeInstrumentsEtDispositifsIrd=>{
      if(typeInstrumentsEtDispositifsIrd != null){
       this.typeInstrumentsEtDispositifsIrds.push({...typeInstrumentsEtDispositifsIrd});
       this.createTypeInstrumentsEtDispositifsIrdDialog = false;
       this.submitted = false;
       this.selectedTypeInstrumentsEtDispositifsIrd = new TypeInstrumentsEtDispositifsIrdVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type instruments et dispositifs ird existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeInstrumentsEtDispositifsIrdLibelle();
this.validateTypeInstrumentsEtDispositifsIrdCode();

    }

private validateTypeInstrumentsEtDispositifsIrdLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstrumentsEtDispositifsIrd.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeInstrumentsEtDispositifsIrdLibelle = false;
        } else {
            this.validTypeInstrumentsEtDispositifsIrdLibelle = true;
        }
    }
private validateTypeInstrumentsEtDispositifsIrdCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstrumentsEtDispositifsIrd.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeInstrumentsEtDispositifsIrdCode = false;
        } else {
            this.validTypeInstrumentsEtDispositifsIrdCode = true;
        }
    }










hideCreateDialog(){
    this.createTypeInstrumentsEtDispositifsIrdDialog  = false;
    this.setValidation(true);
}

get typeInstrumentsEtDispositifsIrds(): Array<TypeInstrumentsEtDispositifsIrdVo> {
    return this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds;
       }
set typeInstrumentsEtDispositifsIrds(value: Array<TypeInstrumentsEtDispositifsIrdVo>) {
        this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds = value;
       }

 get selectedTypeInstrumentsEtDispositifsIrd(): TypeInstrumentsEtDispositifsIrdVo {
           return this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd;
       }
    set selectedTypeInstrumentsEtDispositifsIrd(value: TypeInstrumentsEtDispositifsIrdVo) {
        this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd = value;
       }

   get createTypeInstrumentsEtDispositifsIrdDialog(): boolean {
           return this.typeInstrumentsEtDispositifsIrdService.createTypeInstrumentsEtDispositifsIrdDialog;

       }
    set createTypeInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.typeInstrumentsEtDispositifsIrdService.createTypeInstrumentsEtDispositifsIrdDialog= value;
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

    get validTypeInstrumentsEtDispositifsIrdLibelle(): boolean {
    return this._validTypeInstrumentsEtDispositifsIrdLibelle;
    }

    set validTypeInstrumentsEtDispositifsIrdLibelle(value: boolean) {
    this._validTypeInstrumentsEtDispositifsIrdLibelle = value;
    }
    get validTypeInstrumentsEtDispositifsIrdCode(): boolean {
    return this._validTypeInstrumentsEtDispositifsIrdCode;
    }

    set validTypeInstrumentsEtDispositifsIrdCode(value: boolean) {
    this._validTypeInstrumentsEtDispositifsIrdCode = value;
    }


}
