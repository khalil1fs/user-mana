import {Component, OnInit} from '@angular/core';
import {EvaluationEncadrementService} from 'src/app/controller/service/referentiel/EvaluationEncadrement.service';
import {EvaluationEncadrementVo} from 'src/app/controller/model/referentiel/EvaluationEncadrement.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-evaluation-encadrement-create-admin',
  templateUrl: './evaluation-encadrement-create-admin.component.html',
  styleUrls: ['./evaluation-encadrement-create-admin.component.css']
})
export class EvaluationEncadrementCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEvaluationEncadrementLibelle = true;
   _validEvaluationEncadrementCode = true;




constructor(private datePipe: DatePipe, private evaluationEncadrementService: EvaluationEncadrementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validEvaluationEncadrementLibelle = value;
    this.validEvaluationEncadrementCode = value;
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
     this.evaluationEncadrementService.save().subscribe(evaluationEncadrement=>{
      if(evaluationEncadrement != null){
       this.evaluationEncadrements.push({...evaluationEncadrement});
       this.createEvaluationEncadrementDialog = false;
       this.submitted = false;
       this.selectedEvaluationEncadrement = new EvaluationEncadrementVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Evaluation encadrement existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEvaluationEncadrementLibelle();
this.validateEvaluationEncadrementCode();

    }

private validateEvaluationEncadrementLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEvaluationEncadrement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEvaluationEncadrementLibelle = false;
        } else {
            this.validEvaluationEncadrementLibelle = true;
        }
    }
private validateEvaluationEncadrementCode(){
        if (this.stringUtilService.isEmpty(this.selectedEvaluationEncadrement.code)) {
            this.errorMessages.push('Code non valide');
            this.validEvaluationEncadrementCode = false;
        } else {
            this.validEvaluationEncadrementCode = true;
        }
    }










hideCreateDialog(){
    this.createEvaluationEncadrementDialog  = false;
    this.setValidation(true);
}

get evaluationEncadrements(): Array<EvaluationEncadrementVo> {
    return this.evaluationEncadrementService.evaluationEncadrements;
       }
set evaluationEncadrements(value: Array<EvaluationEncadrementVo>) {
        this.evaluationEncadrementService.evaluationEncadrements = value;
       }

 get selectedEvaluationEncadrement(): EvaluationEncadrementVo {
           return this.evaluationEncadrementService.selectedEvaluationEncadrement;
       }
    set selectedEvaluationEncadrement(value: EvaluationEncadrementVo) {
        this.evaluationEncadrementService.selectedEvaluationEncadrement = value;
       }

   get createEvaluationEncadrementDialog(): boolean {
           return this.evaluationEncadrementService.createEvaluationEncadrementDialog;

       }
    set createEvaluationEncadrementDialog(value: boolean) {
        this.evaluationEncadrementService.createEvaluationEncadrementDialog= value;
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

    get validEvaluationEncadrementLibelle(): boolean {
    return this._validEvaluationEncadrementLibelle;
    }

    set validEvaluationEncadrementLibelle(value: boolean) {
    this._validEvaluationEncadrementLibelle = value;
    }
    get validEvaluationEncadrementCode(): boolean {
    return this._validEvaluationEncadrementCode;
    }

    set validEvaluationEncadrementCode(value: boolean) {
    this._validEvaluationEncadrementCode = value;
    }


}
