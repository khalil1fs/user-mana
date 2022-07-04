import {Component, OnInit, Input} from '@angular/core';
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
  selector: 'app-campagne-chercheur-create-admin',
  templateUrl: './campagne-chercheur-create-admin.component.html',
  styleUrls: ['./campagne-chercheur-create-admin.component.css']
})
export class CampagneChercheurCreateAdminComponent implements OnInit {

constructor(private campagneChercheurService: CampagneChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private etatCampagneChercheurService :EtatCampagneChercheurService
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
    this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
    this.etatCampagneChercheurService.findAll().subscribe((data) => this.etatCampagneChercheurs = data);
}

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.campagneChercheurService.save().subscribe(campagneChercheur=>{
       this.campagneChercheurs.push({...campagneChercheur});
       this.createCampagneChercheurDialog = false;
       this.selectedCampagneChercheur = new CampagneChercheurVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreateetatCampagneChercheur(etatCampagneChercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'add');
                       if(isPermistted){
         this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
        this.createEtatCampagneChercheurDialog = true;
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
    this.createCampagneChercheurDialog  = false;
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

   get createCampagneChercheurDialog(): boolean {
           return this.campagneChercheurService.createCampagneChercheurDialog;

       }
    set createCampagneChercheurDialog(value: boolean) {
        this.campagneChercheurService.createCampagneChercheurDialog= value;
       }

       get selectedEtatCampagneChercheur(): EtatCampagneChercheurVo {
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
       get createEtatCampagneChercheurDialog(): boolean {
           return this.etatCampagneChercheurService.createEtatCampagneChercheurDialog;
       }
      set createEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.createEtatCampagneChercheurDialog= value;
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
