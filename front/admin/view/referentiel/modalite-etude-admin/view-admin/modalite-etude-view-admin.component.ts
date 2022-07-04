import {Component, OnInit} from '@angular/core';
import {ModaliteEtudeService} from 'src/app/controller/service/referentiel/ModaliteEtude.service';
import {ModaliteEtudeVo} from 'src/app/controller/model/referentiel/ModaliteEtude.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-modalite-etude-view-admin',
  templateUrl: './modalite-etude-view-admin.component.html',
  styleUrls: ['./modalite-etude-view-admin.component.css']
})
export class ModaliteEtudeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteEtudeService: ModaliteEtudeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewModaliteEtudeDialog  = false;
}

// getters and setters

get modaliteEtudes(): Array<ModaliteEtudeVo> {
    return this.modaliteEtudeService.modaliteEtudes;
       }
set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }

 get selectedModaliteEtude(): ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
    set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }

   get viewModaliteEtudeDialog(): boolean {
           return this.modaliteEtudeService.viewModaliteEtudeDialog;

       }
    set viewModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.viewModaliteEtudeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
