import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {CommanditaireService} from 'src/app/controller/service/referentiel/Commanditaire.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {CommanditaireVo} from 'src/app/controller/model/referentiel/Commanditaire.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';

@Component({
    selector: 'app-commanditaire-list-admin',
    templateUrl: './commanditaire-list-admin.component.html',
    styleUrls: ['./commanditaire-list-admin.component.css']
})
export class CommanditaireListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Commanditaire';
    yesOrNoArchive: any[] = [];
    payss: Array<PaysVo>;


    constructor(private datePipe: DatePipe, private commanditaireService: CommanditaireService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private paysService: PaysService
    ) {
    }

    ngOnInit(): void {
        this.loadCommanditaires();
        this.initExport();
        this.initCol();
        this.loadPays();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadCommanditaires() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Commanditaire', 'list');
        isPermistted ? this.commanditaireService.findAll().subscribe(commanditaires => this.commanditaires = commanditaires, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.commanditaireService.findByCriteria(this.searchCommanditaire).subscribe(commanditaires => {

            this.commanditaires = commanditaires;
            // this.searchCommanditaire = new CommanditaireVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editCommanditaire(commanditaire: CommanditaireVo) {
        const isPermistted = await this.roleService.isPermitted('Commanditaire', 'edit');
        if (isPermistted) {
            this.commanditaireService.findByIdWithAssociatedList(commanditaire).subscribe(res => {
                this.selectedCommanditaire = res;
                this.selectedCommanditaire.dateArchivage = DateUtils.convert(this.selectedCommanditaire.dateArchivage);

                this.editCommanditaireDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewCommanditaire(commanditaire: CommanditaireVo) {
        const isPermistted = await this.roleService.isPermitted('Commanditaire', 'view');
        if (isPermistted) {
            this.commanditaireService.findByIdWithAssociatedList(commanditaire).subscribe(res => {
                this.selectedCommanditaire = res;
                this.selectedCommanditaire.dateArchivage = DateUtils.convert(this.selectedCommanditaire.dateArchivage);
                this.selectedCommanditaire.dateCreation = new Date(this.selectedCommanditaire.dateCreation);

                this.viewCommanditaireDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCommanditaire(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCommanditaire = new CommanditaireVo();
            this.createCommanditaireDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteCommanditaire(commanditaire: CommanditaireVo) {
        const isPermistted = await this.roleService.isPermitted('Commanditaire', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Commanditaire) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.commanditaireService.delete(commanditaire).subscribe(status => {
                        if (status > 0) {
                            const position = this.commanditaires.indexOf(commanditaire);
                            position > -1 ? this.commanditaires.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Commanditaire Supprimé',
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
        const isPermistted = await this.roleService.isPermitted('Commanditaire', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateCommanditaire(commanditaire: CommanditaireVo) {

        this.commanditaireService.findByIdWithAssociatedList(commanditaire).subscribe(
            res => {
                this.initDuplicateCommanditaire(res);
                this.selectedCommanditaire = res;
                this.selectedCommanditaire.id = null;

                this.selectedCommanditaire.dateCreation = null;
                this.selectedCommanditaire.dateArchivage = DateUtils.convert(this.selectedCommanditaire.dateArchivage);

                this.createCommanditaireDialog = true;

            });

    }

    initDuplicateCommanditaire(res: CommanditaireVo) {


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
        this.exportData = this.commanditaires.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Description': e.description,
                'Pays': e.paysVo?.libelle,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchCommanditaire.libelle ? this.searchCommanditaire.libelle : environment.emptyForExport,
            'Code': this.searchCommanditaire.code ? this.searchCommanditaire.code : environment.emptyForExport,
            'Description': this.searchCommanditaire.description ? this.searchCommanditaire.description : environment.emptyForExport,
            'Pays': this.searchCommanditaire.paysVo?.libelle ? this.searchCommanditaire.paysVo?.libelle : environment.emptyForExport,
            'Archive': this.searchCommanditaire.archive ? (this.searchCommanditaire.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchCommanditaire.dateArchivageMin ? this.datePipe.transform(this.searchCommanditaire.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchCommanditaire.dateArchivageMax ? this.datePipe.transform(this.searchCommanditaire.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchCommanditaire.dateCreationMin ? this.datePipe.transform(this.searchCommanditaire.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchCommanditaire.dateCreationMax ? this.datePipe.transform(this.searchCommanditaire.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get commanditaires(): Array<CommanditaireVo> {
        return this.commanditaireService.commanditaires;
    }

    set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
    }

    get commanditaireSelections(): Array<CommanditaireVo> {
        return this.commanditaireService.commanditaireSelections;
    }

    set commanditaireSelections(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaireSelections = value;
    }


    get selectedCommanditaire(): CommanditaireVo {
        return this.commanditaireService.selectedCommanditaire;
    }

    set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
    }

    get createCommanditaireDialog(): boolean {
        return this.commanditaireService.createCommanditaireDialog;
    }

    set createCommanditaireDialog(value: boolean) {
        this.commanditaireService.createCommanditaireDialog = value;
    }

    get editCommanditaireDialog(): boolean {
        return this.commanditaireService.editCommanditaireDialog;
    }

    set editCommanditaireDialog(value: boolean) {
        this.commanditaireService.editCommanditaireDialog = value;
    }

    get viewCommanditaireDialog(): boolean {
        return this.commanditaireService.viewCommanditaireDialog;
    }

    set viewCommanditaireDialog(value: boolean) {
        this.commanditaireService.viewCommanditaireDialog = value;
    }

    get searchCommanditaire(): CommanditaireVo {
        return this.commanditaireService.searchCommanditaire;
    }

    set searchCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.searchCommanditaire = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
