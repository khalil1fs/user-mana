import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {PaysVo} from '../../../../../../controller/model/referentiel/Pays.model';
import {PaysService} from '../../../../../../controller/service/referentiel/Pays.service';
import {OrganismeService} from '../../../../../../controller/service/referentiel/Organisme.service';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {OrganismeVo} from '../../../../../../controller/model/referentiel/Organisme.model';
import {environment} from '../../../../../../../environments/environment';

@Component({
    selector: 'app-organisme-list-admin',
    templateUrl: './organisme-list-admin.component.html',
    styleUrls: ['./organisme-list-admin.component.css']
})
export class OrganismeListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Organisme';
    yesOrNoArchive: any[] = [];
    payss: Array<PaysVo>;


    constructor(private datePipe: DatePipe, private organismeService: OrganismeService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private paysService: PaysService
    ) {
    }

    ngOnInit(): void {
        this.loadOrganismes();
        this.initExport();
        this.initCol();
        this.loadPays();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadOrganismes() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Organisme', 'list');
        isPermistted ? this.organismeService.findAll().subscribe(organismes => this.organismes = organismes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.organismeService.findByCriteria(this.searchOrganisme).subscribe(organismes => {

            this.organismes = organismes;
            // this.searchOrganisme = new OrganismeVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'intitule', header: 'Intitule'},
            {field: 'code', header: 'Code'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editOrganisme(organisme: OrganismeVo) {
        const isPermistted = await this.roleService.isPermitted('Organisme', 'edit');
        if (isPermistted) {
            this.organismeService.findByIdWithAssociatedList(organisme).subscribe(res => {
                this.selectedOrganisme = res;
                this.selectedOrganisme.dateArchivage = DateUtils.convert(this.selectedOrganisme.dateArchivage);

                this.editOrganismeDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewOrganisme(organisme: OrganismeVo) {
        const isPermistted = await this.roleService.isPermitted('Organisme', 'view');
        if (isPermistted) {
            this.organismeService.findByIdWithAssociatedList(organisme).subscribe(res => {
                this.selectedOrganisme = res;
                this.selectedOrganisme.dateArchivage = DateUtils.convert(this.selectedOrganisme.dateArchivage);
                this.selectedOrganisme.dateCreation = new Date(this.selectedOrganisme.dateCreation);

                this.viewOrganismeDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateOrganisme(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedOrganisme = new OrganismeVo();
            this.createOrganismeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteOrganisme(organisme: OrganismeVo) {
        const isPermistted = await this.roleService.isPermitted('Organisme', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Organisme) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.organismeService.delete(organisme).subscribe(status => {
                        if (status > 0) {
                            const position = this.organismes.indexOf(organisme);
                            position > -1 ? this.organismes.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Organisme Supprimé',
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

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Organisme', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateOrganisme(organisme: OrganismeVo) {

        this.organismeService.findByIdWithAssociatedList(organisme).subscribe(
            res => {
                this.initDuplicateOrganisme(res);
                this.selectedOrganisme = res;
                this.selectedOrganisme.id = null;

                this.selectedOrganisme.dateCreation = null;
                this.selectedOrganisme.dateArchivage = DateUtils.convert(this.selectedOrganisme.dateArchivage);

                this.createOrganismeDialog = true;

            });

    }

    initDuplicateOrganisme(res: OrganismeVo) {


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
        this.exportData = this.organismes.map(e => {
            return {
                'Intitule': e.intitule,
                'Code': e.code,
                'Description': e.description,
                'Pays': e.paysVo?.libelle,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Intitule': this.searchOrganisme.intitule ? this.searchOrganisme.intitule : environment.emptyForExport,
            'Code': this.searchOrganisme.code ? this.searchOrganisme.code : environment.emptyForExport,
            'Description': this.searchOrganisme.description ? this.searchOrganisme.description : environment.emptyForExport,
            'Pays': this.searchOrganisme.paysVo?.libelle ? this.searchOrganisme.paysVo?.libelle : environment.emptyForExport,
            'Archive': this.searchOrganisme.archive ? (this.searchOrganisme.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchOrganisme.dateArchivageMin ? this.datePipe.transform(this.searchOrganisme.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchOrganisme.dateArchivageMax ? this.datePipe.transform(this.searchOrganisme.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchOrganisme.dateCreationMin ? this.datePipe.transform(this.searchOrganisme.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchOrganisme.dateCreationMax ? this.datePipe.transform(this.searchOrganisme.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get organismes(): Array<OrganismeVo> {
        return this.organismeService.organismes;
    }

    set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
    }

    get organismeSelections(): Array<OrganismeVo> {
        return this.organismeService.organismeSelections;
    }

    set organismeSelections(value: Array<OrganismeVo>) {
        this.organismeService.organismeSelections = value;
    }


    get selectedOrganisme(): OrganismeVo {
        return this.organismeService.selectedOrganisme;
    }

    set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
    }

    get createOrganismeDialog(): boolean {
        return this.organismeService.createOrganismeDialog;
    }

    set createOrganismeDialog(value: boolean) {
        this.organismeService.createOrganismeDialog = value;
    }

    get editOrganismeDialog(): boolean {
        return this.organismeService.editOrganismeDialog;
    }

    set editOrganismeDialog(value: boolean) {
        this.organismeService.editOrganismeDialog = value;
    }

    get viewOrganismeDialog(): boolean {
        return this.organismeService.viewOrganismeDialog;
    }

    set viewOrganismeDialog(value: boolean) {
        this.organismeService.viewOrganismeDialog = value;
    }

    get searchOrganisme(): OrganismeVo {
        return this.organismeService.searchOrganisme;
    }

    set searchOrganisme(value: OrganismeVo) {
        this.organismeService.searchOrganisme = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
