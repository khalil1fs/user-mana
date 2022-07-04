import {Component, OnInit} from '@angular/core';
import {NatureEtudeService} from 'src/app/controller/service/referentiel/NatureEtude.service';
import {NatureEtudeVo} from 'src/app/controller/model/referentiel/NatureEtude.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-nature-etude-edit-admin',
  templateUrl: './nature-etude-edit-admin.component.html',
  styleUrls: ['./nature-etude-edit-admin.component.css']
})
export class NatureEtudeEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNatureEtudeLibelle = true;
   _validNatureEtudeCode = true;




constructor(private datePipe: DatePipe, private natureEtudeService: NatureEtudeService
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
    this.validNatureEtudeLibelle = value;
    this.validNatureEtudeCode = value;
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
     this.natureEtudeService.edit().subscribe(natureEtude=>{
     const myIndex = this.natureEtudes.findIndex(e => e.id === this.selectedNatureEtude.id);
     this.natureEtudes[myIndex] = natureEtude;
     this.editNatureEtudeDialog = false;
     this.submitted = false;
     this.selectedNatureEtude = new NatureEtudeVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNatureEtudeLibelle();
this.validateNatureEtudeCode();

    }

private validateNatureEtudeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNatureEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNatureEtudeLibelle = false;
        } else {
            this.validNatureEtudeLibelle = true;
        }
    }
private validateNatureEtudeCode(){
        if (this.stringUtilService.isEmpty(this.selectedNatureEtude.code)) {
            this.errorMessages.push('Code non valide');
            this.validNatureEtudeCode = false;
        } else {
            this.validNatureEtudeCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editNatureEtudeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get natureEtudes(): Array<NatureEtudeVo> {
    return this.natureEtudeService.natureEtudes;
       }
set natureEtudes(value: Array<NatureEtudeVo>) {
        this.natureEtudeService.natureEtudes = value;
       }

 get selectedNatureEtude(): NatureEtudeVo {
           return this.natureEtudeService.selectedNatureEtude;
       }
    set selectedNatureEtude(value: NatureEtudeVo) {
        this.natureEtudeService.selectedNatureEtude = value;
       }

   get editNatureEtudeDialog(): boolean {
           return this.natureEtudeService.editNatureEtudeDialog;

       }
    set editNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.editNatureEtudeDialog= value;
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

    get validNatureEtudeLibelle(): boolean {
    return this._validNatureEtudeLibelle;
    }

    set validNatureEtudeLibelle(value: boolean) {
    this._validNatureEtudeLibelle = value;
    }
    get validNatureEtudeCode(): boolean {
    return this._validNatureEtudeCode;
    }

    set validNatureEtudeCode(value: boolean) {
    this._validNatureEtudeCode = value;
    }

}
