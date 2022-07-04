import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {ObjetFormationGeneriqueService} from 'src/app/controller/service/referentiel/ObjetFormationGenerique.service';
import {ObjetFormationGeneriqueVo} from 'src/app/controller/model/referentiel/ObjetFormationGenerique.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-objet-formation-generique-list-admin',
    templateUrl: './objet-formation-generique-list-admin.component.html',
    styleUrls: ['./objet-formation-generique-list-admin.component.css']
})
export class ObjetFormationGeneriqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ObjetFormationGenerique';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private objetFormationGeneriqueService: ObjetFormationGeneriqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadObjetFormationGeneriques();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadObjetFormationGeneriques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'list');
        isPermistted ? this.objetFormationGeneriqueService.findAll().subscribe(objetFormationGeneriques => this.objetFormationGeneriques = objetFormationGeneriques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.objetFormationGeneriqueService.findByCriteria(this.searchObjetFormationGenerique).subscribe(objetFormationGeneriques => {

            this.objetFormationGeneriques = objetFormationGeneriques;
            // this.searchObjetFormationGenerique = new ObjetFormationGeneriqueVo();
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

    public async editObjetFormationGenerique(objetFormationGenerique: ObjetFormationGeneriqueVo) {
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'edit');
        if (isPermistted) {
            this.objetFormationGeneriqueService.findByIdWithAssociatedList(objetFormationGenerique).subscribe(res => {
                this.selectedObjetFormationGenerique = res;
                this.selectedObjetFormationGenerique.dateArchivage = DateUtils.convert(this.selectedObjetFormationGenerique.dateArchivage);

                this.editObjetFormationGeneriqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewObjetFormationGenerique(objetFormationGenerique: ObjetFormationGeneriqueVo) {
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'view');
        if (isPermistted) {
            this.objetFormationGeneriqueService.findByIdWithAssociatedList(objetFormationGenerique).subscribe(res => {
                this.selectedObjetFormationGenerique = res;
                this.selectedObjetFormationGenerique.dateArchivage = DateUtils.convert(this.selectedObjetFormationGenerique.dateArchivage);
                this.selectedObjetFormationGenerique.dateCreation = new Date(this.selectedObjetFormationGenerique.dateCreation);

                this.viewObjetFormationGeneriqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateObjetFormationGenerique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
            this.createObjetFormationGeneriqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteObjetFormationGenerique(objetFormationGenerique: ObjetFormationGeneriqueVo) {
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Objet formation generique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.objetFormationGeneriqueService.delete(objetFormationGenerique).subscribe(status => {
                        if (status > 0) {
                            const position = this.objetFormationGeneriques.indexOf(objetFormationGenerique);
                            position > -1 ? this.objetFormationGeneriques.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Objet formation generique Supprimé',
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


    public async duplicateObjetFormationGenerique(objetFormationGenerique: ObjetFormationGeneriqueVo) {

        this.objetFormationGeneriqueService.findByIdWithAssociatedList(objetFormationGenerique).subscribe(
            res => {
                this.initDuplicateObjetFormationGenerique(res);
                this.selectedObjetFormationGenerique = res;
                this.selectedObjetFormationGenerique.id = null;

                this.selectedObjetFormationGenerique.dateCreation = null;
                this.selectedObjetFormationGenerique.dateArchivage = DateUtils.convert(this.selectedObjetFormationGenerique.dateArchivage);

                this.createObjetFormationGeneriqueDialog = true;

            });

    }

    initDuplicateObjetFormationGenerique(res: ObjetFormationGeneriqueVo) {


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
        this.exportData = this.objetFormationGeneriques.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchObjetFormationGenerique.libelle ? this.searchObjetFormationGenerique.libelle : environment.emptyForExport,
            'Code': this.searchObjetFormationGenerique.code ? this.searchObjetFormationGenerique.code : environment.emptyForExport,
            'Archive': this.searchObjetFormationGenerique.archive ? (this.searchObjetFormationGenerique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchObjetFormationGenerique.dateArchivageMin ? this.datePipe.transform(this.searchObjetFormationGenerique.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchObjetFormationGenerique.dateArchivageMax ? this.datePipe.transform(this.searchObjetFormationGenerique.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchObjetFormationGenerique.dateCreationMin ? this.datePipe.transform(this.searchObjetFormationGenerique.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchObjetFormationGenerique.dateCreationMax ? this.datePipe.transform(this.searchObjetFormationGenerique.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
        return this.objetFormationGeneriqueService.objetFormationGeneriques;
    }

    set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
    }

    get objetFormationGeneriqueSelections(): Array<ObjetFormationGeneriqueVo> {
        return this.objetFormationGeneriqueService.objetFormationGeneriqueSelections;
    }

    set objetFormationGeneriqueSelections(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriqueSelections = value;
    }


    get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
        return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
    }

    set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
    }

    get createObjetFormationGeneriqueDialog(): boolean {
        return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;
    }

    set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog = value;
    }

    get editObjetFormationGeneriqueDialog(): boolean {
        return this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog;
    }

    set editObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog = value;
    }

    get viewObjetFormationGeneriqueDialog(): boolean {
        return this.objetFormationGeneriqueService.viewObjetFormationGeneriqueDialog;
    }

    set viewObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.viewObjetFormationGeneriqueDialog = value;
    }

    get searchObjetFormationGenerique(): ObjetFormationGeneriqueVo {
        return this.objetFormationGeneriqueService.searchObjetFormationGenerique;
    }

    set searchObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.searchObjetFormationGenerique = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
