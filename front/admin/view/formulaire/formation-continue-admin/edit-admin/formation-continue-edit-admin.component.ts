import {Component, OnInit} from '@angular/core';
import {FormationContinueService} from 'src/app/controller/service/formulaire/FormationContinue.service';
import {FormationContinueVo} from 'src/app/controller/model/formulaire/FormationContinue.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
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
  selector: 'app-formation-continue-edit-admin',
  templateUrl: './formation-continue-edit-admin.component.html',
  styleUrls: ['./formation-continue-edit-admin.component.css']
})
export class FormationContinueEditAdminComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private enseignementEtFormationService: EnseignementEtFormationService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private etablissementService: EtablissementService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private formationContinueObjetFormationGeneriqueService: FormationContinueObjetFormationGeneriqueService
 ,       private formationContinueEnjeuxIrdService: FormationContinueEnjeuxIrdService
 ,       private formationContinuePubliqueProfessionelService: FormationContinuePubliqueProfessionelService
 ,       private paysFormationContinueService: PaysFormationContinueService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private formationContinueDisciplineScientifiqueService: FormationContinueDisciplineScientifiqueService
 ,       private publiqueProfessionelService: PubliqueProfessionelService
 ,       private modaliteFormationContinueService: ModaliteFormationContinueService
 ,       private objetFormationGeneriqueService: ObjetFormationGeneriqueService
 ,       private zoneGeographiqueFormationContinueService: ZoneGeographiqueFormationContinueService
 ,       private formationContinueEtablissementService: FormationContinueEtablissementService
 ,       private paysService: PaysService
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
        addFormationContinuePubliqueProfessionels() {
        if( this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo == null ){
            this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo = new Array<FormationContinuePubliqueProfessionelVo>();
        }
        this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo.push(this.selectedFormationContinuePubliqueProfessionels);
        this.selectedFormationContinuePubliqueProfessionels = new FormationContinuePubliqueProfessionelVo();
        }

       deleteFormationContinuePubliqueProfessionels(p: FormationContinuePubliqueProfessionelVo) {
        this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo.splice(index, 1); }
        });
    }
        addFormationContinueObjetFormationGeneriques() {
        if( this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo == null ){
            this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo = new Array<FormationContinueObjetFormationGeneriqueVo>();
        }
        this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo.push(this.selectedFormationContinueObjetFormationGeneriques);
        this.selectedFormationContinueObjetFormationGeneriques = new FormationContinueObjetFormationGeneriqueVo();
        }

       deleteFormationContinueObjetFormationGeneriques(p: FormationContinueObjetFormationGeneriqueVo) {
        this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo.splice(index, 1); }
        });
    }
        addFormationContinueEnjeuxIrds() {
        if( this.selectedFormationContinue.formationContinueEnjeuxIrdsVo == null ){
            this.selectedFormationContinue.formationContinueEnjeuxIrdsVo = new Array<FormationContinueEnjeuxIrdVo>();
        }
        this.selectedFormationContinue.formationContinueEnjeuxIrdsVo.push(this.selectedFormationContinueEnjeuxIrds);
        this.selectedFormationContinueEnjeuxIrds = new FormationContinueEnjeuxIrdVo();
        }

       deleteFormationContinueEnjeuxIrds(p: FormationContinueEnjeuxIrdVo) {
        this.selectedFormationContinue.formationContinueEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addFormationContinueDisciplineScientifiques() {
        if( this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo == null ){
            this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo = new Array<FormationContinueDisciplineScientifiqueVo>();
        }
        this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo.push(this.selectedFormationContinueDisciplineScientifiques);
        this.selectedFormationContinueDisciplineScientifiques = new FormationContinueDisciplineScientifiqueVo();
        }

       deleteFormationContinueDisciplineScientifiques(p: FormationContinueDisciplineScientifiqueVo) {
        this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo.splice(index, 1); }
        });
    }
        addPaysFormationContinues() {
        if( this.selectedFormationContinue.paysFormationContinuesVo == null ){
            this.selectedFormationContinue.paysFormationContinuesVo = new Array<PaysFormationContinueVo>();
        }
        this.selectedFormationContinue.paysFormationContinuesVo.push(this.selectedPaysFormationContinues);
        this.selectedPaysFormationContinues = new PaysFormationContinueVo();
        }

       deletePaysFormationContinues(p: PaysFormationContinueVo) {
        this.selectedFormationContinue.paysFormationContinuesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.paysFormationContinuesVo.splice(index, 1); }
        });
    }
        addZoneGeographiqueFormationContinues() {
        if( this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo == null ){
            this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo = new Array<ZoneGeographiqueFormationContinueVo>();
        }
        this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.push(this.selectedZoneGeographiqueFormationContinues);
        this.selectedZoneGeographiqueFormationContinues = new ZoneGeographiqueFormationContinueVo();
        }

       deleteZoneGeographiqueFormationContinues(p: ZoneGeographiqueFormationContinueVo) {
        this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.splice(index, 1); }
        });
    }
        addFormationContinueEtablissements() {
        if( this.selectedFormationContinue.formationContinueEtablissementsVo == null ){
            this.selectedFormationContinue.formationContinueEtablissementsVo = new Array<FormationContinueEtablissementVo>();
        }
        this.selectedFormationContinue.formationContinueEtablissementsVo.push(this.selectedFormationContinueEtablissements);
        this.selectedFormationContinueEtablissements = new FormationContinueEtablissementVo();
        }

       deleteFormationContinueEtablissements(p: FormationContinueEtablissementVo) {
        this.selectedFormationContinue.formationContinueEtablissementsVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueEtablissementsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.formationContinueService.edit().subscribe(formationContinue=>{
    const myIndex = this.formationContinues.findIndex(e => e.id === this.selectedFormationContinue.id);
    this.formationContinues[myIndex] = this.selectedFormationContinue;
    this.editFormationContinueDialog = false;
    this.selectedFormationContinue = new FormationContinueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenseignementEtFormation(enseignementEtFormation: string) {
                      const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'add');
                       if(isPermistted){
         this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
        this.createEnseignementEtFormationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateobjetFormationGenerique(objetFormationGenerique: string) {
                      const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'add');
                       if(isPermistted){
         this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
        this.createObjetFormationGeneriqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
              public async openCreatemodaliteFormationContinue(modaliteFormationContinue: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'add');
                       if(isPermistted){
         this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
        this.createModaliteFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
              public async openCreatepubliqueProfessionel(publiqueProfessionel: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'add');
                       if(isPermistted){
         this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
        this.createPubliqueProfessionelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatezoneGeographique(zoneGeographique: string) {
                      const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
                       if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
        this.createZoneGeographiqueDialog = true;
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
    this.editFormationContinueDialog  = false;
}

// getters and setters

get formationContinues(): Array<FormationContinueVo> {
    return this.formationContinueService.formationContinues;
       }
set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }

 get selectedFormationContinue(): FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
    set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }

   get editFormationContinueDialog(): boolean {
           return this.formationContinueService.editFormationContinueDialog;

       }
    set editFormationContinueDialog(value: boolean) {
        this.formationContinueService.editFormationContinueDialog = value;
       }

       get selectedEnseignementEtFormation(): EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
      set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
       get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
       set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }
       get createEnseignementEtFormationDialog(): boolean {
           return this.enseignementEtFormationService.createEnseignementEtFormationDialog;
       }
      set createEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.createEnseignementEtFormationDialog= value;
       }
       get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get createObjetFormationGeneriqueDialog(): boolean {
           return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;
       }
      set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog= value;
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
       get selectedModaliteFormationContinue(): ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
      set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }
       get modaliteFormationContinues(): Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
       set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }
       get createModaliteFormationContinueDialog(): boolean {
           return this.modaliteFormationContinueService.createModaliteFormationContinueDialog;
       }
      set createModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.createModaliteFormationContinueDialog= value;
       }
       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
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
       get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
      set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
       get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
       set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }
       get createPubliqueProfessionelDialog(): boolean {
           return this.publiqueProfessionelService.createPubliqueProfessionelDialog;
       }
      set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog= value;
       }
       get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
      set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
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
