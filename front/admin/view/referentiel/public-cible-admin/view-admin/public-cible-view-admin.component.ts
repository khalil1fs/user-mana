import {Component, OnInit} from '@angular/core';
import {PublicCibleService} from 'src/app/controller/service/referentiel/PublicCible.service';
import {PublicCibleVo} from 'src/app/controller/model/referentiel/PublicCible.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-public-cible-view-admin',
  templateUrl: './public-cible-view-admin.component.html',
  styleUrls: ['./public-cible-view-admin.component.css']
})
export class PublicCibleViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private publicCibleService: PublicCibleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewPublicCibleDialog  = false;
}

// getters and setters

get publicCibles(): Array<PublicCibleVo> {
    return this.publicCibleService.publicCibles;
       }
set publicCibles(value: Array<PublicCibleVo>) {
        this.publicCibleService.publicCibles = value;
       }

 get selectedPublicCible(): PublicCibleVo {
           return this.publicCibleService.selectedPublicCible;
       }
    set selectedPublicCible(value: PublicCibleVo) {
        this.publicCibleService.selectedPublicCible = value;
       }

   get viewPublicCibleDialog(): boolean {
           return this.publicCibleService.viewPublicCibleDialog;

       }
    set viewPublicCibleDialog(value: boolean) {
        this.publicCibleService.viewPublicCibleDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
