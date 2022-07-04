import {Component, OnInit} from '@angular/core';
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
  selector: 'app-evaluation-recherche-universitaire-view-admin',
  templateUrl: './eval-recherche-univ-view-admin.component.html',
  styleUrls: ['./eval-recherche-univ-view-admin.component.css']
})
export class EvaluationRechercheUniversitaireViewAdminComponent implements OnInit {

        selectedCommunauteSavoirEvaluationRechercheUniversitaires: CommunauteSavoirEvaluationRechercheUniversitaireVo = new CommunauteSavoirEvaluationRechercheUniversitaireVo();
        communauteSavoirEvaluationRechercheUniversitairesListe: Array<CommunauteSavoirEvaluationRechercheUniversitaireVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedDisciplineScientifiqueEvaluationRechercheUniversitaires: DisciplineScientifiqueEvaluationRechercheUniversitaireVo = new DisciplineScientifiqueEvaluationRechercheUniversitaireVo();
        disciplineScientifiqueEvaluationRechercheUniversitairesListe: Array<DisciplineScientifiqueEvaluationRechercheUniversitaireVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];


constructor(private evaluationRechercheUniversitaireService: EvaluationRechercheUniversitaireService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private roleEvaluationRechercheUniversitaireService :RoleEvaluationRechercheUniversitaireService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private communauteSavoirEvaluationRechercheUniversitaireService :CommunauteSavoirEvaluationRechercheUniversitaireService
    ,private disciplineScientifiqueEvaluationRechercheUniversitaireService :DisciplineScientifiqueEvaluationRechercheUniversitaireService
    ,private typeExpertService :TypeExpertService
    ,private communauteSavoirService :CommunauteSavoirService
    ,private etablissementService :EtablissementService
    ,private campagneService :CampagneService
    ,private paysService :PaysService
    ,private chercheurService :ChercheurService
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

hideViewDialog(){
    this.viewEvaluationRechercheUniversitaireDialog  = false;
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

   get viewEvaluationRechercheUniversitaireDialog():boolean {
           return this.evaluationRechercheUniversitaireService.viewEvaluationRechercheUniversitaireDialog;

       }
    set viewEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.evaluationRechercheUniversitaireService.viewEvaluationRechercheUniversitaireDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
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
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedTypeExpert():TypeExpertVo {
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
       get editTypeExpertDialog():boolean {
           return this.typeExpertService.editTypeExpertDialog;
       }
      set editTypeExpertDialog(value: boolean) {
        this.typeExpertService.editTypeExpertDialog= value;
       }
       get selectedRoleEvaluationRechercheUniversitaire():RoleEvaluationRechercheUniversitaireVo {
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
       get editRoleEvaluationRechercheUniversitaireDialog():boolean {
           return this.roleEvaluationRechercheUniversitaireService.editRoleEvaluationRechercheUniversitaireDialog;
       }
      set editRoleEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.roleEvaluationRechercheUniversitaireService.editRoleEvaluationRechercheUniversitaireDialog= value;
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
       get selectedPays():PaysVo {
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
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
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
       get selectedEtatEtapeCampagne():EtatEtapeCampagneVo {
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
       get editEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
       }
      set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog= value;
       }
       get selectedDisciplineScientifique():DisciplineScientifiqueVo {
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
       get editDisciplineScientifiqueDialog():boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;
       }
      set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
