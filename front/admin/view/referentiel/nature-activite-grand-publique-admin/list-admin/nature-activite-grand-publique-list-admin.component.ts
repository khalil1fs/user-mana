import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {NatureActiviteGrandPubliqueService} from 'src/app/controller/service/referentiel/NatureActiviteGrandPublique.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {NatureActiviteGrandPubliqueVo} from 'src/app/controller/model/referentiel/NatureActiviteGrandPublique.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-nature-activite-grand-publique-list-admin',
    templateUrl: './nature-activite-grand-publique-list-admin.component.html',
    styleUrls: ['./nature-activite-grand-publique-list-admin.component.css']
})
export class NatureActiviteGrandPubliqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NatureActiviteGrandPublique';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private natureActiviteGrandPubliqueService: NatureActiviteGrandPubliqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadNatureActiviteGrandPubliques();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadNatureActiviteGrandPubliques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NatureActiviteGrandPublique', 'list');
        isPermistted ? this.natureActiviteGrandPubliqueService.findAll().subscribe(natureActiviteGrandPubliques => this.natureActiviteGrandPubliques = natureActiviteGrandPubliques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.natureActiviteGrandPubliqueService.findByCriteria(this.searchNatureActiviteGrandPublique).subscribe(natureActiviteGrandPubliques => {

            this.natureActiviteGrandPubliques = natureActiviteGrandPubliques;
            // this.searchNatureActiviteGrandPublique = new NatureActiviteGrandPubliqueVo();
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

    public async editNatureActiviteGrandPublique(natureActiviteGrandPublique: NatureActiviteGrandPubliqueVo) {
        const isPermistted = await this.roleService.isPermitted('NatureActiviteGrandPublique', 'edit');
        if (isPermistted) {
            this.natureActiviteGrandPubliqueService.findByIdWithAssociatedList(natureActiviteGrandPublique).subscribe(res => {
                this.selectedNatureActiviteGrandPublique = res;
                this.selectedNatureActiviteGrandPublique.dateArchivage = DateUtils.convert(this.selectedNatureActiviteGrandPublique.dateArchivage);

                this.editNatureActiviteGrandPubliqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewNatureActiviteGrandPublique(natureActiviteGrandPublique: NatureActiviteGrandPubliqueVo) {
        const isPermistted = await this.roleService.isPermitted('NatureActiviteGrandPublique', 'view');
        if (isPermistted) {
            this.natureActiviteGrandPubliqueService.findByIdWithAssociatedList(natureActiviteGrandPublique).subscribe(res => {
                this.selectedNatureActiviteGrandPublique = res;
                this.selectedNatureActiviteGrandPublique.dateArchivage = DateUtils.convert(this.selectedNatureActiviteGrandPublique.dateArchivage);
                this.selectedNatureActiviteGrandPublique.dateCreation = new Date(this.selectedNatureActiviteGrandPublique.dateCreation);

                this.viewNatureActiviteGrandPubliqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateNatureActiviteGrandPublique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedNatureActiviteGrandPublique = new NatureActiviteGrandPubliqueVo();
            this.createNatureActiviteGrandPubliqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteNatureActiviteGrandPublique(natureActiviteGrandPublique: NatureActiviteGrandPubliqueVo) {
        const isPermistted = await this.roleService.isPermitted('NatureActiviteGrandPublique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Nature activite grand publique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.natureActiviteGrandPubliqueService.delete(natureActiviteGrandPublique).subscribe(status => {
                        if (status > 0) {
                            const position = this.natureActiviteGrandPubliques.indexOf(natureActiviteGrandPublique);
                            position > -1 ? this.natureActiviteGrandPubliques.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Nature activite grand publique Supprimé',
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


    public async duplicateNatureActiviteGrandPublique(natureActiviteGrandPublique: NatureActiviteGrandPubliqueVo) {

        this.natureActiviteGrandPubliqueService.findByIdWithAssociatedList(natureActiviteGrandPublique).subscribe(
            res => {
                this.initDuplicateNatureActiviteGrandPublique(res);
                this.selectedNatureActiviteGrandPublique = res;
                this.selectedNatureActiviteGrandPublique.id = null;

                this.selectedNatureActiviteGrandPublique.dateCreation = null;
                this.selectedNatureActiviteGrandPublique.dateArchivage = DateUtils.convert(this.selectedNatureActiviteGrandPublique.dateArchivage);

                this.createNatureActiviteGrandPubliqueDialog = true;

            });

    }

    initDuplicateNatureActiviteGrandPublique(res: NatureActiviteGrandPubliqueVo) {


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
        this.exportData = this.natureActiviteGrandPubliques.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Description': e.description,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchNatureActiviteGrandPublique.libelle ? this.searchNatureActiviteGrandPublique.libelle : environment.emptyForExport,
            'Code': this.searchNatureActiviteGrandPublique.code ? this.searchNatureActiviteGrandPublique.code : environment.emptyForExport,
            'Description': this.searchNatureActiviteGrandPublique.description ? this.searchNatureActiviteGrandPublique.description : environment.emptyForExport,
            'Archive': this.searchNatureActiviteGrandPublique.archive ? (this.searchNatureActiviteGrandPublique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchNatureActiviteGrandPublique.dateArchivageMin ? this.datePipe.transform(this.searchNatureActiviteGrandPublique.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchNatureActiviteGrandPublique.dateArchivageMax ? this.datePipe.transform(this.searchNatureActiviteGrandPublique.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchNatureActiviteGrandPublique.dateCreationMin ? this.datePipe.transform(this.searchNatureActiviteGrandPublique.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchNatureActiviteGrandPublique.dateCreationMax ? this.datePipe.transform(this.searchNatureActiviteGrandPublique.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get natureActiviteGrandPubliques(): Array<NatureActiviteGrandPubliqueVo> {
        return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques;
    }

    set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques = value;
    }

    get natureActiviteGrandPubliqueSelections(): Array<NatureActiviteGrandPubliqueVo> {
        return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliqueSelections;
    }

    set natureActiviteGrandPubliqueSelections(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliqueSelections = value;
    }


    get selectedNatureActiviteGrandPublique(): NatureActiviteGrandPubliqueVo {
        return this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique;
    }

    set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique = value;
    }

    get createNatureActiviteGrandPubliqueDialog(): boolean {
        return this.natureActiviteGrandPubliqueService.createNatureActiviteGrandPubliqueDialog;
    }

    set createNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.createNatureActiviteGrandPubliqueDialog = value;
    }

    get editNatureActiviteGrandPubliqueDialog(): boolean {
        return this.natureActiviteGrandPubliqueService.editNatureActiviteGrandPubliqueDialog;
    }

    set editNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.editNatureActiviteGrandPubliqueDialog = value;
    }

    get viewNatureActiviteGrandPubliqueDialog(): boolean {
        return this.natureActiviteGrandPubliqueService.viewNatureActiviteGrandPubliqueDialog;
    }

    set viewNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.viewNatureActiviteGrandPubliqueDialog = value;
    }

    get searchNatureActiviteGrandPublique(): NatureActiviteGrandPubliqueVo {
        return this.natureActiviteGrandPubliqueService.searchNatureActiviteGrandPublique;
    }

    set searchNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.searchNatureActiviteGrandPublique = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
