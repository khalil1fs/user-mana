import {Component, OnInit} from '@angular/core';
import {TypeOutilService} from 'src/app/controller/service/referentiel/TypeOutil.service';
import {TypeOutilVo} from 'src/app/controller/model/referentiel/TypeOutil.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-outil-create-admin',
  templateUrl: './type-outil-create-admin.component.html',
  styleUrls: ['./type-outil-create-admin.component.css']
})
export class TypeOutilCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeOutilLibelle = true;
   _validTypeOutilCode = true;




constructor(private datePipe: DatePipe, private typeOutilService: TypeOutilService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypeOutilLibelle = value;
    this.validTypeOutilCode = value;
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
     this.typeOutilService.save().subscribe(typeOutil=>{
      if(typeOutil != null){
       this.typeOutils.push({...typeOutil});
       this.createTypeOutilDialog = false;
       this.submitted = false;
       this.selectedTypeOutil = new TypeOutilVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type outil existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeOutilLibelle();
this.validateTypeOutilCode();

    }

private validateTypeOutilLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeOutil.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeOutilLibelle = false;
        } else {
            this.validTypeOutilLibelle = true;
        }
    }
private validateTypeOutilCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeOutil.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeOutilCode = false;
        } else {
            this.validTypeOutilCode = true;
        }
    }











hideCreateDialog(){
    this.createTypeOutilDialog  = false;
    this.setValidation(true);
}

get typeOutils(): Array<TypeOutilVo> {
    return this.typeOutilService.typeOutils;
       }
set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }

 get selectedTypeOutil(): TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
    set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }

   get createTypeOutilDialog(): boolean {
           return this.typeOutilService.createTypeOutilDialog;

       }
    set createTypeOutilDialog(value: boolean) {
        this.typeOutilService.createTypeOutilDialog= value;
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

    get validTypeOutilLibelle(): boolean {
    return this._validTypeOutilLibelle;
    }

    set validTypeOutilLibelle(value: boolean) {
    this._validTypeOutilLibelle = value;
    }
    get validTypeOutilCode(): boolean {
    return this._validTypeOutilCode;
    }

    set validTypeOutilCode(value: boolean) {
    this._validTypeOutilCode = value;
    }


}
