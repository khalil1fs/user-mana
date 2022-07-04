import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {NatureEnseignementService} from 'src/app/controller/service/referentiel/NatureEnseignement.service';
import {NatureEnseignementVo} from 'src/app/controller/model/referentiel/NatureEnseignement.model';

@Component({
    selector: 'app-nature-enseignement-list-admin',
    templateUrl: './nature-enseignement-list-admin.component.html',
    styleUrls: ['./nature-enseignement-list-admin.component.css']
})
export class NatureEnseignementListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NatureEnseignement';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private natureEnseignementService: NatureEnseignementService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadNatureEnseignements();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadNatureEnseignements() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'list');
        isPermistted ? this.natureEnseignementService.findAll().subscribe(natureEnseignements => this.natureEnseignements = natureEnseignements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.natureEnseignementService.findByCriteria(this.searchNatureEnseignement).subscribe(natureEnseignements => {

            this.natureEnseignements = natureEnseignements;
            // this.searchNatureEnseignement = new NatureEnseignementVo();
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

    public async editNatureEnseignement(natureEnseignement: NatureEnseignementVo) {
        const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'edit');
        if (isPermistted) {
            this.natureEnseignementService.findByIdWithAssociatedList(natureEnseignement).subscribe(res => {
                this.selectedNatureEnseignement = res;
                this.selectedNatureEnseignement.dateArchivage = DateUtils.convert(this.selectedNatureEnseignement.dateArchivage);

                this.editNatureEnseignementDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewNatureEnseignement(natureEnseignement: NatureEnseignementVo) {
        const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'view');
        if (isPermistted) {
            this.natureEnseignementService.findByIdWithAssociatedList(natureEnseignement).subscribe(res => {
                this.selectedNatureEnseignement = res;
                this.selectedNatureEnseignement.dateArchivage = DateUtils.convert(this.selectedNatureEnseignement.dateArchivage);
                this.selectedNatureEnseignement.dateCreation = new Date(this.selectedNatureEnseignement.dateCreation);

                this.viewNatureEnseignementDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateNatureEnseignement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedNatureEnseignement = new NatureEnseignementVo();
            this.createNatureEnseignementDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteNatureEnseignement(natureEnseignement: NatureEnseignementVo) {
        const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Nature enseignement) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.natureEnseignementService.delete(natureEnseignement).subscribe(status => {
                        if (status > 0) {
                            const position = this.natureEnseignements.indexOf(natureEnseignement);
                            position > -1 ? this.natureEnseignements.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Nature enseignement Supprimé',
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


    public async duplicateNatureEnseignement(natureEnseignement: NatureEnseignementVo) {

        this.natureEnseignementService.findByIdWithAssociatedList(natureEnseignement).subscribe(
            res => {
                this.initDuplicateNatureEnseignement(res);
                this.selectedNatureEnseignement = res;
                this.selectedNatureEnseignement.id = null;

                this.selectedNatureEnseignement.dateCreation = null;
                this.selectedNatureEnseignement.dateArchivage = DateUtils.convert(this.selectedNatureEnseignement.dateArchivage);

                this.createNatureEnseignementDialog = true;

            });

    }

    initDuplicateNatureEnseignement(res: NatureEnseignementVo) {


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
        this.exportData = this.natureEnseignements.map(e => {
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
            'Libelle': this.searchNatureEnseignement.libelle ? this.searchNatureEnseignement.libelle : environment.emptyForExport,
            'Code': this.searchNatureEnseignement.code ? this.searchNatureEnseignement.code : environment.emptyForExport,
            'Description': this.searchNatureEnseignement.description ? this.searchNatureEnseignement.description : environment.emptyForExport,
            'Archive': this.searchNatureEnseignement.archive ? (this.searchNatureEnseignement.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchNatureEnseignement.dateArchivageMin ? this.datePipe.transform(this.searchNatureEnseignement.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchNatureEnseignement.dateArchivageMax ? this.datePipe.transform(this.searchNatureEnseignement.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchNatureEnseignement.dateCreationMin ? this.datePipe.transform(this.searchNatureEnseignement.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchNatureEnseignement.dateCreationMax ? this.datePipe.transform(this.searchNatureEnseignement.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get natureEnseignements(): Array<NatureEnseignementVo> {
        return this.natureEnseignementService.natureEnseignements;
    }

    set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
    }

    get natureEnseignementSelections(): Array<NatureEnseignementVo> {
        return this.natureEnseignementService.natureEnseignementSelections;
    }

    set natureEnseignementSelections(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignementSelections = value;
    }


    get selectedNatureEnseignement(): NatureEnseignementVo {
        return this.natureEnseignementService.selectedNatureEnseignement;
    }

    set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
    }

    get createNatureEnseignementDialog(): boolean {
        return this.natureEnseignementService.createNatureEnseignementDialog;
    }

    set createNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.createNatureEnseignementDialog = value;
    }

    get editNatureEnseignementDialog(): boolean {
        return this.natureEnseignementService.editNatureEnseignementDialog;
    }

    set editNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.editNatureEnseignementDialog = value;
    }

    get viewNatureEnseignementDialog(): boolean {
        return this.natureEnseignementService.viewNatureEnseignementDialog;
    }

    set viewNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.viewNatureEnseignementDialog = value;
    }

    get searchNatureEnseignement(): NatureEnseignementVo {
        return this.natureEnseignementService.searchNatureEnseignement;
    }

    set searchNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.searchNatureEnseignement = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
