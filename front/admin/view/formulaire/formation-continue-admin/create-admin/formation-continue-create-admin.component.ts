import { Component, OnInit, Input } from '@angular/core';
import { FormationContinueService } from 'src/app/controller/service/formulaire/FormationContinue.service';
import { FormationContinueVo } from 'src/app/controller/model/formulaire/FormationContinue.model';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';


import { PaysFormationContinueVo } from 'src/app/controller/model/formulaire/PaysFormationContinue.model';
import { PaysFormationContinueService } from 'src/app/controller/service/formulaire/PaysFormationContinue.service';
import { EnseignementEtFormationVo } from 'src/app/controller/model/formulaire/EnseignementEtFormation.model';
import { EnseignementEtFormationService } from 'src/app/controller/service/formulaire/EnseignementEtFormation.service';
import { PubliqueProfessionelVo } from 'src/app/controller/model/referentiel/PubliqueProfessionel.model';
import { PubliqueProfessionelService } from 'src/app/controller/service/referentiel/PubliqueProfessionel.service';
import { FormationContinueObjetFormationGeneriqueVo } from 'src/app/controller/model/formulaire/FormationContinueObjetFormationGenerique.model';
import { FormationContinueObjetFormationGeneriqueService } from 'src/app/controller/service/formulaire/FormationContinueObjetFormationGenerique.service';
import { EtablissementVo } from 'src/app/controller/model/referentiel/Etablissement.model';
import { EtablissementService } from 'src/app/controller/service/referentiel/Etablissement.service';
import { ModaliteFormationContinueVo } from 'src/app/controller/model/referentiel/ModaliteFormationContinue.model';
import { ModaliteFormationContinueService } from 'src/app/controller/service/referentiel/ModaliteFormationContinue.service';
import { DisciplineScientifiqueVo } from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import { DisciplineScientifiqueService } from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import { ZoneGeographiqueVo } from 'src/app/controller/model/referentiel/ZoneGeographique.model';
import { ZoneGeographiqueService } from 'src/app/controller/service/referentiel/ZoneGeographique.service';
import { FormationContinueEtablissementVo } from 'src/app/controller/model/formulaire/FormationContinueEtablissement.model';
import { FormationContinueEtablissementService } from 'src/app/controller/service/formulaire/FormationContinueEtablissement.service';
import { FormationContinueDisciplineScientifiqueVo } from 'src/app/controller/model/formulaire/FormationContinueDisciplineScientifique.model';
import { FormationContinueDisciplineScientifiqueService } from 'src/app/controller/service/formulaire/FormationContinueDisciplineScientifique.service';
import { EtatEtapeCampagneVo } from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import { EtatEtapeCampagneService } from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import { FormationContinueEnjeuxIrdVo } from 'src/app/controller/model/formulaire/FormationContinueEnjeuxIrd.model';
import { FormationContinueEnjeuxIrdService } from 'src/app/controller/service/formulaire/FormationContinueEnjeuxIrd.service';
import { EnjeuxIrdVo } from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import { EnjeuxIrdService } from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import { FormationContinuePubliqueProfessionelVo } from 'src/app/controller/model/formulaire/FormationContinuePubliqueProfessionel.model';
import { FormationContinuePubliqueProfessionelService } from 'src/app/controller/service/formulaire/FormationContinuePubliqueProfessionel.service';
import { PaysVo } from 'src/app/controller/model/referentiel/Pays.model';
import { PaysService } from 'src/app/controller/service/referentiel/Pays.service';
import { ObjetFormationGeneriqueVo } from 'src/app/controller/model/referentiel/ObjetFormationGenerique.model';
import { ObjetFormationGeneriqueService } from 'src/app/controller/service/referentiel/ObjetFormationGenerique.service';
import { ZoneGeographiqueFormationContinueVo } from 'src/app/controller/model/formulaire/ZoneGeographiqueFormationContinue.model';
import { ZoneGeographiqueFormationContinueService } from 'src/app/controller/service/formulaire/ZoneGeographiqueFormationContinue.service';
@Component({
    selector: 'app-formation-continue-create-admin',
    templateUrl: './formation-continue-create-admin.component.html',
    styleUrls: ['./formation-continue-create-admin.component.css']
})
export class FormationContinueCreateAdminComponent implements OnInit {

    selectedFormationContinueEtablissements: FormationContinueEtablissementVo = new FormationContinueEtablissementVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

    _validIntitule = true;
    _validFormationContinuePubliqueProfessionels = true;
    _validNombreHeuresDispenseesDansAnnee = true;
    _validModaliteFormationContinue = true;
    _validFormationContinueEnjeuxIrds = true;
    _validPaysFormationContinues = true;
    _validZoneGeographiqueFormationContinues = true;
    _validFormationContinueEtablissements = true;
    
    selectedFormationContinuePubliqueProfessionels: FormationContinuePubliqueProfessionelVo = new FormationContinuePubliqueProfessionelVo();
    selectedFormationContinueObjetFormationGeneriques: FormationContinueObjetFormationGeneriqueVo = new FormationContinueObjetFormationGeneriqueVo();
    selectedFormationContinueEnjeuxIrds: FormationContinueEnjeuxIrdVo= new FormationContinueEnjeuxIrdVo();
    selectedFormationContinueDisciplineScientifiques:FormationContinueDisciplineScientifiqueVo = new FormationContinueDisciplineScientifiqueVo();
    selectedPaysFormationContinues:PaysFormationContinueVo= new PaysFormationContinueVo();
    selectedZoneGeographiqueFormationContinues: ZoneGeographiqueFormationContinueVo = new ZoneGeographiqueFormationContinueVo();
    selectedFormationContinues:FormationContinueVo=new FormationContinueVo();
   
    constructor(private datePipe: DatePipe, private formationContinueService: FormationContinueService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router

        , private paysFormationContinueService: PaysFormationContinueService
        , private enseignementEtFormationService: EnseignementEtFormationService
        , private publiqueProfessionelService: PubliqueProfessionelService
        , private formationContinueObjetFormationGeneriqueService: FormationContinueObjetFormationGeneriqueService
        , private etablissementService: EtablissementService
        , private modaliteFormationContinueService: ModaliteFormationContinueService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private zoneGeographiqueService: ZoneGeographiqueService
        , private formationContinueEtablissementService: FormationContinueEtablissementService
        , private formationContinueDisciplineScientifiqueService: FormationContinueDisciplineScientifiqueService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private formationContinueEnjeuxIrdService: FormationContinueEnjeuxIrdService
        , private enjeuxIrdService: EnjeuxIrdService
        , private formationContinuePubliqueProfessionelService: FormationContinuePubliqueProfessionelService
        , private paysService: PaysService
        , private objetFormationGeneriqueService: ObjetFormationGeneriqueService
        , private zoneGeographiqueFormationContinueService: ZoneGeographiqueFormationContinueService
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

    prepareFormationContinuePubliqueProfessionels(publiqueProfessionels: Array<PubliqueProfessionelVo>): void {
        if (publiqueProfessionels != null) {
            publiqueProfessionels.forEach(e => {
                const formationContinuePubliqueProfessionel = new FormationContinuePubliqueProfessionelVo();
                formationContinuePubliqueProfessionel.publiqueProfessionelVo = e;
                this.selectedFormationContinues.formationContinuePubliqueProfessionelsVo.push(formationContinuePubliqueProfessionel);
            });
        }
    }
    prepareFormationContinueObjetFormationGeneriques(objetFormationGeneriques: Array<ObjetFormationGeneriqueVo>): void {
        if (objetFormationGeneriques != null) {
            objetFormationGeneriques.forEach(e => {
                const formationContinueObjetFormationGenerique = new FormationContinueObjetFormationGeneriqueVo();
                formationContinueObjetFormationGenerique.objetFormationGeneriqueVo = e;
                this.selectedFormationContinues.formationContinueObjetFormationGeneriquesVo.push(formationContinueObjetFormationGenerique);
            });
        }
    }
    prepareFormationContinueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void {
        if (enjeuxIrds != null) {
            enjeuxIrds.forEach(e => {
                const formationContinueEnjeuxIrd = new FormationContinueEnjeuxIrdVo();
                formationContinueEnjeuxIrd.enjeuxIrdVo = e;
                this.selectedFormationContinues.formationContinueEnjeuxIrdsVo.push(formationContinueEnjeuxIrd);
            });
        }
    }
    prepareFormationContinueDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void {
        if (disciplineScientifiques != null) {
            disciplineScientifiques.forEach(e => {
                const formationContinueDisciplineScientifique = new FormationContinueDisciplineScientifiqueVo();
                formationContinueDisciplineScientifique.disciplineScientifiqueVo = e;
                this.selectedFormationContinues.formationContinueDisciplineScientifiquesVo.push(formationContinueDisciplineScientifique);
            });
        }
    }
    preparePaysFormationContinues(payss: Array<PaysVo>): void {
        if (payss != null) {
            payss.forEach(e => {
                const paysFormationContinue = new PaysFormationContinueVo();
                paysFormationContinue.paysVo = e;
                this.selectedFormationContinues.paysFormationContinuesVo.push(paysFormationContinue);
            });
        }
    }
    prepareZoneGeographiqueFormationContinues(zoneGeographiques: Array<ZoneGeographiqueVo>): void {
        if (zoneGeographiques != null) {
            zoneGeographiques.forEach(e => {
                const zoneGeographiqueFormationContinue = new ZoneGeographiqueFormationContinueVo();
                zoneGeographiqueFormationContinue.zoneGeographiqueVo = e;
                this.selectedFormationContinues.zoneGeographiqueFormationContinuesVo.push(zoneGeographiqueFormationContinue);
            });
        }
    }

    addFormationContinueEtablissements() {
        if (this.selectedFormationContinue.formationContinueEtablissementsVo == null) {
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
        this.formationContinueService.save().subscribe(formationContinue => {
            this.formationContinues.push({ ...formationContinue });
            this.createFormationContinueDialog = false;
            this.submitted = false;
            this.selectedFormationContinue = new FormationContinueVo();


        }, error => {
            console.log(error);
        });

    }
    //validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateIntitule();
        this.validateFormationContinuePubliqueProfessionels();
        this.validateNombreHeuresDispenseesDansAnnee();
        this.validateModaliteFormationContinue();
        this.validateFormationContinueEnjeuxIrds();
        this.validatePaysFormationContinues();
        this.validateZoneGeographiqueFormationContinues();
        this.validateFormationContinueEtablissements();
    }

    private validateIntitule() {
        if (this.selectedFormationContinue.intitule == null) {
            this.errorMessages.push('Intitule non valide');
            this.validIntitule = false;
        } else {
            this.validIntitule = true;
        }
    }
    private validateFormationContinuePubliqueProfessionels() {
        if (this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo == null || this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo.length === 0) {
            this.errorMessages.push('FormationContinuePubliqueProfessionels non valide');
            this.validFormationContinuePubliqueProfessionels = false;
        } else {
            this.validFormationContinuePubliqueProfessionels = true;
        }
    }
    private validateNombreHeuresDispenseesDansAnnee() {
        if (this.selectedFormationContinue.nombreHeuresDispenseesDansAnnee == null) {
            this.errorMessages.push('NombreHeuresDispenseesDansAnnee non valide');
            this.validNombreHeuresDispenseesDansAnnee = false;
        } else {
            this.validNombreHeuresDispenseesDansAnnee = true;
        }
    }
    private validateModaliteFormationContinue() {
        if (this.selectedFormationContinue.modaliteFormationContinueVo == null) {
            this.errorMessages.push('ModaliteFormationContinue non valide');
            this.validModaliteFormationContinue = false;
        } else {
            this.validModaliteFormationContinue = true;
        }
    }
    private validateFormationContinueEnjeuxIrds() {
        if (this.selectedFormationContinue.formationContinueEnjeuxIrdsVo == null || this.selectedFormationContinue.formationContinueEnjeuxIrdsVo.length === 0) {
            this.errorMessages.push('FormationContinueEnjeuxIrds non valide');
            this.validFormationContinueEnjeuxIrds = false;
        } else {
            this.validFormationContinueEnjeuxIrds = true;
        }
    }
    private validatePaysFormationContinues() {
        if (this.selectedFormationContinue.paysFormationContinuesVo == null || this.selectedFormationContinue.paysFormationContinuesVo.length === 0) {
            this.errorMessages.push('PaysFormationContinues non valide');
            this.validPaysFormationContinues = false;
        } else {
            this.validPaysFormationContinues = true;
        }
    }
    private validateZoneGeographiqueFormationContinues() {
        if (this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo == null || this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.length === 0) {
            this.errorMessages.push('ZoneGeographiqueFormationContinues non valide');
            this.validZoneGeographiqueFormationContinues = false;
        } else {
            this.validZoneGeographiqueFormationContinues = true;
        }
    }
    private validateFormationContinueEtablissements() {
        if (this.selectedFormationContinue.formationContinueEtablissementsVo == null || this.selectedFormationContinue.formationContinueEtablissementsVo.length === 0) {
            this.errorMessages.push('FormationContinueEtablissements non valide');
            this.validFormationContinueEtablissements = false;
        } else {
            this.validFormationContinueEtablissements = true;
        }
    }

    //openPopup
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
    public async openCreateobjetFormationGenerique(objetFormationGenerique: string) {
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'add');
        if (isPermistted) {
            this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
            this.createObjetFormationGeneriqueDialog = true;
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
    public async openCreatemodaliteFormationContinue(modaliteFormationContinue: string) {
        const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'add');
        if (isPermistted) {
            this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
            this.createModaliteFormationContinueDialog = true;
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
    public async openCreatepubliqueProfessionel(publiqueProfessionel: string) {
        const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'add');
        if (isPermistted) {
            this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
            this.createPubliqueProfessionelDialog = true;
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
    // methods

    hideCreateDialog() {
        this.createFormationContinueDialog = false;
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

    get createFormationContinueDialog(): boolean {
        return this.formationContinueService.createFormationContinueDialog;

    }
    set createFormationContinueDialog(value: boolean) {
        this.formationContinueService.createFormationContinueDialog = value;
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
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog = value;
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
        this.modaliteFormationContinueService.createModaliteFormationContinueDialog = value;
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
        this.publiqueProfessionelService.createPubliqueProfessionelDialog = value;
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
    get validFormationContinuePubliqueProfessionels(): boolean {
        return this._validFormationContinuePubliqueProfessionels;
    }

    set validFormationContinuePubliqueProfessionels(value: boolean) {
        this._validFormationContinuePubliqueProfessionels = value;
    }
    get validNombreHeuresDispenseesDansAnnee(): boolean {
        return this._validNombreHeuresDispenseesDansAnnee;
    }

    set validNombreHeuresDispenseesDansAnnee(value: boolean) {
        this._validNombreHeuresDispenseesDansAnnee = value;
    }
    get validModaliteFormationContinue(): boolean {
        return this._validModaliteFormationContinue;
    }

    set validModaliteFormationContinue(value: boolean) {
        this._validModaliteFormationContinue = value;
    }
    get validFormationContinueEnjeuxIrds(): boolean {
        return this._validFormationContinueEnjeuxIrds;
    }

    set validFormationContinueEnjeuxIrds(value: boolean) {
        this._validFormationContinueEnjeuxIrds = value;
    }
    get validPaysFormationContinues(): boolean {
        return this._validPaysFormationContinues;
    }

    set validPaysFormationContinues(value: boolean) {
        this._validPaysFormationContinues = value;
    }
    get validZoneGeographiqueFormationContinues(): boolean {
        return this._validZoneGeographiqueFormationContinues;
    }

    set validZoneGeographiqueFormationContinues(value: boolean) {
        this._validZoneGeographiqueFormationContinues = value;
    }
    get validFormationContinueEtablissements(): boolean {
        return this._validFormationContinueEtablissements;
    }

    set validFormationContinueEtablissements(value: boolean) {
        this._validFormationContinueEtablissements = value;
    }


}
