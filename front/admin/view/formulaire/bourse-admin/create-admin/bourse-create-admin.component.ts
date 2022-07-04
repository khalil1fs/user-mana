import {Component, OnInit, Input} from '@angular/core';
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
  selector: 'app-bourse-create-admin',
  templateUrl: './bourse-create-admin.component.html',
  styleUrls: ['./bourse-create-admin.component.css']
})
export class BourseCreateAdminComponent implements OnInit {

constructor(private bourseService: BourseService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private projetActiviteRechercheService :ProjetActiviteRechercheService
  ,       private campagneService :CampagneService
  ,       private chercheurService :ChercheurService
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

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.bourseService.save().subscribe(bourse=>{
       this.bourses.push({...bourse});
       this.createBourseDialog = false;
       this.selectedBourse = new BourseVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreateprojetActiviteRecherche(projetActiviteRecherche: string) {
                      const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'add');
                       if(isPermistted){
         this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
        this.createProjetActiviteRechercheDialog = true;
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
        this.createCampagneDialog = true;
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
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createBourseDialog  = false;
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

   get createBourseDialog(): boolean {
           return this.bourseService.createBourseDialog;

       }
    set createBourseDialog(value: boolean) {
        this.bourseService.createBourseDialog= value;
       }

       get selectedProjetActiviteRecherche(): ProjetActiviteRechercheVo {
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
       get createProjetActiviteRechercheDialog(): boolean {
           return this.projetActiviteRechercheService.createProjetActiviteRechercheDialog;
       }
      set createProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.createProjetActiviteRechercheDialog= value;
       }
       get selectedCampagne(): CampagneVo {
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
       get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;
       }
      set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
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
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
