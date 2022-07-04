import {Component, OnInit} from '@angular/core';
import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-sexe-view-admin',
  templateUrl: './sexe-view-admin.component.html',
  styleUrls: ['./sexe-view-admin.component.css']
})
export class SexeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private sexeService: SexeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewSexeDialog  = false;
}

// getters and setters

get sexes(): Array<SexeVo> {
    return this.sexeService.sexes;
       }
set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }

 get selectedSexe(): SexeVo {
           return this.sexeService.selectedSexe;
       }
    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }

   get viewSexeDialog(): boolean {
           return this.sexeService.viewSexeDialog;

       }
    set viewSexeDialog(value: boolean) {
        this.sexeService.viewSexeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
