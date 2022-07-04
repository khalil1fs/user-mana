import {Component, OnInit} from '@angular/core';
import {ModaliteEtudeService} from 'src/app/controller/service/referentiel/ModaliteEtude.service';
import {ModaliteEtudeVo} from 'src/app/controller/model/referentiel/ModaliteEtude.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-modalite-etude-create-admin',
  templateUrl: './modalite-etude-create-admin.component.html',
  styleUrls: ['./modalite-etude-create-admin.component.css']
})
export class ModaliteEtudeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModaliteEtudeLibelle = true;
   _validModaliteEtudeCode = true;




constructor(private datePipe: DatePipe, private modaliteEtudeService: ModaliteEtudeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validModaliteEtudeLibelle = value;
    this.validModaliteEtudeCode = value;
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
     this.modaliteEtudeService.save().subscribe(modaliteEtude=>{
      if(modaliteEtude != null){
       this.modaliteEtudes.push({...modaliteEtude});
       this.createModaliteEtudeDialog = false;
       this.submitted = false;
       this.selectedModaliteEtude = new ModaliteEtudeVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Modalite etude existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModaliteEtudeLibelle();
this.validateModaliteEtudeCode();

    }

private validateModaliteEtudeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedModaliteEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModaliteEtudeLibelle = false;
        } else {
            this.validModaliteEtudeLibelle = true;
        }
    }
private validateModaliteEtudeCode(){
        if (this.stringUtilService.isEmpty(this.selectedModaliteEtude.code)) {
            this.errorMessages.push('Code non valide');
            this.validModaliteEtudeCode = false;
        } else {
            this.validModaliteEtudeCode = true;
        }
    }











hideCreateDialog(){
    this.createModaliteEtudeDialog  = false;
    this.setValidation(true);
}

get modaliteEtudes(): Array<ModaliteEtudeVo> {
    return this.modaliteEtudeService.modaliteEtudes;
       }
set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }

 get selectedModaliteEtude(): ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
    set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }

   get createModaliteEtudeDialog(): boolean {
           return this.modaliteEtudeService.createModaliteEtudeDialog;

       }
    set createModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.createModaliteEtudeDialog= value;
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

    get validModaliteEtudeLibelle(): boolean {
    return this._validModaliteEtudeLibelle;
    }

    set validModaliteEtudeLibelle(value: boolean) {
    this._validModaliteEtudeLibelle = value;
    }
    get validModaliteEtudeCode(): boolean {
    return this._validModaliteEtudeCode;
    }

    set validModaliteEtudeCode(value: boolean) {
    this._validModaliteEtudeCode = value;
    }


}
