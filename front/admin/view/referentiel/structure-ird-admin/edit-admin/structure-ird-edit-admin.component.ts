import {Component, OnInit} from '@angular/core';
import {StructureIrdService} from 'src/app/controller/service/referentiel/StructureIrd.service';
import {StructureIrdVo} from 'src/app/controller/model/referentiel/StructureIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-structure-ird-edit-admin',
  templateUrl: './structure-ird-edit-admin.component.html',
  styleUrls: ['./structure-ird-edit-admin.component.css']
})
export class StructureIrdEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStructureIrdLibelle = true;
   _validStructureIrdCode = true;




constructor(private datePipe: DatePipe, private structureIrdService: StructureIrdService
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
    this.validStructureIrdLibelle = value;
    this.validStructureIrdCode = value;
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
     this.structureIrdService.edit().subscribe(structureIrd=>{
     const myIndex = this.structureIrds.findIndex(e => e.id === this.selectedStructureIrd.id);
     this.structureIrds[myIndex] = this.selectedStructureIrd;
     this.editStructureIrdDialog = false;
     this.submitted = false;
     this.selectedStructureIrd = new StructureIrdVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateStructureIrdLibelle();
this.validateStructureIrdCode();

    }

private validateStructureIrdLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStructureIrd.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStructureIrdLibelle = false;
        } else {
            this.validStructureIrdLibelle = true;
        }
    }
private validateStructureIrdCode(){
        if (this.stringUtilService.isEmpty(this.selectedStructureIrd.code)) {
            this.errorMessages.push('Code non valide');
            this.validStructureIrdCode = false;
        } else {
            this.validStructureIrdCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editStructureIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get structureIrds(): Array<StructureIrdVo> {
    return this.structureIrdService.structureIrds;
       }
set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }

 get selectedStructureIrd(): StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
    set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }

   get editStructureIrdDialog(): boolean {
           return this.structureIrdService.editStructureIrdDialog;

       }
    set editStructureIrdDialog(value: boolean) {
        this.structureIrdService.editStructureIrdDialog= value;
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

    get validStructureIrdLibelle(): boolean {
    return this._validStructureIrdLibelle;
    }

    set validStructureIrdLibelle(value: boolean) {
    this._validStructureIrdLibelle = value;
    }
    get validStructureIrdCode(): boolean {
    return this._validStructureIrdCode;
    }

    set validStructureIrdCode(value: boolean) {
    this._validStructureIrdCode = value;
    }

}
