import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {RoleDeveloppementDeSavoirVo} from 'src/app/controller/model/referentiel/RoleDeveloppementDeSavoir.model';
import {environment} from 'src/environments/environment';
import {RoleDeveloppementDeSavoirService} from 'src/app/controller/service/referentiel/RoleDeveloppementDeSavoir.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-role-developpement-de-savoir-list-admin',
    templateUrl: './role-dev-de-savoir-list-admin.component.html',
    styleUrls: ['./role-dev-de-savoir-list-admin.component.css']
})
export class RoleDeveloppementDeSavoirListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RoleDeveloppementDeSavoir';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadRoleDeveloppementDeSavoirs();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadRoleDeveloppementDeSavoirs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'list');
        isPermistted ? this.roleDeveloppementDeSavoirService.findAll().subscribe(roleDeveloppementDeSavoirs => this.roleDeveloppementDeSavoirs = roleDeveloppementDeSavoirs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.roleDeveloppementDeSavoirService.findByCriteria(this.searchRoleDeveloppementDeSavoir).subscribe(roleDeveloppementDeSavoirs => {

            this.roleDeveloppementDeSavoirs = roleDeveloppementDeSavoirs;
            // this.searchRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
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

    public async editRoleDeveloppementDeSavoir(roleDeveloppementDeSavoir: RoleDeveloppementDeSavoirVo) {
        const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'edit');
        if (isPermistted) {
            this.roleDeveloppementDeSavoirService.findByIdWithAssociatedList(roleDeveloppementDeSavoir).subscribe(res => {
                this.selectedRoleDeveloppementDeSavoir = res;
                this.selectedRoleDeveloppementDeSavoir.dateArchivage = DateUtils.convert(this.selectedRoleDeveloppementDeSavoir.dateArchivage);

                this.editRoleDeveloppementDeSavoirDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewRoleDeveloppementDeSavoir(roleDeveloppementDeSavoir: RoleDeveloppementDeSavoirVo) {
        const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'view');
        if (isPermistted) {
            this.roleDeveloppementDeSavoirService.findByIdWithAssociatedList(roleDeveloppementDeSavoir).subscribe(res => {
                this.selectedRoleDeveloppementDeSavoir = res;
                this.selectedRoleDeveloppementDeSavoir.dateArchivage = DateUtils.convert(this.selectedRoleDeveloppementDeSavoir.dateArchivage);
                this.selectedRoleDeveloppementDeSavoir.dateCreation = new Date(this.selectedRoleDeveloppementDeSavoir.dateCreation);

                this.viewRoleDeveloppementDeSavoirDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateRoleDeveloppementDeSavoir(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
            this.createRoleDeveloppementDeSavoirDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteRoleDeveloppementDeSavoir(roleDeveloppementDeSavoir: RoleDeveloppementDeSavoirVo) {
        const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Role developpement de savoir) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.roleDeveloppementDeSavoirService.delete(roleDeveloppementDeSavoir).subscribe(status => {
                        if (status > 0) {
                            const position = this.roleDeveloppementDeSavoirs.indexOf(roleDeveloppementDeSavoir);
                            position > -1 ? this.roleDeveloppementDeSavoirs.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Role developpement de savoir Supprimé',
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


    public async duplicateRoleDeveloppementDeSavoir(roleDeveloppementDeSavoir: RoleDeveloppementDeSavoirVo) {

        this.roleDeveloppementDeSavoirService.findByIdWithAssociatedList(roleDeveloppementDeSavoir).subscribe(
            res => {
                this.initDuplicateRoleDeveloppementDeSavoir(res);
                this.selectedRoleDeveloppementDeSavoir = res;
                this.selectedRoleDeveloppementDeSavoir.id = null;

                this.selectedRoleDeveloppementDeSavoir.dateCreation = null;
                this.selectedRoleDeveloppementDeSavoir.dateArchivage = DateUtils.convert(this.selectedRoleDeveloppementDeSavoir.dateArchivage);

                this.createRoleDeveloppementDeSavoirDialog = true;

            });

    }

    initDuplicateRoleDeveloppementDeSavoir(res: RoleDeveloppementDeSavoirVo) {


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
        this.exportData = this.roleDeveloppementDeSavoirs.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchRoleDeveloppementDeSavoir.libelle ? this.searchRoleDeveloppementDeSavoir.libelle : environment.emptyForExport,
            'Code': this.searchRoleDeveloppementDeSavoir.code ? this.searchRoleDeveloppementDeSavoir.code : environment.emptyForExport,
            'Archive': this.searchRoleDeveloppementDeSavoir.archive ? (this.searchRoleDeveloppementDeSavoir.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchRoleDeveloppementDeSavoir.dateArchivageMin ? this.datePipe.transform(this.searchRoleDeveloppementDeSavoir.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchRoleDeveloppementDeSavoir.dateArchivageMax ? this.datePipe.transform(this.searchRoleDeveloppementDeSavoir.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchRoleDeveloppementDeSavoir.dateCreationMin ? this.datePipe.transform(this.searchRoleDeveloppementDeSavoir.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchRoleDeveloppementDeSavoir.dateCreationMax ? this.datePipe.transform(this.searchRoleDeveloppementDeSavoir.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
        return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
    }

    set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
    }

    get roleDeveloppementDeSavoirSelections(): Array<RoleDeveloppementDeSavoirVo> {
        return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirSelections;
    }

    set roleDeveloppementDeSavoirSelections(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirSelections = value;
    }


    get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
        return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
    }

    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
    }

    get createRoleDeveloppementDeSavoirDialog(): boolean {
        return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;
    }

    set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog = value;
    }

    get editRoleDeveloppementDeSavoirDialog(): boolean {
        return this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog;
    }

    set editRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog = value;
    }

    get viewRoleDeveloppementDeSavoirDialog(): boolean {
        return this.roleDeveloppementDeSavoirService.viewRoleDeveloppementDeSavoirDialog;
    }

    set viewRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.viewRoleDeveloppementDeSavoirDialog = value;
    }

    get searchRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
        return this.roleDeveloppementDeSavoirService.searchRoleDeveloppementDeSavoir;
    }

    set searchRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.searchRoleDeveloppementDeSavoir = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
