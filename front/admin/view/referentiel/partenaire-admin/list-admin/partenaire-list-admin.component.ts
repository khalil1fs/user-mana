import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {PartenaireVo} from 'src/app/controller/model/referentiel/Partenaire.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {PartenaireService} from 'src/app/controller/service/referentiel/Partenaire.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-partenaire-list-admin',
    templateUrl: './partenaire-list-admin.component.html',
    styleUrls: ['./partenaire-list-admin.component.css']
})
export class PartenaireListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Partenaire';
    yesOrNoArchive: any[] = [];
    paysPartenaires: Array<PaysVo>;


    constructor(private datePipe: DatePipe, private partenaireService: PartenaireService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private paysService: PaysService
    ) {
    }

    ngOnInit(): void {
        this.loadPartenaires();
        this.initExport();
        this.initCol();
        this.loadPaysPartenaire();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadPartenaires() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Partenaire', 'list');
        isPermistted ? this.partenaireService.findAll().subscribe(partenaires => this.partenaires = partenaires, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.partenaireService.findByCriteria(this.searchPartenaire).subscribe(partenaires => {

            this.partenaires = partenaires;
            // this.searchPartenaire = new PartenaireVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'sigleOfficel', header: 'Sigle officel'},
            {field: 'nomOfficel', header: 'Nom officel'},
            {field: 'paysPartenaire?.libelle', header: 'Pays partenaire'},
            {field: 'typePartenaire', header: 'Type partenaire'},
            {field: 'idGraphQl', header: 'Id graph ql'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editPartenaire(partenaire: PartenaireVo) {
        const isPermistted = await this.roleService.isPermitted('Partenaire', 'edit');
        if (isPermistted) {
            this.partenaireService.findByIdWithAssociatedList(partenaire).subscribe(res => {
                this.selectedPartenaire = res;
                this.selectedPartenaire.dateArchivage = DateUtils.convert(this.selectedPartenaire.dateArchivage);

                this.editPartenaireDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewPartenaire(partenaire: PartenaireVo) {
        const isPermistted = await this.roleService.isPermitted('Partenaire', 'view');
        if (isPermistted) {
            this.partenaireService.findByIdWithAssociatedList(partenaire).subscribe(res => {
                this.selectedPartenaire = res;
                this.selectedPartenaire.dateArchivage = DateUtils.convert(this.selectedPartenaire.dateArchivage);
                this.selectedPartenaire.dateCreation = new Date(this.selectedPartenaire.dateCreation);

                this.viewPartenaireDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreatePartenaire(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPartenaire = new PartenaireVo();
            this.createPartenaireDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deletePartenaire(partenaire: PartenaireVo) {
        const isPermistted = await this.roleService.isPermitted('Partenaire', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Partenaire) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.partenaireService.delete(partenaire).subscribe(status => {
                        if (status > 0) {
                            const position = this.partenaires.indexOf(partenaire);
                            position > -1 ? this.partenaires.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Partenaire Supprimé',
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

    public async loadPaysPartenaire() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Partenaire', 'list');
        isPermistted ? this.paysService.findAll().subscribe(paysPartenaires => this.paysPartenaires = paysPartenaires, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicatePartenaire(partenaire: PartenaireVo) {

        this.partenaireService.findByIdWithAssociatedList(partenaire).subscribe(
            res => {
                this.initDuplicatePartenaire(res);
                this.selectedPartenaire = res;
                this.selectedPartenaire.id = null;

                this.selectedPartenaire.dateCreation = null;
                this.selectedPartenaire.dateArchivage = DateUtils.convert(this.selectedPartenaire.dateArchivage);

                this.createPartenaireDialog = true;

            });

    }

    initDuplicatePartenaire(res: PartenaireVo) {


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
        this.exportData = this.partenaires.map(e => {
            return {
                'Sigle officel': e.sigleOfficel,
                'Nom officel': e.nomOfficel,
                'Adresse': e.adresse,
                'Pays partenaire': e.paysPartenaireVo?.libelle,
                'Type partenaire': e.typePartenaire,
                'Id graph ql': e.idGraphQl,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Sigle officel': this.searchPartenaire.sigleOfficel ? this.searchPartenaire.sigleOfficel : environment.emptyForExport,
            'Nom officel': this.searchPartenaire.nomOfficel ? this.searchPartenaire.nomOfficel : environment.emptyForExport,
            'Adresse': this.searchPartenaire.adresse ? this.searchPartenaire.adresse : environment.emptyForExport,
            'Pays partenaire': this.searchPartenaire.paysPartenaireVo?.libelle ? this.searchPartenaire.paysPartenaireVo?.libelle : environment.emptyForExport,
            'Type partenaire': this.searchPartenaire.typePartenaire ? this.searchPartenaire.typePartenaire : environment.emptyForExport,
            'Id graph ql': this.searchPartenaire.idGraphQl ? this.searchPartenaire.idGraphQl : environment.emptyForExport,
            'Archive': this.searchPartenaire.archive ? (this.searchPartenaire.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchPartenaire.dateArchivageMin ? this.datePipe.transform(this.searchPartenaire.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchPartenaire.dateArchivageMax ? this.datePipe.transform(this.searchPartenaire.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchPartenaire.dateCreationMin ? this.datePipe.transform(this.searchPartenaire.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchPartenaire.dateCreationMax ? this.datePipe.transform(this.searchPartenaire.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get partenaires(): Array<PartenaireVo> {
        return this.partenaireService.partenaires;
    }

    set partenaires(value: Array<PartenaireVo>) {
        this.partenaireService.partenaires = value;
    }

    get partenaireSelections(): Array<PartenaireVo> {
        return this.partenaireService.partenaireSelections;
    }

    set partenaireSelections(value: Array<PartenaireVo>) {
        this.partenaireService.partenaireSelections = value;
    }


    get selectedPartenaire(): PartenaireVo {
        return this.partenaireService.selectedPartenaire;
    }

    set selectedPartenaire(value: PartenaireVo) {
        this.partenaireService.selectedPartenaire = value;
    }

    get createPartenaireDialog(): boolean {
        return this.partenaireService.createPartenaireDialog;
    }

    set createPartenaireDialog(value: boolean) {
        this.partenaireService.createPartenaireDialog = value;
    }

    get editPartenaireDialog(): boolean {
        return this.partenaireService.editPartenaireDialog;
    }

    set editPartenaireDialog(value: boolean) {
        this.partenaireService.editPartenaireDialog = value;
    }

    get viewPartenaireDialog(): boolean {
        return this.partenaireService.viewPartenaireDialog;
    }

    set viewPartenaireDialog(value: boolean) {
        this.partenaireService.viewPartenaireDialog = value;
    }

    get searchPartenaire(): PartenaireVo {
        return this.partenaireService.searchPartenaire;
    }

    set searchPartenaire(value: PartenaireVo) {
        this.partenaireService.searchPartenaire = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
