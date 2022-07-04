import {Component, OnInit, Input} from '@angular/core';
import {ConseilEtComiteScientifiqueService} from 'src/app/controller/service/formulaire/ConseilEtComiteScientifique.service';
import {ConseilEtComiteScientifiqueVo} from 'src/app/controller/model/formulaire/ConseilEtComiteScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {DisciplineScientifiqueConseilEtComiteScientifiqueVo} from 'src/app/controller/model/formulaire/DisciplineScientifiqueConseilEtComiteScientifique.model';
import {DisciplineScientifiqueConseilEtComiteScientifiqueService} from 'src/app/controller/service/formulaire/DisciplineScientifiqueConseilEtComiteScientifique.service';
import {CommunauteSavoirConseilEtComiteScientifiqueVo} from 'src/app/controller/model/formulaire/CommunauteSavoirConseilEtComiteScientifique.model';
import {CommunauteSavoirConseilEtComiteScientifiqueService} from 'src/app/controller/service/formulaire/CommunauteSavoirConseilEtComiteScientifique.service';
import {CommunauteSavoirVo} from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import {CommunauteSavoirService} from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-conseil-et-comite-scientifique-create-admin',
  templateUrl: './conseil-comite-sci-create-admin.component.html',
  styleUrls: ['./conseil-comite-sci-create-admin.component.css']
})
export class ConseilEtComiteScientifiqueCreateAdminComponent implements OnInit {
        selectedCommunauteSavoirConseilEtComiteScientifiques: CommunauteSavoirConseilEtComiteScientifiqueVo = new CommunauteSavoirConseilEtComiteScientifiqueVo();
        communauteSavoirConseilEtComiteScientifiquesListe: Array<CommunauteSavoirConseilEtComiteScientifiqueVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedDisciplineScientifiqueConseilEtComiteScientifiques: DisciplineScientifiqueConseilEtComiteScientifiqueVo = new DisciplineScientifiqueConseilEtComiteScientifiqueVo();
        disciplineScientifiqueConseilEtComiteScientifiquesListe: Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

constructor(private conseilEtComiteScientifiqueService: ConseilEtComiteScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private disciplineScientifiqueService :DisciplineScientifiqueService
  ,       private etatEtapeCampagneService :EtatEtapeCampagneService
  ,       private disciplineScientifiqueConseilEtComiteScientifiqueService :DisciplineScientifiqueConseilEtComiteScientifiqueService
  ,       private communauteSavoirConseilEtComiteScientifiqueService :CommunauteSavoirConseilEtComiteScientifiqueService
  ,       private communauteSavoirService :CommunauteSavoirService
  ,       private etablissementService :EtablissementService
  ,       private campagneService :CampagneService
  ,       private paysService :PaysService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

                this.selectedCommunauteSavoirConseilEtComiteScientifiques.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDisciplineScientifiqueConseilEtComiteScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addCommunauteSavoirConseilEtComiteScientifiques() {
        if( this.selectedConseilEtComiteScientifique.communauteSavoirConseilEtComiteScientifiquesVo == null ){
            this.selectedConseilEtComiteScientifique.communauteSavoirConseilEtComiteScientifiquesVo = new Array<CommunauteSavoirConseilEtComiteScientifiqueVo>();
        }
        this.selectedConseilEtComiteScientifique.communauteSavoirConseilEtComiteScientifiquesVo.push(this.selectedCommunauteSavoirConseilEtComiteScientifiques);
        this.selectedCommunauteSavoirConseilEtComiteScientifiques = new CommunauteSavoirConseilEtComiteScientifiqueVo();
        }

        deleteCommunauteSavoirConseilEtComiteScientifiques(p: CommunauteSavoirConseilEtComiteScientifiqueVo) {
        this.communauteSavoirConseilEtComiteScientifiquesListe.forEach((element, index) => {
            if (element === p) { this.communauteSavoirConseilEtComiteScientifiquesListe.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueConseilEtComiteScientifiques() {
        if( this.selectedConseilEtComiteScientifique.disciplineScientifiqueConseilEtComiteScientifiquesVo == null ){
            this.selectedConseilEtComiteScientifique.disciplineScientifiqueConseilEtComiteScientifiquesVo = new Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo>();
        }
        this.selectedConseilEtComiteScientifique.disciplineScientifiqueConseilEtComiteScientifiquesVo.push(this.selectedDisciplineScientifiqueConseilEtComiteScientifiques);
        this.selectedDisciplineScientifiqueConseilEtComiteScientifiques = new DisciplineScientifiqueConseilEtComiteScientifiqueVo();
        }

        deleteDisciplineScientifiqueConseilEtComiteScientifiques(p: DisciplineScientifiqueConseilEtComiteScientifiqueVo) {
        this.disciplineScientifiqueConseilEtComiteScientifiquesListe.forEach((element, index) => {
            if (element === p) { this.disciplineScientifiqueConseilEtComiteScientifiquesListe.splice(index, 1); }
        });
    }

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.conseilEtComiteScientifiqueService.save().subscribe(conseilEtComiteScientifique=>{
       this.conseilEtComiteScientifiques.push({...conseilEtComiteScientifique});
       this.createConseilEtComiteScientifiqueDialog = false;
       this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
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
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
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
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createConseilEtComiteScientifiqueDialog  = false;
}

// getters and setters

get conseilEtComiteScientifiques(): Array<ConseilEtComiteScientifiqueVo> {
    return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques;
       }
set conseilEtComiteScientifiques(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques = value;
       }

 get selectedConseilEtComiteScientifique():ConseilEtComiteScientifiqueVo {
           return this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique;
       }
    set selectedConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique = value;
       }

   get createConseilEtComiteScientifiqueDialog(): boolean {
           return this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog;

       }
    set createConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog= value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
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
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
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
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
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
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes():Array<EtatEtapeCampagneVo> {
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
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques():Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
