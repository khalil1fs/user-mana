import {Component, OnInit} from '@angular/core';
import {EvaluationEncadrementService} from 'src/app/controller/service/referentiel/EvaluationEncadrement.service';
import {EvaluationEncadrementVo} from 'src/app/controller/model/referentiel/EvaluationEncadrement.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-evaluation-encadrement-view-admin',
  templateUrl: './evaluation-encadrement-view-admin.component.html',
  styleUrls: ['./evaluation-encadrement-view-admin.component.css']
})
export class EvaluationEncadrementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private evaluationEncadrementService: EvaluationEncadrementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEvaluationEncadrementDialog  = false;
}

// getters and setters

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

   get viewEvaluationEncadrementDialog(): boolean {
           return this.evaluationEncadrementService.viewEvaluationEncadrementDialog;

       }
    set viewEvaluationEncadrementDialog(value: boolean) {
        this.evaluationEncadrementService.viewEvaluationEncadrementDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
