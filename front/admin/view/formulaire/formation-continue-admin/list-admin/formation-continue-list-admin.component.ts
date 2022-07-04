import {Component, OnInit} from '@angular/core';
import {FormationContinueService} from 'src/app/controller/service/formulaire/FormationContinue.service';
import {FormationContinueVo} from 'src/app/controller/model/formulaire/FormationContinue.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {DatePipe} from '@angular/common';

import {ModaliteFormationContinueService} from 'src/app/controller/service/referentiel/ModaliteFormationContinue.service';
import {EnseignementEtFormationService} from 'src/app/controller/service/formulaire/EnseignementEtFormation.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {EnseignementEtFormationVo} from 'src/app/controller/model/formulaire/EnseignementEtFormation.model';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {ModaliteFormationContinueVo} from 'src/app/controller/model/referentiel/ModaliteFormationContinue.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
    selector: 'app-formation-continue-list-admin',
    templateUrl: './formation-continue-list-admin.component.html',
    styleUrls: ['./formation-continue-list-admin.component.css']
})
export class FormationContinueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FormationContinue';
    modaliteFormationContinues: Array<ModaliteFormationContinueVo>;
    enseignementEtFormations: Array<EnseignementEtFormationVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private formationContinueService: FormationContinueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private modaliteFormationContinueService: ModaliteFormationContinueService
        , private enseignementEtFormationService: EnseignementEtFormationService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadFormationContinues();
        this.initExport();
        this.initCol();
        this.loadModaliteFormationContinue();
        this.loadEnseignementEtFormation();
        this.loadEtatEtapeCampagne();
    }

    // methods
    public async loadFormationContinues() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinue', 'list');
        isPermistted ? this.formationContinueService.findAll().subscribe(formationContinues => this.formationContinues = formationContinues, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.formationContinueService.findByCriteria(this.searchFormationContinue).subscribe(formationContinues => {

            this.formationContinues = formationContinues;
            // this.searchFormationContinue = new FormationContinueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'intitule', header: 'Intitule'},
            {field: 'nombreHeuresDispenseesDansAnnee', header: 'Nombre heures dispensees dans annee'},
            {field: 'modaliteFormationContinue?.libelle', header: 'Modalite formation continue'},
            {field: 'enseignementEtFormation?.id', header: 'Enseignement et formation'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }

    public async editFormationContinue(formationContinue: FormationContinueVo) {
        const isPermistted = await this.roleService.isPermitted('FormationContinue', 'edit');
        if (isPermistted) {
            this.formationContinueService.findByIdWithAssociatedList(formationContinue).subscribe(res => {
                this.selectedFormationContinue = res;
                this.editFormationContinueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewFormationContinue(formationContinue: FormationContinueVo) {
        const isPermistted = await this.roleService.isPermitted('FormationContinue', 'view');
        if (isPermistted) {
            this.formationContinueService.findByIdWithAssociatedList(formationContinue).subscribe(res => {
                this.selectedFormationContinue = res;
                this.viewFormationContinueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateFormationContinue(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedFormationContinue = new FormationContinueVo();
            this.createFormationContinueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteFormationContinue(formationContinue: FormationContinueVo) {
        const isPermistted = await this.roleService.isPermitted('FormationContinue', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Formation continue) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.formationContinueService.delete(formationContinue).subscribe(status => {
                        if (status > 0) {
                            const position = this.formationContinues.indexOf(formationContinue);
                            position > -1 ? this.formationContinues.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Formation continue Supprimé',
                                life: 3000
                            });
                        }

                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async loadModaliteFormationContinue() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinue', 'list');
        isPermistted ? this.modaliteFormationContinueService.findAll().subscribe(modaliteFormationContinues => this.modaliteFormationContinues = modaliteFormationContinues, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEnseignementEtFormation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinue', 'list');
        isPermistted ? this.enseignementEtFormationService.findAll().subscribe(enseignementEtFormations => this.enseignementEtFormations = enseignementEtFormations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinue', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateFormationContinue(formationContinue: FormationContinueVo) {

        this.formationContinueService.findByIdWithAssociatedList(formationContinue).subscribe(
            res => {
                this.initDuplicateFormationContinue(res);
                this.selectedFormationContinue = res;
                this.selectedFormationContinue.id = null;
                this.createFormationContinueDialog = true;

            });

    }

    initDuplicateFormationContinue(res: FormationContinueVo) {
        if (res.formationContinuePubliqueProfessionelsVo != null) {
            res.formationContinuePubliqueProfessionelsVo.forEach(d => {
                d.formationContinueVo = null;
                d.id = null;
            });
        }
        if (res.formationContinueObjetFormationGeneriquesVo != null) {
            res.formationContinueObjetFormationGeneriquesVo.forEach(d => {
                d.formationContinueVo = null;
                d.id = null;
            });
        }
        if (res.formationContinueEnjeuxIrdsVo != null) {
            res.formationContinueEnjeuxIrdsVo.forEach(d => {
                d.formationContinueVo = null;
                d.id = null;
            });
        }
        if (res.formationContinueDisciplineScientifiquesVo != null) {
            res.formationContinueDisciplineScientifiquesVo.forEach(d => {
                d.formationContinueVo = null;
                d.id = null;
            });
        }
        if (res.paysFormationContinuesVo != null) {
            res.paysFormationContinuesVo.forEach(d => {
                d.formationContinueVo = null;
                d.id = null;
            });
        }
        if (res.zoneGeographiqueFormationContinuesVo != null) {
            res.zoneGeographiqueFormationContinuesVo.forEach(d => {
                d.formationContinueVo = null;
                d.id = null;
            });
        }
        if (res.formationContinueEtablissementsVo != null) {
            res.formationContinueEtablissementsVo.forEach(d => {
                d.formationContinueVo = null;
                d.id = null;
            });
        }


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportCSV(this.criteriaData, this.exportData, [], [], this.fileName, '', '');
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportExcel(this.criteriaData, this.exportData, [], [], '', '', '', this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportPdf(this.criteriaData, this.exportData, [], [], '', '', '', this.fileName);
                }
            }
        ];
    }


    prepareColumnExport(): void {
        this.exportData = this.formationContinues.map(e => {
            return {
                'Intitule': e.intitule,
                'Nombre heures dispensees dans annee': e.nombreHeuresDispenseesDansAnnee,
                'Modalite formation continue': e.modaliteFormationContinueVo?.libelle,
                'Enseignement et formation': e.enseignementEtFormationVo?.id,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });

        this.criteriaData = [{
            'Intitule': this.searchFormationContinue.intitule ? this.searchFormationContinue.intitule : environment.emptyForExport,
            'Nombre heures dispensees dans annee Min': this.searchFormationContinue.nombreHeuresDispenseesDansAnneeMin ? this.searchFormationContinue.nombreHeuresDispenseesDansAnneeMin : environment.emptyForExport,
            'Nombre heures dispensees dans annee Max': this.searchFormationContinue.nombreHeuresDispenseesDansAnneeMax ? this.searchFormationContinue.nombreHeuresDispenseesDansAnneeMax : environment.emptyForExport,
            'Modalite formation continue': this.searchFormationContinue.modaliteFormationContinueVo?.libelle ? this.searchFormationContinue.modaliteFormationContinueVo?.libelle : environment.emptyForExport,
            'Enseignement et formation': this.searchFormationContinue.enseignementEtFormationVo?.id ? this.searchFormationContinue.enseignementEtFormationVo?.id : environment.emptyForExport,
            'Etat etape campagne': this.searchFormationContinue.etatEtapeCampagneVo?.libelle ? this.searchFormationContinue.etatEtapeCampagneVo?.libelle : environment.emptyForExport,
        }];

    }

    // getters and setters

    get formationContinues(): Array<FormationContinueVo> {
        return this.formationContinueService.formationContinues;
    }

    set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
    }

    get formationContinueSelections(): Array<FormationContinueVo> {
        return this.formationContinueService.formationContinueSelections;
    }

    set formationContinueSelections(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinueSelections = value;
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

    get editFormationContinueDialog(): boolean {
        return this.formationContinueService.editFormationContinueDialog;
    }

    set editFormationContinueDialog(value: boolean) {
        this.formationContinueService.editFormationContinueDialog = value;
    }

    get viewFormationContinueDialog(): boolean {
        return this.formationContinueService.viewFormationContinueDialog;
    }

    set viewFormationContinueDialog(value: boolean) {
        this.formationContinueService.viewFormationContinueDialog = value;
    }

    get searchFormationContinue(): FormationContinueVo {
        return this.formationContinueService.searchFormationContinue;
    }

    set searchFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.searchFormationContinue = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
