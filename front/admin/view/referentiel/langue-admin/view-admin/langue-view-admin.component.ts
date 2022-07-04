import {Component, OnInit} from '@angular/core';
import {LangueService} from 'src/app/controller/service/referentiel/Langue.service';
import {LangueVo} from 'src/app/controller/model/referentiel/Langue.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-langue-view-admin',
  templateUrl: './langue-view-admin.component.html',
  styleUrls: ['./langue-view-admin.component.css']
})
export class LangueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private langueService: LangueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewLangueDialog  = false;
}

// getters and setters

get langues(): Array<LangueVo> {
    return this.langueService.langues;
       }
set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }

 get selectedLangue(): LangueVo {
           return this.langueService.selectedLangue;
       }
    set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }

   get viewLangueDialog(): boolean {
           return this.langueService.viewLangueDialog;

       }
    set viewLangueDialog(value: boolean) {
        this.langueService.viewLangueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
