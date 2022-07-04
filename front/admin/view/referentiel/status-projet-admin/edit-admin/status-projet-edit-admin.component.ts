import {Component, OnInit} from '@angular/core';
import {StatusProjetService} from 'src/app/controller/service/referentiel/StatusProjet.service';
import {StatusProjetVo} from 'src/app/controller/model/referentiel/StatusProjet.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-status-projet-edit-admin',
  templateUrl: './status-projet-edit-admin.component.html',
  styleUrls: ['./status-projet-edit-admin.component.css']
})
export class StatusProjetEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStatusProjetLibelle = true;
   _validStatusProjetCode = true;




constructor(private datePipe: DatePipe, private statusProjetService: StatusProjetService
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
    this.validStatusProjetLibelle = value;
    this.validStatusProjetCode = value;
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
     this.statusProjetService.edit().subscribe(statusProjet=>{
     const myIndex = this.statusProjets.findIndex(e => e.id === this.selectedStatusProjet.id);
     this.statusProjets[myIndex] = statusProjet;
     this.editStatusProjetDialog = false;
     this.submitted = false;
     this.selectedStatusProjet = new StatusProjetVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateStatusProjetLibelle();
this.validateStatusProjetCode();

    }

private validateStatusProjetLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStatusProjet.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStatusProjetLibelle = false;
        } else {
            this.validStatusProjetLibelle = true;
        }
    }
private validateStatusProjetCode(){
        if (this.stringUtilService.isEmpty(this.selectedStatusProjet.code)) {
            this.errorMessages.push('Code non valide');
            this.validStatusProjetCode = false;
        } else {
            this.validStatusProjetCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editStatusProjetDialog  = false;
    this.setValidation(true);
}

// getters and setters

get statusProjets(): Array<StatusProjetVo> {
    return this.statusProjetService.statusProjets;
       }
set statusProjets(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjets = value;
       }

 get selectedStatusProjet(): StatusProjetVo {
           return this.statusProjetService.selectedStatusProjet;
       }
    set selectedStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.selectedStatusProjet = value;
       }

   get editStatusProjetDialog(): boolean {
           return this.statusProjetService.editStatusProjetDialog;

       }
    set editStatusProjetDialog(value: boolean) {
        this.statusProjetService.editStatusProjetDialog= value;
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

    get validStatusProjetLibelle(): boolean {
    return this._validStatusProjetLibelle;
    }

    set validStatusProjetLibelle(value: boolean) {
    this._validStatusProjetLibelle = value;
    }
    get validStatusProjetCode(): boolean {
    return this._validStatusProjetCode;
    }

    set validStatusProjetCode(value: boolean) {
    this._validStatusProjetCode = value;
    }

}
