import {Component, OnInit} from '@angular/core';
import {NiveauFormationService} from 'src/app/controller/service/referentiel/NiveauFormation.service';
import {NiveauFormationVo} from 'src/app/controller/model/referentiel/NiveauFormation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-niveau-formation-edit-admin',
  templateUrl: './niveau-formation-edit-admin.component.html',
  styleUrls: ['./niveau-formation-edit-admin.component.css']
})
export class NiveauFormationEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNiveauFormationLibelleMicro = true;
   _validNiveauFormationCode = true;




constructor(private datePipe: DatePipe, private niveauFormationService: NiveauFormationService
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
    this.validNiveauFormationLibelleMicro = value;
    this.validNiveauFormationCode = value;
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
     this.niveauFormationService.edit().subscribe(niveauFormation=>{
     const myIndex = this.niveauFormations.findIndex(e => e.id === this.selectedNiveauFormation.id);
     this.niveauFormations[myIndex] = niveauFormation;
     this.editNiveauFormationDialog = false;
     this.submitted = false;
     this.selectedNiveauFormation = new NiveauFormationVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNiveauFormationLibelleMicro();
this.validateNiveauFormationCode();

    }

private validateNiveauFormationLibelleMicro(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauFormation.libelleMicro)) {
            this.errorMessages.push('Libelle micro non valide');
            this.validNiveauFormationLibelleMicro = false;
        } else {
            this.validNiveauFormationLibelleMicro = true;
        }
    }
private validateNiveauFormationCode(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauFormation.code)) {
            this.errorMessages.push('Code non valide');
            this.validNiveauFormationCode = false;
        } else {
            this.validNiveauFormationCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editNiveauFormationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get niveauFormations(): Array<NiveauFormationVo> {
    return this.niveauFormationService.niveauFormations;
       }
set niveauFormations(value: Array<NiveauFormationVo>) {
        this.niveauFormationService.niveauFormations = value;
       }

 get selectedNiveauFormation(): NiveauFormationVo {
           return this.niveauFormationService.selectedNiveauFormation;
       }
    set selectedNiveauFormation(value: NiveauFormationVo) {
        this.niveauFormationService.selectedNiveauFormation = value;
       }

   get editNiveauFormationDialog(): boolean {
           return this.niveauFormationService.editNiveauFormationDialog;

       }
    set editNiveauFormationDialog(value: boolean) {
        this.niveauFormationService.editNiveauFormationDialog= value;
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

    get validNiveauFormationLibelleMicro(): boolean {
    return this._validNiveauFormationLibelleMicro;
    }

    set validNiveauFormationLibelleMicro(value: boolean) {
    this._validNiveauFormationLibelleMicro = value;
    }
    get validNiveauFormationCode(): boolean {
    return this._validNiveauFormationCode;
    }

    set validNiveauFormationCode(value: boolean) {
    this._validNiveauFormationCode = value;
    }

}
