import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {NiveauFormationPostBacVo} from 'src/app/controller/model/referentiel/NiveauFormationPostBac.model';
import {environment} from 'src/environments/environment';
import {NiveauFormationPostBacService} from 'src/app/controller/service/referentiel/NiveauFormationPostBac.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-niveau-formation-post-bac-list-admin',
    templateUrl: './niveau-formation-post-bac-list-admin.component.html',
    styleUrls: ['./niveau-formation-post-bac-list-admin.component.css']
})
export class NiveauFormationPostBacListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NiveauFormationPostBac';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private niveauFormationPostBacService: NiveauFormationPostBacService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadNiveauFormationPostBacs();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadNiveauFormationPostBacs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'list');
        isPermistted ? this.niveauFormationPostBacService.findAll().subscribe(niveauFormationPostBacs => this.niveauFormationPostBacs = niveauFormationPostBacs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.niveauFormationPostBacService.findByCriteria(this.searchNiveauFormationPostBac).subscribe(niveauFormationPostBacs => {

            this.niveauFormationPostBacs = niveauFormationPostBacs;
            // this.searchNiveauFormationPostBac = new NiveauFormationPostBacVo();
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

    public async editNiveauFormationPostBac(niveauFormationPostBac: NiveauFormationPostBacVo) {
        const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'edit');
        if (isPermistted) {
            this.niveauFormationPostBacService.findByIdWithAssociatedList(niveauFormationPostBac).subscribe(res => {
                this.selectedNiveauFormationPostBac = res;
                this.selectedNiveauFormationPostBac.dateArchivage = DateUtils.convert(this.selectedNiveauFormationPostBac.dateArchivage);

                this.editNiveauFormationPostBacDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewNiveauFormationPostBac(niveauFormationPostBac: NiveauFormationPostBacVo) {
        const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'view');
        if (isPermistted) {
            this.niveauFormationPostBacService.findByIdWithAssociatedList(niveauFormationPostBac).subscribe(res => {
                this.selectedNiveauFormationPostBac = res;
                this.selectedNiveauFormationPostBac.dateArchivage = DateUtils.convert(this.selectedNiveauFormationPostBac.dateArchivage);
                this.selectedNiveauFormationPostBac.dateCreation = new Date(this.selectedNiveauFormationPostBac.dateCreation);

                this.viewNiveauFormationPostBacDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateNiveauFormationPostBac(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();
            this.createNiveauFormationPostBacDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteNiveauFormationPostBac(niveauFormationPostBac: NiveauFormationPostBacVo) {
        const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Niveau formation post bac) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.niveauFormationPostBacService.delete(niveauFormationPostBac).subscribe(status => {
                        if (status > 0) {
                            const position = this.niveauFormationPostBacs.indexOf(niveauFormationPostBac);
                            position > -1 ? this.niveauFormationPostBacs.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Niveau formation post bac Supprimé',
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


    public async duplicateNiveauFormationPostBac(niveauFormationPostBac: NiveauFormationPostBacVo) {

        this.niveauFormationPostBacService.findByIdWithAssociatedList(niveauFormationPostBac).subscribe(
            res => {
                this.initDuplicateNiveauFormationPostBac(res);
                this.selectedNiveauFormationPostBac = res;
                this.selectedNiveauFormationPostBac.id = null;

                this.selectedNiveauFormationPostBac.dateCreation = null;
                this.selectedNiveauFormationPostBac.dateArchivage = DateUtils.convert(this.selectedNiveauFormationPostBac.dateArchivage);

                this.createNiveauFormationPostBacDialog = true;

            });

    }

    initDuplicateNiveauFormationPostBac(res: NiveauFormationPostBacVo) {


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
        this.exportData = this.niveauFormationPostBacs.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchNiveauFormationPostBac.libelle ? this.searchNiveauFormationPostBac.libelle : environment.emptyForExport,
            'Code': this.searchNiveauFormationPostBac.code ? this.searchNiveauFormationPostBac.code : environment.emptyForExport,
            'Archive': this.searchNiveauFormationPostBac.archive ? (this.searchNiveauFormationPostBac.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchNiveauFormationPostBac.dateArchivageMin ? this.datePipe.transform(this.searchNiveauFormationPostBac.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchNiveauFormationPostBac.dateArchivageMax ? this.datePipe.transform(this.searchNiveauFormationPostBac.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchNiveauFormationPostBac.dateCreationMin ? this.datePipe.transform(this.searchNiveauFormationPostBac.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchNiveauFormationPostBac.dateCreationMax ? this.datePipe.transform(this.searchNiveauFormationPostBac.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
        return this.niveauFormationPostBacService.niveauFormationPostBacs;
    }

    set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
    }

    get niveauFormationPostBacSelections(): Array<NiveauFormationPostBacVo> {
        return this.niveauFormationPostBacService.niveauFormationPostBacSelections;
    }

    set niveauFormationPostBacSelections(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacSelections = value;
    }


    get selectedNiveauFormationPostBac(): NiveauFormationPostBacVo {
        return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
    }

    set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
    }

    get createNiveauFormationPostBacDialog(): boolean {
        return this.niveauFormationPostBacService.createNiveauFormationPostBacDialog;
    }

    set createNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.createNiveauFormationPostBacDialog = value;
    }

    get editNiveauFormationPostBacDialog(): boolean {
        return this.niveauFormationPostBacService.editNiveauFormationPostBacDialog;
    }

    set editNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.editNiveauFormationPostBacDialog = value;
    }

    get viewNiveauFormationPostBacDialog(): boolean {
        return this.niveauFormationPostBacService.viewNiveauFormationPostBacDialog;
    }

    set viewNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.viewNiveauFormationPostBacDialog = value;
    }

    get searchNiveauFormationPostBac(): NiveauFormationPostBacVo {
        return this.niveauFormationPostBacService.searchNiveauFormationPostBac;
    }

    set searchNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.searchNiveauFormationPostBac = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
