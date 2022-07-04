import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {StatusContratEtConventionVo} from 'src/app/controller/model/referentiel/StatusContratEtConvention.model';
import {environment} from 'src/environments/environment';
import {StatusContratEtConventionService} from 'src/app/controller/service/referentiel/StatusContratEtConvention.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-status-contrat-et-convention-list-admin',
    templateUrl: './status-cont-conv-list-admin.component.html',
    styleUrls: ['./status-cont-conv-list-admin.component.css']
})
export class StatusContratEtConventionListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StatusContratEtConvention';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private statusContratEtConventionService: StatusContratEtConventionService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadStatusContratEtConventions();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadStatusContratEtConventions() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'list');
        isPermistted ? this.statusContratEtConventionService.findAll().subscribe(statusContratEtConventions => this.statusContratEtConventions = statusContratEtConventions, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.statusContratEtConventionService.findByCriteria(this.searchStatusContratEtConvention).subscribe(statusContratEtConventions => {

            this.statusContratEtConventions = statusContratEtConventions;
            // this.searchStatusContratEtConvention = new StatusContratEtConventionVo();
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

    public async editStatusContratEtConvention(statusContratEtConvention: StatusContratEtConventionVo) {
        const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'edit');
        if (isPermistted) {
            this.statusContratEtConventionService.findByIdWithAssociatedList(statusContratEtConvention).subscribe(res => {
                this.selectedStatusContratEtConvention = res;
                this.selectedStatusContratEtConvention.dateArchivage = DateUtils.convert(this.selectedStatusContratEtConvention.dateArchivage);

                this.editStatusContratEtConventionDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewStatusContratEtConvention(statusContratEtConvention: StatusContratEtConventionVo) {
        const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'view');
        if (isPermistted) {
            this.statusContratEtConventionService.findByIdWithAssociatedList(statusContratEtConvention).subscribe(res => {
                this.selectedStatusContratEtConvention = res;
                this.selectedStatusContratEtConvention.dateArchivage = DateUtils.convert(this.selectedStatusContratEtConvention.dateArchivage);
                this.selectedStatusContratEtConvention.dateCreation = new Date(this.selectedStatusContratEtConvention.dateCreation);

                this.viewStatusContratEtConventionDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateStatusContratEtConvention(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();
            this.createStatusContratEtConventionDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteStatusContratEtConvention(statusContratEtConvention: StatusContratEtConventionVo) {
        const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Status contrat et convention) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.statusContratEtConventionService.delete(statusContratEtConvention).subscribe(status => {
                        if (status > 0) {
                            const position = this.statusContratEtConventions.indexOf(statusContratEtConvention);
                            position > -1 ? this.statusContratEtConventions.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Status contrat et convention Supprimé',
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


    public async duplicateStatusContratEtConvention(statusContratEtConvention: StatusContratEtConventionVo) {

        this.statusContratEtConventionService.findByIdWithAssociatedList(statusContratEtConvention).subscribe(
            res => {
                this.initDuplicateStatusContratEtConvention(res);
                this.selectedStatusContratEtConvention = res;
                this.selectedStatusContratEtConvention.id = null;

                this.selectedStatusContratEtConvention.dateCreation = null;
                this.selectedStatusContratEtConvention.dateArchivage = DateUtils.convert(this.selectedStatusContratEtConvention.dateArchivage);

                this.createStatusContratEtConventionDialog = true;

            });

    }

    initDuplicateStatusContratEtConvention(res: StatusContratEtConventionVo) {


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
        this.exportData = this.statusContratEtConventions.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchStatusContratEtConvention.libelle ? this.searchStatusContratEtConvention.libelle : environment.emptyForExport,
            'Code': this.searchStatusContratEtConvention.code ? this.searchStatusContratEtConvention.code : environment.emptyForExport,
            'Archive': this.searchStatusContratEtConvention.archive ? (this.searchStatusContratEtConvention.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchStatusContratEtConvention.dateArchivageMin ? this.datePipe.transform(this.searchStatusContratEtConvention.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchStatusContratEtConvention.dateArchivageMax ? this.datePipe.transform(this.searchStatusContratEtConvention.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchStatusContratEtConvention.dateCreationMin ? this.datePipe.transform(this.searchStatusContratEtConvention.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchStatusContratEtConvention.dateCreationMax ? this.datePipe.transform(this.searchStatusContratEtConvention.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
        return this.statusContratEtConventionService.statusContratEtConventions;
    }

    set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
    }

    get statusContratEtConventionSelections(): Array<StatusContratEtConventionVo> {
        return this.statusContratEtConventionService.statusContratEtConventionSelections;
    }

    set statusContratEtConventionSelections(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventionSelections = value;
    }


    get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
        return this.statusContratEtConventionService.selectedStatusContratEtConvention;
    }

    set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
    }

    get createStatusContratEtConventionDialog(): boolean {
        return this.statusContratEtConventionService.createStatusContratEtConventionDialog;
    }

    set createStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.createStatusContratEtConventionDialog = value;
    }

    get editStatusContratEtConventionDialog(): boolean {
        return this.statusContratEtConventionService.editStatusContratEtConventionDialog;
    }

    set editStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.editStatusContratEtConventionDialog = value;
    }

    get viewStatusContratEtConventionDialog(): boolean {
        return this.statusContratEtConventionService.viewStatusContratEtConventionDialog;
    }

    set viewStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.viewStatusContratEtConventionDialog = value;
    }

    get searchStatusContratEtConvention(): StatusContratEtConventionVo {
        return this.statusContratEtConventionService.searchStatusContratEtConvention;
    }

    set searchStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.searchStatusContratEtConvention = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
