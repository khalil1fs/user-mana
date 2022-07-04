import {Component, OnInit} from '@angular/core';
import {TemplateClotureService} from 'src/app/controller/service/referentiel/TemplateCloture.service';
import {TemplateClotureVo} from 'src/app/controller/model/referentiel/TemplateCloture.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-cloture-view-admin',
  templateUrl: './template-cloture-view-admin.component.html',
  styleUrls: ['./template-cloture-view-admin.component.css']
})
export class TemplateClotureViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateClotureService: TemplateClotureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateClotureDialog  = false;
}

// getters and setters

get templateClotures(): Array<TemplateClotureVo> {
    return this.templateClotureService.templateClotures;
       }
set templateClotures(value: Array<TemplateClotureVo>) {
        this.templateClotureService.templateClotures = value;
       }

 get selectedTemplateCloture(): TemplateClotureVo {
           return this.templateClotureService.selectedTemplateCloture;
       }
    set selectedTemplateCloture(value: TemplateClotureVo) {
        this.templateClotureService.selectedTemplateCloture = value;
       }

   get viewTemplateClotureDialog(): boolean {
           return this.templateClotureService.viewTemplateClotureDialog;

       }
    set viewTemplateClotureDialog(value: boolean) {
        this.templateClotureService.viewTemplateClotureDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
