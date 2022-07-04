import {Component, OnInit} from '@angular/core';
import {CaracterisationService} from 'src/app/controller/service/referentiel/Caracterisation.service';
import {CaracterisationVo} from 'src/app/controller/model/referentiel/Caracterisation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-caracterisation-create-admin',
  templateUrl: './caracterisation-create-admin.component.html',
  styleUrls: ['./caracterisation-create-admin.component.css']
})
export class CaracterisationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCaracterisationLibelle = true;
   _validCaracterisationCode = true;




constructor(private datePipe: DatePipe, private caracterisationService: CaracterisationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validCaracterisationLibelle = value;
    this.validCaracterisationCode = value;
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
     this.caracterisationService.save().subscribe(caracterisation=>{
      if(caracterisation != null){
       this.caracterisations.push({...caracterisation});
       this.createCaracterisationDialog = false;
       this.submitted = false;
       this.selectedCaracterisation = new CaracterisationVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Caracterisation existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCaracterisationLibelle();
this.validateCaracterisationCode();

    }

private validateCaracterisationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCaracterisation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCaracterisationLibelle = false;
        } else {
            this.validCaracterisationLibelle = true;
        }
    }
private validateCaracterisationCode(){
        if (this.stringUtilService.isEmpty(this.selectedCaracterisation.code)) {
            this.errorMessages.push('Code non valide');
            this.validCaracterisationCode = false;
        } else {
            this.validCaracterisationCode = true;
        }
    }










hideCreateDialog(){
    this.createCaracterisationDialog  = false;
    this.setValidation(true);
}

get caracterisations(): Array<CaracterisationVo> {
    return this.caracterisationService.caracterisations;
       }
set caracterisations(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisations = value;
       }

 get selectedCaracterisation(): CaracterisationVo {
           return this.caracterisationService.selectedCaracterisation;
       }
    set selectedCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.selectedCaracterisation = value;
       }

   get createCaracterisationDialog(): boolean {
           return this.caracterisationService.createCaracterisationDialog;

       }
    set createCaracterisationDialog(value: boolean) {
        this.caracterisationService.createCaracterisationDialog= value;
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

    get validCaracterisationLibelle(): boolean {
    return this._validCaracterisationLibelle;
    }

    set validCaracterisationLibelle(value: boolean) {
    this._validCaracterisationLibelle = value;
    }
    get validCaracterisationCode(): boolean {
    return this._validCaracterisationCode;
    }

    set validCaracterisationCode(value: boolean) {
    this._validCaracterisationCode = value;
    }


}
