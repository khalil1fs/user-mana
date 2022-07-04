import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {
    NiveauResponsabilitePedagogiqueService
} from 'src/app/controller/service/referentiel/NiveauResponsabilitePedagogique.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {NiveauResponsabilitePedagogiqueVo} from 'src/app/controller/model/referentiel/NiveauResponsabilitePedagogique.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-niveau-responsabilite-pedagogique-list-admin',
    templateUrl: './niveau-resp-ped-list-admin.component.html',
    styleUrls: ['./niveau-resp-ped-list-admin.component.css']
})
export class NiveauRespPedListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NiveauResponsabilitePedagogique';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadNiveauResponsabilitePedagogiques();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadNiveauResponsabilitePedagogiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'list');
        isPermistted ? this.niveauResponsabilitePedagogiqueService.findAll().subscribe(niveauResponsabilitePedagogiques => this.niveauResponsabilitePedagogiques = niveauResponsabilitePedagogiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.niveauResponsabilitePedagogiqueService.findByCriteria(this.searchNiveauResponsabilitePedagogique).subscribe(niveauResponsabilitePedagogiques => {

            this.niveauResponsabilitePedagogiques = niveauResponsabilitePedagogiques;
            // this.searchNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
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

    public async editNiveauResponsabilitePedagogique(niveauResponsabilitePedagogique: NiveauResponsabilitePedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'edit');
        if (isPermistted) {
            this.niveauResponsabilitePedagogiqueService.findByIdWithAssociatedList(niveauResponsabilitePedagogique).subscribe(res => {
                this.selectedNiveauResponsabilitePedagogique = res;
                this.selectedNiveauResponsabilitePedagogique.dateArchivage = DateUtils.convert(this.selectedNiveauResponsabilitePedagogique.dateArchivage);

                this.editNiveauResponsabilitePedagogiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewNiveauResponsabilitePedagogique(niveauResponsabilitePedagogique: NiveauResponsabilitePedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'view');
        if (isPermistted) {
            this.niveauResponsabilitePedagogiqueService.findByIdWithAssociatedList(niveauResponsabilitePedagogique).subscribe(res => {
                this.selectedNiveauResponsabilitePedagogique = res;
                this.selectedNiveauResponsabilitePedagogique.dateArchivage = DateUtils.convert(this.selectedNiveauResponsabilitePedagogique.dateArchivage);
                this.selectedNiveauResponsabilitePedagogique.dateCreation = new Date(this.selectedNiveauResponsabilitePedagogique.dateCreation);

                this.viewNiveauResponsabilitePedagogiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateNiveauResponsabilitePedagogique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
            this.createNiveauResponsabilitePedagogiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteNiveauResponsabilitePedagogique(niveauResponsabilitePedagogique: NiveauResponsabilitePedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Niveau responsabilite pedagogique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.niveauResponsabilitePedagogiqueService.delete(niveauResponsabilitePedagogique).subscribe(status => {
                        if (status > 0) {
                            const position = this.niveauResponsabilitePedagogiques.indexOf(niveauResponsabilitePedagogique);
                            position > -1 ? this.niveauResponsabilitePedagogiques.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Niveau responsabilite pedagogique Supprimé',
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


    public async duplicateNiveauResponsabilitePedagogique(niveauResponsabilitePedagogique: NiveauResponsabilitePedagogiqueVo) {

        this.niveauResponsabilitePedagogiqueService.findByIdWithAssociatedList(niveauResponsabilitePedagogique).subscribe(
            res => {
                this.initDuplicateNiveauResponsabilitePedagogique(res);
                this.selectedNiveauResponsabilitePedagogique = res;
                this.selectedNiveauResponsabilitePedagogique.id = null;

                this.selectedNiveauResponsabilitePedagogique.dateCreation = null;
                this.selectedNiveauResponsabilitePedagogique.dateArchivage = DateUtils.convert(this.selectedNiveauResponsabilitePedagogique.dateArchivage);

                this.createNiveauResponsabilitePedagogiqueDialog = true;

            });

    }

    initDuplicateNiveauResponsabilitePedagogique(res: NiveauResponsabilitePedagogiqueVo) {


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
        this.exportData = this.niveauResponsabilitePedagogiques.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchNiveauResponsabilitePedagogique.libelle ? this.searchNiveauResponsabilitePedagogique.libelle : environment.emptyForExport,
            'Code': this.searchNiveauResponsabilitePedagogique.code ? this.searchNiveauResponsabilitePedagogique.code : environment.emptyForExport,
            'Archive': this.searchNiveauResponsabilitePedagogique.archive ? (this.searchNiveauResponsabilitePedagogique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchNiveauResponsabilitePedagogique.dateArchivageMin ? this.datePipe.transform(this.searchNiveauResponsabilitePedagogique.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchNiveauResponsabilitePedagogique.dateArchivageMax ? this.datePipe.transform(this.searchNiveauResponsabilitePedagogique.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchNiveauResponsabilitePedagogique.dateCreationMin ? this.datePipe.transform(this.searchNiveauResponsabilitePedagogique.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchNiveauResponsabilitePedagogique.dateCreationMax ? this.datePipe.transform(this.searchNiveauResponsabilitePedagogique.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
        return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
    }

    set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
    }

    get niveauResponsabilitePedagogiqueSelections(): Array<NiveauResponsabilitePedagogiqueVo> {
        return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiqueSelections;
    }

    set niveauResponsabilitePedagogiqueSelections(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiqueSelections = value;
    }


    get selectedNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
        return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
    }

    set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
    }

    get createNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog;
    }

    set createNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog = value;
    }

    get editNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog;
    }

    set editNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog = value;
    }

    get viewNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this.niveauResponsabilitePedagogiqueService.viewNiveauResponsabilitePedagogiqueDialog;
    }

    set viewNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.viewNiveauResponsabilitePedagogiqueDialog = value;
    }

    get searchNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
        return this.niveauResponsabilitePedagogiqueService.searchNiveauResponsabilitePedagogique;
    }

    set searchNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.searchNiveauResponsabilitePedagogique = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
