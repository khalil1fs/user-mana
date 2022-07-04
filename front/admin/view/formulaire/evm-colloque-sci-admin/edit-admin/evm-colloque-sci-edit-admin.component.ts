import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiqueService} from 'src/app/controller/service/formulaire/EvenementColloqueScienntifique.service';
import {EvenementColloqueScienntifiqueVo} from 'src/app/controller/model/formulaire/EvenementColloqueScienntifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

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
  selector: 'app-evenement-colloque-scienntifique-edit-admin',
  templateUrl: './evm-colloque-sci-edit-admin.component.html',
  styleUrls: ['./evm-colloque-sci-edit-admin.component.css']
})
export class EvenementColloqueScienntifiqueEditAdminComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private modaliteService: ModaliteService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private savoirEtInnovationService: SavoirEtInnovationService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private evenementColloqueScienntifiqueEnjeuxIrdService: EvenementColloqueScienntifiqueEnjeuxIrdService
 ,       private modaliteInterventionService: ModaliteInterventionService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private disciplineScientifiqueEvenementColloqueScientifiqueService: DisciplineScientifiqueEvenementColloqueScientifiqueService
 ,       private evenementColloqueScienntifiquePaysService: EvenementColloqueScienntifiquePaysService
 ,       private communauteSavoirService: CommunauteSavoirService
 ,       private communauteSavoirEvenementColloqueScientifiqueService: CommunauteSavoirEvenementColloqueScientifiqueService
 ,       private paysService: PaysService
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
       addevenementColloqueScienntifiqueEnjeuxIrds() {
        if( this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiqueEnjeuxIrdsVo == null ){
            this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiqueEnjeuxIrdsVo = new Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>();
        }
        this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiqueEnjeuxIrdsVo.push(this.selectedEvenementColloqueScienntifiqueEnjeuxIrds);
        this.selectedEvenementColloqueScienntifiqueEnjeuxIrds = new EvenementColloqueScienntifiqueEnjeuxIrdVo();
        }

        deleteEvenementColloqueScienntifiqueEnjeuxIrds(p: EvenementColloqueScienntifiqueEnjeuxIrdVo) {
        this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiqueEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiqueEnjeuxIrdsVo.splice(index, 1); }
        });
    }
       addcommunauteSavoirEvenementColloqueScientifiques() {
        if( this.selectedEvenementColloqueScienntifique.communauteSavoirEvenementColloqueScientifiquesVo == null ){
            this.selectedEvenementColloqueScienntifique.communauteSavoirEvenementColloqueScientifiquesVo = new Array<CommunauteSavoirEvenementColloqueScientifiqueVo>();
        }
        this.selectedEvenementColloqueScienntifique.communauteSavoirEvenementColloqueScientifiquesVo.push(this.selectedCommunauteSavoirEvenementColloqueScientifiques);
        this.selectedCommunauteSavoirEvenementColloqueScientifiques = new CommunauteSavoirEvenementColloqueScientifiqueVo();
        }

        deleteCommunauteSavoirEvenementColloqueScientifiques(p: CommunauteSavoirEvenementColloqueScientifiqueVo) {
        this.selectedEvenementColloqueScienntifique.communauteSavoirEvenementColloqueScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEvenementColloqueScienntifique.communauteSavoirEvenementColloqueScientifiquesVo.splice(index, 1); }
        });
    }
       adddisciplineScientifiqueEvenementColloqueScientifiques() {
        if( this.selectedEvenementColloqueScienntifique.disciplineScientifiqueEvenementColloqueScientifiquesVo == null ){
            this.selectedEvenementColloqueScienntifique.disciplineScientifiqueEvenementColloqueScientifiquesVo = new Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>();
        }
        this.selectedEvenementColloqueScienntifique.disciplineScientifiqueEvenementColloqueScientifiquesVo.push(this.selectedDisciplineScientifiqueEvenementColloqueScientifiques);
        this.selectedDisciplineScientifiqueEvenementColloqueScientifiques = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
        }

        deleteDisciplineScientifiqueEvenementColloqueScientifiques(p: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {
        this.selectedEvenementColloqueScienntifique.disciplineScientifiqueEvenementColloqueScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEvenementColloqueScienntifique.disciplineScientifiqueEvenementColloqueScientifiquesVo.splice(index, 1); }
        });
    }
       addevenementColloqueScienntifiquePayss() {
        if( this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiquePayssVo == null ){
            this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiquePayssVo = new Array<EvenementColloqueScienntifiquePaysVo>();
        }
        this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiquePayssVo.push(this.selectedEvenementColloqueScienntifiquePayss);
        this.selectedEvenementColloqueScienntifiquePayss = new EvenementColloqueScienntifiquePaysVo();
        }

        deleteEvenementColloqueScienntifiquePayss(p: EvenementColloqueScienntifiquePaysVo) {
        this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiquePayssVo.forEach((element, index) => {
            if (element === p) { this.selectedEvenementColloqueScienntifique.evenementColloqueScienntifiquePayssVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEvenementColloqueScienntifique.dateEvenement = DateUtils.toDate(this.selectedEvenementColloqueScienntifique.dateEvenement);
    this.evenementColloqueScienntifiqueService.edit().subscribe(evenementColloqueScienntifique=>{
    const myIndex = this.evenementColloqueScienntifiques.findIndex(e => e.id === this.selectedEvenementColloqueScienntifique.id);
    this.evenementColloqueScienntifiques[myIndex] = this.selectedEvenementColloqueScienntifique;
    this.editEvenementColloqueScienntifiqueDialog = false;
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemodaliteIntervention(modaliteIntervention: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'add');
                       if(isPermistted){
         this.selectedModaliteIntervention = new ModaliteInterventionVo();
        this.createModaliteInterventionDialog = true;
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
              public async openCreatemodalite(modalite: string) {
                      const isPermistted = await this.roleService.isPermitted('Modalite', 'add');
                       if(isPermistted){
         this.selectedModalite = new ModaliteVo();
        this.createModaliteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesavoirEtInnovation(savoirEtInnovation: string) {
                      const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'add');
                       if(isPermistted){
         this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
        this.createSavoirEtInnovationDialog = true;
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
// methods

hideEditDialog(){
    this.editEvenementColloqueScienntifiqueDialog  = false;
}

// getters and setters

get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
    return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }

 get selectedEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
    set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }

   get editEvenementColloqueScienntifiqueDialog(): boolean {
           return this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog;

       }
    set editEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog = value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedModaliteIntervention(): ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
      set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }
       get modaliteInterventions(): Array<ModaliteInterventionVo> {
           return this.modaliteInterventionService.modaliteInterventions;
       }
       set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }
       get createModaliteInterventionDialog(): boolean {
           return this.modaliteInterventionService.createModaliteInterventionDialog;
       }
      set createModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.createModaliteInterventionDialog= value;
       }
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
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
       get selectedModalite(): ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
      set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }
       get modalites(): Array<ModaliteVo> {
           return this.modaliteService.modalites;
       }
       set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }
       get createModaliteDialog(): boolean {
           return this.modaliteService.createModaliteDialog;
       }
      set createModaliteDialog(value: boolean) {
        this.modaliteService.createModaliteDialog= value;
       }
       get selectedSavoirEtInnovation(): SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get createSavoirEtInnovationDialog(): boolean {
           return this.savoirEtInnovationService.createSavoirEtInnovationDialog;
       }
      set createSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.createSavoirEtInnovationDialog= value;
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
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
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
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
