import {Component, OnInit} from '@angular/core';
import {FormationContinueService} from 'src/app/controller/service/formulaire/FormationContinue.service';
import {FormationContinueVo} from 'src/app/controller/model/formulaire/FormationContinue.model';
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
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {EnjeuxIrdVo} from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import {EnjeuxIrdService} from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import {FormationContinueObjetFormationGeneriqueVo} from 'src/app/controller/model/formulaire/FormationContinueObjetFormationGenerique.model';
import {FormationContinueObjetFormationGeneriqueService} from 'src/app/controller/service/formulaire/FormationContinueObjetFormationGenerique.service';
import {FormationContinueEnjeuxIrdVo} from 'src/app/controller/model/formulaire/FormationContinueEnjeuxIrd.model';
import {FormationContinueEnjeuxIrdService} from 'src/app/controller/service/formulaire/FormationContinueEnjeuxIrd.service';
import {FormationContinuePubliqueProfessionelVo} from 'src/app/controller/model/formulaire/FormationContinuePubliqueProfessionel.model';
import {FormationContinuePubliqueProfessionelService} from 'src/app/controller/service/formulaire/FormationContinuePubliqueProfessionel.service';
import {PaysFormationContinueVo} from 'src/app/controller/model/formulaire/PaysFormationContinue.model';
import {PaysFormationContinueService} from 'src/app/controller/service/formulaire/PaysFormationContinue.service';
import {ZoneGeographiqueVo} from 'src/app/controller/model/referentiel/ZoneGeographique.model';
import {ZoneGeographiqueService} from 'src/app/controller/service/referentiel/ZoneGeographique.service';
import {FormationContinueDisciplineScientifiqueVo} from 'src/app/controller/model/formulaire/FormationContinueDisciplineScientifique.model';
import {FormationContinueDisciplineScientifiqueService} from 'src/app/controller/service/formulaire/FormationContinueDisciplineScientifique.service';
import {PubliqueProfessionelVo} from 'src/app/controller/model/referentiel/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from 'src/app/controller/service/referentiel/PubliqueProfessionel.service';
import {ModaliteFormationContinueVo} from 'src/app/controller/model/referentiel/ModaliteFormationContinue.model';
import {ModaliteFormationContinueService} from 'src/app/controller/service/referentiel/ModaliteFormationContinue.service';
import {ObjetFormationGeneriqueVo} from 'src/app/controller/model/referentiel/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from 'src/app/controller/service/referentiel/ObjetFormationGenerique.service';
import {ZoneGeographiqueFormationContinueVo} from 'src/app/controller/model/formulaire/ZoneGeographiqueFormationContinue.model';
import {ZoneGeographiqueFormationContinueService} from 'src/app/controller/service/formulaire/ZoneGeographiqueFormationContinue.service';
import {FormationContinueEtablissementVo} from 'src/app/controller/model/formulaire/FormationContinueEtablissement.model';
import {FormationContinueEtablissementService} from 'src/app/controller/service/formulaire/FormationContinueEtablissement.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-formation-continue-view-admin',
  templateUrl: './formation-continue-view-admin.component.html',
  styleUrls: ['./formation-continue-view-admin.component.css']
})
export class FormationContinueViewAdminComponent implements OnInit {

        selectedFormationContinuePubliqueProfessionels: FormationContinuePubliqueProfessionelVo = new FormationContinuePubliqueProfessionelVo();
        formationContinuePubliqueProfessionelsListe: Array<FormationContinuePubliqueProfessionelVo> = [];

        myPubliqueProfessionels: Array<PubliqueProfessionelVo> = [];

        selectedFormationContinueObjetFormationGeneriques: FormationContinueObjetFormationGeneriqueVo = new FormationContinueObjetFormationGeneriqueVo();
        formationContinueObjetFormationGeneriquesListe: Array<FormationContinueObjetFormationGeneriqueVo> = [];

        myObjetFormationGeneriques: Array<ObjetFormationGeneriqueVo> = [];

        selectedFormationContinueEnjeuxIrds: FormationContinueEnjeuxIrdVo = new FormationContinueEnjeuxIrdVo();
        formationContinueEnjeuxIrdsListe: Array<FormationContinueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedFormationContinueDisciplineScientifiques: FormationContinueDisciplineScientifiqueVo = new FormationContinueDisciplineScientifiqueVo();
        formationContinueDisciplineScientifiquesListe: Array<FormationContinueDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedPaysFormationContinues: PaysFormationContinueVo = new PaysFormationContinueVo();
        paysFormationContinuesListe: Array<PaysFormationContinueVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedZoneGeographiqueFormationContinues: ZoneGeographiqueFormationContinueVo = new ZoneGeographiqueFormationContinueVo();
        zoneGeographiqueFormationContinuesListe: Array<ZoneGeographiqueFormationContinueVo> = [];

        myZoneGeographiques: Array<ZoneGeographiqueVo> = [];

        selectedFormationContinueEtablissements: FormationContinueEtablissementVo = new FormationContinueEtablissementVo();
        formationContinueEtablissementsListe: Array<FormationContinueEtablissementVo> = [];

        myEtablissements: Array<EtablissementVo> = [];


constructor(private datePipe: DatePipe, private formationContinueService: FormationContinueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private enseignementEtFormationService :EnseignementEtFormationService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private etablissementService :EtablissementService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private formationContinueObjetFormationGeneriqueService :FormationContinueObjetFormationGeneriqueService
    ,private formationContinueEnjeuxIrdService :FormationContinueEnjeuxIrdService
    ,private formationContinuePubliqueProfessionelService :FormationContinuePubliqueProfessionelService
    ,private paysFormationContinueService :PaysFormationContinueService
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private formationContinueDisciplineScientifiqueService :FormationContinueDisciplineScientifiqueService
    ,private publiqueProfessionelService :PubliqueProfessionelService
    ,private modaliteFormationContinueService :ModaliteFormationContinueService
    ,private objetFormationGeneriqueService :ObjetFormationGeneriqueService
    ,private zoneGeographiqueFormationContinueService :ZoneGeographiqueFormationContinueService
    ,private formationContinueEtablissementService :FormationContinueEtablissementService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedFormationContinuePubliqueProfessionels.publiqueProfessionelVo = new PubliqueProfessionelVo();
                this.publiqueProfessionelService.findAll().subscribe((data) => this.publiqueProfessionels = data);
                this.selectedFormationContinueObjetFormationGeneriques.objetFormationGeneriqueVo = new ObjetFormationGeneriqueVo();
                this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);
                this.selectedFormationContinueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedFormationContinueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedPaysFormationContinues.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedZoneGeographiqueFormationContinues.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedFormationContinueEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedFormationContinueEtablissements.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
    this.modaliteFormationContinueService.findAll().subscribe((data) => this.modaliteFormationContinues = data);
    this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
    this.enseignementEtFormationService.findAll().subscribe((data) => this.enseignementEtFormations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewFormationContinueDialog  = false;
}

// getters and setters

get formationContinues(): Array<FormationContinueVo> {
    return this.formationContinueService.formationContinues;
       }
set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }

 get selectedFormationContinue():FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
    set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }

   get viewFormationContinueDialog():boolean {
           return this.formationContinueService.viewFormationContinueDialog;

       }
    set viewFormationContinueDialog(value: boolean) {
        this.formationContinueService.viewFormationContinueDialog= value;
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
       get selectedObjetFormationGenerique():ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques():Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get editObjetFormationGeneriqueDialog():boolean {
           return this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog;
       }
      set editObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog= value;
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
       get selectedModaliteFormationContinue():ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
      set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }
       get modaliteFormationContinues():Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
       set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }
       get editModaliteFormationContinueDialog():boolean {
           return this.modaliteFormationContinueService.editModaliteFormationContinueDialog;
       }
      set editModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.editModaliteFormationContinueDialog= value;
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
       get selectedPubliqueProfessionel():PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
      set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
       get publiqueProfessionels():Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
       set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }
       get editPubliqueProfessionelDialog():boolean {
           return this.publiqueProfessionelService.editPubliqueProfessionelDialog;
       }
      set editPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.editPubliqueProfessionelDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
