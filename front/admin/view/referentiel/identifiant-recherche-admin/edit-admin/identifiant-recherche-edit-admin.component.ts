import {Component, OnInit} from '@angular/core';
import {IdentifiantRechercheService} from 'src/app/controller/service/referentiel/IdentifiantRecherche.service';
import {IdentifiantRechercheVo} from 'src/app/controller/model/referentiel/IdentifiantRecherche.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-identifiant-recherche-edit-admin',
  templateUrl: './identifiant-recherche-edit-admin.component.html',
  styleUrls: ['./identifiant-recherche-edit-admin.component.css']
})
export class IdentifiantRechercheEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validIdentifiantRechercheLibelle = true;
   _validIdentifiantRechercheCode = true;




constructor(private datePipe: DatePipe, private identifiantRechercheService: IdentifiantRechercheService
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
    this.validIdentifiantRechercheLibelle = value;
    this.validIdentifiantRechercheCode = value;
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
     this.identifiantRechercheService.edit().subscribe(identifiantRecherche=>{
     const myIndex = this.identifiantRecherches.findIndex(e => e.id === this.selectedIdentifiantRecherche.id);
     this.identifiantRecherches[myIndex] = identifiantRecherche;
     this.editIdentifiantRechercheDialog = false;
     this.submitted = false;
     this.selectedIdentifiantRecherche = new IdentifiantRechercheVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateIdentifiantRechercheLibelle();
this.validateIdentifiantRechercheCode();

    }

private validateIdentifiantRechercheLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedIdentifiantRecherche.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validIdentifiantRechercheLibelle = false;
        } else {
            this.validIdentifiantRechercheLibelle = true;
        }
    }
private validateIdentifiantRechercheCode(){
        if (this.stringUtilService.isEmpty(this.selectedIdentifiantRecherche.code)) {
            this.errorMessages.push('Code non valide');
            this.validIdentifiantRechercheCode = false;
        } else {
            this.validIdentifiantRechercheCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editIdentifiantRechercheDialog  = false;
    this.setValidation(true);
}

// getters and setters

get identifiantRecherches(): Array<IdentifiantRechercheVo> {
    return this.identifiantRechercheService.identifiantRecherches;
       }
set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }

 get selectedIdentifiantRecherche(): IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
    set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }

   get editIdentifiantRechercheDialog(): boolean {
           return this.identifiantRechercheService.editIdentifiantRechercheDialog;

       }
    set editIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.editIdentifiantRechercheDialog= value;
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

    get validIdentifiantRechercheLibelle(): boolean {
    return this._validIdentifiantRechercheLibelle;
    }

    set validIdentifiantRechercheLibelle(value: boolean) {
    this._validIdentifiantRechercheLibelle = value;
    }
    get validIdentifiantRechercheCode(): boolean {
    return this._validIdentifiantRechercheCode;
    }

    set validIdentifiantRechercheCode(value: boolean) {
    this._validIdentifiantRechercheCode = value;
    }

}
