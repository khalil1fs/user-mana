import {Component, OnInit, Input} from '@angular/core';
import {GestionEquipeService} from 'src/app/controller/service/formulaire/GestionEquipe.service';
import {GestionEquipeVo} from 'src/app/controller/model/formulaire/GestionEquipe.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {GestionEquipeDetailVo} from 'src/app/controller/model/formulaire/GestionEquipeDetail.model';
import {GestionEquipeDetailService} from 'src/app/controller/service/formulaire/GestionEquipeDetail.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-gestion-equipe-create-admin',
  templateUrl: './gestion-equipe-create-admin.component.html',
  styleUrls: ['./gestion-equipe-create-admin.component.css']
})
export class GestionEquipeCreateAdminComponent implements OnInit {

        selectedGestionEquipeDetails: GestionEquipeDetailVo = new GestionEquipeDetailVo();
        gestionEquipeDetailsListe: Array<GestionEquipeDetailVo> = [];


    _submitted = false;

constructor(private gestionEquipeService: GestionEquipeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private etatEtapeCampagneService :EtatEtapeCampagneService
  ,       private gestionEquipeDetailService :GestionEquipeDetailService
  ,       private campagneService :CampagneService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addGestionEquipeDetails() {
        if( this.selectedGestionEquipe.gestionEquipeDetailsVo == null ){
            this.selectedGestionEquipe.gestionEquipeDetailsVo = new Array<GestionEquipeDetailVo>();
        }
        this.selectedGestionEquipe.gestionEquipeDetailsVo.push(this.selectedGestionEquipeDetails);
        this.selectedGestionEquipeDetails = new GestionEquipeDetailVo();
        }

        deleteGestionEquipeDetails(p: GestionEquipeDetailVo) {
        this.gestionEquipeDetailsListe.forEach((element, index) => {
            if (element === p) { this.gestionEquipeDetailsListe.splice(index, 1); }
        });
    }

public save(){
  this.submitted = true;
        if (this.validateForm()) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
}
private validateForm(): boolean{
    return true;
}
public saveWithShowOption(showList: boolean){
     this.gestionEquipeService.save().subscribe(gestionEquipe=>{
       this.gestionEquipes.push({...gestionEquipe});
       this.createGestionEquipeDialog = false;
       this.submitted = false;
       this.selectedGestionEquipe = new GestionEquipeVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
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
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createGestionEquipeDialog  = false;
}

// getters and setters

get gestionEquipes(): Array<GestionEquipeVo> {
    return this.gestionEquipeService.gestionEquipes;
       }
set gestionEquipes(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipes = value;
       }

 get selectedGestionEquipe():GestionEquipeVo {
           return this.gestionEquipeService.selectedGestionEquipe;
       }
    set selectedGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.selectedGestionEquipe = value;
       }

   get createGestionEquipeDialog(): boolean {
           return this.gestionEquipeService.createGestionEquipeDialog;

       }
    set createGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.createGestionEquipeDialog= value;
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
       get chercheurs(): Array<ChercheurVo> {
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
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }
}
