import {Component, OnInit} from '@angular/core';
import {BourseService} from 'src/app/controller/service/formulaire/Bourse.service';
import {BourseVo} from 'src/app/controller/model/formulaire/Bourse.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {ProjetActiviteRechercheVo} from 'src/app/controller/model/formulaire/ProjetActiviteRecherche.model';
import {ProjetActiviteRechercheService} from 'src/app/controller/service/formulaire/ProjetActiviteRecherche.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-bourse-view-admin',
  templateUrl: './bourse-view-admin.component.html',
  styleUrls: ['./bourse-view-admin.component.css']
})
export class BourseViewAdminComponent implements OnInit {


constructor(private bourseService: BourseService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private projetActiviteRechercheService :ProjetActiviteRechercheService
    ,private campagneService :CampagneService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
    this.projetActiviteRechercheService.findAll().subscribe((data) => this.projetActiviteRecherches = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

hideViewDialog(){
    this.viewBourseDialog  = false;
}

// getters and setters

get bourses(): Array<BourseVo> {
    return this.bourseService.bourses;
       }
set bourses(value: Array<BourseVo>) {
        this.bourseService.bourses = value;
       }

 get selectedBourse():BourseVo {
           return this.bourseService.selectedBourse;
       }
    set selectedBourse(value: BourseVo) {
        this.bourseService.selectedBourse = value;
       }

   get viewBourseDialog():boolean {
           return this.bourseService.viewBourseDialog;

       }
    set viewBourseDialog(value: boolean) {
        this.bourseService.viewBourseDialog= value;
       }

       get selectedProjetActiviteRecherche():ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
      set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }
       get projetActiviteRecherches():Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
       set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }
       get editProjetActiviteRechercheDialog():boolean {
           return this.projetActiviteRechercheService.editProjetActiviteRechercheDialog;
       }
      set editProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.editProjetActiviteRechercheDialog= value;
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
