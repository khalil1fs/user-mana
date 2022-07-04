import {Component, OnInit} from '@angular/core';
import {TypePubliqueService} from 'src/app/controller/service/referentiel/TypePublique.service';
import {TypePubliqueVo} from 'src/app/controller/model/referentiel/TypePublique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-publique-edit-admin',
  templateUrl: './type-publique-edit-admin.component.html',
  styleUrls: ['./type-publique-edit-admin.component.css']
})
export class TypePubliqueEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypePubliqueLibelle = true;
   _validTypePubliqueCode = true;




constructor(private datePipe: DatePipe, private typePubliqueService: TypePubliqueService
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
    this.validTypePubliqueLibelle = value;
    this.validTypePubliqueCode = value;
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
     this.typePubliqueService.edit().subscribe(typePublique=>{
     const myIndex = this.typePubliques.findIndex(e => e.id === this.selectedTypePublique.id);
     this.typePubliques[myIndex] = typePublique;
     this.editTypePubliqueDialog = false;
     this.submitted = false;
     this.selectedTypePublique = new TypePubliqueVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypePubliqueLibelle();
this.validateTypePubliqueCode();

    }

private validateTypePubliqueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypePublique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypePubliqueLibelle = false;
        } else {
            this.validTypePubliqueLibelle = true;
        }
    }
private validateTypePubliqueCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypePublique.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypePubliqueCode = false;
        } else {
            this.validTypePubliqueCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editTypePubliqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typePubliques(): Array<TypePubliqueVo> {
    return this.typePubliqueService.typePubliques;
       }
set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }

 get selectedTypePublique(): TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
    set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }

   get editTypePubliqueDialog(): boolean {
           return this.typePubliqueService.editTypePubliqueDialog;

       }
    set editTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.editTypePubliqueDialog= value;
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

    get validTypePubliqueLibelle(): boolean {
    return this._validTypePubliqueLibelle;
    }

    set validTypePubliqueLibelle(value: boolean) {
    this._validTypePubliqueLibelle = value;
    }
    get validTypePubliqueCode(): boolean {
    return this._validTypePubliqueCode;
    }

    set validTypePubliqueCode(value: boolean) {
    this._validTypePubliqueCode = value;
    }

}
