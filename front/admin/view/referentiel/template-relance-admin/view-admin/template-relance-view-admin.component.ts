import {Component, OnInit} from '@angular/core';
import {TemplateRelanceService} from 'src/app/controller/service/referentiel/TemplateRelance.service';
import {TemplateRelanceVo} from 'src/app/controller/model/referentiel/TemplateRelance.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-relance-view-admin',
  templateUrl: './template-relance-view-admin.component.html',
  styleUrls: ['./template-relance-view-admin.component.css']
})
export class TemplateRelanceViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateRelanceService: TemplateRelanceService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateRelanceDialog  = false;
}

// getters and setters

get templateRelances(): Array<TemplateRelanceVo> {
    return this.templateRelanceService.templateRelances;
       }
set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
       }

 get selectedTemplateRelance(): TemplateRelanceVo {
           return this.templateRelanceService.selectedTemplateRelance;
       }
    set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
       }

   get viewTemplateRelanceDialog(): boolean {
           return this.templateRelanceService.viewTemplateRelanceDialog;

       }
    set viewTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.viewTemplateRelanceDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
