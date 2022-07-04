import {Component, OnInit} from '@angular/core';
import {NiveauEtudeService} from 'src/app/controller/service/referentiel/NiveauEtude.service';
import {NiveauEtudeVo} from 'src/app/controller/model/referentiel/NiveauEtude.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-niveau-etude-edit-admin',
  templateUrl: './niveau-etude-edit-admin.component.html',
  styleUrls: ['./niveau-etude-edit-admin.component.css']
})
export class NiveauEtudeEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNiveauEtudeLibelle = true;
   _validNiveauEtudeCode = true;




constructor(private datePipe: DatePipe, private niveauEtudeService: NiveauEtudeService
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
    this.validNiveauEtudeLibelle = value;
    this.validNiveauEtudeCode = value;
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
     this.niveauEtudeService.edit().subscribe(niveauEtude=>{
     const myIndex = this.niveauEtudes.findIndex(e => e.id === this.selectedNiveauEtude.id);
     this.niveauEtudes[myIndex] = niveauEtude;
     this.editNiveauEtudeDialog = false;
     this.submitted = false;
     this.selectedNiveauEtude = new NiveauEtudeVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNiveauEtudeLibelle();
this.validateNiveauEtudeCode();

    }

private validateNiveauEtudeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNiveauEtudeLibelle = false;
        } else {
            this.validNiveauEtudeLibelle = true;
        }
    }
private validateNiveauEtudeCode(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauEtude.code)) {
            this.errorMessages.push('Code non valide');
            this.validNiveauEtudeCode = false;
        } else {
            this.validNiveauEtudeCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editNiveauEtudeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get niveauEtudes(): Array<NiveauEtudeVo> {
    return this.niveauEtudeService.niveauEtudes;
       }
set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }

 get selectedNiveauEtude(): NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
    set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }

   get editNiveauEtudeDialog(): boolean {
           return this.niveauEtudeService.editNiveauEtudeDialog;

       }
    set editNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.editNiveauEtudeDialog= value;
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

    get validNiveauEtudeLibelle(): boolean {
    return this._validNiveauEtudeLibelle;
    }

    set validNiveauEtudeLibelle(value: boolean) {
    this._validNiveauEtudeLibelle = value;
    }
    get validNiveauEtudeCode(): boolean {
    return this._validNiveauEtudeCode;
    }

    set validNiveauEtudeCode(value: boolean) {
    this._validNiveauEtudeCode = value;
    }

}
