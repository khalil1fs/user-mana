import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
    ResponsabiliteEncadrementDoctorantService
} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementDoctorant.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {
    ResponsabiliteEncadrementDoctorantVo
} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementDoctorant.model';
import {environment} from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
    selector: 'app-responsabilite-encadrement-doctorant-list-admin',
    templateUrl: './res-enca-doc-list-admin.component.html',
    styleUrls: ['./res-enca-doc-list-admin.component.css']
})
export class ResponsabiliteEncadrementDoctorantListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ResponsabiliteEncadrementDoctorant';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadResponsabiliteEncadrementDoctorants();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadResponsabiliteEncadrementDoctorants() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementDoctorant', 'list');
        isPermistted ? this.responsabiliteEncadrementDoctorantService.findAll().subscribe(responsabiliteEncadrementDoctorants => this.responsabiliteEncadrementDoctorants = responsabiliteEncadrementDoctorants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.responsabiliteEncadrementDoctorantService.findByCriteria(this.searchResponsabiliteEncadrementDoctorant).subscribe(responsabiliteEncadrementDoctorants => {

            this.responsabiliteEncadrementDoctorants = responsabiliteEncadrementDoctorants;
            // this.searchResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();
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

    public async editResponsabiliteEncadrementDoctorant(responsabiliteEncadrementDoctorant: ResponsabiliteEncadrementDoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementDoctorant', 'edit');
        if (isPermistted) {
            this.responsabiliteEncadrementDoctorantService.findByIdWithAssociatedList(responsabiliteEncadrementDoctorant).subscribe(res => {
                this.selectedResponsabiliteEncadrementDoctorant = res;
                this.selectedResponsabiliteEncadrementDoctorant.dateArchivage = DateUtils.convert(this.selectedResponsabiliteEncadrementDoctorant.dateArchivage);

                this.editResponsabiliteEncadrementDoctorantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewResponsabiliteEncadrementDoctorant(responsabiliteEncadrementDoctorant: ResponsabiliteEncadrementDoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementDoctorant', 'view');
        if (isPermistted) {
            this.responsabiliteEncadrementDoctorantService.findByIdWithAssociatedList(responsabiliteEncadrementDoctorant).subscribe(res => {
                this.selectedResponsabiliteEncadrementDoctorant = res;
                this.selectedResponsabiliteEncadrementDoctorant.dateArchivage = DateUtils.convert(this.selectedResponsabiliteEncadrementDoctorant.dateArchivage);
                this.selectedResponsabiliteEncadrementDoctorant.dateCreation = new Date(this.selectedResponsabiliteEncadrementDoctorant.dateCreation);

                this.viewResponsabiliteEncadrementDoctorantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateResponsabiliteEncadrementDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();
            this.createResponsabiliteEncadrementDoctorantDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteResponsabiliteEncadrementDoctorant(responsabiliteEncadrementDoctorant: ResponsabiliteEncadrementDoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementDoctorant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Responsabilite encadrement doctorant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.responsabiliteEncadrementDoctorantService.delete(responsabiliteEncadrementDoctorant).subscribe(status => {
                        if (status > 0) {
                            const position = this.responsabiliteEncadrementDoctorants.indexOf(responsabiliteEncadrementDoctorant);
                            position > -1 ? this.responsabiliteEncadrementDoctorants.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Responsabilite encadrement doctorant Supprimé',
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


    public async duplicateResponsabiliteEncadrementDoctorant(responsabiliteEncadrementDoctorant: ResponsabiliteEncadrementDoctorantVo) {

        this.responsabiliteEncadrementDoctorantService.findByIdWithAssociatedList(responsabiliteEncadrementDoctorant).subscribe(
            res => {
                this.initDuplicateResponsabiliteEncadrementDoctorant(res);
                this.selectedResponsabiliteEncadrementDoctorant = res;
                this.selectedResponsabiliteEncadrementDoctorant.id = null;

                this.selectedResponsabiliteEncadrementDoctorant.dateCreation = null;
                this.selectedResponsabiliteEncadrementDoctorant.dateArchivage = DateUtils.convert(this.selectedResponsabiliteEncadrementDoctorant.dateArchivage);

                this.createResponsabiliteEncadrementDoctorantDialog = true;

            });

    }

    initDuplicateResponsabiliteEncadrementDoctorant(res: ResponsabiliteEncadrementDoctorantVo) {


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
        this.exportData = this.responsabiliteEncadrementDoctorants.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchResponsabiliteEncadrementDoctorant.libelle ? this.searchResponsabiliteEncadrementDoctorant.libelle : environment.emptyForExport,
            'Code': this.searchResponsabiliteEncadrementDoctorant.code ? this.searchResponsabiliteEncadrementDoctorant.code : environment.emptyForExport,
            'Archive': this.searchResponsabiliteEncadrementDoctorant.archive ? (this.searchResponsabiliteEncadrementDoctorant.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchResponsabiliteEncadrementDoctorant.dateArchivageMin ? this.datePipe.transform(this.searchResponsabiliteEncadrementDoctorant.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchResponsabiliteEncadrementDoctorant.dateArchivageMax ? this.datePipe.transform(this.searchResponsabiliteEncadrementDoctorant.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchResponsabiliteEncadrementDoctorant.dateCreationMin ? this.datePipe.transform(this.searchResponsabiliteEncadrementDoctorant.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchResponsabiliteEncadrementDoctorant.dateCreationMax ? this.datePipe.transform(this.searchResponsabiliteEncadrementDoctorant.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
        return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
    }

    set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
    }

    get responsabiliteEncadrementDoctorantSelections(): Array<ResponsabiliteEncadrementDoctorantVo> {
        return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorantSelections;
    }

    set responsabiliteEncadrementDoctorantSelections(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorantSelections = value;
    }


    get selectedResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
        return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
    }

    set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
    }

    get createResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog;
    }

    set createResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog = value;
    }

    get editResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this.responsabiliteEncadrementDoctorantService.editResponsabiliteEncadrementDoctorantDialog;
    }

    set editResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.editResponsabiliteEncadrementDoctorantDialog = value;
    }

    get viewResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this.responsabiliteEncadrementDoctorantService.viewResponsabiliteEncadrementDoctorantDialog;
    }

    set viewResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.viewResponsabiliteEncadrementDoctorantDialog = value;
    }

    get searchResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
        return this.responsabiliteEncadrementDoctorantService.searchResponsabiliteEncadrementDoctorant;
    }

    set searchResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.searchResponsabiliteEncadrementDoctorant = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
