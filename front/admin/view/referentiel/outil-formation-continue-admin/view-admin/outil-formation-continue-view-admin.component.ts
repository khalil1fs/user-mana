import {Component, OnInit} from '@angular/core';
import {OutilFormationContinueService} from 'src/app/controller/service/formulaire/OutilFormationContinue.service';
import {OutilFormationContinueVo} from 'src/app/controller/model/referentiel/OutilFormationContinue.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-outil-formation-continue-view-admin',
  templateUrl: './outil-formation-continue-view-admin.component.html',
  styleUrls: ['./outil-formation-continue-view-admin.component.css']
})
export class OutilFormationContinueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilFormationContinueService: OutilFormationContinueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewOutilFormationContinueDialog  = false;
}

// getters and setters

get outilFormationContinues(): Array<OutilFormationContinueVo> {
    return this.outilFormationContinueService.outilFormationContinues;
       }
set outilFormationContinues(value: Array<OutilFormationContinueVo>) {
        this.outilFormationContinueService.outilFormationContinues = value;
       }

 get selectedOutilFormationContinue(): OutilFormationContinueVo {
           return this.outilFormationContinueService.selectedOutilFormationContinue;
       }
    set selectedOutilFormationContinue(value: OutilFormationContinueVo) {
        this.outilFormationContinueService.selectedOutilFormationContinue = value;
       }

   get viewOutilFormationContinueDialog(): boolean {
           return this.outilFormationContinueService.viewOutilFormationContinueDialog;

       }
    set viewOutilFormationContinueDialog(value: boolean) {
        this.outilFormationContinueService.viewOutilFormationContinueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
