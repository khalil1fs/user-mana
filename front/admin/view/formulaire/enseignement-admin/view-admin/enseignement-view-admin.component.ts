import {Component, OnInit} from '@angular/core';
import {EnseignementService} from 'src/app/controller/service/formulaire/Enseignement.service';
import {EnseignementVo} from 'src/app/controller/model/formulaire/Enseignement.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {EnseignementEtFormationVo} from 'src/app/controller/model/formulaire/EnseignementEtFormation.model';
import {EnseignementEtFormationService} from 'src/app/controller/service/formulaire/EnseignementEtFormation.service';
import {EnseignementDisciplineScientifiqueVo} from 'src/app/controller/model/formulaire/EnseignementDisciplineScientifique.model';
import {EnseignementDisciplineScientifiqueService} from 'src/app/controller/service/formulaire/EnseignementDisciplineScientifique.service';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {NiveauEtudeVo} from 'src/app/controller/model/referentiel/NiveauEtude.model';
import {NiveauEtudeService} from 'src/app/controller/service/referentiel/NiveauEtude.service';
import {EnjeuxIrdVo} from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import {EnjeuxIrdService} from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import {EtablissementEnseignementVo} from 'src/app/controller/model/formulaire/EtablissementEnseignement.model';
import {EtablissementEnseignementService} from 'src/app/controller/service/formulaire/EtablissementEnseignement.service';
import {TypeEtudeEnseignementVo} from 'src/app/controller/model/formulaire/TypeEtudeEnseignement.model';
import {TypeEtudeEnseignementService} from 'src/app/controller/service/formulaire/TypeEtudeEnseignement.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {TypeEtudeVo} from 'src/app/controller/model/referentiel/TypeEtude.model';
import {TypeEtudeService} from 'src/app/controller/service/referentiel/TypeEtude.service';
import {EnseignementZoneGeographiqueVo} from 'src/app/controller/model/formulaire/EnseignementZoneGeographique.model';
import {EnseignementZoneGeographiqueService} from 'src/app/controller/service/formulaire/EnseignementZoneGeographique.service';
import {NatureEnseignementVo} from 'src/app/controller/model/referentiel/NatureEnseignement.model';
import {NatureEnseignementService} from 'src/app/controller/service/referentiel/NatureEnseignement.service';
import {ZoneGeographiqueVo} from 'src/app/controller/model/referentiel/ZoneGeographique.model';
import {ZoneGeographiqueService} from 'src/app/controller/service/referentiel/ZoneGeographique.service';
import {EnseignementNatureVo} from 'src/app/controller/model/formulaire/EnseignementNature.model';
import {EnseignementNatureService} from 'src/app/controller/service/formulaire/EnseignementNature.service';
import {EnseignementEnjeuxIrdVo} from 'src/app/controller/model/formulaire/EnseignementEnjeuxIrd.model';
import {EnseignementEnjeuxIrdService} from 'src/app/controller/service/formulaire/EnseignementEnjeuxIrd.service';
import {NiveauEtudeEnseignementVo} from 'src/app/controller/model/formulaire/NiveauEtudeEnseignement.model';
import {NiveauEtudeEnseignementService} from 'src/app/controller/service/formulaire/NiveauEtudeEnseignement.service';
import {EnseignementPaysVo} from 'src/app/controller/model/formulaire/EnseignementPays.model';
import {EnseignementPaysService} from 'src/app/controller/service/formulaire/EnseignementPays.service';
import {ModaliteEtudeVo} from 'src/app/controller/model/referentiel/ModaliteEtude.model';
import {ModaliteEtudeService} from 'src/app/controller/service/referentiel/ModaliteEtude.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-enseignement-view-admin',
  templateUrl: './enseignement-view-admin.component.html',
  styleUrls: ['./enseignement-view-admin.component.css']
})
export class EnseignementViewAdminComponent implements OnInit {

        selectedTypeEtudeEnseignements: TypeEtudeEnseignementVo = new TypeEtudeEnseignementVo();
        typeEtudeEnseignementsListe: Array<TypeEtudeEnseignementVo> = [];

        myTypeEtudes: Array<TypeEtudeVo> = [];

        selectedEnseignementNatures: EnseignementNatureVo = new EnseignementNatureVo();
        enseignementNaturesListe: Array<EnseignementNatureVo> = [];

        myNatureEnseignements: Array<NatureEnseignementVo> = [];

        selectedNiveauEtudeEnseignements: NiveauEtudeEnseignementVo = new NiveauEtudeEnseignementVo();
        niveauEtudeEnseignementsListe: Array<NiveauEtudeEnseignementVo> = [];

        myNiveauEtudes: Array<NiveauEtudeVo> = [];

        selectedEtablissementEnseignements: EtablissementEnseignementVo = new EtablissementEnseignementVo();
        etablissementEnseignementsListe: Array<EtablissementEnseignementVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

        selectedEnseignementPayss: EnseignementPaysVo = new EnseignementPaysVo();
        enseignementPayssListe: Array<EnseignementPaysVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedEnseignementZoneGeographiques: EnseignementZoneGeographiqueVo = new EnseignementZoneGeographiqueVo();
        enseignementZoneGeographiquesListe: Array<EnseignementZoneGeographiqueVo> = [];

        myZoneGeographiques: Array<ZoneGeographiqueVo> = [];

        selectedEnseignementEnjeuxIrds: EnseignementEnjeuxIrdVo = new EnseignementEnjeuxIrdVo();
        enseignementEnjeuxIrdsListe: Array<EnseignementEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedEnseignementDisciplineScientifiques: EnseignementDisciplineScientifiqueVo = new EnseignementDisciplineScientifiqueVo();
        enseignementDisciplineScientifiquesListe: Array<EnseignementDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];


constructor(private datePipe: DatePipe, private enseignementService: EnseignementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private enseignementEtFormationService :EnseignementEtFormationService
    ,private enseignementDisciplineScientifiqueService :EnseignementDisciplineScientifiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private niveauEtudeService :NiveauEtudeService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private etablissementEnseignementService :EtablissementEnseignementService
    ,private typeEtudeEnseignementService :TypeEtudeEnseignementService
    ,private etablissementService :EtablissementService
    ,private typeEtudeService :TypeEtudeService
    ,private enseignementZoneGeographiqueService :EnseignementZoneGeographiqueService
    ,private natureEnseignementService :NatureEnseignementService
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private enseignementNatureService :EnseignementNatureService
    ,private enseignementEnjeuxIrdService :EnseignementEnjeuxIrdService
    ,private niveauEtudeEnseignementService :NiveauEtudeEnseignementService
    ,private enseignementPaysService :EnseignementPaysService
    ,private modaliteEtudeService :ModaliteEtudeService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedTypeEtudeEnseignements.typeEtudeVo = new TypeEtudeVo();
                this.typeEtudeService.findAll().subscribe((data) => this.typeEtudes = data);
                this.selectedEnseignementNatures.natureEnseignementVo = new NatureEnseignementVo();
                this.natureEnseignementService.findAll().subscribe((data) => this.natureEnseignements = data);
                this.selectedNiveauEtudeEnseignements.niveauEtudeVo = new NiveauEtudeVo();
                this.niveauEtudeService.findAll().subscribe((data) => this.niveauEtudes = data);
                this.selectedEtablissementEnseignements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedEnseignementPayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedEnseignementZoneGeographiques.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedEnseignementEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedEnseignementDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedModaliteEtude = new ModaliteEtudeVo();
    this.modaliteEtudeService.findAll().subscribe((data) => this.modaliteEtudes = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
    this.enseignementEtFormationService.findAll().subscribe((data) => this.enseignementEtFormations = data);
}

hideViewDialog(){
    this.viewEnseignementDialog  = false;
}

// getters and setters

get enseignements(): Array<EnseignementVo> {
    return this.enseignementService.enseignements;
       }
set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }

 get selectedEnseignement():EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
    set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }

   get viewEnseignementDialog():boolean {
           return this.enseignementService.viewEnseignementDialog;

       }
    set viewEnseignementDialog(value: boolean) {
        this.enseignementService.viewEnseignementDialog= value;
       }

       get selectedModaliteEtude():ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
      set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }
       get modaliteEtudes():Array<ModaliteEtudeVo> {
           return this.modaliteEtudeService.modaliteEtudes;
       }
       set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }
       get editModaliteEtudeDialog():boolean {
           return this.modaliteEtudeService.editModaliteEtudeDialog;
       }
      set editModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.editModaliteEtudeDialog= value;
       }
       get selectedEnseignementEtFormation():EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
      set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
       get enseignementEtFormations():Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
       set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }
       get editEnseignementEtFormationDialog():boolean {
           return this.enseignementEtFormationService.editEnseignementEtFormationDialog;
       }
      set editEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.editEnseignementEtFormationDialog= value;
       }
       get selectedNatureEnseignement():NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
      set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }
       get natureEnseignements():Array<NatureEnseignementVo> {
           return this.natureEnseignementService.natureEnseignements;
       }
       set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }
       get editNatureEnseignementDialog():boolean {
           return this.natureEnseignementService.editNatureEnseignementDialog;
       }
      set editNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.editNatureEnseignementDialog= value;
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
       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedNiveauEtude():NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
      set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }
       get niveauEtudes():Array<NiveauEtudeVo> {
           return this.niveauEtudeService.niveauEtudes;
       }
       set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }
       get editNiveauEtudeDialog():boolean {
           return this.niveauEtudeService.editNiveauEtudeDialog;
       }
      set editNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.editNiveauEtudeDialog= value;
       }
       get selectedTypeEtude():TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
      set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }
       get typeEtudes():Array<TypeEtudeVo> {
           return this.typeEtudeService.typeEtudes;
       }
       set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }
       get editTypeEtudeDialog():boolean {
           return this.typeEtudeService.editTypeEtudeDialog;
       }
      set editTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.editTypeEtudeDialog= value;
       }
       get selectedZoneGeographique():ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques():Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get editZoneGeographiqueDialog():boolean {
           return this.zoneGeographiqueService.editZoneGeographiqueDialog;
       }
      set editZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.editZoneGeographiqueDialog= value;
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
