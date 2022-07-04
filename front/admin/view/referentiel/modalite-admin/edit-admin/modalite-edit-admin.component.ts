import {Component, OnInit} from '@angular/core';
import {ModaliteService} from 'src/app/controller/service/referentiel/Modalite.service';
import {ModaliteVo} from 'src/app/controller/model/referentiel/Modalite.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-modalite-edit-admin',
  templateUrl: './modalite-edit-admin.component.html',
  styleUrls: ['./modalite-edit-admin.component.css']
})
export class ModaliteEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModaliteLibelle = true;




constructor(private datePipe: DatePipe, private modaliteService: ModaliteService
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
    this.validModaliteLibelle = value;
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
     this.modaliteService.edit().subscribe(modalite=>{
     const myIndex = this.modalites.findIndex(e => e.id === this.selectedModalite.id);
     this.modalites[myIndex] = modalite;
     this.editModaliteDialog = false;
     this.submitted = false;
     this.selectedModalite = new ModaliteVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModaliteLibelle();

    }

private validateModaliteLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedModalite.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModaliteLibelle = false;
        } else {
            this.validModaliteLibelle = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editModaliteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get modalites(): Array<ModaliteVo> {
    return this.modaliteService.modalites;
       }
set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }

 get selectedModalite(): ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
    set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }

   get editModaliteDialog(): boolean {
           return this.modaliteService.editModaliteDialog;

       }
    set editModaliteDialog(value: boolean) {
        this.modaliteService.editModaliteDialog= value;
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

    get validModaliteLibelle(): boolean {
    return this._validModaliteLibelle;
    }

    set validModaliteLibelle(value: boolean) {
    this._validModaliteLibelle = value;
    }

}
