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
  selector: 'app-grade-edit-admin',
  templateUrl: './grade-edit-admin.component.html',
  styleUrls: ['./grade-edit-admin.component.css']
})
export class GradeEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validGradeLibelle = true;
   _validGradeCode = true;




constructor(private datePipe: DatePipe, private gradeService: GradeService
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
    this.validGradeLibelle = value;
    this.validGradeCode = value;
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
     this.gradeService.edit().subscribe(grade=>{
     const myIndex = this.grades.findIndex(e => e.id === this.selectedGrade.id);
     this.grades[myIndex] = grade;
     this.editGradeDialog = false;
     this.submitted = false;
     this.selectedGrade = new GradeVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
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











//openPopup
// methods

hideEditDialog(){
    this.editGradeDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editGradeDialog(): boolean {
           return this.gradeService.editGradeDialog;

       }
    set editGradeDialog(value: boolean) {
        this.gradeService.editGradeDialog= value;
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
