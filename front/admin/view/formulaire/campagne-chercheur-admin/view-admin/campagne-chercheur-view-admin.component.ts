import {Component, OnInit} from '@angular/core';
import {CampagneChercheurService} from 'src/app/controller/service/formulaire/CampagneChercheur.service';
import {CampagneChercheurVo} from 'src/app/controller/model/formulaire/CampagneChercheur.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {EtatCampagneChercheurVo} from 'src/app/controller/model/config/EtatCampagneChercheur.model';
import {EtatCampagneChercheurService} from 'src/app/controller/service/config/EtatCampagneChercheur.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-campagne-chercheur-view-admin',
  templateUrl: './campagne-chercheur-view-admin.component.html',
  styleUrls: ['./campagne-chercheur-view-admin.component.css']
})
export class CampagneChercheurViewAdminComponent implements OnInit {


constructor(private campagneChercheurService: CampagneChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatCampagneChercheurService :EtatCampagneChercheurService
    ,private campagneService :CampagneService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
    this.etatCampagneChercheurService.findAll().subscribe((data) => this.etatCampagneChercheurs = data);
}

hideViewDialog(){
    this.viewCampagneChercheurDialog  = false;
}

// getters and setters

get campagneChercheurs(): Array<CampagneChercheurVo> {
    return this.campagneChercheurService.campagneChercheurs;
       }
set campagneChercheurs(value: Array<CampagneChercheurVo>) {
        this.campagneChercheurService.campagneChercheurs = value;
       }

 get selectedCampagneChercheur():CampagneChercheurVo {
           return this.campagneChercheurService.selectedCampagneChercheur;
       }
    set selectedCampagneChercheur(value: CampagneChercheurVo) {
        this.campagneChercheurService.selectedCampagneChercheur = value;
       }

   get viewCampagneChercheurDialog():boolean {
           return this.campagneChercheurService.viewCampagneChercheurDialog;

       }
    set viewCampagneChercheurDialog(value: boolean) {
        this.campagneChercheurService.viewCampagneChercheurDialog= value;
       }

       get selectedEtatCampagneChercheur():EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
      set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }
       get etatCampagneChercheurs():Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
       set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }
       get editEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.editEtatCampagneChercheurDialog;
       }
      set editEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.editEtatCampagneChercheurDialog= value;
       }
       get selectedCampagne():CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes():Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog():boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
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
