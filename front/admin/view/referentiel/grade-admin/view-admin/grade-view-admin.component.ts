import {Component, OnInit} from '@angular/core';
import {GradeService} from 'src/app/controller/service/referentiel/Grade.service';
import {GradeVo} from 'src/app/controller/model/referentiel/Grade.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-grade-view-admin',
  templateUrl: './grade-view-admin.component.html',
  styleUrls: ['./grade-view-admin.component.css']
})
export class GradeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private gradeService: GradeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewGradeDialog  = false;
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

   get viewGradeDialog(): boolean {
           return this.gradeService.viewGradeDialog;

       }
    set viewGradeDialog(value: boolean) {
        this.gradeService.viewGradeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
