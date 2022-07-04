import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirChercheurService} from 'src/app/controller/service/formulaire/CommunauteSavoirChercheur.service';
import {CommunauteSavoirChercheurVo} from 'src/app/controller/model/formulaire/CommunauteSavoirChercheur.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {CommunauteSavoirVo} from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import {CommunauteSavoirService} from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-communaute-savoir-chercheur-view-admin',
  templateUrl: './cosav-chercheur-view-admin.html',
  styleUrls: ['./cosav-chercheur-view-admin.css']
})
export class CommunauteSavoirChercheurViewAdminComponent implements OnInit {


constructor(private communauteSavoirChercheurService: CommunauteSavoirChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private communauteSavoirService :CommunauteSavoirService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

hideViewDialog(){
    this.viewCommunauteSavoirChercheurDialog  = false;
}

// getters and setters

get communauteSavoirChercheurs(): Array<CommunauteSavoirChercheurVo> {
    return this.communauteSavoirChercheurService.communauteSavoirChercheurs;
       }
set communauteSavoirChercheurs(value: Array<CommunauteSavoirChercheurVo>) {
        this.communauteSavoirChercheurService.communauteSavoirChercheurs = value;
       }

 get selectedCommunauteSavoirChercheur():CommunauteSavoirChercheurVo {
           return this.communauteSavoirChercheurService.selectedCommunauteSavoirChercheur;
       }
    set selectedCommunauteSavoirChercheur(value: CommunauteSavoirChercheurVo) {
        this.communauteSavoirChercheurService.selectedCommunauteSavoirChercheur = value;
       }

   get viewCommunauteSavoirChercheurDialog():boolean {
           return this.communauteSavoirChercheurService.viewCommunauteSavoirChercheurDialog;

       }
    set viewCommunauteSavoirChercheurDialog(value: boolean) {
        this.communauteSavoirChercheurService.viewCommunauteSavoirChercheurDialog= value;
       }

       get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs():Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get editCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.editCommunauteSavoirDialog;
       }
      set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog= value;
       }
       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
