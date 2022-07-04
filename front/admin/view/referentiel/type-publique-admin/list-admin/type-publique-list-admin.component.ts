import {Component, OnInit} from '@angular/core';
import {TypePubliqueService} from 'src/app/controller/service/referentiel/TypePublique.service';
import {TypePubliqueVo} from 'src/app/controller/model/referentiel/TypePublique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';


@Component({
    selector: 'app-type-publique-list-admin',
    templateUrl: './type-publique-list-admin.component.html',
    styleUrls: ['./type-publique-list-admin.component.css']
})
export class TypePubliqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypePublique';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private typePubliqueService: TypePubliqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadTypePubliques();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadTypePubliques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypePublique', 'list');
        isPermistted ? this.typePubliqueService.findAll().subscribe(typePubliques => this.typePubliques = typePubliques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.typePubliqueService.findByCriteria(this.searchTypePublique).subscribe(typePubliques => {

            this.typePubliques = typePubliques;
            // this.searchTypePublique = new TypePubliqueVo();
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

    public async editTypePublique(typePublique: TypePubliqueVo) {
        const isPermistted = await this.roleService.isPermitted('TypePublique', 'edit');
        if (isPermistted) {
            this.typePubliqueService.findByIdWithAssociatedList(typePublique).subscribe(res => {
                this.selectedTypePublique = res;
                this.selectedTypePublique.dateArchivage = DateUtils.convert(this.selectedTypePublique.dateArchivage);

                this.editTypePubliqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewTypePublique(typePublique: TypePubliqueVo) {
        const isPermistted = await this.roleService.isPermitted('TypePublique', 'view');
        if (isPermistted) {
            this.typePubliqueService.findByIdWithAssociatedList(typePublique).subscribe(res => {
                this.selectedTypePublique = res;
                this.selectedTypePublique.dateArchivage = DateUtils.convert(this.selectedTypePublique.dateArchivage);
                this.selectedTypePublique.dateCreation = new Date(this.selectedTypePublique.dateCreation);

                this.viewTypePubliqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateTypePublique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedTypePublique = new TypePubliqueVo();
            this.createTypePubliqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteTypePublique(typePublique: TypePubliqueVo) {
        const isPermistted = await this.roleService.isPermitted('TypePublique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Type publique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.typePubliqueService.delete(typePublique).subscribe(status => {
                        if (status > 0) {
                            const position = this.typePubliques.indexOf(typePublique);
                            position > -1 ? this.typePubliques.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Type publique Supprimé',
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


    public async duplicateTypePublique(typePublique: TypePubliqueVo) {

        this.typePubliqueService.findByIdWithAssociatedList(typePublique).subscribe(
            res => {
                this.initDuplicateTypePublique(res);
                this.selectedTypePublique = res;
                this.selectedTypePublique.id = null;

                this.selectedTypePublique.dateCreation = null;
                this.selectedTypePublique.dateArchivage = DateUtils.convert(this.selectedTypePublique.dateArchivage);

                this.createTypePubliqueDialog = true;

            });

    }

    initDuplicateTypePublique(res: TypePubliqueVo) {


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
        this.exportData = this.typePubliques.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchTypePublique.libelle ? this.searchTypePublique.libelle : environment.emptyForExport,
            'Code': this.searchTypePublique.code ? this.searchTypePublique.code : environment.emptyForExport,
            'Archive': this.searchTypePublique.archive ? (this.searchTypePublique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchTypePublique.dateArchivageMin ? this.datePipe.transform(this.searchTypePublique.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchTypePublique.dateArchivageMax ? this.datePipe.transform(this.searchTypePublique.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchTypePublique.dateCreationMin ? this.datePipe.transform(this.searchTypePublique.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchTypePublique.dateCreationMax ? this.datePipe.transform(this.searchTypePublique.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get typePubliques(): Array<TypePubliqueVo> {
        return this.typePubliqueService.typePubliques;
    }

    set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
    }

    get typePubliqueSelections(): Array<TypePubliqueVo> {
        return this.typePubliqueService.typePubliqueSelections;
    }

    set typePubliqueSelections(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliqueSelections = value;
    }


    get selectedTypePublique(): TypePubliqueVo {
        return this.typePubliqueService.selectedTypePublique;
    }

    set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
    }

    get createTypePubliqueDialog(): boolean {
        return this.typePubliqueService.createTypePubliqueDialog;
    }

    set createTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.createTypePubliqueDialog = value;
    }

    get editTypePubliqueDialog(): boolean {
        return this.typePubliqueService.editTypePubliqueDialog;
    }

    set editTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.editTypePubliqueDialog = value;
    }

    get viewTypePubliqueDialog(): boolean {
        return this.typePubliqueService.viewTypePubliqueDialog;
    }

    set viewTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.viewTypePubliqueDialog = value;
    }

    get searchTypePublique(): TypePubliqueVo {
        return this.typePubliqueService.searchTypePublique;
    }

    set searchTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.searchTypePublique = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
