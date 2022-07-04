import {Component, OnInit} from '@angular/core';
import {TypeInstanceService} from 'src/app/controller/service/referentiel/TypeInstance.service';
import {TypeInstanceVo} from 'src/app/controller/model/referentiel/TypeInstance.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-instance-create-admin',
  templateUrl: './type-instance-create-admin.component.html',
  styleUrls: ['./type-instance-create-admin.component.css']
})
export class TypeInstanceCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeInstanceLibelle = true;
   _validTypeInstanceCode = true;




constructor(private datePipe: DatePipe, private typeInstanceService: TypeInstanceService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypeInstanceLibelle = value;
    this.validTypeInstanceCode = value;
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
     this.typeInstanceService.save().subscribe(typeInstance=>{
      if(typeInstance != null){
       this.typeInstances.push({...typeInstance});
       this.createTypeInstanceDialog = false;
       this.submitted = false;
       this.selectedTypeInstance = new TypeInstanceVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type instance existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeInstanceLibelle();
this.validateTypeInstanceCode();

    }

private validateTypeInstanceLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstance.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeInstanceLibelle = false;
        } else {
            this.validTypeInstanceLibelle = true;
        }
    }
private validateTypeInstanceCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeInstance.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeInstanceCode = false;
        } else {
            this.validTypeInstanceCode = true;
        }
    }










hideCreateDialog(){
    this.createTypeInstanceDialog  = false;
    this.setValidation(true);
}

get typeInstances(): Array<TypeInstanceVo> {
    return this.typeInstanceService.typeInstances;
       }
set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }

 get selectedTypeInstance(): TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
    set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }

   get createTypeInstanceDialog(): boolean {
           return this.typeInstanceService.createTypeInstanceDialog;

       }
    set createTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.createTypeInstanceDialog= value;
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

    get validTypeInstanceLibelle(): boolean {
    return this._validTypeInstanceLibelle;
    }

    set validTypeInstanceLibelle(value: boolean) {
    this._validTypeInstanceLibelle = value;
    }
    get validTypeInstanceCode(): boolean {
    return this._validTypeInstanceCode;
    }

    set validTypeInstanceCode(value: boolean) {
    this._validTypeInstanceCode = value;
    }


}
