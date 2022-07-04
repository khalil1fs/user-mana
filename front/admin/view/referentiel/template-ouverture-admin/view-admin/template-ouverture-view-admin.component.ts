import {Component, OnInit} from '@angular/core';
import {TemplateOuvertureService} from 'src/app/controller/service/referentiel/TemplateOuverture.service';
import {TemplateOuvertureVo} from 'src/app/controller/model/referentiel/TemplateOuverture.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-ouverture-view-admin',
  templateUrl: './template-ouverture-view-admin.component.html',
  styleUrls: ['./template-ouverture-view-admin.component.css']
})
export class TemplateOuvertureViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateOuvertureService: TemplateOuvertureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateOuvertureDialog  = false;
}

// getters and setters

get templateOuvertures(): Array<TemplateOuvertureVo> {
    return this.templateOuvertureService.templateOuvertures;
       }
set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
       }

 get selectedTemplateOuverture(): TemplateOuvertureVo {
           return this.templateOuvertureService.selectedTemplateOuverture;
       }
    set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
       }

   get viewTemplateOuvertureDialog(): boolean {
           return this.templateOuvertureService.viewTemplateOuvertureDialog;

       }
    set viewTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.viewTemplateOuvertureDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
