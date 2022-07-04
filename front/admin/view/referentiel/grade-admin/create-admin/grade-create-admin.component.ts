import {Component, OnInit} from '@angular/core';
import {GradeService} from 'src/app/controller/service/referentiel/Grade.service';
import {GradeVo} from 'src/app/controller/model/referentiel/Grade.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-grade-create-admin',
  templateUrl: './grade-create-admin.component.html',
  styleUrls: ['./grade-create-admin.component.css']
})
export class GradeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validGradeLibelle = true;
   _validGradeCode = true;




constructor(private datePipe: DatePipe, private gradeService: GradeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validGradeLibelle = value;
    this.validGradeCode = value;
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
     this.gradeService.save().subscribe(grade=>{
      if(grade != null){
       this.grades.push({...grade});
       this.createGradeDialog = false;
       this.submitted = false;
       this.selectedGrade = new GradeVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Grade existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateGradeLibelle();
this.validateGradeCode();

    }

private validateGradeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedGrade.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validGradeLibelle = false;
        } else {
            this.validGradeLibelle = true;
        }
    }
private validateGradeCode(){
        if (this.stringUtilService.isEmpty(this.selectedGrade.code)) {
            this.errorMessages.push('Code non valide');
            this.validGradeCode = false;
        } else {
            this.validGradeCode = true;
        }
    }












hideCreateDialog(){
    this.createGradeDialog  = false;
    this.setValidation(true);
}

get grades(): Array<GradeVo> {
    return this.gradeService.grades;
       }
set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }

 get selectedGrade(): GradeVo {
           return this.gradeService.selectedGrade;
       }
    set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }

   get createGradeDialog(): boolean {
           return this.gradeService.createGradeDialog;

       }
    set createGradeDialog(value: boolean) {
        this.gradeService.createGradeDialog= value;
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

    get validGradeLibelle(): boolean {
    return this._validGradeLibelle;
    }

    set validGradeLibelle(value: boolean) {
    this._validGradeLibelle = value;
    }
    get validGradeCode(): boolean {
    return this._validGradeCode;
    }

    set validGradeCode(value: boolean) {
    this._validGradeCode = value;
    }


}
