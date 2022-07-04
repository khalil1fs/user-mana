import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {EtablissementPartenaireVo} from 'src/app/controller/model/referentiel/EtablissementPartenaire.model';
import {EtablissementPartenaireService} from 'src/app/controller/service/referentiel/EtablissementPartenaire.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {StringUtilService} from '../../../../../../controller/service/formulaire/StringUtil.service';

@Component({
  selector: 'app-etablissement-partenaire-edit-admin',
  templateUrl: './etablissement-partenaire-edit-admin.component.html',
  styleUrls: ['./etablissement-partenaire-edit-admin.component.css']
})
export class EtablissementPartenaireEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtablissementPartenaireLibelle = true;
   _validEtablissementPartenaireCode = true;




constructor(private datePipe: DatePipe, private etablissementPartenaireService: EtablissementPartenaireService
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
    this.validEtablissementPartenaireLibelle = value;
    this.validEtablissementPartenaireCode = value;
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
     this.etablissementPartenaireService.edit().subscribe(etablissementPartenaire=>{
     const myIndex = this.etablissementPartenaires.findIndex(e => e.id === this.selectedEtablissementPartenaire.id);
     this.etablissementPartenaires[myIndex] = etablissementPartenaire;
     this.editEtablissementPartenaireDialog = false;
     this.submitted = false;
     this.selectedEtablissementPartenaire = new EtablissementPartenaireVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtablissementPartenaireLibelle();
this.validateEtablissementPartenaireCode();

    }

private validateEtablissementPartenaireLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtablissementPartenaire.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtablissementPartenaireLibelle = false;
        } else {
            this.validEtablissementPartenaireLibelle = true;
        }
    }
private validateEtablissementPartenaireCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtablissementPartenaire.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtablissementPartenaireCode = false;
        } else {
            this.validEtablissementPartenaireCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editEtablissementPartenaireDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etablissementPartenaires(): Array<EtablissementPartenaireVo> {
    return this.etablissementPartenaireService.etablissementPartenaires;
       }
set etablissementPartenaires(value: Array<EtablissementPartenaireVo>) {
        this.etablissementPartenaireService.etablissementPartenaires = value;
       }

 get selectedEtablissementPartenaire(): EtablissementPartenaireVo {
           return this.etablissementPartenaireService.selectedEtablissementPartenaire;
       }
    set selectedEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this.etablissementPartenaireService.selectedEtablissementPartenaire = value;
       }

   get editEtablissementPartenaireDialog(): boolean {
           return this.etablissementPartenaireService.editEtablissementPartenaireDialog;

       }
    set editEtablissementPartenaireDialog(value: boolean) {
        this.etablissementPartenaireService.editEtablissementPartenaireDialog= value;
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

    get validEtablissementPartenaireLibelle(): boolean {
    return this._validEtablissementPartenaireLibelle;
    }

    set validEtablissementPartenaireLibelle(value: boolean) {
    this._validEtablissementPartenaireLibelle = value;
    }
    get validEtablissementPartenaireCode(): boolean {
    return this._validEtablissementPartenaireCode;
    }

    set validEtablissementPartenaireCode(value: boolean) {
    this._validEtablissementPartenaireCode = value;
    }

}
