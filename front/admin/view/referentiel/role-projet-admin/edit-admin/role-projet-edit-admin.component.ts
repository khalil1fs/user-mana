import {Component, OnInit} from '@angular/core';
import {RoleProjetService} from 'src/app/controller/service/referentiel/RoleProjet.service';
import {RoleProjetVo} from 'src/app/controller/model/referentiel/RoleProjet.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-role-projet-edit-admin',
  templateUrl: './role-projet-edit-admin.component.html',
  styleUrls: ['./role-projet-edit-admin.component.css']
})
export class RoleProjetEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRoleProjetLibelle = true;
   _validRoleProjetCode = true;




constructor(private datePipe: DatePipe, private roleProjetService: RoleProjetService
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
    this.validRoleProjetLibelle = value;
    this.validRoleProjetCode = value;
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
     this.roleProjetService.edit().subscribe(roleProjet=>{
     const myIndex = this.roleProjets.findIndex(e => e.id === this.selectedRoleProjet.id);
     this.roleProjets[myIndex] = roleProjet;
     this.editRoleProjetDialog = false;
     this.submitted = false;
     this.selectedRoleProjet = new RoleProjetVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateRoleProjetLibelle();
this.validateRoleProjetCode();

    }

private validateRoleProjetLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedRoleProjet.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRoleProjetLibelle = false;
        } else {
            this.validRoleProjetLibelle = true;
        }
    }
private validateRoleProjetCode(){
        if (this.stringUtilService.isEmpty(this.selectedRoleProjet.code)) {
            this.errorMessages.push('Code non valide');
            this.validRoleProjetCode = false;
        } else {
            this.validRoleProjetCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editRoleProjetDialog  = false;
    this.setValidation(true);
}

// getters and setters

get roleProjets(): Array<RoleProjetVo> {
    return this.roleProjetService.roleProjets;
       }
set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }

 get selectedRoleProjet(): RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
    set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }

   get editRoleProjetDialog(): boolean {
           return this.roleProjetService.editRoleProjetDialog;

       }
    set editRoleProjetDialog(value: boolean) {
        this.roleProjetService.editRoleProjetDialog= value;
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

    get validRoleProjetLibelle(): boolean {
    return this._validRoleProjetLibelle;
    }

    set validRoleProjetLibelle(value: boolean) {
    this._validRoleProjetLibelle = value;
    }
    get validRoleProjetCode(): boolean {
    return this._validRoleProjetCode;
    }

    set validRoleProjetCode(value: boolean) {
    this._validRoleProjetCode = value;
    }

}
