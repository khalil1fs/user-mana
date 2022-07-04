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
  selector: 'app-identifiant-recherche-create-admin',
  templateUrl: './identifiant-recherche-create-admin.component.html',
  styleUrls: ['./identifiant-recherche-create-admin.component.css']
})
export class IdentifiantRechercheCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validIdentifiantRechercheLibelle = true;
   _validIdentifiantRechercheCode = true;




constructor(private datePipe: DatePipe, private identifiantRechercheService: IdentifiantRechercheService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validIdentifiantRechercheLibelle = value;
    this.validIdentifiantRechercheCode = value;
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
     this.identifiantRechercheService.save().subscribe(identifiantRecherche=>{
      if(identifiantRecherche != null){
       this.identifiantRecherches.push({...identifiantRecherche});
       this.createIdentifiantRechercheDialog = false;
       this.submitted = false;
       this.selectedIdentifiantRecherche = new IdentifiantRechercheVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Identifiant recherche existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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











hideCreateDialog(){
    this.createIdentifiantRechercheDialog  = false;
    this.setValidation(true);
}

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

   get createIdentifiantRechercheDialog(): boolean {
           return this.identifiantRechercheService.createIdentifiantRechercheDialog;

       }
    set createIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.createIdentifiantRechercheDialog= value;
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
