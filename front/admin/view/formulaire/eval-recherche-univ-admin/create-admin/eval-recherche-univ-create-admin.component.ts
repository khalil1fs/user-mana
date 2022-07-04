import {Component, OnInit, Input} from '@angular/core';
import {EvaluationRechercheUniversitaireService} from 'src/app/controller/service/formulaire/EvaluationRechercheUniversitaire.service';
import {EvaluationRechercheUniversitaireVo} from 'src/app/controller/model/formulaire/EvaluationRechercheUniversitaire.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {RoleEvaluationRechercheUniversitaireVo} from 'src/app/controller/model/referentiel/RoleEvaluationRechercheUniversitaire.model';
import {RoleEvaluationRechercheUniversitaireService} from 'src/app/controller/service/referentiel/RoleEvaluationRechercheUniversitaire.service';
import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {CommunauteSavoirEvaluationRechercheUniversitaireVo} from 'src/app/controller/model/formulaire/CommunauteSavoirEvaluationRechercheUniversitaire.model';
import {CommunauteSavoirEvaluationRechercheUniversitaireService} from 'src/app/controller/service/formulaire/CommunauteSavoirEvaluationRechercheUniversitaire.service';
import {DisciplineScientifiqueEvaluationRechercheUniversitaireVo} from 'src/app/controller/model/formulaire/DisciplineScientifiqueEvaluationRechercheUniversitaire.model';
import {DisciplineScientifiqueEvaluationRechercheUniversitaireService} from 'src/app/controller/service/formulaire/DisciplineScientifiqueEvaluationRechercheUniversitaire.service';
import {TypeExpertVo} from 'src/app/controller/model/referentiel/TypeExpert.model';
import {TypeExpertService} from 'src/app/controller/service/referentiel/TypeExpert.service';
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
  selector: 'app-evaluation-recherche-universitaire-create-admin',
  templateUrl: './eval-recherche-univ-create-admin.component.html',
  styleUrls: ['./eval-recherche-univ-create-admin.component.css']
})
export class EvaluationRechercheUniversitaireCreateAdminComponent implements OnInit {

        selectedCommunauteSavoirEvaluationRechercheUniversitaires: CommunauteSavoirEvaluationRechercheUniversitaireVo = new CommunauteSavoirEvaluationRechercheUniversitaireVo();
        communauteSavoirEvaluationRechercheUniversitairesListe: Array<CommunauteSavoirEvaluationRechercheUniversitaireVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedDisciplineScientifiqueEvaluationRechercheUniversitaires: DisciplineScientifiqueEvaluationRechercheUniversitaireVo = new DisciplineScientifiqueEvaluationRechercheUniversitaireVo();
        disciplineScientifiqueEvaluationRechercheUniversitairesListe: Array<DisciplineScientifiqueEvaluationRechercheUniversitaireVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

constructor(private evaluationRechercheUniversitaireService: EvaluationRechercheUniversitaireService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private roleEvaluationRechercheUniversitaireService :RoleEvaluationRechercheUniversitaireService
  ,       private disciplineScientifiqueService :DisciplineScientifiqueService
  ,       private etatEtapeCampagneService :EtatEtapeCampagneService
  ,       private communauteSavoirEvaluationRechercheUniversitaireService :CommunauteSavoirEvaluationRechercheUniversitaireService
  ,       private disciplineScientifiqueEvaluationRechercheUniversitaireService :DisciplineScientifiqueEvaluationRechercheUniversitaireService
  ,       private typeExpertService :TypeExpertService
  ,       private communauteSavoirService :CommunauteSavoirService
  ,       private etablissementService :EtablissementService
  ,       private campagneService :CampagneService
  ,       private paysService :PaysService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

                this.selectedCommunauteSavoirEvaluationRechercheUniversitaires.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDisciplineScientifiqueEvaluationRechercheUniversitaires.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedTypeExpert = new TypeExpertVo();
    this.typeExpertService.findAll().subscribe((data) => this.typeExperts = data);
    this.selectedRoleEvaluationRechercheUniversitaire = new RoleEvaluationRechercheUniversitaireVo();
    this.roleEvaluationRechercheUniversitaireService.findAll().subscribe((data) => this.roleEvaluationRechercheUniversitaires = data);
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
        addCommunauteSavoirEvaluationRechercheUniversitaires() {
        if( this.selectedEvaluationRechercheUniversitaire.communauteSavoirEvaluationRechercheUniversitairesVo == null ){
            this.selectedEvaluationRechercheUniversitaire.communauteSavoirEvaluationRechercheUniversitairesVo = new Array<CommunauteSavoirEvaluationRechercheUniversitaireVo>();
        }
        this.selectedEvaluationRechercheUniversitaire.communauteSavoirEvaluationRechercheUniversitairesVo.push(this.selectedCommunauteSavoirEvaluationRechercheUniversitaires);
        this.selectedCommunauteSavoirEvaluationRechercheUniversitaires = new CommunauteSavoirEvaluationRechercheUniversitaireVo();
        }

        deleteCommunauteSavoirEvaluationRechercheUniversitaires(p: CommunauteSavoirEvaluationRechercheUniversitaireVo) {
        this.communauteSavoirEvaluationRechercheUniversitairesListe.forEach((element, index) => {
            if (element === p) { this.communauteSavoirEvaluationRechercheUniversitairesListe.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueEvaluationRechercheUniversitaires() {
        if( this.selectedEvaluationRechercheUniversitaire.disciplineScientifiqueEvaluationRechercheUniversitairesVo == null ){
            this.selectedEvaluationRechercheUniversitaire.disciplineScientifiqueEvaluationRechercheUniversitairesVo = new Array<DisciplineScientifiqueEvaluationRechercheUniversitaireVo>();
        }
        this.selectedEvaluationRechercheUniversitaire.disciplineScientifiqueEvaluationRechercheUniversitairesVo.push(this.selectedDisciplineScientifiqueEvaluationRechercheUniversitaires);
        this.selectedDisciplineScientifiqueEvaluationRechercheUniversitaires = new DisciplineScientifiqueEvaluationRechercheUniversitaireVo();
        }

        deleteDisciplineScientifiqueEvaluationRechercheUniversitaires(p: DisciplineScientifiqueEvaluationRechercheUniversitaireVo) {
        this.disciplineScientifiqueEvaluationRechercheUniversitairesListe.forEach((element, index) => {
            if (element === p) { this.disciplineScientifiqueEvaluationRechercheUniversitairesListe.splice(index, 1); }
        });
    }

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.evaluationRechercheUniversitaireService.save().subscribe(evaluationRechercheUniversitaire=>{
       this.evaluationRechercheUniversitaires.push({...evaluationRechercheUniversitaire});
       this.createEvaluationRechercheUniversitaireDialog = false;
       this.selectedEvaluationRechercheUniversitaire = new EvaluationRechercheUniversitaireVo();


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
              public async openCreatetypeExpert(typeExpert: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeExpert', 'add');
                       if(isPermistted){
         this.selectedTypeExpert = new TypeExpertVo();
        this.createTypeExpertDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateroleEvaluationRechercheUniversitaire(roleEvaluationRechercheUniversitaire: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleEvaluationRechercheUniversitaire', 'add');
                       if(isPermistted){
         this.selectedRoleEvaluationRechercheUniversitaire = new RoleEvaluationRechercheUniversitaireVo();
        this.createRoleEvaluationRechercheUniversitaireDialog = true;
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
    this.createEvaluationRechercheUniversitaireDialog  = false;
}

// getters and setters

get evaluationRechercheUniversitaires(): Array<EvaluationRechercheUniversitaireVo> {
    return this.evaluationRechercheUniversitaireService.evaluationRechercheUniversitaires;
       }
set evaluationRechercheUniversitaires(value: Array<EvaluationRechercheUniversitaireVo>) {
        this.evaluationRechercheUniversitaireService.evaluationRechercheUniversitaires = value;
       }

 get selectedEvaluationRechercheUniversitaire():EvaluationRechercheUniversitaireVo {
           return this.evaluationRechercheUniversitaireService.selectedEvaluationRechercheUniversitaire;
       }
    set selectedEvaluationRechercheUniversitaire(value: EvaluationRechercheUniversitaireVo) {
        this.evaluationRechercheUniversitaireService.selectedEvaluationRechercheUniversitaire = value;
       }

   get createEvaluationRechercheUniversitaireDialog(): boolean {
           return this.evaluationRechercheUniversitaireService.createEvaluationRechercheUniversitaireDialog;

       }
    set createEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.evaluationRechercheUniversitaireService.createEvaluationRechercheUniversitaireDialog= value;
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
       get selectedTypeExpert(): TypeExpertVo {
           return this.typeExpertService.selectedTypeExpert;
       }
      set selectedTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.selectedTypeExpert = value;
       }
       get typeExperts():Array<TypeExpertVo> {
           return this.typeExpertService.typeExperts;
       }
       set typeExperts(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExperts = value;
       }
       get createTypeExpertDialog(): boolean {
           return this.typeExpertService.createTypeExpertDialog;
       }
      set createTypeExpertDialog(value: boolean) {
        this.typeExpertService.createTypeExpertDialog= value;
       }
       get selectedRoleEvaluationRechercheUniversitaire(): RoleEvaluationRechercheUniversitaireVo {
           return this.roleEvaluationRechercheUniversitaireService.selectedRoleEvaluationRechercheUniversitaire;
       }
      set selectedRoleEvaluationRechercheUniversitaire(value: RoleEvaluationRechercheUniversitaireVo) {
        this.roleEvaluationRechercheUniversitaireService.selectedRoleEvaluationRechercheUniversitaire = value;
       }
       get roleEvaluationRechercheUniversitaires():Array<RoleEvaluationRechercheUniversitaireVo> {
           return this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaires;
       }
       set roleEvaluationRechercheUniversitaires(value: Array<RoleEvaluationRechercheUniversitaireVo>) {
        this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaires = value;
       }
       get createRoleEvaluationRechercheUniversitaireDialog(): boolean {
           return this.roleEvaluationRechercheUniversitaireService.createRoleEvaluationRechercheUniversitaireDialog;
       }
      set createRoleEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.roleEvaluationRechercheUniversitaireService.createRoleEvaluationRechercheUniversitaireDialog= value;
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
