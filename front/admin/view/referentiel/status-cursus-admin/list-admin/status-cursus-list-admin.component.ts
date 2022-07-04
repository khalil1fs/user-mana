import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {environment} from 'src/environments/environment';
import {StatusCursusVo} from 'src/app/controller/model/referentiel/StatusCursus.model';
import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {StatusCursusService} from 'src/app/controller/service/referentiel/StatusCursus.service';

@Component({
    selector: 'app-status-cursus-list-admin',
    templateUrl: './status-cursus-list-admin.component.html',
    styleUrls: ['./status-cursus-list-admin.component.css']
})
export class StatusCursusListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StatusCursus';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private statusCursusService: StatusCursusService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadStatusCursuss();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadStatusCursuss() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StatusCursus', 'list');
        isPermistted ? this.statusCursusService.findAll().subscribe(statusCursuss => this.statusCursuss = statusCursuss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.statusCursusService.findByCriteria(this.searchStatusCursus).subscribe(statusCursuss => {

            this.statusCursuss = statusCursuss;
            // this.searchStatusCursus = new StatusCursusVo();
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

    public async editStatusCursus(statusCursus: StatusCursusVo) {
        const isPermistted = await this.roleService.isPermitted('StatusCursus', 'edit');
        if (isPermistted) {
            this.statusCursusService.findByIdWithAssociatedList(statusCursus).subscribe(res => {
                this.selectedStatusCursus = res;
                this.selectedStatusCursus.dateArchivage = DateUtils.convert(this.selectedStatusCursus.dateArchivage);

                this.editStatusCursusDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewStatusCursus(statusCursus: StatusCursusVo) {
        const isPermistted = await this.roleService.isPermitted('StatusCursus', 'view');
        if (isPermistted) {
            this.statusCursusService.findByIdWithAssociatedList(statusCursus).subscribe(res => {
                this.selectedStatusCursus = res;
                this.selectedStatusCursus.dateArchivage = DateUtils.convert(this.selectedStatusCursus.dateArchivage);
                this.selectedStatusCursus.dateCreation = new Date(this.selectedStatusCursus.dateCreation);

                this.viewStatusCursusDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateStatusCursus(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedStatusCursus = new StatusCursusVo();
            this.createStatusCursusDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteStatusCursus(statusCursus: StatusCursusVo) {
        const isPermistted = await this.roleService.isPermitted('StatusCursus', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Status cursus) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.statusCursusService.delete(statusCursus).subscribe(status => {
                        if (status > 0) {
                            const position = this.statusCursuss.indexOf(statusCursus);
                            position > -1 ? this.statusCursuss.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Status cursus Supprimé',
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


    public async duplicateStatusCursus(statusCursus: StatusCursusVo) {

        this.statusCursusService.findByIdWithAssociatedList(statusCursus).subscribe(
            res => {
                this.initDuplicateStatusCursus(res);
                this.selectedStatusCursus = res;
                this.selectedStatusCursus.id = null;

                this.selectedStatusCursus.dateCreation = null;
                this.selectedStatusCursus.dateArchivage = DateUtils.convert(this.selectedStatusCursus.dateArchivage);

                this.createStatusCursusDialog = true;

            });

    }

    initDuplicateStatusCursus(res: StatusCursusVo) {


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
        this.exportData = this.statusCursuss.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchStatusCursus.libelle ? this.searchStatusCursus.libelle : environment.emptyForExport,
            'Code': this.searchStatusCursus.code ? this.searchStatusCursus.code : environment.emptyForExport,
            'Archive': this.searchStatusCursus.archive ? (this.searchStatusCursus.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchStatusCursus.dateArchivageMin ? this.datePipe.transform(this.searchStatusCursus.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchStatusCursus.dateArchivageMax ? this.datePipe.transform(this.searchStatusCursus.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchStatusCursus.dateCreationMin ? this.datePipe.transform(this.searchStatusCursus.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchStatusCursus.dateCreationMax ? this.datePipe.transform(this.searchStatusCursus.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get statusCursuss(): Array<StatusCursusVo> {
        return this.statusCursusService.statusCursuss;
    }

    set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
    }

    get statusCursusSelections(): Array<StatusCursusVo> {
        return this.statusCursusService.statusCursusSelections;
    }

    set statusCursusSelections(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursusSelections = value;
    }


    get selectedStatusCursus(): StatusCursusVo {
        return this.statusCursusService.selectedStatusCursus;
    }

    set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
    }

    get createStatusCursusDialog(): boolean {
        return this.statusCursusService.createStatusCursusDialog;
    }

    set createStatusCursusDialog(value: boolean) {
        this.statusCursusService.createStatusCursusDialog = value;
    }

    get editStatusCursusDialog(): boolean {
        return this.statusCursusService.editStatusCursusDialog;
    }

    set editStatusCursusDialog(value: boolean) {
        this.statusCursusService.editStatusCursusDialog = value;
    }

    get viewStatusCursusDialog(): boolean {
        return this.statusCursusService.viewStatusCursusDialog;
    }

    set viewStatusCursusDialog(value: boolean) {
        this.statusCursusService.viewStatusCursusDialog = value;
    }

    get searchStatusCursus(): StatusCursusVo {
        return this.statusCursusService.searchStatusCursus;
    }

    set searchStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.searchStatusCursus = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
