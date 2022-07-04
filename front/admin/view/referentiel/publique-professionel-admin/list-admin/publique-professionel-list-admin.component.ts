import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {PubliqueProfessionelVo} from 'src/app/controller/model/referentiel/PubliqueProfessionel.model';
import {environment} from 'src/environments/environment';
import {PubliqueProfessionelService} from 'src/app/controller/service/referentiel/PubliqueProfessionel.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-publique-professionel-list-admin',
    templateUrl: './publique-professionel-list-admin.component.html',
    styleUrls: ['./publique-professionel-list-admin.component.css']
})
export class PubliqueProfessionelListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PubliqueProfessionel';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private publiqueProfessionelService: PubliqueProfessionelService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadPubliqueProfessionels();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadPubliqueProfessionels() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'list');
        isPermistted ? this.publiqueProfessionelService.findAll().subscribe(publiqueProfessionels => this.publiqueProfessionels = publiqueProfessionels, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.publiqueProfessionelService.findByCriteria(this.searchPubliqueProfessionel).subscribe(publiqueProfessionels => {

            this.publiqueProfessionels = publiqueProfessionels;
            // this.searchPubliqueProfessionel = new PubliqueProfessionelVo();
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

    public async editPubliqueProfessionel(publiqueProfessionel: PubliqueProfessionelVo) {
        const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'edit');
        if (isPermistted) {
            this.publiqueProfessionelService.findByIdWithAssociatedList(publiqueProfessionel).subscribe(res => {
                this.selectedPubliqueProfessionel = res;
                this.selectedPubliqueProfessionel.dateArchivage = DateUtils.convert(this.selectedPubliqueProfessionel.dateArchivage);

                this.editPubliqueProfessionelDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewPubliqueProfessionel(publiqueProfessionel: PubliqueProfessionelVo) {
        const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'view');
        if (isPermistted) {
            this.publiqueProfessionelService.findByIdWithAssociatedList(publiqueProfessionel).subscribe(res => {
                this.selectedPubliqueProfessionel = res;
                this.selectedPubliqueProfessionel.dateArchivage = DateUtils.convert(this.selectedPubliqueProfessionel.dateArchivage);
                this.selectedPubliqueProfessionel.dateCreation = new Date(this.selectedPubliqueProfessionel.dateCreation);

                this.viewPubliqueProfessionelDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreatePubliqueProfessionel(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
            this.createPubliqueProfessionelDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deletePubliqueProfessionel(publiqueProfessionel: PubliqueProfessionelVo) {
        const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Publique professionel) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.publiqueProfessionelService.delete(publiqueProfessionel).subscribe(status => {
                        if (status > 0) {
                            const position = this.publiqueProfessionels.indexOf(publiqueProfessionel);
                            position > -1 ? this.publiqueProfessionels.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Publique professionel Supprimé',
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


    public async duplicatePubliqueProfessionel(publiqueProfessionel: PubliqueProfessionelVo) {

        this.publiqueProfessionelService.findByIdWithAssociatedList(publiqueProfessionel).subscribe(
            res => {
                this.initDuplicatePubliqueProfessionel(res);
                this.selectedPubliqueProfessionel = res;
                this.selectedPubliqueProfessionel.id = null;

                this.selectedPubliqueProfessionel.dateCreation = null;
                this.selectedPubliqueProfessionel.dateArchivage = DateUtils.convert(this.selectedPubliqueProfessionel.dateArchivage);

                this.createPubliqueProfessionelDialog = true;

            });

    }

    initDuplicatePubliqueProfessionel(res: PubliqueProfessionelVo) {


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
        this.exportData = this.publiqueProfessionels.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchPubliqueProfessionel.libelle ? this.searchPubliqueProfessionel.libelle : environment.emptyForExport,
            'Code': this.searchPubliqueProfessionel.code ? this.searchPubliqueProfessionel.code : environment.emptyForExport,
            'Archive': this.searchPubliqueProfessionel.archive ? (this.searchPubliqueProfessionel.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchPubliqueProfessionel.dateArchivageMin ? this.datePipe.transform(this.searchPubliqueProfessionel.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchPubliqueProfessionel.dateArchivageMax ? this.datePipe.transform(this.searchPubliqueProfessionel.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchPubliqueProfessionel.dateCreationMin ? this.datePipe.transform(this.searchPubliqueProfessionel.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchPubliqueProfessionel.dateCreationMax ? this.datePipe.transform(this.searchPubliqueProfessionel.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
        return this.publiqueProfessionelService.publiqueProfessionels;
    }

    set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
    }

    get publiqueProfessionelSelections(): Array<PubliqueProfessionelVo> {
        return this.publiqueProfessionelService.publiqueProfessionelSelections;
    }

    set publiqueProfessionelSelections(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionelSelections = value;
    }


    get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
        return this.publiqueProfessionelService.selectedPubliqueProfessionel;
    }

    set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
    }

    get createPubliqueProfessionelDialog(): boolean {
        return this.publiqueProfessionelService.createPubliqueProfessionelDialog;
    }

    set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog = value;
    }

    get editPubliqueProfessionelDialog(): boolean {
        return this.publiqueProfessionelService.editPubliqueProfessionelDialog;
    }

    set editPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.editPubliqueProfessionelDialog = value;
    }

    get viewPubliqueProfessionelDialog(): boolean {
        return this.publiqueProfessionelService.viewPubliqueProfessionelDialog;
    }

    set viewPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.viewPubliqueProfessionelDialog = value;
    }

    get searchPubliqueProfessionel(): PubliqueProfessionelVo {
        return this.publiqueProfessionelService.searchPubliqueProfessionel;
    }

    set searchPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.searchPubliqueProfessionel = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
