import {Component, OnInit} from '@angular/core';
import {ModaliteEtudeService} from 'src/app/controller/service/referentiel/ModaliteEtude.service';
import {ModaliteEtudeVo} from 'src/app/controller/model/referentiel/ModaliteEtude.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-modalite-etude-edit-admin',
  templateUrl: './modalite-etude-edit-admin.component.html',
  styleUrls: ['./modalite-etude-edit-admin.component.css']
})
export class ModaliteEtudeEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModaliteEtudeLibelle = true;
   _validModaliteEtudeCode = true;




constructor(private datePipe: DatePipe, private modaliteEtudeService: ModaliteEtudeService
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
    this.validModaliteEtudeLibelle = value;
    this.validModaliteEtudeCode = value;
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
     this.modaliteEtudeService.edit().subscribe(modaliteEtude=>{
     const myIndex = this.modaliteEtudes.findIndex(e => e.id === this.selectedModaliteEtude.id);
     this.modaliteEtudes[myIndex] = modaliteEtude;
     this.editModaliteEtudeDialog = false;
     this.submitted = false;
     this.selectedModaliteEtude = new ModaliteEtudeVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModaliteEtudeLibelle();
this.validateModaliteEtudeCode();

    }

private validateModaliteEtudeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedModaliteEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModaliteEtudeLibelle = false;
        } else {
            this.validModaliteEtudeLibelle = true;
        }
    }
private validateModaliteEtudeCode(){
        if (this.stringUtilService.isEmpty(this.selectedModaliteEtude.code)) {
            this.errorMessages.push('Code non valide');
            this.validModaliteEtudeCode = false;
        } else {
            this.validModaliteEtudeCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editModaliteEtudeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get modaliteEtudes(): Array<ModaliteEtudeVo> {
    return this.modaliteEtudeService.modaliteEtudes;
       }
set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }

 get selectedModaliteEtude(): ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
    set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }

   get editModaliteEtudeDialog(): boolean {
           return this.modaliteEtudeService.editModaliteEtudeDialog;

       }
    set editModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.editModaliteEtudeDialog= value;
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

    get validModaliteEtudeLibelle(): boolean {
    return this._validModaliteEtudeLibelle;
    }

    set validModaliteEtudeLibelle(value: boolean) {
    this._validModaliteEtudeLibelle = value;
    }
    get validModaliteEtudeCode(): boolean {
    return this._validModaliteEtudeCode;
    }

    set validModaliteEtudeCode(value: boolean) {
    this._validModaliteEtudeCode = value;
    }

}
