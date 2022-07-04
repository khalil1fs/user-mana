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
  selector: 'app-niveau-formation-create-admin',
  templateUrl: './niveau-formation-create-admin.component.html',
  styleUrls: ['./niveau-formation-create-admin.component.css']
})
export class NiveauFormationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNiveauFormationLibelleMicro = true;
   _validNiveauFormationCode = true;




constructor(private datePipe: DatePipe, private niveauFormationService: NiveauFormationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validNiveauFormationLibelleMicro = value;
    this.validNiveauFormationCode = value;
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
     this.niveauFormationService.save().subscribe(niveauFormation=>{
      if(niveauFormation != null){
       this.niveauFormations.push({...niveauFormation});
       this.createNiveauFormationDialog = false;
       this.submitted = false;
       this.selectedNiveauFormation = new NiveauFormationVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Niveau formation existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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











hideCreateDialog(){
    this.createNiveauFormationDialog  = false;
    this.setValidation(true);
}

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

   get createNiveauFormationDialog(): boolean {
           return this.niveauFormationService.createNiveauFormationDialog;

       }
    set createNiveauFormationDialog(value: boolean) {
        this.niveauFormationService.createNiveauFormationDialog= value;
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
