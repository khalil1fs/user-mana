import {Component, OnInit} from '@angular/core';
import {BourseService} from 'src/app/controller/service/formulaire/Bourse.service';
import {BourseVo} from 'src/app/controller/model/formulaire/Bourse.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {ProjetActiviteRechercheVo} from 'src/app/controller/model/formulaire/ProjetActiviteRecherche.model';
import {ProjetActiviteRechercheService} from 'src/app/controller/service/formulaire/ProjetActiviteRecherche.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-bourse-edit-admin',
  templateUrl: './bourse-edit-admin.component.html',
  styleUrls: ['./bourse-edit-admin.component.css']
})
export class BourseEditAdminComponent implements OnInit {


constructor(private bourseService: BourseService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private projetActiviteRechercheService: ProjetActiviteRechercheService
 ,       private campagneService: CampagneService
 ,       private chercheurService: ChercheurService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedBourse.dateObtention = DateUtils.toDate(this.selectedBourse.dateObtention);
    this.bourseService.edit().subscribe(bourse=>{
    const myIndex = this.bourses.findIndex(e => e.id === this.selectedBourse.id);
    this.bourses[myIndex] = this.selectedBourse;
    this.editBourseDialog = false;
    this.selectedBourse = new BourseVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateprojetActiviteRecherche(projetActiviteRecherche: string) {
                      const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'add');
                       if(isPermistted){
         this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
        this.editProjetActiviteRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.editCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.editChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editBourseDialog  = false;
}

// getters and setters

get bourses(): Array<BourseVo> {
    return this.bourseService.bourses;
       }
set bourses(value: Array<BourseVo>) {
        this.bourseService.bourses = value;
       }

 get selectedBourse(): BourseVo {
           return this.bourseService.selectedBourse;
       }
    set selectedBourse(value: BourseVo) {
        this.bourseService.selectedBourse = value;
       }

   get editBourseDialog(): boolean {
           return this.bourseService.editBourseDialog;

       }
    set editBourseDialog(value: boolean) {
        this.bourseService.editBourseDialog = value;
       }

       get selectedProjetActiviteRecherche(): ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
      set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }
       get projetActiviteRecherches(): Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
       set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }
       get editProjetActiviteRechercheDialog(): boolean {
           return this.projetActiviteRechercheService.editProjetActiviteRechercheDialog;
       }
      set editProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.editProjetActiviteRechercheDialog= value;
       }
       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog(): boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog(): boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
