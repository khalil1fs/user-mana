import { Component, OnInit, Input } from '@angular/core';
import { EnseignementService } from 'src/app/controller/service/formulaire/Enseignement.service';
import { EnseignementVo } from 'src/app/controller/model/formulaire/Enseignement.model';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';


import { EnseignementNatureVo } from 'src/app/controller/model/formulaire/EnseignementNature.model';
import { EnseignementNatureService } from 'src/app/controller/service/formulaire/EnseignementNature.service';
import { EtablissementVo } from 'src/app/controller/model/referentiel/Etablissement.model';
import { EtablissementService } from 'src/app/controller/service/referentiel/Etablissement.service';
import { EnseignementPaysVo } from 'src/app/controller/model/formulaire/EnseignementPays.model';
import { EnseignementPaysService } from 'src/app/controller/service/formulaire/EnseignementPays.service';
import { EnseignementEtFormationVo } from 'src/app/controller/model/formulaire/EnseignementEtFormation.model';
import { EnseignementEtFormationService } from 'src/app/controller/service/formulaire/EnseignementEtFormation.service';
import { EtablissementEnseignementVo } from 'src/app/controller/model/formulaire/EtablissementEnseignement.model';
import { EtablissementEnseignementService } from 'src/app/controller/service/formulaire/EtablissementEnseignement.service';
import { DisciplineScientifiqueVo } from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import { DisciplineScientifiqueService } from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import { EnseignementDisciplineScientifiqueVo } from 'src/app/controller/model/formulaire/EnseignementDisciplineScientifique.model';
import { EnseignementDisciplineScientifiqueService } from 'src/app/controller/service/formulaire/EnseignementDisciplineScientifique.service';
import { TypeEtudeEnseignementVo } from 'src/app/controller/model/formulaire/TypeEtudeEnseignement.model';
import { TypeEtudeEnseignementService } from 'src/app/controller/service/formulaire/TypeEtudeEnseignement.service';
import { ModaliteEtudeVo } from 'src/app/controller/model/referentiel/ModaliteEtude.model';
import { ModaliteEtudeService } from 'src/app/controller/service/referentiel/ModaliteEtude.service';
import { EnseignementZoneGeographiqueVo } from 'src/app/controller/model/formulaire/EnseignementZoneGeographique.model';
import { EnseignementZoneGeographiqueService } from 'src/app/controller/service/formulaire/EnseignementZoneGeographique.service';
import { ZoneGeographiqueVo } from 'src/app/controller/model/referentiel/ZoneGeographique.model';
import { ZoneGeographiqueService } from 'src/app/controller/service/referentiel/ZoneGeographique.service';
import { EtatEtapeCampagneVo } from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import { EtatEtapeCampagneService } from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import { TypeEtudeVo } from 'src/app/controller/model/referentiel/TypeEtude.model';
import { TypeEtudeService } from 'src/app/controller/service/referentiel/TypeEtude.service';
import { EnseignementEnjeuxIrdVo } from 'src/app/controller/model/formulaire/EnseignementEnjeuxIrd.model';
import { EnseignementEnjeuxIrdService } from 'src/app/controller/service/formulaire/EnseignementEnjeuxIrd.service';
import { EnjeuxIrdVo } from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import { EnjeuxIrdService } from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import { NiveauEtudeEnseignementVo } from 'src/app/controller/model/formulaire/NiveauEtudeEnseignement.model';
import { NiveauEtudeEnseignementService } from 'src/app/controller/service/formulaire/NiveauEtudeEnseignement.service';
import { NiveauEtudeVo } from 'src/app/controller/model/referentiel/NiveauEtude.model';
import { NiveauEtudeService } from 'src/app/controller/service/referentiel/NiveauEtude.service';
import { NatureEnseignementVo } from 'src/app/controller/model/referentiel/NatureEnseignement.model';
import { NatureEnseignementService } from 'src/app/controller/service/referentiel/NatureEnseignement.service';
import { PaysVo } from 'src/app/controller/model/referentiel/Pays.model';
import { PaysService } from 'src/app/controller/service/referentiel/Pays.service';
@Component({
    selector: 'app-enseignement-create-admin',
    templateUrl: './enseignement-create-admin.component.html',
    styleUrls: ['./enseignement-create-admin.component.css']
})
export class EnseignementCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validIntitule = true;
    _validNombreHeure = true;
    _validModaliteEtude = true;
    _validTypeEtudeEnseignements = true;
    _validNiveauEtudeEnseignements = true;
    _validEtablissementEnseignements = true;
    _validEnseignementPayss = true;
    _validEnseignementZoneGeographiques = true;
    _validEnseignementEnjeuxIrds = true;

    selectedTypeEtudeEnseignements: TypeEtudeEnseignementVo = new TypeEtudeEnseignementVo();
    selectedEnseignementNatures: EnseignementNatureVo = new EnseignementNatureVo();
    selectedNiveauEtudeEnseignements: NiveauEtudeEnseignementVo = new NiveauEtudeEnseignementVo();
    selectedEtablissementEnseignements: EtablissementEnseignementVo = new EtablissementEnseignementVo();
    selectedEnseignementPayss: EnseignementPaysVo = new EnseignementPaysVo();
    selectedEnseignementZoneGeographiques: EnseignementZoneGeographiqueVo = new EnseignementZoneGeographiqueVo();
    selectedEnseignementEnjeuxIrds: EnseignementEnjeuxIrdVo = new EnseignementEnjeuxIrdVo();
    selectedEnseignementDisciplineScientifiques: EnseignementDisciplineScientifiqueVo = new EnseignementDisciplineScientifiqueVo();
    constructor(private datePipe: DatePipe, private enseignementService: EnseignementService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router

        , private enseignementNatureService: EnseignementNatureService
        , private etablissementService: EtablissementService
        , private modaliteEtudeService: ModaliteEtudeService
        , private enseignementZoneGeographiqueService: EnseignementZoneGeographiqueService
        , private enseignementPaysService: EnseignementPaysService
        , private enseignementEtFormationService: EnseignementEtFormationService
        , private etablissementEnseignementService: EtablissementEnseignementService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private zoneGeographiqueService: ZoneGeographiqueService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private typeEtudeService: TypeEtudeService
        , private enseignementDisciplineScientifiqueService: EnseignementDisciplineScientifiqueService
        , private enseignementEnjeuxIrdService: EnseignementEnjeuxIrdService
        , private enjeuxIrdService: EnjeuxIrdService
        , private niveauEtudeEnseignementService: NiveauEtudeEnseignementService
        , private niveauEtudeService: NiveauEtudeService
        , private typeEtudeEnseignementService: TypeEtudeEnseignementService
        , private natureEnseignementService: NatureEnseignementService
        , private paysService: PaysService
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

    prepareTypeEtudeEnseignements(typeEtudes: Array<TypeEtudeVo>): void {
        if (typeEtudes != null) {
            typeEtudes.forEach(e => {
                const typeEtudeEnseignement = new TypeEtudeEnseignementVo();
                typeEtudeEnseignement.typeEtudeVo = e;
                // this.selectedTypeEtudeEnseignements.typeEtudeEnseignementsVo.push(typeEtudeEnseignement);
            });
        }
    }
    prepareEnseignementNatures(natureEnseignements: Array<NatureEnseignementVo>): void {
        if (natureEnseignements != null) {
            natureEnseignements.forEach(e => {
                const enseignementNature = new EnseignementNatureVo();
                enseignementNature.natureEnseignementVo = e;
                // this.selectedEnseignementNatures.enseignementNaturesVo.push(enseignementNature);
            });
        }
    }
    prepareNiveauEtudeEnseignements(niveauEtudes: Array<NiveauEtudeVo>): void {
        if (niveauEtudes != null) {
            niveauEtudes.forEach(e => {
                const niveauEtudeEnseignement = new NiveauEtudeEnseignementVo();
                niveauEtudeEnseignement.niveauEtudeVo = e;
                // this.selectedNiveauEtudeEnseignements.niveauEtudeEnseignementsVo.push(niveauEtudeEnseignement);
            });
        }
    }
    prepareEtablissementEnseignements(etablissements: Array<EtablissementVo>): void {
        if (etablissements != null) {
            etablissements.forEach(e => {
                const etablissementEnseignement = new EtablissementEnseignementVo();
                etablissementEnseignement.etablissementVo = e;
                // this.selectedEtablissementEnseignements.etablissementEnseignementsVo.push(etablissementEnseignement);
            });
        }
    }
    prepareEnseignementPayss(payss: Array<PaysVo>): void {
        if (payss != null) {
            payss.forEach(e => {
                const enseignementPays = new EnseignementPaysVo();
                enseignementPays.paysVo = e;
                this.selectedEnseignement.enseignementPayssVo.push(enseignementPays);
            });
        }
    }
    prepareEnseignementZoneGeographiques(zoneGeographiques: Array<ZoneGeographiqueVo>): void {
        if (zoneGeographiques != null) {
            zoneGeographiques.forEach(e => {
                const enseignementZoneGeographique = new EnseignementZoneGeographiqueVo();
                enseignementZoneGeographique.zoneGeographiqueVo = e;
                this.selectedEnseignement.enseignementZoneGeographiquesVo.push(enseignementZoneGeographique);
            });
        }
    }
    prepareEnseignementEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void {
        if (enjeuxIrds != null) {
            enjeuxIrds.forEach(e => {
                const enseignementEnjeuxIrd = new EnseignementEnjeuxIrdVo();
                enseignementEnjeuxIrd.enjeuxIrdVo = e;
                this.selectedEnseignement.enseignementEnjeuxIrdsVo.push(enseignementEnjeuxIrd);
            });
        }
    }
    prepareEnseignementDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void {
        if (disciplineScientifiques != null) {
            disciplineScientifiques.forEach(e => {
                const enseignementDisciplineScientifique = new EnseignementDisciplineScientifiqueVo();
                enseignementDisciplineScientifique.disciplineScientifiqueVo = e;
                 this.selectedEnseignement.enseignementDisciplineScientifiquesVo.push(enseignementDisciplineScientifique);
            });
        }
    }


    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire' });
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.enseignementService.save().subscribe(enseignement => {
            this.enseignements.push({ ...enseignement });
            this.createEnseignementDialog = false;
            this.submitted = false;
            this.selectedEnseignement = new EnseignementVo();


        }, error => {
            console.log(error);
        });

    }
    //validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateIntitule();
        this.validateNombreHeure();
        this.validateModaliteEtude();
        this.validateTypeEtudeEnseignements();
        this.validateNiveauEtudeEnseignements();
        this.validateEtablissementEnseignements();
        this.validateEnseignementPayss();
        this.validateEnseignementZoneGeographiques();
        this.validateEnseignementEnjeuxIrds();
    }

    private validateIntitule() {
        if (this.selectedEnseignement.intitule == null) {
            this.errorMessages.push('Intitule non valide');
            this.validIntitule = false;
        } else {
            this.validIntitule = true;
        }
    }
    private validateNombreHeure() {
        if (this.selectedEnseignement.nombreHeure == null) {
            this.errorMessages.push('NombreHeure non valide');
            this.validNombreHeure = false;
        } else {
            this.validNombreHeure = true;
        }
    }
    private validateModaliteEtude() {
        if (this.selectedEnseignement.modaliteEtudeVo == null) {
            this.errorMessages.push('ModaliteEtude non valide');
            this.validModaliteEtude = false;
        } else {
            this.validModaliteEtude = true;
        }
    }
    private validateTypeEtudeEnseignements() {
        if (this.selectedEnseignement.typeEtudeEnseignementsVo == null || this.selectedEnseignement.typeEtudeEnseignementsVo.length === 0) {
            this.errorMessages.push('TypeEtudeEnseignements non valide');
            this.validTypeEtudeEnseignements = false;
        } else {
            this.validTypeEtudeEnseignements = true;
        }
    }
    private validateNiveauEtudeEnseignements() {
        if (this.selectedEnseignement.niveauEtudeEnseignementsVo == null || this.selectedEnseignement.niveauEtudeEnseignementsVo.length === 0) {
            this.errorMessages.push('NiveauEtudeEnseignements non valide');
            this.validNiveauEtudeEnseignements = false;
        } else {
            this.validNiveauEtudeEnseignements = true;
        }
    }
    private validateEtablissementEnseignements() {
        if (this.selectedEnseignement.etablissementEnseignementsVo == null || this.selectedEnseignement.etablissementEnseignementsVo.length === 0) {
            this.errorMessages.push('EtablissementEnseignements non valide');
            this.validEtablissementEnseignements = false;
        } else {
            this.validEtablissementEnseignements = true;
        }
    }
    private validateEnseignementPayss() {
        if (this.selectedEnseignement.enseignementPayssVo == null || this.selectedEnseignement.enseignementPayssVo.length === 0) {
            this.errorMessages.push('EnseignementPayss non valide');
            this.validEnseignementPayss = false;
        } else {
            this.validEnseignementPayss = true;
        }
    }
    private validateEnseignementZoneGeographiques() {
        if (this.selectedEnseignement.enseignementZoneGeographiquesVo == null || this.selectedEnseignement.enseignementZoneGeographiquesVo.length === 0) {
            this.errorMessages.push('EnseignementZoneGeographiques non valide');
            this.validEnseignementZoneGeographiques = false;
        } else {
            this.validEnseignementZoneGeographiques = true;
        }
    }
    private validateEnseignementEnjeuxIrds() {
        if (this.selectedEnseignement.enseignementEnjeuxIrdsVo == null || this.selectedEnseignement.enseignementEnjeuxIrdsVo.length === 0) {
            this.errorMessages.push('EnseignementEnjeuxIrds non valide');
            this.validEnseignementEnjeuxIrds = false;
        } else {
            this.validEnseignementEnjeuxIrds = true;
        }
    }

    //openPopup
    public async openCreatemodaliteEtude(modaliteEtude: string) {
        const isPermistted = await this.roleService.isPermitted('ModaliteEtude', 'add');
        if (isPermistted) {
            this.selectedModaliteEtude = new ModaliteEtudeVo();
            this.createModaliteEtudeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateenseignementEtFormation(enseignementEtFormation: string) {
        const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'add');
        if (isPermistted) {
            this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
            this.createEnseignementEtFormationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatenatureEnseignement(natureEnseignement: string) {
        const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'add');
        if (isPermistted) {
            this.selectedNatureEnseignement = new NatureEnseignementVo();
            this.createNatureEnseignementDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateetablissement(etablissement: string) {
        const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
        if (isPermistted) {
            this.selectedEtablissement = new EtablissementVo();
            this.createEtablissementDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateenjeuxIrd(enjeuxIrd: string) {
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
        if (isPermistted) {
            this.selectedEnjeuxIrd = new EnjeuxIrdVo();
            this.createEnjeuxIrdDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateniveauEtude(niveauEtude: string) {
        const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'add');
        if (isPermistted) {
            this.selectedNiveauEtude = new NiveauEtudeVo();
            this.createNiveauEtudeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatetypeEtude(typeEtude: string) {
        const isPermistted = await this.roleService.isPermitted('TypeEtude', 'add');
        if (isPermistted) {
            this.selectedTypeEtude = new TypeEtudeVo();
            this.createTypeEtudeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatezoneGeographique(zoneGeographique: string) {
        const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
        if (isPermistted) {
            this.selectedZoneGeographique = new ZoneGeographiqueVo();
            this.createZoneGeographiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
        const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
        if (isPermistted) {
            this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
            this.createEtatEtapeCampagneDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatepays(pays: string) {
        const isPermistted = await this.roleService.isPermitted('Pays', 'add');
        if (isPermistted) {
            this.selectedPays = new PaysVo();
            this.createPaysDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatedisciplineScientifique(disciplineScientifique: string) {
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
        if (isPermistted) {
            this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
            this.createDisciplineScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    // methods

    hideCreateDialog() {
        this.createEnseignementDialog = false;
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

    get createEnseignementDialog(): boolean {
        return this.enseignementService.createEnseignementDialog;

    }
    set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog = value;
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
        this.modaliteEtudeService.createModaliteEtudeDialog = value;
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
        this.enseignementEtFormationService.createEnseignementEtFormationDialog = value;
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
        this.natureEnseignementService.createNatureEnseignementDialog = value;
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
        this.etablissementService.createEtablissementDialog = value;
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
        this.enjeuxIrdService.createEnjeuxIrdDialog = value;
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
        this.niveauEtudeService.createNiveauEtudeDialog = value;
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
        this.typeEtudeService.createTypeEtudeDialog = value;
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
        this.zoneGeographiqueService.createZoneGeographiqueDialog = value;
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
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog = value;
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
        this.paysService.createPaysDialog = value;
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
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }



    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validIntitule(): boolean {
        return this._validIntitule;
    }

    set validIntitule(value: boolean) {
        this._validIntitule = value;
    }
    get validNombreHeure(): boolean {
        return this._validNombreHeure;
    }

    set validNombreHeure(value: boolean) {
        this._validNombreHeure = value;
    }
    get validModaliteEtude(): boolean {
        return this._validModaliteEtude;
    }

    set validModaliteEtude(value: boolean) {
        this._validModaliteEtude = value;
    }
    get validTypeEtudeEnseignements(): boolean {
        return this._validTypeEtudeEnseignements;
    }

    set validTypeEtudeEnseignements(value: boolean) {
        this._validTypeEtudeEnseignements = value;
    }
    get validNiveauEtudeEnseignements(): boolean {
        return this._validNiveauEtudeEnseignements;
    }

    set validNiveauEtudeEnseignements(value: boolean) {
        this._validNiveauEtudeEnseignements = value;
    }
    get validEtablissementEnseignements(): boolean {
        return this._validEtablissementEnseignements;
    }

    set validEtablissementEnseignements(value: boolean) {
        this._validEtablissementEnseignements = value;
    }
    get validEnseignementPayss(): boolean {
        return this._validEnseignementPayss;
    }

    set validEnseignementPayss(value: boolean) {
        this._validEnseignementPayss = value;
    }
    get validEnseignementZoneGeographiques(): boolean {
        return this._validEnseignementZoneGeographiques;
    }

    set validEnseignementZoneGeographiques(value: boolean) {
        this._validEnseignementZoneGeographiques = value;
    }
    get validEnseignementEnjeuxIrds(): boolean {
        return this._validEnseignementEnjeuxIrds;
    }

    set validEnseignementEnjeuxIrds(value: boolean) {
        this._validEnseignementEnjeuxIrds = value;
    }


}
