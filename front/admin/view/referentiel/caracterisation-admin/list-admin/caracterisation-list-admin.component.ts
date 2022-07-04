import {Component, OnInit} from '@angular/core';
import {CaracterisationService} from 'src/app/controller/service/referentiel/Caracterisation.service';
import {CaracterisationVo} from 'src/app/controller/model/referentiel/Caracterisation.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
    selector: 'app-caracterisation-list-admin',
    templateUrl: './caracterisation-list-admin.component.html',
    styleUrls: ['./caracterisation-list-admin.component.css']
})
export class CaracterisationListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Caracterisation';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private caracterisationService: CaracterisationService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadCaracterisations();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadCaracterisations() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Caracterisation', 'list');
        isPermistted ? this.caracterisationService.findAll().subscribe(caracterisations => this.caracterisations = caracterisations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.caracterisationService.findByCriteria(this.searchCaracterisation).subscribe(caracterisations => {

            this.caracterisations = caracterisations;
            // this.searchCaracterisation = new CaracterisationVo();
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

    public async editCaracterisation(caracterisation: CaracterisationVo) {
        const isPermistted = await this.roleService.isPermitted('Caracterisation', 'edit');
        if (isPermistted) {
            this.caracterisationService.findByIdWithAssociatedList(caracterisation).subscribe(res => {
                this.selectedCaracterisation = res;
                this.selectedCaracterisation.dateArchivage = DateUtils.convert(this.selectedCaracterisation.dateArchivage);

                this.editCaracterisationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewCaracterisation(caracterisation: CaracterisationVo) {
        const isPermistted = await this.roleService.isPermitted('Caracterisation', 'view');
        if (isPermistted) {
            this.caracterisationService.findByIdWithAssociatedList(caracterisation).subscribe(res => {
                this.selectedCaracterisation = res;
                this.selectedCaracterisation.dateArchivage = DateUtils.convert(this.selectedCaracterisation.dateArchivage);
                this.selectedCaracterisation.dateCreation = new Date(this.selectedCaracterisation.dateCreation);

                this.viewCaracterisationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCaracterisation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCaracterisation = new CaracterisationVo();
            this.createCaracterisationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteCaracterisation(caracterisation: CaracterisationVo) {
        const isPermistted = await this.roleService.isPermitted('Caracterisation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Caracterisation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.caracterisationService.delete(caracterisation).subscribe(status => {
                        if (status > 0) {
                            const position = this.caracterisations.indexOf(caracterisation);
                            position > -1 ? this.caracterisations.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Caracterisation Supprimé',
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


    public async duplicateCaracterisation(caracterisation: CaracterisationVo) {

        this.caracterisationService.findByIdWithAssociatedList(caracterisation).subscribe(
            res => {
                this.initDuplicateCaracterisation(res);
                this.selectedCaracterisation = res;
                this.selectedCaracterisation.id = null;

                this.selectedCaracterisation.dateCreation = null;
                this.selectedCaracterisation.dateArchivage = DateUtils.convert(this.selectedCaracterisation.dateArchivage);

                this.createCaracterisationDialog = true;

            });

    }

    initDuplicateCaracterisation(res: CaracterisationVo) {


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
        this.exportData = this.caracterisations.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchCaracterisation.libelle ? this.searchCaracterisation.libelle : environment.emptyForExport,
            'Code': this.searchCaracterisation.code ? this.searchCaracterisation.code : environment.emptyForExport,
            'Archive': this.searchCaracterisation.archive ? (this.searchCaracterisation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchCaracterisation.dateArchivageMin ? this.datePipe.transform(this.searchCaracterisation.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchCaracterisation.dateArchivageMax ? this.datePipe.transform(this.searchCaracterisation.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchCaracterisation.dateCreationMin ? this.datePipe.transform(this.searchCaracterisation.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchCaracterisation.dateCreationMax ? this.datePipe.transform(this.searchCaracterisation.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get caracterisations(): Array<CaracterisationVo> {
        return this.caracterisationService.caracterisations;
    }

    set caracterisations(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisations = value;
    }

    get caracterisationSelections(): Array<CaracterisationVo> {
        return this.caracterisationService.caracterisationSelections;
    }

    set caracterisationSelections(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisationSelections = value;
    }


    get selectedCaracterisation(): CaracterisationVo {
        return this.caracterisationService.selectedCaracterisation;
    }

    set selectedCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.selectedCaracterisation = value;
    }

    get createCaracterisationDialog(): boolean {
        return this.caracterisationService.createCaracterisationDialog;
    }

    set createCaracterisationDialog(value: boolean) {
        this.caracterisationService.createCaracterisationDialog = value;
    }

    get editCaracterisationDialog(): boolean {
        return this.caracterisationService.editCaracterisationDialog;
    }

    set editCaracterisationDialog(value: boolean) {
        this.caracterisationService.editCaracterisationDialog = value;
    }

    get viewCaracterisationDialog(): boolean {
        return this.caracterisationService.viewCaracterisationDialog;
    }

    set viewCaracterisationDialog(value: boolean) {
        this.caracterisationService.viewCaracterisationDialog = value;
    }

    get searchCaracterisation(): CaracterisationVo {
        return this.caracterisationService.searchCaracterisation;
    }

    set searchCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.searchCaracterisation = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
