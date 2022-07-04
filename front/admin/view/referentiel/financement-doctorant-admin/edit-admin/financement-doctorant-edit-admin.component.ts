import {Component, OnInit} from '@angular/core';
import {FinancementDoctorantService} from 'src/app/controller/service/referentiel/FinancementDoctorant.service';
import {FinancementDoctorantVo} from 'src/app/controller/model/referentiel/FinancementDoctorant.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-financement-doctorant-edit-admin',
  templateUrl: './financement-doctorant-edit-admin.component.html',
  styleUrls: ['./financement-doctorant-edit-admin.component.css']
})
export class FinancementDoctorantEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validFinancementDoctorantLibelle = true;
   _validFinancementDoctorantCode = true;




constructor(private datePipe: DatePipe, private financementDoctorantService: FinancementDoctorantService
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
    this.validFinancementDoctorantLibelle = value;
    this.validFinancementDoctorantCode = value;
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
     this.financementDoctorantService.edit().subscribe(financementDoctorant=>{
     const myIndex = this.financementDoctorants.findIndex(e => e.id === this.selectedFinancementDoctorant.id);
     this.financementDoctorants[myIndex] = financementDoctorant;
     this.editFinancementDoctorantDialog = false;
     this.submitted = false;
     this.selectedFinancementDoctorant = new FinancementDoctorantVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateFinancementDoctorantLibelle();
this.validateFinancementDoctorantCode();

    }

private validateFinancementDoctorantLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedFinancementDoctorant.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validFinancementDoctorantLibelle = false;
        } else {
            this.validFinancementDoctorantLibelle = true;
        }
    }
private validateFinancementDoctorantCode(){
        if (this.stringUtilService.isEmpty(this.selectedFinancementDoctorant.code)) {
            this.errorMessages.push('Code non valide');
            this.validFinancementDoctorantCode = false;
        } else {
            this.validFinancementDoctorantCode = true;
        }
    }









//openPopup
// methods

hideEditDialog(){
    this.editFinancementDoctorantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get financementDoctorants(): Array<FinancementDoctorantVo> {
    return this.financementDoctorantService.financementDoctorants;
       }
set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }

 get selectedFinancementDoctorant(): FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
    set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }

   get editFinancementDoctorantDialog(): boolean {
           return this.financementDoctorantService.editFinancementDoctorantDialog;

       }
    set editFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.editFinancementDoctorantDialog= value;
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

    get validFinancementDoctorantLibelle(): boolean {
    return this._validFinancementDoctorantLibelle;
    }

    set validFinancementDoctorantLibelle(value: boolean) {
    this._validFinancementDoctorantLibelle = value;
    }
    get validFinancementDoctorantCode(): boolean {
    return this._validFinancementDoctorantCode;
    }

    set validFinancementDoctorantCode(value: boolean) {
    this._validFinancementDoctorantCode = value;
    }

}
