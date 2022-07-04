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
  selector: 'app-type-instance-edit-admin',
  templateUrl: './type-instance-edit-admin.component.html',
  styleUrls: ['./type-instance-edit-admin.component.css']
})
export class TypeInstanceEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeInstanceLibelle = true;
   _validTypeInstanceCode = true;




constructor(private datePipe: DatePipe, private typeInstanceService: TypeInstanceService
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
    this.validTypeInstanceLibelle = value;
    this.validTypeInstanceCode = value;
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
     this.typeInstanceService.edit().subscribe(typeInstance=>{
     const myIndex = this.typeInstances.findIndex(e => e.id === this.selectedTypeInstance.id);
     this.typeInstances[myIndex] = this.selectedTypeInstance;
     this.editTypeInstanceDialog = false;
     this.submitted = false;
     this.selectedTypeInstance = new TypeInstanceVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
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









//openPopup
// methods

hideEditDialog(){
    this.editTypeInstanceDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editTypeInstanceDialog(): boolean {
           return this.typeInstanceService.editTypeInstanceDialog;

       }
    set editTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.editTypeInstanceDialog= value;
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
