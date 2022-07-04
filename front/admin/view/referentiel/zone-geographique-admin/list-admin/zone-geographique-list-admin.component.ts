import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueService} from 'src/app/controller/service/referentiel/ZoneGeographique.service';
import {ZoneGeographiqueVo} from 'src/app/controller/model/referentiel/ZoneGeographique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';


@Component({
    selector: 'app-zone-geographique-list-admin',
    templateUrl: './zone-geographique-list-admin.component.html',
    styleUrls: ['./zone-geographique-list-admin.component.css']
})
export class ZoneGeographiqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ZoneGeographique';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private zoneGeographiqueService: ZoneGeographiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadZoneGeographiques();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadZoneGeographiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'list');
        isPermistted ? this.zoneGeographiqueService.findAll().subscribe(zoneGeographiques => this.zoneGeographiques = zoneGeographiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.zoneGeographiqueService.findByCriteria(this.searchZoneGeographique).subscribe(zoneGeographiques => {

            this.zoneGeographiques = zoneGeographiques;
            // this.searchZoneGeographique = new ZoneGeographiqueVo();
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

    public async editZoneGeographique(zoneGeographique: ZoneGeographiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'edit');
        if (isPermistted) {
            this.zoneGeographiqueService.findByIdWithAssociatedList(zoneGeographique).subscribe(res => {
                this.selectedZoneGeographique = res;
                this.selectedZoneGeographique.dateArchivage = DateUtils.convert(this.selectedZoneGeographique.dateArchivage);

                this.editZoneGeographiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewZoneGeographique(zoneGeographique: ZoneGeographiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'view');
        if (isPermistted) {
            this.zoneGeographiqueService.findByIdWithAssociatedList(zoneGeographique).subscribe(res => {
                this.selectedZoneGeographique = res;
                this.selectedZoneGeographique.dateArchivage = DateUtils.convert(this.selectedZoneGeographique.dateArchivage);
                this.selectedZoneGeographique.dateCreation = new Date(this.selectedZoneGeographique.dateCreation);

                this.viewZoneGeographiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateZoneGeographique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedZoneGeographique = new ZoneGeographiqueVo();
            this.createZoneGeographiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteZoneGeographique(zoneGeographique: ZoneGeographiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Zone geographique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.zoneGeographiqueService.delete(zoneGeographique).subscribe(status => {
                        if (status > 0) {
                            const position = this.zoneGeographiques.indexOf(zoneGeographique);
                            position > -1 ? this.zoneGeographiques.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Zone geographique Supprimé',
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


    public async duplicateZoneGeographique(zoneGeographique: ZoneGeographiqueVo) {

        this.zoneGeographiqueService.findByIdWithAssociatedList(zoneGeographique).subscribe(
            res => {
                this.initDuplicateZoneGeographique(res);
                this.selectedZoneGeographique = res;
                this.selectedZoneGeographique.id = null;

                this.selectedZoneGeographique.dateCreation = null;
                this.selectedZoneGeographique.dateArchivage = DateUtils.convert(this.selectedZoneGeographique.dateArchivage);

                this.createZoneGeographiqueDialog = true;

            });

    }

    initDuplicateZoneGeographique(res: ZoneGeographiqueVo) {


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
        this.exportData = this.zoneGeographiques.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd/MM/yyyy HH:mm'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd/MM/yyyy HH:mm'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchZoneGeographique.libelle ? this.searchZoneGeographique.libelle : environment.emptyForExport,
            'Code': this.searchZoneGeographique.code ? this.searchZoneGeographique.code : environment.emptyForExport,
            'Archive': this.searchZoneGeographique.archive ? (this.searchZoneGeographique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchZoneGeographique.dateArchivageMin ? this.datePipe.transform(this.searchZoneGeographique.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchZoneGeographique.dateArchivageMax ? this.datePipe.transform(this.searchZoneGeographique.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchZoneGeographique.dateCreationMin ? this.datePipe.transform(this.searchZoneGeographique.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchZoneGeographique.dateCreationMax ? this.datePipe.transform(this.searchZoneGeographique.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get zoneGeographiques(): Array<ZoneGeographiqueVo> {
        return this.zoneGeographiqueService.zoneGeographiques;
    }

    set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
    }

    get zoneGeographiqueSelections(): Array<ZoneGeographiqueVo> {
        return this.zoneGeographiqueService.zoneGeographiqueSelections;
    }

    set zoneGeographiqueSelections(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiqueSelections = value;
    }


    get selectedZoneGeographique(): ZoneGeographiqueVo {
        return this.zoneGeographiqueService.selectedZoneGeographique;
    }

    set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
    }

    get createZoneGeographiqueDialog(): boolean {
        return this.zoneGeographiqueService.createZoneGeographiqueDialog;
    }

    set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog = value;
    }

    get editZoneGeographiqueDialog(): boolean {
        return this.zoneGeographiqueService.editZoneGeographiqueDialog;
    }

    set editZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.editZoneGeographiqueDialog = value;
    }

    get viewZoneGeographiqueDialog(): boolean {
        return this.zoneGeographiqueService.viewZoneGeographiqueDialog;
    }

    set viewZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.viewZoneGeographiqueDialog = value;
    }

    get searchZoneGeographique(): ZoneGeographiqueVo {
        return this.zoneGeographiqueService.searchZoneGeographique;
    }

    set searchZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.searchZoneGeographique = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
