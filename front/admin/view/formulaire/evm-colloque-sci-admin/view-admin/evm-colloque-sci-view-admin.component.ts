import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiqueService} from 'src/app/controller/service/formulaire/EvenementColloqueScienntifique.service';
import {EvenementColloqueScienntifiqueVo} from 'src/app/controller/model/formulaire/EvenementColloqueScienntifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {ModaliteVo} from 'src/app/controller/model/referentiel/Modalite.model';
import {ModaliteService} from 'src/app/controller/service/referentiel/Modalite.service';
import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {SavoirEtInnovationVo} from 'src/app/controller/model/formulaire/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from 'src/app/controller/service/formulaire/SavoirEtInnovation.service';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from 'src/app/controller/model/formulaire/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {EvenementColloqueScienntifiqueEnjeuxIrdService} from 'src/app/controller/service/formulaire/EvenementColloqueScienntifiqueEnjeuxIrd.service';
import {ModaliteInterventionVo} from 'src/app/controller/model/referentiel/ModaliteIntervention.model';
import {ModaliteInterventionService} from 'src/app/controller/service/referentiel/ModaliteIntervention.service';
import {EnjeuxIrdVo} from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import {EnjeuxIrdService} from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from 'src/app/controller/model/formulaire/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {DisciplineScientifiqueEvenementColloqueScientifiqueService} from 'src/app/controller/service/formulaire/DisciplineScientifiqueEvenementColloqueScientifique.service';
import {EvenementColloqueScienntifiquePaysVo} from 'src/app/controller/model/formulaire/EvenementColloqueScienntifiquePays.model';
import {EvenementColloqueScienntifiquePaysService} from 'src/app/controller/service/formulaire/EvenementColloqueScienntifiquePays.service';
import {CommunauteSavoirVo} from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import {CommunauteSavoirService} from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from 'src/app/controller/model/formulaire/CommunauteSavoirEvenementColloqueScientifique.model';
import {CommunauteSavoirEvenementColloqueScientifiqueService} from 'src/app/controller/service/formulaire/CommunauteSavoirEvenementColloqueScientifique.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-view-admin',
  templateUrl: './evm-colloque-sci-view-admin.component.html',
  styleUrls: ['./evm-colloque-sci-view-admin.component.css']
})
export class EvenementColloqueScienntifiqueViewAdminComponent implements OnInit {

        selectedEvenementColloqueScienntifiqueEnjeuxIrds: EvenementColloqueScienntifiqueEnjeuxIrdVo = new EvenementColloqueScienntifiqueEnjeuxIrdVo();
        evenementColloqueScienntifiqueEnjeuxIrdsListe: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedCommunauteSavoirEvenementColloqueScientifiques: CommunauteSavoirEvenementColloqueScientifiqueVo = new CommunauteSavoirEvenementColloqueScientifiqueVo();
        communauteSavoirEvenementColloqueScientifiquesListe: Array<CommunauteSavoirEvenementColloqueScientifiqueVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedDisciplineScientifiqueEvenementColloqueScientifiques: DisciplineScientifiqueEvenementColloqueScientifiqueVo = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
        disciplineScientifiqueEvenementColloqueScientifiquesListe: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedEvenementColloqueScienntifiquePayss: EvenementColloqueScienntifiquePaysVo = new EvenementColloqueScienntifiquePaysVo();
        evenementColloqueScienntifiquePayssListe: Array<EvenementColloqueScienntifiquePaysVo> = [];

        myPayss: Array<PaysVo> = [];


constructor(private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private modaliteService :ModaliteService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private savoirEtInnovationService :SavoirEtInnovationService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private evenementColloqueScienntifiqueEnjeuxIrdService :EvenementColloqueScienntifiqueEnjeuxIrdService
    ,private modaliteInterventionService :ModaliteInterventionService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private disciplineScientifiqueEvenementColloqueScientifiqueService :DisciplineScientifiqueEvenementColloqueScientifiqueService
    ,private evenementColloqueScienntifiquePaysService :EvenementColloqueScienntifiquePaysService
    ,private communauteSavoirService :CommunauteSavoirService
    ,private communauteSavoirEvenementColloqueScientifiqueService :CommunauteSavoirEvenementColloqueScientifiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedEvenementColloqueScienntifiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedCommunauteSavoirEvenementColloqueScientifiques.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDisciplineScientifiqueEvenementColloqueScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedEvenementColloqueScienntifiquePayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedModalite = new ModaliteVo();
    this.modaliteService.findAll().subscribe((data) => this.modalites = data);
    this.selectedModaliteIntervention = new ModaliteInterventionVo();
    this.modaliteInterventionService.findAll().subscribe((data) => this.modaliteInterventions = data);
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
    this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewEvenementColloqueScienntifiqueDialog  = false;
}

// getters and setters

get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
    return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }

 get selectedEvenementColloqueScienntifique():EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
    set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }

   get viewEvenementColloqueScienntifiqueDialog():boolean {
           return this.evenementColloqueScienntifiqueService.viewEvenementColloqueScienntifiqueDialog;

       }
    set viewEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.viewEvenementColloqueScienntifiqueDialog= value;
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
       get selectedModaliteIntervention():ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
      set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }
       get modaliteInterventions():Array<ModaliteInterventionVo> {
           return this.modaliteInterventionService.modaliteInterventions;
       }
       set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }
       get editModaliteInterventionDialog():boolean {
           return this.modaliteInterventionService.editModaliteInterventionDialog;
       }
      set editModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.editModaliteInterventionDialog= value;
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
       get selectedModalite():ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
      set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }
       get modalites():Array<ModaliteVo> {
           return this.modaliteService.modalites;
       }
       set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }
       get editModaliteDialog():boolean {
           return this.modaliteService.editModaliteDialog;
       }
      set editModaliteDialog(value: boolean) {
        this.modaliteService.editModaliteDialog= value;
       }
       get selectedSavoirEtInnovation():SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations():Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get editSavoirEtInnovationDialog():boolean {
           return this.savoirEtInnovationService.editSavoirEtInnovationDialog;
       }
      set editSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.editSavoirEtInnovationDialog= value;
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
