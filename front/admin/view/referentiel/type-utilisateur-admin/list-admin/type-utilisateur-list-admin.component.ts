import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {TypeUtilisateurService} from 'src/app/controller/service/referentiel/TypeUtilisateur.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {TypeUtilisateurVo} from 'src/app/controller/model/referentiel/TypeUtilisateur.model';
import {DateUtils} from '../../../../../../utils/DateUtils';

@Component({
    selector: 'app-type-utilisateur-list-admin',
    templateUrl: './type-utilisateur-list-admin.component.html',
    styleUrls: ['./type-utilisateur-list-admin.component.css']
})
export class TypeUtilisateurListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeUtilisateur';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private typeUtilisateurService: TypeUtilisateurService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadTypeUtilisateurs();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadTypeUtilisateurs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeUtilisateur', 'list');
        isPermistted ? this.typeUtilisateurService.findAll().subscribe(typeUtilisateurs => this.typeUtilisateurs = typeUtilisateurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.typeUtilisateurService.findByCriteria(this.searchTypeUtilisateur).subscribe(typeUtilisateurs => {

            this.typeUtilisateurs = typeUtilisateurs;
            // this.searchTypeUtilisateur = new TypeUtilisateurVo();
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

    public async editTypeUtilisateur(typeUtilisateur: TypeUtilisateurVo) {
        const isPermistted = await this.roleService.isPermitted('TypeUtilisateur', 'edit');
        if (isPermistted) {
            this.typeUtilisateurService.findByIdWithAssociatedList(typeUtilisateur).subscribe(res => {
                this.selectedTypeUtilisateur = res;
                this.selectedTypeUtilisateur.dateArchivage = DateUtils.convert(this.selectedTypeUtilisateur.dateArchivage);

                this.editTypeUtilisateurDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewTypeUtilisateur(typeUtilisateur: TypeUtilisateurVo) {
        const isPermistted = await this.roleService.isPermitted('TypeUtilisateur', 'view');
        if (isPermistted) {
            this.typeUtilisateurService.findByIdWithAssociatedList(typeUtilisateur).subscribe(res => {
                this.selectedTypeUtilisateur = res;
                this.selectedTypeUtilisateur.dateArchivage = new Date(this.selectedTypeUtilisateur.dateArchivage);
                this.selectedTypeUtilisateur.dateCreation = new Date(this.selectedTypeUtilisateur.dateCreation);

                this.viewTypeUtilisateurDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateTypeUtilisateur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedTypeUtilisateur = new TypeUtilisateurVo();
            this.createTypeUtilisateurDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteTypeUtilisateur(typeUtilisateur: TypeUtilisateurVo) {
        const isPermistted = await this.roleService.isPermitted('TypeUtilisateur', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Type utilisateur) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.typeUtilisateurService.delete(typeUtilisateur).subscribe(status => {
                        if (status > 0) {
                            const position = this.typeUtilisateurs.indexOf(typeUtilisateur);
                            position > -1 ? this.typeUtilisateurs.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Type utilisateur Supprimé',
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


    public async duplicateTypeUtilisateur(typeUtilisateur: TypeUtilisateurVo) {

        this.typeUtilisateurService.findByIdWithAssociatedList(typeUtilisateur).subscribe(
            res => {
                this.initDuplicateTypeUtilisateur(res);
                this.selectedTypeUtilisateur = res;
                this.selectedTypeUtilisateur.id = null;

                this.selectedTypeUtilisateur.dateCreation = null;
                this.selectedTypeUtilisateur.dateArchivage = new Date(this.selectedTypeUtilisateur.dateArchivage);

                this.createTypeUtilisateurDialog = true;

            });

    }

    initDuplicateTypeUtilisateur(res: TypeUtilisateurVo) {


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
        this.exportData = this.typeUtilisateurs.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchTypeUtilisateur.libelle ? this.searchTypeUtilisateur.libelle : environment.emptyForExport,
            'Code': this.searchTypeUtilisateur.code ? this.searchTypeUtilisateur.code : environment.emptyForExport,
            'Archive': this.searchTypeUtilisateur.archive ? (this.searchTypeUtilisateur.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchTypeUtilisateur.dateArchivageMin ? this.datePipe.transform(this.searchTypeUtilisateur.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchTypeUtilisateur.dateArchivageMax ? this.datePipe.transform(this.searchTypeUtilisateur.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchTypeUtilisateur.dateCreationMin ? this.datePipe.transform(this.searchTypeUtilisateur.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchTypeUtilisateur.dateCreationMax ? this.datePipe.transform(this.searchTypeUtilisateur.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get typeUtilisateurs(): Array<TypeUtilisateurVo> {
        return this.typeUtilisateurService.typeUtilisateurs;
    }

    set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
    }

    get typeUtilisateurSelections(): Array<TypeUtilisateurVo> {
        return this.typeUtilisateurService.typeUtilisateurSelections;
    }

    set typeUtilisateurSelections(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurSelections = value;
    }


    get selectedTypeUtilisateur(): TypeUtilisateurVo {
        return this.typeUtilisateurService.selectedTypeUtilisateur;
    }

    set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
    }

    get createTypeUtilisateurDialog(): boolean {
        return this.typeUtilisateurService.createTypeUtilisateurDialog;
    }

    set createTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.createTypeUtilisateurDialog = value;
    }

    get editTypeUtilisateurDialog(): boolean {
        return this.typeUtilisateurService.editTypeUtilisateurDialog;
    }

    set editTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.editTypeUtilisateurDialog = value;
    }

    get viewTypeUtilisateurDialog(): boolean {
        return this.typeUtilisateurService.viewTypeUtilisateurDialog;
    }

    set viewTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.viewTypeUtilisateurDialog = value;
    }

    get searchTypeUtilisateur(): TypeUtilisateurVo {
        return this.typeUtilisateurService.searchTypeUtilisateur;
    }

    set searchTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.searchTypeUtilisateur = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
