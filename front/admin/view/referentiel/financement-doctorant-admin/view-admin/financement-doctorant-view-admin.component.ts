import {Component, OnInit} from '@angular/core';
import {FinancementDoctorantService} from 'src/app/controller/service/referentiel/FinancementDoctorant.service';
import {FinancementDoctorantVo} from 'src/app/controller/model/referentiel/FinancementDoctorant.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-financement-doctorant-view-admin',
  templateUrl: './financement-doctorant-view-admin.component.html',
  styleUrls: ['./financement-doctorant-view-admin.component.css']
})
export class FinancementDoctorantViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private financementDoctorantService: FinancementDoctorantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewFinancementDoctorantDialog  = false;
}

// getters and setters

get financementDoctorants(): Array<FinancementDoctorantVo> {
    return this.financementDoctorantService.financementDoctorants;
       }
set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }

 get selectedFinancementDoctorant(): FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
    set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }

   get viewFinancementDoctorantDialog(): boolean {
           return this.financementDoctorantService.viewFinancementDoctorantDialog;

       }
    set viewFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.viewFinancementDoctorantDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
