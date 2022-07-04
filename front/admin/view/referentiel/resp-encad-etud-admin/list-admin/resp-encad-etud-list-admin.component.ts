import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {
    ResponsabiliteEncadrementEtudiantService
} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementEtudiant.service';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ResponsabiliteEncadrementEtudiantVo} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementEtudiant.model';

@Component({
    selector: 'app-responsabilite-encadrement-etudiant-list-admin',
    templateUrl: './resp-encad-etud-list-admin.component.html',
    styleUrls: ['./resp-encad-etud-list-admin.component.css']
})
export class ResponsabiliteEncadrementEtudiantListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ResponsabiliteEncadrementEtudiant';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private responsabiliteEncadrementEtudiantService: ResponsabiliteEncadrementEtudiantService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadResponsabiliteEncadrementEtudiants();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadResponsabiliteEncadrementEtudiants() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementEtudiant', 'list');
        isPermistted ? this.responsabiliteEncadrementEtudiantService.findAll().subscribe(responsabiliteEncadrementEtudiants => this.responsabiliteEncadrementEtudiants = responsabiliteEncadrementEtudiants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.responsabiliteEncadrementEtudiantService.findByCriteria(this.searchResponsabiliteEncadrementEtudiant).subscribe(responsabiliteEncadrementEtudiants => {

            this.responsabiliteEncadrementEtudiants = responsabiliteEncadrementEtudiants;
            // this.searchResponsabiliteEncadrementEtudiant = new ResponsabiliteEncadrementEtudiantVo();
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

    public async editResponsabiliteEncadrementEtudiant(responsabiliteEncadrementEtudiant: ResponsabiliteEncadrementEtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementEtudiant', 'edit');
        if (isPermistted) {
            this.responsabiliteEncadrementEtudiantService.findByIdWithAssociatedList(responsabiliteEncadrementEtudiant).subscribe(res => {
                this.selectedResponsabiliteEncadrementEtudiant = res;
                this.selectedResponsabiliteEncadrementEtudiant.dateArchivage = DateUtils.convert(this.selectedResponsabiliteEncadrementEtudiant.dateArchivage);

                this.editResponsabiliteEncadrementEtudiantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewResponsabiliteEncadrementEtudiant(responsabiliteEncadrementEtudiant: ResponsabiliteEncadrementEtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementEtudiant', 'view');
        if (isPermistted) {
            this.responsabiliteEncadrementEtudiantService.findByIdWithAssociatedList(responsabiliteEncadrementEtudiant).subscribe(res => {
                this.selectedResponsabiliteEncadrementEtudiant = res;
                this.selectedResponsabiliteEncadrementEtudiant.dateArchivage = DateUtils.convert(this.selectedResponsabiliteEncadrementEtudiant.dateArchivage);
                this.selectedResponsabiliteEncadrementEtudiant.dateCreation = new Date(this.selectedResponsabiliteEncadrementEtudiant.dateCreation);

                this.viewResponsabiliteEncadrementEtudiantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateResponsabiliteEncadrementEtudiant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedResponsabiliteEncadrementEtudiant = new ResponsabiliteEncadrementEtudiantVo();
            this.createResponsabiliteEncadrementEtudiantDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteResponsabiliteEncadrementEtudiant(responsabiliteEncadrementEtudiant: ResponsabiliteEncadrementEtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementEtudiant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Responsabilite encadrement etudiant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.responsabiliteEncadrementEtudiantService.delete(responsabiliteEncadrementEtudiant).subscribe(status => {
                        if (status > 0) {
                            const position = this.responsabiliteEncadrementEtudiants.indexOf(responsabiliteEncadrementEtudiant);
                            position > -1 ? this.responsabiliteEncadrementEtudiants.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Responsabilite encadrement etudiant Supprimé',
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


    public async duplicateResponsabiliteEncadrementEtudiant(responsabiliteEncadrementEtudiant: ResponsabiliteEncadrementEtudiantVo) {

        this.responsabiliteEncadrementEtudiantService.findByIdWithAssociatedList(responsabiliteEncadrementEtudiant).subscribe(
            res => {
                this.initDuplicateResponsabiliteEncadrementEtudiant(res);
                this.selectedResponsabiliteEncadrementEtudiant = res;
                this.selectedResponsabiliteEncadrementEtudiant.id = null;

                this.selectedResponsabiliteEncadrementEtudiant.dateCreation = null;
                this.selectedResponsabiliteEncadrementEtudiant.dateArchivage = DateUtils.convert(this.selectedResponsabiliteEncadrementEtudiant.dateArchivage);

                this.createResponsabiliteEncadrementEtudiantDialog = true;

            });

    }

    initDuplicateResponsabiliteEncadrementEtudiant(res: ResponsabiliteEncadrementEtudiantVo) {


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
        this.exportData = this.responsabiliteEncadrementEtudiants.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchResponsabiliteEncadrementEtudiant.libelle ? this.searchResponsabiliteEncadrementEtudiant.libelle : environment.emptyForExport,
            'Code': this.searchResponsabiliteEncadrementEtudiant.code ? this.searchResponsabiliteEncadrementEtudiant.code : environment.emptyForExport,
            'Archive': this.searchResponsabiliteEncadrementEtudiant.archive ? (this.searchResponsabiliteEncadrementEtudiant.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchResponsabiliteEncadrementEtudiant.dateArchivageMin ? this.datePipe.transform(this.searchResponsabiliteEncadrementEtudiant.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchResponsabiliteEncadrementEtudiant.dateArchivageMax ? this.datePipe.transform(this.searchResponsabiliteEncadrementEtudiant.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchResponsabiliteEncadrementEtudiant.dateCreationMin ? this.datePipe.transform(this.searchResponsabiliteEncadrementEtudiant.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchResponsabiliteEncadrementEtudiant.dateCreationMax ? this.datePipe.transform(this.searchResponsabiliteEncadrementEtudiant.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get responsabiliteEncadrementEtudiants(): Array<ResponsabiliteEncadrementEtudiantVo> {
        return this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants;
    }

    set responsabiliteEncadrementEtudiants(value: Array<ResponsabiliteEncadrementEtudiantVo>) {
        this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants = value;
    }

    get responsabiliteEncadrementEtudiantSelections(): Array<ResponsabiliteEncadrementEtudiantVo> {
        return this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiantSelections;
    }

    set responsabiliteEncadrementEtudiantSelections(value: Array<ResponsabiliteEncadrementEtudiantVo>) {
        this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiantSelections = value;
    }


    get selectedResponsabiliteEncadrementEtudiant(): ResponsabiliteEncadrementEtudiantVo {
        return this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant;
    }

    set selectedResponsabiliteEncadrementEtudiant(value: ResponsabiliteEncadrementEtudiantVo) {
        this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant = value;
    }

    get createResponsabiliteEncadrementEtudiantDialog(): boolean {
        return this.responsabiliteEncadrementEtudiantService.createResponsabiliteEncadrementEtudiantDialog;
    }

    set createResponsabiliteEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteEncadrementEtudiantService.createResponsabiliteEncadrementEtudiantDialog = value;
    }

    get editResponsabiliteEncadrementEtudiantDialog(): boolean {
        return this.responsabiliteEncadrementEtudiantService.editResponsabiliteEncadrementEtudiantDialog;
    }

    set editResponsabiliteEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteEncadrementEtudiantService.editResponsabiliteEncadrementEtudiantDialog = value;
    }

    get viewResponsabiliteEncadrementEtudiantDialog(): boolean {
        return this.responsabiliteEncadrementEtudiantService.viewResponsabiliteEncadrementEtudiantDialog;
    }

    set viewResponsabiliteEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteEncadrementEtudiantService.viewResponsabiliteEncadrementEtudiantDialog = value;
    }

    get searchResponsabiliteEncadrementEtudiant(): ResponsabiliteEncadrementEtudiantVo {
        return this.responsabiliteEncadrementEtudiantService.searchResponsabiliteEncadrementEtudiant;
    }

    set searchResponsabiliteEncadrementEtudiant(value: ResponsabiliteEncadrementEtudiantVo) {
        this.responsabiliteEncadrementEtudiantService.searchResponsabiliteEncadrementEtudiant = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
