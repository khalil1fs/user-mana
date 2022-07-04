import {Component, OnInit} from '@angular/core';
import {EnseignementService} from 'src/app/controller/service/formulaire/Enseignement.service';
import {EnseignementVo} from 'src/app/controller/model/formulaire/Enseignement.model';
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
  selector: 'app-enseignement-edit-admin',
  templateUrl: './enseignement-edit-admin.component.html',
  styleUrls: ['./enseignement-edit-admin.component.css']
})
export class EnseignementEditAdminComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private enseignementEtFormationService: EnseignementEtFormationService
 ,       private enseignementDisciplineScientifiqueService: EnseignementDisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private niveauEtudeService: NiveauEtudeService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private etablissementEnseignementService: EtablissementEnseignementService
 ,       private typeEtudeEnseignementService: TypeEtudeEnseignementService
 ,       private etablissementService: EtablissementService
 ,       private typeEtudeService: TypeEtudeService
 ,       private enseignementZoneGeographiqueService: EnseignementZoneGeographiqueService
 ,       private natureEnseignementService: NatureEnseignementService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private enseignementNatureService: EnseignementNatureService
 ,       private enseignementEnjeuxIrdService: EnseignementEnjeuxIrdService
 ,       private niveauEtudeEnseignementService: NiveauEtudeEnseignementService
 ,       private enseignementPaysService: EnseignementPaysService
 ,       private modaliteEtudeService: ModaliteEtudeService
 ,       private paysService: PaysService
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
        addTypeEtudeEnseignements() {
        if( this.selectedEnseignement.typeEtudeEnseignementsVo == null ){
            this.selectedEnseignement.typeEtudeEnseignementsVo = new Array<TypeEtudeEnseignementVo>();
        }
        this.selectedEnseignement.typeEtudeEnseignementsVo.push(this.selectedTypeEtudeEnseignements);
        this.selectedTypeEtudeEnseignements = new TypeEtudeEnseignementVo();
        }

       deleteTypeEtudeEnseignements(p: TypeEtudeEnseignementVo) {
        this.selectedEnseignement.typeEtudeEnseignementsVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.typeEtudeEnseignementsVo.splice(index, 1); }
        });
    }
        addEnseignementNatures() {
        if( this.selectedEnseignement.enseignementNaturesVo == null ){
            this.selectedEnseignement.enseignementNaturesVo = new Array<EnseignementNatureVo>();
        }
        this.selectedEnseignement.enseignementNaturesVo.push(this.selectedEnseignementNatures);
        this.selectedEnseignementNatures = new EnseignementNatureVo();
        }

       deleteEnseignementNatures(p: EnseignementNatureVo) {
        this.selectedEnseignement.enseignementNaturesVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.enseignementNaturesVo.splice(index, 1); }
        });
    }
        addNiveauEtudeEnseignements() {
        if( this.selectedEnseignement.niveauEtudeEnseignementsVo == null ){
            this.selectedEnseignement.niveauEtudeEnseignementsVo = new Array<NiveauEtudeEnseignementVo>();
        }
        this.selectedEnseignement.niveauEtudeEnseignementsVo.push(this.selectedNiveauEtudeEnseignements);
        this.selectedNiveauEtudeEnseignements = new NiveauEtudeEnseignementVo();
        }

       deleteNiveauEtudeEnseignements(p: NiveauEtudeEnseignementVo) {
        this.selectedEnseignement.niveauEtudeEnseignementsVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.niveauEtudeEnseignementsVo.splice(index, 1); }
        });
    }
        addEtablissementEnseignements() {
        if( this.selectedEnseignement.etablissementEnseignementsVo == null ){
            this.selectedEnseignement.etablissementEnseignementsVo = new Array<EtablissementEnseignementVo>();
        }
        this.selectedEnseignement.etablissementEnseignementsVo.push(this.selectedEtablissementEnseignements);
        this.selectedEtablissementEnseignements = new EtablissementEnseignementVo();
        }

       deleteEtablissementEnseignements(p: EtablissementEnseignementVo) {
        this.selectedEnseignement.etablissementEnseignementsVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.etablissementEnseignementsVo.splice(index, 1); }
        });
    }
        addEnseignementPayss() {
        if( this.selectedEnseignement.enseignementPayssVo == null ){
            this.selectedEnseignement.enseignementPayssVo = new Array<EnseignementPaysVo>();
        }
        this.selectedEnseignement.enseignementPayssVo.push(this.selectedEnseignementPayss);
        this.selectedEnseignementPayss = new EnseignementPaysVo();
        }

       deleteEnseignementPayss(p: EnseignementPaysVo) {
        this.selectedEnseignement.enseignementPayssVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.enseignementPayssVo.splice(index, 1); }
        });
    }
        addEnseignementZoneGeographiques() {
        if( this.selectedEnseignement.enseignementZoneGeographiquesVo == null ){
            this.selectedEnseignement.enseignementZoneGeographiquesVo = new Array<EnseignementZoneGeographiqueVo>();
        }
        this.selectedEnseignement.enseignementZoneGeographiquesVo.push(this.selectedEnseignementZoneGeographiques);
        this.selectedEnseignementZoneGeographiques = new EnseignementZoneGeographiqueVo();
        }

       deleteEnseignementZoneGeographiques(p: EnseignementZoneGeographiqueVo) {
        this.selectedEnseignement.enseignementZoneGeographiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.enseignementZoneGeographiquesVo.splice(index, 1); }
        });
    }
        addEnseignementEnjeuxIrds() {
        if( this.selectedEnseignement.enseignementEnjeuxIrdsVo == null ){
            this.selectedEnseignement.enseignementEnjeuxIrdsVo = new Array<EnseignementEnjeuxIrdVo>();
        }
        this.selectedEnseignement.enseignementEnjeuxIrdsVo.push(this.selectedEnseignementEnjeuxIrds);
        this.selectedEnseignementEnjeuxIrds = new EnseignementEnjeuxIrdVo();
        }

       deleteEnseignementEnjeuxIrds(p: EnseignementEnjeuxIrdVo) {
        this.selectedEnseignement.enseignementEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.enseignementEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addEnseignementDisciplineScientifiques() {
        if( this.selectedEnseignement.enseignementDisciplineScientifiquesVo == null ){
            this.selectedEnseignement.enseignementDisciplineScientifiquesVo = new Array<EnseignementDisciplineScientifiqueVo>();
        }
        this.selectedEnseignement.enseignementDisciplineScientifiquesVo.push(this.selectedEnseignementDisciplineScientifiques);
        this.selectedEnseignementDisciplineScientifiques = new EnseignementDisciplineScientifiqueVo();
        }

       deleteEnseignementDisciplineScientifiques(p: EnseignementDisciplineScientifiqueVo) {
        this.selectedEnseignement.enseignementDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.enseignementDisciplineScientifiquesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enseignementService.edit().subscribe(enseignement=>{
    const myIndex = this.enseignements.findIndex(e => e.id === this.selectedEnseignement.id);
    this.enseignements[myIndex] = this.selectedEnseignement;
    this.editEnseignementDialog = false;
    this.selectedEnseignement = new EnseignementVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatemodaliteEtude(modaliteEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteEtude', 'add');
                       if(isPermistted){
         this.selectedModaliteEtude = new ModaliteEtudeVo();
        this.createModaliteEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
              public async openCreatenatureEnseignement(natureEnseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'add');
                       if(isPermistted){
         this.selectedNatureEnseignement = new NatureEnseignementVo();
        this.createNatureEnseignementDialog = true;
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
              public async openCreateniveauEtude(niveauEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'add');
                       if(isPermistted){
         this.selectedNiveauEtude = new NiveauEtudeVo();
        this.createNiveauEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeEtude(typeEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEtude', 'add');
                       if(isPermistted){
         this.selectedTypeEtude = new TypeEtudeVo();
        this.createTypeEtudeDialog = true;
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

hideEditDialog(){
    this.editEnseignementDialog  = false;
}

// getters and setters

get enseignements(): Array<EnseignementVo> {
    return this.enseignementService.enseignements;
       }
set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }

 get selectedEnseignement(): EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
    set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }

   get editEnseignementDialog(): boolean {
           return this.enseignementService.editEnseignementDialog;

       }
    set editEnseignementDialog(value: boolean) {
        this.enseignementService.editEnseignementDialog = value;
       }

       get selectedModaliteEtude(): ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
      set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }
       get modaliteEtudes(): Array<ModaliteEtudeVo> {
           return this.modaliteEtudeService.modaliteEtudes;
       }
       set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }
       get createModaliteEtudeDialog(): boolean {
           return this.modaliteEtudeService.createModaliteEtudeDialog;
       }
      set createModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.createModaliteEtudeDialog= value;
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
       get selectedNatureEnseignement(): NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
      set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }
       get natureEnseignements(): Array<NatureEnseignementVo> {
           return this.natureEnseignementService.natureEnseignements;
       }
       set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }
       get createNatureEnseignementDialog(): boolean {
           return this.natureEnseignementService.createNatureEnseignementDialog;
       }
      set createNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.createNatureEnseignementDialog= value;
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
       get selectedNiveauEtude(): NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
      set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }
       get niveauEtudes(): Array<NiveauEtudeVo> {
           return this.niveauEtudeService.niveauEtudes;
       }
       set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }
       get createNiveauEtudeDialog(): boolean {
           return this.niveauEtudeService.createNiveauEtudeDialog;
       }
      set createNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.createNiveauEtudeDialog= value;
       }
       get selectedTypeEtude(): TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
      set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }
       get typeEtudes(): Array<TypeEtudeVo> {
           return this.typeEtudeService.typeEtudes;
       }
       set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }
       get createTypeEtudeDialog(): boolean {
           return this.typeEtudeService.createTypeEtudeDialog;
       }
      set createTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.createTypeEtudeDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
