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
  selector: 'app-type-publique-create-admin',
  templateUrl: './type-publique-create-admin.component.html',
  styleUrls: ['./type-publique-create-admin.component.css']
})
export class TypePubliqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypePubliqueLibelle = true;
   _validTypePubliqueCode = true;




constructor(private datePipe: DatePipe, private typePubliqueService: TypePubliqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTypePubliqueLibelle = value;
    this.validTypePubliqueCode = value;
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
     this.typePubliqueService.save().subscribe(typePublique=>{
      if(typePublique != null){
       this.typePubliques.push({...typePublique});
       this.createTypePubliqueDialog = false;
       this.submitted = false;
       this.selectedTypePublique = new TypePubliqueVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Type publique existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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










hideCreateDialog(){
    this.createTypePubliqueDialog  = false;
    this.setValidation(true);
}

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

   get createTypePubliqueDialog(): boolean {
           return this.typePubliqueService.createTypePubliqueDialog;

       }
    set createTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.createTypePubliqueDialog= value;
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
