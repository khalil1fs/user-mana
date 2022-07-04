import {Component, OnInit} from '@angular/core';
import {ModaliteService} from 'src/app/controller/service/referentiel/Modalite.service';
import {ModaliteVo} from 'src/app/controller/model/referentiel/Modalite.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-modalite-view-admin',
  templateUrl: './modalite-view-admin.component.html',
  styleUrls: ['./modalite-view-admin.component.css']
})
export class ModaliteViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteService: ModaliteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewModaliteDialog  = false;
}

// getters and setters

get modalites(): Array<ModaliteVo> {
    return this.modaliteService.modalites;
       }
set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }

 get selectedModalite(): ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
    set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }

   get viewModaliteDialog(): boolean {
           return this.modaliteService.viewModaliteDialog;

       }
    set viewModaliteDialog(value: boolean) {
        this.modaliteService.viewModaliteDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
