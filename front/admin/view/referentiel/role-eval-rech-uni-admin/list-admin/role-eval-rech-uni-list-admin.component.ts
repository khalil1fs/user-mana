import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
    RoleEvaluationRechercheUniversitaireService
} from 'src/app/controller/service/referentiel/RoleEvaluationRechercheUniversitaire.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {
    RoleEvaluationRechercheUniversitaireVo
} from 'src/app/controller/model/referentiel/RoleEvaluationRechercheUniversitaire.model';
import {environment} from 'src/environments/environment';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {DateUtils} from '../../../../../../utils/DateUtils';

@Component({
    selector: 'app-role-evaluation-recherche-universitaire-list-admin',
    templateUrl: './role-eval-rech-uni-list-admin.component.html',
    styleUrls: ['./role-eval-rech-uni-list-admin.component.css']
})
export class RoleEvaluationRechercheUniversitaireListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RoleEvaluationRechercheUniversitaire';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private roleEvaluationRechercheUniversitaireService: RoleEvaluationRechercheUniversitaireService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadRoleEvaluationRechercheUniversitaires();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadRoleEvaluationRechercheUniversitaires() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RoleEvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.roleEvaluationRechercheUniversitaireService.findAll().subscribe(roleEvaluationRechercheUniversitaires => this.roleEvaluationRechercheUniversitaires = roleEvaluationRechercheUniversitaires, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.roleEvaluationRechercheUniversitaireService.findByCriteria(this.searchRoleEvaluationRechercheUniversitaire).subscribe(roleEvaluationRechercheUniversitaires => {

            this.roleEvaluationRechercheUniversitaires = roleEvaluationRechercheUniversitaires;
            // this.searchRoleEvaluationRechercheUniversitaire = new RoleEvaluationRechercheUniversitaireVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editRoleEvaluationRechercheUniversitaire(roleEvaluationRechercheUniversitaire: RoleEvaluationRechercheUniversitaireVo) {
        const isPermistted = await this.roleService.isPermitted('RoleEvaluationRechercheUniversitaire', 'edit');
        if (isPermistted) {
            this.roleEvaluationRechercheUniversitaireService.findByIdWithAssociatedList(roleEvaluationRechercheUniversitaire).subscribe(res => {
                this.selectedRoleEvaluationRechercheUniversitaire = res;
                this.selectedRoleEvaluationRechercheUniversitaire.dateArchivage = DateUtils.convert(this.selectedRoleEvaluationRechercheUniversitaire.dateArchivage);

                this.editRoleEvaluationRechercheUniversitaireDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewRoleEvaluationRechercheUniversitaire(roleEvaluationRechercheUniversitaire: RoleEvaluationRechercheUniversitaireVo) {
        const isPermistted = await this.roleService.isPermitted('RoleEvaluationRechercheUniversitaire', 'view');
        if (isPermistted) {
            this.roleEvaluationRechercheUniversitaireService.findByIdWithAssociatedList(roleEvaluationRechercheUniversitaire).subscribe(res => {
                this.selectedRoleEvaluationRechercheUniversitaire = res;
                this.selectedRoleEvaluationRechercheUniversitaire.dateArchivage = DateUtils.convert(this.selectedRoleEvaluationRechercheUniversitaire.dateArchivage);
                this.selectedRoleEvaluationRechercheUniversitaire.dateCreation = new Date(this.selectedRoleEvaluationRechercheUniversitaire.dateCreation);

                this.viewRoleEvaluationRechercheUniversitaireDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateRoleEvaluationRechercheUniversitaire(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedRoleEvaluationRechercheUniversitaire = new RoleEvaluationRechercheUniversitaireVo();
            this.createRoleEvaluationRechercheUniversitaireDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteRoleEvaluationRechercheUniversitaire(roleEvaluationRechercheUniversitaire: RoleEvaluationRechercheUniversitaireVo) {
        const isPermistted = await this.roleService.isPermitted('RoleEvaluationRechercheUniversitaire', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Role evaluation recherche universitaire) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.roleEvaluationRechercheUniversitaireService.delete(roleEvaluationRechercheUniversitaire).subscribe(status => {
                        if (status > 0) {
                            const position = this.roleEvaluationRechercheUniversitaires.indexOf(roleEvaluationRechercheUniversitaire);
                            position > -1 ? this.roleEvaluationRechercheUniversitaires.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Role evaluation recherche universitaire Supprimé',
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


    public async duplicateRoleEvaluationRechercheUniversitaire(roleEvaluationRechercheUniversitaire: RoleEvaluationRechercheUniversitaireVo) {

        this.roleEvaluationRechercheUniversitaireService.findByIdWithAssociatedList(roleEvaluationRechercheUniversitaire).subscribe(
            res => {
                this.initDuplicateRoleEvaluationRechercheUniversitaire(res);
                this.selectedRoleEvaluationRechercheUniversitaire = res;
                this.selectedRoleEvaluationRechercheUniversitaire.id = null;

                this.selectedRoleEvaluationRechercheUniversitaire.dateCreation = null;
                this.selectedRoleEvaluationRechercheUniversitaire.dateArchivage = DateUtils.convert(this.selectedRoleEvaluationRechercheUniversitaire.dateArchivage);

                this.createRoleEvaluationRechercheUniversitaireDialog = true;

            });

    }

    initDuplicateRoleEvaluationRechercheUniversitaire(res: RoleEvaluationRechercheUniversitaireVo) {


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }


    prepareColumnExport(): void {
        this.exportData = this.roleEvaluationRechercheUniversitaires.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Description': e.description,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchRoleEvaluationRechercheUniversitaire.libelle ? this.searchRoleEvaluationRechercheUniversitaire.libelle : environment.emptyForExport,
            'Code': this.searchRoleEvaluationRechercheUniversitaire.code ? this.searchRoleEvaluationRechercheUniversitaire.code : environment.emptyForExport,
            'Description': this.searchRoleEvaluationRechercheUniversitaire.description ? this.searchRoleEvaluationRechercheUniversitaire.description : environment.emptyForExport,
            'Archive': this.searchRoleEvaluationRechercheUniversitaire.archive ? (this.searchRoleEvaluationRechercheUniversitaire.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchRoleEvaluationRechercheUniversitaire.dateArchivageMin ? this.datePipe.transform(this.searchRoleEvaluationRechercheUniversitaire.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchRoleEvaluationRechercheUniversitaire.dateArchivageMax ? this.datePipe.transform(this.searchRoleEvaluationRechercheUniversitaire.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchRoleEvaluationRechercheUniversitaire.dateCreationMin ? this.datePipe.transform(this.searchRoleEvaluationRechercheUniversitaire.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchRoleEvaluationRechercheUniversitaire.dateCreationMax ? this.datePipe.transform(this.searchRoleEvaluationRechercheUniversitaire.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get roleEvaluationRechercheUniversitaires(): Array<RoleEvaluationRechercheUniversitaireVo> {
        return this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaires;
    }

    set roleEvaluationRechercheUniversitaires(value: Array<RoleEvaluationRechercheUniversitaireVo>) {
        this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaires = value;
    }

    get roleEvaluationRechercheUniversitaireSelections(): Array<RoleEvaluationRechercheUniversitaireVo> {
        return this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaireSelections;
    }

    set roleEvaluationRechercheUniversitaireSelections(value: Array<RoleEvaluationRechercheUniversitaireVo>) {
        this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaireSelections = value;
    }


    get selectedRoleEvaluationRechercheUniversitaire(): RoleEvaluationRechercheUniversitaireVo {
        return this.roleEvaluationRechercheUniversitaireService.selectedRoleEvaluationRechercheUniversitaire;
    }

    set selectedRoleEvaluationRechercheUniversitaire(value: RoleEvaluationRechercheUniversitaireVo) {
        this.roleEvaluationRechercheUniversitaireService.selectedRoleEvaluationRechercheUniversitaire = value;
    }

    get createRoleEvaluationRechercheUniversitaireDialog(): boolean {
        return this.roleEvaluationRechercheUniversitaireService.createRoleEvaluationRechercheUniversitaireDialog;
    }

    set createRoleEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.roleEvaluationRechercheUniversitaireService.createRoleEvaluationRechercheUniversitaireDialog = value;
    }

    get editRoleEvaluationRechercheUniversitaireDialog(): boolean {
        return this.roleEvaluationRechercheUniversitaireService.editRoleEvaluationRechercheUniversitaireDialog;
    }

    set editRoleEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.roleEvaluationRechercheUniversitaireService.editRoleEvaluationRechercheUniversitaireDialog = value;
    }

    get viewRoleEvaluationRechercheUniversitaireDialog(): boolean {
        return this.roleEvaluationRechercheUniversitaireService.viewRoleEvaluationRechercheUniversitaireDialog;
    }

    set viewRoleEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.roleEvaluationRechercheUniversitaireService.viewRoleEvaluationRechercheUniversitaireDialog = value;
    }

    get searchRoleEvaluationRechercheUniversitaire(): RoleEvaluationRechercheUniversitaireVo {
        return this.roleEvaluationRechercheUniversitaireService.searchRoleEvaluationRechercheUniversitaire;
    }

    set searchRoleEvaluationRechercheUniversitaire(value: RoleEvaluationRechercheUniversitaireVo) {
        this.roleEvaluationRechercheUniversitaireService.searchRoleEvaluationRechercheUniversitaire = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
