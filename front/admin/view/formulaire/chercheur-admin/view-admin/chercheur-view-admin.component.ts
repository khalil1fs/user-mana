import {Component, OnInit} from '@angular/core';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {CommunauteSavoirChercheurVo} from 'src/app/controller/model/formulaire/CommunauteSavoirChercheur.model';
import {CommunauteSavoirChercheurService} from 'src/app/controller/service/formulaire/CommunauteSavoirChercheur.service';
import {TypeEntiteAdministrativeVo} from 'src/app/controller/model/referentiel/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from 'src/app/controller/service/referentiel/TypeEntiteAdministrative.service';
import {DepartementScientifiqueVo} from 'src/app/controller/model/formulaire/DepartementScientifique.model';
import {DepartementScientifiqueService} from 'src/app/controller/service/formulaire/DepartementScientifique.service';
import {ZoneActiviteInteractionRechercheVo} from 'src/app/controller/model/formulaire/ZoneActiviteInteractionRecherche.model';
import {ZoneActiviteInteractionRechercheService} from 'src/app/controller/service/formulaire/ZoneActiviteInteractionRecherche.service';
import {GradeVo} from 'src/app/controller/model/referentiel/Grade.model';
import {GradeService} from 'src/app/controller/service/referentiel/Grade.service';
import {CorpsVo} from 'src/app/controller/model/referentiel/Corps.model';
import {CorpsService} from 'src/app/controller/service/referentiel/Corps.service';
import {TypeInstrumentsEtDispositifsIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentsEtDispositifsIrd.model';
import {TypeInstrumentsEtDispositifsIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentsEtDispositifsIrd.service';
import {CommissionScientifiqueVo} from 'src/app/controller/model/formulaire/CommissionScientifique.model';
import {CommissionScientifiqueService} from 'src/app/controller/service/formulaire/CommissionScientifique.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {IdentifiantAuteurExpertVo} from 'src/app/controller/model/formulaire/IdentifiantAuteurExpert.model';
import {IdentifiantAuteurExpertService} from 'src/app/controller/service/formulaire/IdentifiantAuteurExpert.service';
import {DomaineScientifiqueChercheurVo} from 'src/app/controller/model/formulaire/DomaineScientifiqueChercheur.model';
import {DomaineScientifiqueChercheurService} from 'src/app/controller/service/formulaire/DomaineScientifiqueChercheur.service';
import {EntiteAdministrativeVo} from 'src/app/controller/model/referentiel/EntiteAdministrative.model';
import {EntiteAdministrativeService} from 'src/app/controller/service/referentiel/EntiteAdministrative.service';
import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {DomaineScientifiqueVo} from 'src/app/controller/model/formulaire/DomaineScientifique.model';
import {DomaineScientifiqueService} from 'src/app/controller/service/formulaire/DomaineScientifique.service';
import {CommunauteSavoirVo} from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import {CommunauteSavoirService} from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {IdentifiantRechercheVo} from 'src/app/controller/model/referentiel/IdentifiantRecherche.model';
import {IdentifiantRechercheService} from 'src/app/controller/service/referentiel/IdentifiantRecherche.service';
import {InstrumentsEtDispositifsIrdChercheurVo} from 'src/app/controller/model/formulaire/InstrumentsEtDispositifsIrdChercheur.model';
import {InstrumentsEtDispositifsIrdChercheurService} from 'src/app/controller/service/formulaire/InstrumentsEtDispositifsIrdChercheur.service';

@Component({
  selector: 'app-chercheur-view-admin',
  templateUrl: './chercheur-view-admin.component.html',
  styleUrls: ['./chercheur-view-admin.component.css']
})
export class ChercheurViewAdminComponent implements OnInit {

        selectedDomaineScientifiqueChercheurs: DomaineScientifiqueChercheurVo = new DomaineScientifiqueChercheurVo();
        domaineScientifiqueChercheursListe: Array<DomaineScientifiqueChercheurVo> = [];

        myDomaineScientifiques: Array<DomaineScientifiqueVo> = [];

        selectedZoneActiviteInteractionRecherches: ZoneActiviteInteractionRechercheVo = new ZoneActiviteInteractionRechercheVo();
        zoneActiviteInteractionRecherchesListe: Array<ZoneActiviteInteractionRechercheVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedCommunauteSavoirChercheurs: CommunauteSavoirChercheurVo = new CommunauteSavoirChercheurVo();
        communauteSavoirChercheursListe: Array<CommunauteSavoirChercheurVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedInstrumentsEtDispositifsIrdChercheurs: InstrumentsEtDispositifsIrdChercheurVo = new InstrumentsEtDispositifsIrdChercheurVo();
        instrumentsEtDispositifsIrdChercheursListe: Array<InstrumentsEtDispositifsIrdChercheurVo> = [];

        myTypeInstrumentsEtDispositifsIrds: Array<TypeInstrumentsEtDispositifsIrdVo> = [];

        selectedIdentifiantAuteurExperts: IdentifiantAuteurExpertVo = new IdentifiantAuteurExpertVo();
        identifiantAuteurExpertsListe: Array<IdentifiantAuteurExpertVo> = [];

        myIdentifiantRecherches: Array<IdentifiantRechercheVo> = [];


constructor(private chercheurService: ChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private communauteSavoirChercheurService :CommunauteSavoirChercheurService
    ,private typeEntiteAdministrativeService :TypeEntiteAdministrativeService
    ,private departementScientifiqueService :DepartementScientifiqueService
    ,private zoneActiviteInteractionRechercheService :ZoneActiviteInteractionRechercheService
    ,private gradeService :GradeService
    ,private corpsService :CorpsService
    ,private typeInstrumentsEtDispositifsIrdService :TypeInstrumentsEtDispositifsIrdService
    ,private commissionScientifiqueService :CommissionScientifiqueService
    ,private paysService :PaysService
    ,private identifiantAuteurExpertService :IdentifiantAuteurExpertService
    ,private domaineScientifiqueChercheurService :DomaineScientifiqueChercheurService
    ,private entiteAdministrativeService :EntiteAdministrativeService
    ,private sexeService :SexeService
    ,private domaineScientifiqueService :DomaineScientifiqueService
    ,private communauteSavoirService :CommunauteSavoirService
    ,private villeService :VilleService
    ,private identifiantRechercheService :IdentifiantRechercheService
    ,private instrumentsEtDispositifsIrdChercheurService :InstrumentsEtDispositifsIrdChercheurService
) {
}

// methods
ngOnInit(): void {
                this.selectedDomaineScientifiqueChercheurs.domaineScientifiqueVo = new DomaineScientifiqueVo();
                this.domaineScientifiqueService.findAll().subscribe((data) => this.domaineScientifiques = data);
                this.selectedZoneActiviteInteractionRecherches.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedCommunauteSavoirChercheurs.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedInstrumentsEtDispositifsIrdChercheurs.typeInstrumentsEtDispositifsIrdVo = new TypeInstrumentsEtDispositifsIrdVo();
                this.typeInstrumentsEtDispositifsIrdService.findAll().subscribe((data) => this.typeInstrumentsEtDispositifsIrds = data);
                this.selectedIdentifiantAuteurExperts.identifiantRechercheVo = new IdentifiantRechercheVo();
                this.identifiantRechercheService.findAll().subscribe((data) => this.identifiantRecherches = data);
    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
    this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
    this.selectedEntiteAdministrative = new EntiteAdministrativeVo();
    this.entiteAdministrativeService.findAll().subscribe((data) => this.entiteAdministratives = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedDepartementScientifique = new DepartementScientifiqueVo();
    this.departementScientifiqueService.findAll().subscribe((data) => this.departementScientifiques = data);
    this.selectedCommissionScientifique = new CommissionScientifiqueVo();
    this.commissionScientifiqueService.findAll().subscribe((data) => this.commissionScientifiques = data);
    this.selectedGrade = new GradeVo();
    this.gradeService.findAll().subscribe((data) => this.grades = data);
    this.selectedCorps = new CorpsVo();
    this.corpsService.findAll().subscribe((data) => this.corpss = data);
    this.selectedSexe = new SexeVo();
    this.sexeService.findAll().subscribe((data) => this.sexes = data);
}

hideViewDialog(){
    this.viewChercheurDialog  = false;
}

// getters and setters

get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
       }
set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

 get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }

   get viewChercheurDialog():boolean {
           return this.chercheurService.viewChercheurDialog;

       }
    set viewChercheurDialog(value: boolean) {
        this.chercheurService.viewChercheurDialog= value;
       }

       get selectedEntiteAdministrative():EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
      set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }
       get entiteAdministratives():Array<EntiteAdministrativeVo> {
           return this.entiteAdministrativeService.entiteAdministratives;
       }
       set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }
       get editEntiteAdministrativeDialog():boolean {
           return this.entiteAdministrativeService.editEntiteAdministrativeDialog;
       }
      set editEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.editEntiteAdministrativeDialog= value;
       }
       get selectedTypeInstrumentsEtDispositifsIrd():TypeInstrumentsEtDispositifsIrdVo {
           return this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd;
       }
      set selectedTypeInstrumentsEtDispositifsIrd(value: TypeInstrumentsEtDispositifsIrdVo) {
        this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd = value;
       }
       get typeInstrumentsEtDispositifsIrds():Array<TypeInstrumentsEtDispositifsIrdVo> {
           return this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds;
       }
       set typeInstrumentsEtDispositifsIrds(value: Array<TypeInstrumentsEtDispositifsIrdVo>) {
        this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds = value;
       }
       get editTypeInstrumentsEtDispositifsIrdDialog():boolean {
           return this.typeInstrumentsEtDispositifsIrdService.editTypeInstrumentsEtDispositifsIrdDialog;
       }
      set editTypeInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.typeInstrumentsEtDispositifsIrdService.editTypeInstrumentsEtDispositifsIrdDialog= value;
       }
       get selectedVille():VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes():Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get editVilleDialog():boolean {
           return this.villeService.editVilleDialog;
       }
      set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog= value;
       }
       get selectedTypeEntiteAdministrative():TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives():Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get editTypeEntiteAdministrativeDialog():boolean {
           return this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog;
       }
      set editTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog= value;
       }
       get selectedCorps():CorpsVo {
           return this.corpsService.selectedCorps;
       }
      set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }
       get corpss():Array<CorpsVo> {
           return this.corpsService.corpss;
       }
       set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }
       get editCorpsDialog():boolean {
           return this.corpsService.editCorpsDialog;
       }
      set editCorpsDialog(value: boolean) {
        this.corpsService.editCorpsDialog= value;
       }
       get selectedSexe():SexeVo {
           return this.sexeService.selectedSexe;
       }
      set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
       get sexes():Array<SexeVo> {
           return this.sexeService.sexes;
       }
       set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }
       get editSexeDialog():boolean {
           return this.sexeService.editSexeDialog;
       }
      set editSexeDialog(value: boolean) {
        this.sexeService.editSexeDialog= value;
       }
       get selectedCommissionScientifique():CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
      set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }
       get commissionScientifiques():Array<CommissionScientifiqueVo> {
           return this.commissionScientifiqueService.commissionScientifiques;
       }
       set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }
       get editCommissionScientifiqueDialog():boolean {
           return this.commissionScientifiqueService.editCommissionScientifiqueDialog;
       }
      set editCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.editCommissionScientifiqueDialog= value;
       }
       get selectedIdentifiantRecherche():IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
      set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }
       get identifiantRecherches():Array<IdentifiantRechercheVo> {
           return this.identifiantRechercheService.identifiantRecherches;
       }
       set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }
       get editIdentifiantRechercheDialog():boolean {
           return this.identifiantRechercheService.editIdentifiantRechercheDialog;
       }
      set editIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.editIdentifiantRechercheDialog= value;
       }
       get selectedGrade():GradeVo {
           return this.gradeService.selectedGrade;
       }
      set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }
       get grades():Array<GradeVo> {
           return this.gradeService.grades;
       }
       set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }
       get editGradeDialog():boolean {
           return this.gradeService.editGradeDialog;
       }
      set editGradeDialog(value: boolean) {
        this.gradeService.editGradeDialog= value;
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
       get selectedDepartementScientifique():DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
      set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }
       get departementScientifiques():Array<DepartementScientifiqueVo> {
           return this.departementScientifiqueService.departementScientifiques;
       }
       set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }
       get editDepartementScientifiqueDialog():boolean {
           return this.departementScientifiqueService.editDepartementScientifiqueDialog;
       }
      set editDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.editDepartementScientifiqueDialog= value;
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
       get selectedDomaineScientifique():DomaineScientifiqueVo {
           return this.domaineScientifiqueService.selectedDomaineScientifique;
       }
      set selectedDomaineScientifique(value: DomaineScientifiqueVo) {
        this.domaineScientifiqueService.selectedDomaineScientifique = value;
       }
       get domaineScientifiques():Array<DomaineScientifiqueVo> {
           return this.domaineScientifiqueService.domaineScientifiques;
       }
       set domaineScientifiques(value: Array<DomaineScientifiqueVo>) {
        this.domaineScientifiqueService.domaineScientifiques = value;
       }
       get editDomaineScientifiqueDialog():boolean {
           return this.domaineScientifiqueService.editDomaineScientifiqueDialog;
       }
      set editDomaineScientifiqueDialog(value: boolean) {
        this.domaineScientifiqueService.editDomaineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
