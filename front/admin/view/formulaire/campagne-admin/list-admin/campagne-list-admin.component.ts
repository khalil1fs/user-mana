import {Component, OnInit, ViewChild} from '@angular/core';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {EtatCampagneService} from 'src/app/controller/service/config/EtatCampagne.service';
import {TemplateOuvertureService} from 'src/app/controller/service/referentiel/TemplateOuverture.service';
import {TemplateClotureService} from 'src/app/controller/service/referentiel/TemplateCloture.service';
import {TemplateRelanceService} from 'src/app/controller/service/referentiel/TemplateRelance.service';
import {TemplateRappelService} from 'src/app/controller/service/referentiel/TemplateRappel.service';

import {EtatCampagneVo} from 'src/app/controller/model/config/EtatCampagne.model';
import {TemplateClotureVo} from 'src/app/controller/model/referentiel/TemplateCloture.model';
import {TemplateRappelVo} from 'src/app/controller/model/referentiel/TemplateRappel.model';
import {TemplateOuvertureVo} from 'src/app/controller/model/referentiel/TemplateOuverture.model';
import {TemplateRelanceVo} from 'src/app/controller/model/referentiel/TemplateRelance.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {CampagneChercheurOuvertureService} from 'src/app/controller/service/formulaire/CampagneChercheurOuverture.service';
import {CampagneChercheurOuvertureVo} from 'src/app/controller/model/formulaire/CampagneChercheurOuverture.model';
import {CampagneChercheurFermetureService} from 'src/app/controller/service/formulaire/CampagneChercheurFermeture.service';
import {Workbook} from 'exceljs/dist/exceljs.min.js';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {CampagneRelanceChercheurVo} from 'src/app/controller/model/formulaire/CampagneRelanceChercheur.model';
import {CampagneRelanceChercheurService} from 'src/app/controller/service/formulaire/CampagneRelanceChercheur.service';
import {CampagneRelanceVo} from 'src/app/controller/model/formulaire/CampagneRelance.model';
import {CampagneRelanceService} from 'src/app/controller/service/formulaire/CampagneRelance.service';
import {CampagneRappelService} from 'src/app/controller/service/formulaire/CampagneRappel.service';
import {CampagneRappelVo} from 'src/app/controller/model/formulaire/CampagneRappel.model';
import {EtatEnum} from 'src/app/utils/EtatEnum';
import {Table} from 'primeng/table';
import {CardviewService} from 'src/app/controller/service/formulaire/cardview.service';


@Component({
    selector: 'app-campagne-list-admin',
    templateUrl: './campagne-list-admin.component.html',
    styleUrls: ['./campagne-list-admin.component.css']
})
export class CampagneListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    exportChercheurData: any[] = [];
    exportCampagneData: any[] = [];
    exportDistinctionsData: any[] = [];
    exportProjetFinancementData: any[] = [];
    exportVieInstitutData: any[] = [];
    exportSavoirEtInnovationData: any[] = [];
    exportEventColloqueData: any[] = [];
    exportRencontrePublicData: any[] = [];
    exportRencontreMediaData: any[] = [];
    exportOutilPedagogiqueData: any[] = [];
    exportEncadrementDoctorantData: any[] = [];
    exportEncadrementEtudiantData: any[] = [];
    exportEncadrementEquipeData: any[] = [];
    fileName = 'Campagne';
    yesno: any[] = [];
    etatCampagnes: Array<EtatCampagneVo>;
    templateOuvertures: Array<TemplateOuvertureVo>;
    templateClotures: Array<TemplateClotureVo>;
    templateRelances: Array<TemplateRelanceVo>;
    templateRappels: Array<TemplateRappelVo>;
    targetChercheurs: Array<ChercheurVo> = [];
    displayEmailRelance = false;
    displayView = false;
    displayEditView = false;
    displaySendEmail = false;
    displayCreateView = false;
    campagneDet: CampagneVo;
    criteriaData: any[] = [];

    headerRelance = '';
    headerRappel = '';

    @ViewChild('dt')
    tableChercheur: Table;

    constructor(private campagneService: CampagneService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private roleService: RoleService,
                private router: Router,
                private etatCampagneService: EtatCampagneService,
                private templateOuvertureService: TemplateOuvertureService,
                private templateClotureService: TemplateClotureService,
                private templateRelanceService: TemplateRelanceService,
                private templateRappelService: TemplateRappelService,
                private chercheurService: ChercheurService,
                private campagneChercheurOuvertureService: CampagneChercheurOuvertureService,
                private campagneChercheurFermetureService: CampagneChercheurFermetureService,
                private exportService: ExportService,
                private campagneRelanceChercheurService: CampagneRelanceChercheurService,
                private campagneRelanceService: CampagneRelanceService,
                private campagneRappelService: CampagneRappelService,
                private cardViewService: CardviewService
    ) {
    }

    ngOnInit(): void {
        this.loadCampagnes();
        this.initExport();
        this.initCol();
        this.loadEtatCampagne();
        this.loadTemplateOuverture();
        this.loadTemplateCloture();
        this.loadTemplateRelance();
        this.loadTemplateRappel();
        this.isCardDisplayActivated = this.cardViewService.isDefaultModeCards();

        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods


    public async loadCampagnes() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Campagne', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => {
                this.campagnes = campagnes;
            }, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.campagneService.findByCriteria(this.searchCampagne).subscribe(campagnes => {
            this.campagnes = campagnes;
            this.tableChercheur.first = 0;
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libellé'},
            {field: 'code', header: 'Code'},
            {field: 'annee', header: 'Année d’activités '},
            {field: 'dateDepart', header: 'Date de début'},
            {field: 'dateFin', header: 'Date fin'},
            {field: 'dateRelance', header: 'Date de relance planifiée'},
            {field: 'etatCampagne?.libelle', header: 'Etat campagne'},
            {field: 'templateOuverture?.code', header: 'Template ouverture'},
            {field: 'objetOuverture', header: 'Objet du mail de ouverture'},
            {field: 'templateCloture?.code', header: 'Template cloture'},
            {field: 'objetCloture', header: 'Objet du mail d’ouverture'},
            {field: 'templateRelance?.code', header: 'Template relance'},
            {field: 'objetRelance', header: 'Objet du mail de relance'},
            {field: 'templateRappel?.code', header: 'Template rappel'},
            {field: 'objetRappel', header: 'Objet du mail de rappel'},
        ];
    }

    public async viewCampagne(campagne: CampagneVo) {
        await this.loadSelectedChercheursByCampagne(campagne);
        await this.loadAvailableChercheursByCampagne(campagne);
        await this.loadCampagneOuvertureChercheurs(campagne);
        await this.loadCampagneFermetureChercheurs(campagne);
        const isPermistted = await this.roleService.isPermitted('Campagne', 'view');
        if (isPermistted) {
            this.campagneService.findByIdWithAssociatedList(campagne).subscribe(res => {
                this.selectedCampagne = res;
                this.selectedCampagne.dateDepart = new Date(campagne.dateDepart);
                this.selectedCampagne.dateFin = new Date(campagne.dateFin);
                this.displayView = true;
                this.router.navigate(['/app/admin/campagne/view']);
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async editCampagne(campagne: CampagneVo) {
        await this.loadSelectedChercheursByCampagne(campagne);
        await this.loadAvailableChercheursByCampagne(campagne);
        await this.loadCampagneOuvertureChercheurs(campagne);
        const isPermistted = await this.roleService.isPermitted('Campagne', 'edit');
        if (isPermistted) {
            this.campagneService.findByIdWithAssociatedList(campagne).subscribe(res => {
                this.selectedCampagne = res;
                if (this.selectedCampagne.campagneRelancesVo) {
                    this.selectedCampagneRelance = {
                        ...this.selectedCampagne.campagneRelancesVo[0],
                        dateRelance: new Date(this.selectedCampagne.campagneRelancesVo[0].dateRelance)
                    };
                }
                if (this.selectedCampagne.campagneRappelsVo) {
                    this.selectedCampagneRappel = {
                        ...this.selectedCampagne.campagneRappelsVo[0],
                        dateRappel: new Date(this.selectedCampagne.campagneRappelsVo[0].dateRappel)
                    };
                }
                this.selectedCampagne.dateDepart = new Date(campagne.dateDepart);
                this.selectedCampagne.dateFin = new Date(campagne.dateFin);
                this.displayEditView = true;
                this.router.navigate(['/app/admin/campagne/edit']);
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async openCreateCampagne(pojo: string) {
        this.selectedChercheurs = [];
        await this.loadAvailableChercheurs();
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCampagne = new CampagneVo();
            this.router.navigate(['/app/admin/campagne/create']);
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async loadCampagneOuvertureChercheurs(campagne) {
        this.sendEmailOuvertureDisabled = false;
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneRelances', 'list');
        isPermistted ? this.campagneChercheurOuvertureService.findByCampagneId(campagne?.id).subscribe(campagneChercheurOuvertures => {
                    this.campagneChercheurOuvertures = campagneChercheurOuvertures.filter(data => data.dateEnvoi !== null);

                    if (this.campagneChercheurOuvertures &&
                        this.campagneChercheurOuvertures.length > 0) {
                        this.sendEmailOuvertureDisabled = true;
                    }

                }
                , error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async loadCampagneFermetureChercheurs(campagne) {
        this.sendEmailFermetureDisabled = false;
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneRelances', 'list');
        isPermistted ? this.campagneChercheurFermetureService.findByCampagneId(campagne?.id).subscribe(campagneChercheurFermetures => {
                    this.campagneChercheurFermetures = campagneChercheurFermetures.filter(data => data.dateEnvoi !== null);


                    if (this.campagneChercheurFermetures &&
                        this.campagneChercheurFermetures.length > 0) {
                        this.sendEmailFermetureDisabled = true;
                    }

                }
                , error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async deleteCampagne(campagne: CampagneVo) {
        if (campagne.etatCampagneVo.code !== EtatEnum.TERMINE || new Date(campagne.dateFin) < new Date()) {
            const isPermistted = await this.roleService.isPermitted('Campagne', 'delete');
            if (isPermistted) {
                this.confirmationService.confirm({
                    message: 'Voulez-vous supprimé cet élément (Campagne) ?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.campagneService.delete(campagne).subscribe(status => {
                            if (status > 0) {
                                const position = this.campagnes.indexOf(campagne);
                                position > -1 ? this.campagnes.splice(position, 1) : false;
                            }
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Campagne Supprimé',
                                life: 3000
                            });
                        }, error => console.log(error));
                    }
                });
            } else {
                this.messageService.add({
                    severity: 'error', summary: 'erreur', detail: 'Problème de permission'
                });
            }
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Impossible de supprimer la campagne encours ou terminée'
            });
        }


    }

    public async loadEtatCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Campagne', 'list');
        isPermistted ? this.etatCampagneService.findAll().subscribe(etatCampagnes => this.etatCampagnes = etatCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadTemplateOuverture() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Campagne', 'list');
        isPermistted ? this.templateOuvertureService.findAll().subscribe(templateOuvertures => this.templateOuvertures = templateOuvertures, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadTemplateCloture() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Campagne', 'list');
        isPermistted ? this.templateClotureService.findAll().subscribe(templateClotures => this.templateClotures = templateClotures, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadTemplateRelance() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Campagne', 'list');
        isPermistted ? this.templateRelanceService.findAll().subscribe(templateRelances => this.templateRelances = templateRelances, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadTemplateRappel() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Campagne', 'list');
        isPermistted ? this.templateRappelService.findAll().subscribe(templateRappels => this.templateRappels = templateRappels, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateCampagne(campagne: CampagneVo) {
        await this.loadSelectedChercheursByCampagne(campagne);
        await this.loadAvailableChercheursByCampagne(campagne);
        this.campagneService.findByIdWithAssociatedList(campagne).subscribe(
            data => {
                this.initDuplicateCampagne(data);
                this.selectedCampagne = {...data};
                this.selectedCampagne.dateFin = new Date(data.dateFin);
                this.selectedCampagne.dateDepart = new Date(data.dateDepart);
                this.selectedCampagneRappel = {...this.selectedCampagne.campagneRappelsVo[0]};
                this.selectedCampagneRappel.dateRappel = new Date(this.selectedCampagne.campagneRappelsVo[0].dateRappel);
                this.selectedCampagneRelance = {...this.selectedCampagne.campagneRelancesVo[0]};
                this.selectedCampagneRelance.dateRelance = new Date(this.selectedCampagne.campagneRelancesVo[0].dateRelance);
                this.selectedCampagne.id = null;
                this.createCampagneDialog = true;

            });
    }

    async exportCampagne(campagne: CampagneVo) {
        this.campagneService.findByIdWithAssociatedList(campagne).subscribe(e => {
            this.selectedCampagne = e;
            if (this.selectedCampagne && this.selectedCampagne !== null) {
                this.prepareCampagneExport();
                this.fileName = this.fileName + ' ' + e.code;
                this.exportService.exportCampagneExcel(this.exportCampagneData, this.exportDistinctionsData, this.exportProjetFinancementData, this.exportVieInstitutData, this.exportSavoirEtInnovationData,
                    this.exportEventColloqueData, this.exportRencontrePublicData, this.exportRencontreMediaData, this.exportOutilPedagogiqueData, this.exportEncadrementDoctorantData,
                    this.exportEncadrementEtudiantData, this.exportEncadrementEquipeData, this.fileName);
            }
        });
    }


    initDuplicateCampagne(res: CampagneVo) {
        if (res.campagneChercheurOuverturesVo != null) {
            res.campagneChercheurOuverturesVo.forEach(d => {
                d.campagneVo = null;
                d.id = null;
            });
        }


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.exportCSV();
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.exportExcel();
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.exportPdf();
                }
            }
        ];
    }

    /**
     * Si la vue 'cartes' est à true, on désactive le multi-tri.
     * sinon, on l'active.
     */
    getSortMode() {
        if (this.isCardDisplayActivated) {
            return 'single';
        }
        return 'multiple';
    }

    sortByColumnName($event: any, gridObject: Table) {
        const columnToSort = gridObject.columns.find(col => col.field === $event.field);
        gridObject.sortField = columnToSort.field;
        gridObject.sortOrder = $event.order ? 1 : -1;
        gridObject.sortSingle();
    }

    exportExcel(): void {
        this.prepareColumnExport();

        // Excel Title, Header, Data
        const title = this.fileName;
        const header = Object.keys(this.exportData[0]);
        const data = this.exportData;
        // Create workbook and worksheet
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('liste des compagnes');
        const worksheet1 = workbook.addWorksheet('liste des distinctions');
        // ADdd criteria title
        worksheet1.addRow([]);
        const titleRowCR = worksheet.addRow(['Critères :']);
        titleRowCR.font = {name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true};
        worksheet.addRow([]);
        const header1 = Object.keys(this.criteriaData[0]);
        const headerRow1 = worksheet.addRow(header1);
        // Cell Style : Fill and Border
        headerRow1.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: '33C8FF'}
            };
            cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'}
            };
        });
        this.criteriaData.forEach(d => {
            const row = worksheet.addRow(Object.values(d));
        });
        // Add Row and formatting
        worksheet1.addRow([]);
        const titleRow = worksheet.addRow([title]);
        titleRow.font = {name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true};

        // let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])

        worksheet.mergeCells('A1:D2');
        // Blank Row
        worksheet.addRow([]);
        // Add Header Row
        const headerRow = worksheet.addRow(header);

        // Cell Style : Fill and Border
        headerRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFFFF00'},
                bgColor: {argb: 'FF0000FF'}
            };
            cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'}
            };
        });
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        data.forEach(d => {
            const row = worksheet.addRow(Object.values(d));
        });
        worksheet.getColumn(1).width = 30;
        worksheet.getColumn(2).width = 30;
        worksheet.getColumn(5).width = 30;
        worksheet.getColumn(6).width = 30;
        worksheet.getColumn(7).width = 30;
        worksheet.getColumn(8).width = 30;
        worksheet.getColumn(9).width = 30;
        worksheet.getColumn(10).width = 50;
        worksheet.getColumn(11).width = 80;
        worksheet.getColumn(12).width = 30;
        worksheet.getColumn(13).width = 50;
        worksheet.getColumn(14).width = 80;
        worksheet.getColumn(15).width = 30;
        worksheet.getColumn(16).width = 50;
        worksheet.getColumn(17).width = 80;
        worksheet.getColumn(18).width = 30;
        worksheet.getColumn(19).width = 50;
        worksheet.getColumn(20).width = 80;
        worksheet.addRow([]);
        // Footer Row
        const footerRow = worksheet.addRow(['Description']);
        footerRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'FFCCFFE5'}
        };
        footerRow.getCell(1).border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'}
        };
        // Merge Cells
        worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
        // Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data1) => {
            this.saveAsExcelFile(data1, this.fileName);
        });
    }


    saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then(FileSaver => {
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
            FileSaver.saveAs(data, fileName + '.xlsx');
        });
    }

    exportPdf(): void {
        this.prepareColumnExport();
        const doc = new jsPDF();
        autoTable(doc, {
            columns: [
                {header: 'Libellé', dataKey: 'Libellé'},
                {header: 'Description', dataKey: 'Description'},
                {header: 'Code', dataKey: 'Code'},
                {header: 'Annee', dataKey: 'Année d’activités '},
                {header: 'Date de début', dataKey: 'Date de début'},
                {header: 'Date de fin', dataKey: 'Date de fin'},
                {header: 'Date de relance planifiée', dataKey: 'Date de relance planifiée'},
                {header: 'Etat campagne', dataKey: 'Etat campagne'},
                {header: 'Template ouverture', dataKey: 'Template ouverture'},
                {header: 'Objet du mail de ouverture', dataKey: 'Objet du mail de ouverture'},
                {header: 'Message du mail de ouverture', dataKey: 'Message du mail de ouverture'},
                {header: 'Template cloture', dataKey: 'Template cloture'},
                {header: 'Objet du mail d’ouverture', dataKey: 'Objet du mail d’ouverture'},
                {header: 'Message du mail d’ouverture', dataKey: 'Message du mail d’ouverture'},
                {header: 'Template relance', dataKey: 'Template relance'},
                {header: 'Objet du mail de relance', dataKey: 'Objet du mail de relance'},
                {header: 'Message relance', dataKey: 'Message relance'},
                {header: 'Template rappel', dataKey: 'Template rappel'},
                {header: 'Objet du mail de rappel', dataKey: 'Objet du mail de rappel'},
                {header: 'Message du mail de rappel', dataKey: 'Message du mail de rappel'},
            ],
            body: this.exportData, styles: {fontSize: 5}
        });
        doc.save(this.fileName + '.pdf');
    }

    exportCSV() {
        this.prepareColumnExport();
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(this.exportData[0]);
        const csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
        csv.unshift(header.join(';'));
        const csvArray = csv.join('\r\n');
        const blob = new Blob([csvArray], {type: 'text/csv'});
        saveAs(blob, this.fileName + '.csv');
    }

    prepareCampagneExport(): void {
        console.log('Selected Campagne :', this.selectedCampagne);
        this.exportCampagneData = [{
            Libellé: this.selectedCampagne.libelle,
            'Année d’activités ': this.selectedCampagne.annee,
            'Date de début': this.selectedCampagne.dateDepart,
            'Date fin': this.selectedCampagne.dateFin,
            'Etat campagne': this.selectedCampagne.etatCampagneVo?.libelle,
        }];
        this.exportDistinctionsData = this.selectedCampagne.distinctionsVo ? this.selectedCampagne.distinctionsVo.map(e => {
            return {
                Campagne: this.selectedCampagne?.libelle,
                Annee: this.selectedCampagne?.annee,
                Chercheur: e.chercheurVo?.nom + ' ' + e.chercheurVo?.prenom,
                Intitule: e.intitule,
                'Date Obtention': e.dateObtention,
                'Particpation Individuelle': e.typeParticipationVo.libelle,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        }) : [];
        this.exportProjetFinancementData = this.selectedCampagne.projetActiviteRecherchesVo?.[0]
            ?.projetActiviteRechercheDetailsVo ? this.selectedCampagne.projetActiviteRecherchesVo?.[0]
            ?.projetActiviteRechercheDetailsVo?.map(e => {
                let etablissementsFinanceurs = '';
                let etablissementsLanceurs = '';
                let etablissementsCocontractants = '';
                let instruments = '';
                let pays = '';
                let enjeuxIrd = '';

                e.projetActiviteRechercheDetailEtablissementFinanceursVo?.forEach(e => {
                    etablissementsFinanceurs = e.etablissementVo?.libelle + ',' + etablissementsFinanceurs;
                });
                e.projetActiviteRechercheDetailEtablissementLanceursVo?.forEach(e => {
                    etablissementsLanceurs = e.etablissementVo?.libelle + ',' + etablissementsLanceurs;
                });
                e.projetActiviteRechercheDetailInstitutionCoContractantsVo?.forEach(e => {
                    etablissementsCocontractants = e.etablissementVo?.libelle + ',' + etablissementsCocontractants;
                });
                e.projetActiviteRechercheDetailInstrumentIrdsVo?.forEach(e => {
                    instruments = e.instrumentIrdVo?.libelle + ',' + instruments;
                });
                e.projetActiviteRechercheDetailPayssVo?.forEach(e => {
                    pays = e.paysVo?.libelle + ',' + pays;
                });
                e.projetActiviteRechercheDetailEnjeuxIrdsVo?.forEach(e => {
                    enjeuxIrd = e.enjeuxIrdVo?.libelle + ',' + enjeuxIrd;
                });
                return {
                    Campagne: this.selectedCampagne?.libelle,
                    Annee: this.selectedCampagne?.annee,
                    Chercheur: this.selectedCampagne.projetActiviteRecherchesVo[0]
                        ?.chercheurVo.prenom + ' ' + this.selectedCampagne.projetActiviteRecherchesVo[0]
                        ?.chercheurVo.nom,
                    'Sujet du projet': e.sujetIntituleReponse,
                    'Status Projet': e.statusProjetVo?.libelle,
                    'Durée prévue': e.dureePrevuEnMois,
                    'Enjeux IRDs': enjeuxIrd,
                    'Instruments IRD': instruments,
                    'Etablissements Lanceurs': etablissementsLanceurs,
                    'Etablissements Co-contractants': etablissementsCocontractants,
                    Pays: pays,
                    'Financement Spécifique ou non': e.financementSpecifique,
                    Montant: e.montantFinancementPrevu,
                    'Etablissements Financeurs': etablissementsFinanceurs
                };
            }) : [];
        this.exportVieInstitutData = this.selectedCampagne.vieInstitutionnellesVo?.[0]?.vieInstitutionnelleDetailsVo ?
            this.selectedCampagne.vieInstitutionnellesVo?.[0]?.vieInstitutionnelleDetailsVo?.map(e => {
                let etablissements = '';
                let instruments = '';
                e.vieInstitutionnelleDetailEtablissementsVo?.forEach(e => {
                    etablissements = e.etablissementVo?.libelle + ',' + etablissements;
                });
                e.vieInstitutionnelleDetailInstrumentIrdsVo?.forEach(e => {
                    instruments = e.instrumentIrdVo?.libelle + ',' + instruments;
                });
                return {
                    Campagne: this.selectedCampagne?.libelle,
                    Annee: this.selectedCampagne?.annee,
                    Chercheur: this.selectedCampagne.projetActiviteRecherchesVo[0]?.chercheurVo.prenom
                        + ' ' + this.selectedCampagne.projetActiviteRecherchesVo[0]?.chercheurVo.nom,
                    Libelle: e.libelle,
                    'Type Instance': e.typeInstanceVo?.libelle,
                    'Correle Structure Ird': e.cooreleStructureIrd,
                    'Structure Ird': e.structureIrdVo?.libelle,
                    'Etablissements ': etablissements,
                    'Correle Instrument Ird': e.cooreleInstrumentIrd,
                    'Instruments IRD': instruments
                };
            }) : [];
        this.exportSavoirEtInnovationData = this.selectedCampagne.savoirEtInnovationsVo?.[0]
            ?.developpementDeSavoirEtInnovationScientifiquesVo ?
            this.selectedCampagne.savoirEtInnovationsVo?.[0]
                ?.developpementDeSavoirEtInnovationScientifiquesVo?.map(e => {
                let roles = '';
                let typeSavoirs = '';
                let disciplines = '';
                let typeUsers = '';
                let modeDiffusions = '';
                let enjeuxIRDs = '';
                let paysSavoirs = '';
                let instruments = '';

                e.developpementDeSavoirEtInnovationScientifiqueRolesVo?.forEach(e => {
                    roles = e.roleDeveloppementDeSavoirVo?.libelle + ',' + roles;
                });
                e.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo?.forEach(e => {
                    disciplines = e.disciplineScientifiqueVo?.libelle + ',' + disciplines;
                });
                e.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo?.forEach(e => {
                    typeSavoirs = e.typeSavoirVo?.libelle + ',' + typeSavoirs;
                });
                e.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo?.forEach(e => {
                    enjeuxIRDs = e.enjeuxIrdVo?.libelle + ',' + enjeuxIRDs;
                });
                e.typeUtilisateurSavoirConcusVo?.forEach(e => {
                    typeUsers = e.typeUtilisateurVo?.libelle + ',' + typeUsers;
                });
                e.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo?.forEach(e => {
                    modeDiffusions = e.modeDiffusionVo?.libelle + ',' + modeDiffusions;
                });
                e.developpementDeSavoirEtInnovationScientifiquePayssVo?.forEach(e => {
                    paysSavoirs = e.paysVo?.libelle + ',' + paysSavoirs;
                });
                e.developpementDeSavoirEtInnovationScientifiqueInstrumentIrdsVo?.forEach(e => {
                    instruments = e.instrumentIrdVo?.libelle + ',' + instruments;
                });
                return {
                    Campagne: this.selectedCampagne?.libelle,
                    Annee: this.selectedCampagne?.annee,
                    Chercheur: this.selectedCampagne.projetActiviteRecherchesVo[0]?.chercheurVo.prenom + ' ' + this.selectedCampagne.projetActiviteRecherchesVo[0]?.chercheurVo.nom,
                    'Type Savoir ou Instrument': typeSavoirs,
                    'Titre de l\'instrument ou savoir': e.titreInstrument,
                    Roles: roles,
                    'Année Mise en oeuvre': e.anneeMiseEnOeuvre,
                    'Disciplines Scientifiques ': disciplines,
                    'Types d\'uitilisateurs': typeUsers,
                    'Mode de diffusions': modeDiffusions,
                    'Enjeux Scientifiques': enjeuxIRDs,
                    'Pays concernés par ce savoir': paysSavoirs,
                    'Organsime ou partenaire scientifique': e.Etablissement,
                    'Lien Web': e.lienWeb,
                    Instruments: instruments,
                    'Etat Saisi': e.etatEtapeCampagneVo?.libelle
                };
            }) : [];
        this.exportEventColloqueData = this.selectedCampagne.savoirEtInnovationsVo?.[0]?.evenementColloqueScienntifiquesVo ? this.selectedCampagne.savoirEtInnovationsVo?.[0]?.evenementColloqueScienntifiquesVo?.map(e => {
            let disciplinesEvent = '';
            let enjeuxEventIRDs = '';
            let paysEvent = '';
            let instrumentsEvent = '';

            e.disciplineScientifiqueEvenementColloqueScientifiquesVo?.forEach(e => {
                disciplinesEvent = e.disciplineScientifiqueVo?.libelle + ',' + disciplinesEvent;
            });

            e.evenementColloqueScienntifiqueEnjeuxIrdsVo?.forEach(e => {
                enjeuxEventIRDs = e.enjeuxIrdVo?.libelle + ',' + enjeuxEventIRDs;
            });

            e.evenementColloqueScienntifiquePayssVo?.forEach(e => {
                paysEvent = e.paysVo?.libelle + ',' + paysEvent;
            });
            e.evenementColloqueScienntifiqueInstrumentsVo?.forEach(e => {
                instrumentsEvent = e.instrumentIrdVo?.libelle + ',' + instrumentsEvent;
            });
            return {
                Campagne: this.selectedCampagne?.libelle,
                Annee: this.selectedCampagne?.annee,
                Chercheur: this.selectedCampagne.projetActiviteRecherchesVo[0]?.chercheurVo.prenom + ' ' + this.selectedCampagne.projetActiviteRecherchesVo[0]?.chercheurVo.nom,
                'Intitulé de l\'événement': e.intitule,
                'Type de participation': e.typeDeParticipation,
                'Date de l\'évenement': e.dateEvenement,
                'diplomatie internationale': e.diplomatieStategique,
                'Format Evenement': e.modaliteVo?.libelle,
                'Enjeux Scientifiques': enjeuxEventIRDs,
                'Disciplines Scientifiques': disciplinesEvent,
                'Volume de participant': e.volumeParticipant,
                'Pays concernés par l\'évenement,': paysEvent,
                Instruments: instrumentsEvent,
                'Etat Saisi': e.etatEtapeCampagneVo?.libelle
            };
        }) : [];
        this.exportRencontrePublicData = this.selectedCampagne.cultureScientifiquesVo?.[0]?.rencontreGrandPubliqueJeunePubliquesVo ? this.selectedCampagne.cultureScientifiquesVo?.[0]?.rencontreGrandPubliqueJeunePubliquesVo?.map(e => {
            let disciplines = '';
            let typePublicParticipant = '';
            let enjeux = '';
            let periodes = '';
            let structuresOrgansatrices = '';
            let typesInstruments = '';
            let instruments = '';

            e.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo?.forEach(e => {
                disciplines = e.disciplineScientifiqueVo?.libelle + ',' + disciplines;
            });

            e.typePubliqueRencontreGrandPubliqueJeunePubliquesVo?.forEach(e => {
                typePublicParticipant = e.typePubliqueVo?.libelle + ',' + typePublicParticipant;
            });

            e.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo?.forEach(e => {
                enjeux = e.enjeuxIrdVo?.libelle + ',' + enjeux;
            });
            e.rencontreGrandPubliqueJeunePubliquePeriodesVo?.forEach(e => {
                periodes = e.dateRencontre + ',' + periodes;
            });
            e.structureOganisatricesVo?.forEach(e => {
                structuresOrgansatrices = e.etablissementVo?.libelle + ',' + structuresOrgansatrices;
            });
            e.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo?.forEach(e => {
                typesInstruments = e.typeInstrumentIrdVo?.libelle + ',' + typesInstruments;
            });
            e.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo?.forEach(e => {
                instruments = e.instrumentIrdVo?.libelle + ',' + instruments;
            });
            return {
                Campagne: this.selectedCampagne?.libelle,
                Annee: this.selectedCampagne?.annee,
                Chercheur: this.selectedCampagne.cultureScientifiquesVo[0]?.chercheurVo.prenom + ' ' + this.selectedCampagne.cultureScientifiquesVo[0]?.chercheurVo.nom,
                'Format de la rencontre': e.formatRencontreVo?.libelle,
                'Type de public non scientifique participant': typePublicParticipant,
                'Intitulé ou sujet de la rencontre': e.intituleSujet,
                'Enjeux Scientifiques abordés': enjeux,
                'Disciplines Scientifiques mobilisées': disciplines,
                'Nombre estimé de personnes': e.nombrePersonneEstime,
                Périodes: periodes,
                'Structure organisatrice': structuresOrgansatrices,
                'Pays de conception': e.paysVo?.libelle,
                'Types d\'instruments': typesInstruments,
                'Instruments IRD': instruments,
                'Lien web': e.lienWeb,
                Remarque: e.remarque,
                'Etat Saisi': e.etatEtapeCampagneVo?.libelle
            };
        }) : [];
        this.exportRencontreMediaData = this.selectedCampagne.cultureScientifiquesVo?.[0]?.rencontreMediasVo ? this.selectedCampagne.cultureScientifiquesVo?.[0]?.rencontreMediasVo?.map(e => {
            let disciplines = '';
            let typePublicCible = '';
            let enjeux = '';
            let periodes = '';
            let pays = '';


            e.rencontreMediaDisciplineScientifiquesVo?.forEach(e => {
                disciplines = e.disciplineScientifiqueVo?.libelle + ',' + disciplines;
            });

            e.typePubliqueRencontreMediasVo?.forEach(e => {
                typePublicCible = e.typePubliqueVo?.libelle + ',' + typePublicCible;
            });

            e.rencontreMediaEnjeuxIrdsVo?.forEach(e => {
                enjeux = e.enjeuxIrdVo?.libelle + ',' + enjeux;
            });
            e.rencontreMediaPeriodesVo?.forEach(e => {
                periodes = e.dateRencontre + ',' + periodes;
            });
            e.paysRencontreMediasVo?.forEach(e => {
                pays = e.paysVo?.libelle + ',' + pays;
            });
            return {
                Campagne: this.selectedCampagne?.libelle,
                Annee: this.selectedCampagne?.annee,
                Chercheur: this.selectedCampagne.cultureScientifiquesVo[0]?.chercheurVo.prenom + ' ' + this.selectedCampagne.cultureScientifiquesVo[0]?.chercheurVo.nom,
                'Public cible': typePublicCible,
                'Format de la rencontre': e.formatRencontreVo?.libelle,
                'Nom Media': e.nomMedia,
                'Intitulé ou sujet de la rencontre-média': e.intituleSujet,
                Périodes: periodes,
                Pays: pays,
                'Enjeux Scientifiques abordés': enjeux,
                'Disciplines Scientifiques mobilisées': disciplines,
                'Lien web': e.lienWeb,
                Remarque: e.remarque,
                'Etat Saisi': e.etatEtapeCampagneVo?.libelle
            };
        }) : [];
        this.exportOutilPedagogiqueData = this.selectedCampagne.cultureScientifiquesVo?.[0]?.outilPedagogiquesVo ? this.selectedCampagne.cultureScientifiquesVo?.[0]?.outilPedagogiquesVo?.map(e => {
            let disciplines = '';
            let publicCible = '';
            let enjeux = '';
            let periodes = '';
            let paysConception = '';
            let paysDiffusion = '';
            let typeOutils = '';
            const langues = '';
            let instruments = '';

            e.outilPedagogiqueDisciplineScientifiquesVo?.forEach(e => {
                disciplines = e.disciplineScientifiqueVo?.libelle + ',' + disciplines;
            });

            e.outilPedagogiquePubliqueCiblesVo?.forEach(e => {
                publicCible = e.publicCibleVo?.libelle + ',' + publicCible;
            });

            e.outilPedagogiqueEnjeuxIrdsVo?.forEach(e => {
                enjeux = e.enjeuxIrdVo?.libelle + ',' + enjeux;
            });
            e.outilPedagogiquePeriodesVo?.forEach(e => {
                periodes = e.dateDiffusion + ',' + periodes;
            });
            e.outilPedagogiquePaysConceptionsVo?.forEach(e => {
                paysConception = e.paysVo?.libelle + ',' + paysConception;
            });
            e.outilPedagogiquePaysDiffusionsVo?.forEach(e => {
                paysDiffusion = e.paysVo?.libelle + ',' + paysDiffusion;
            });
            e.typeOutilPedagogiquesVo?.forEach(e => {
                typeOutils = e.typeOutilVo?.libelle + ',' + typeOutils;
            });
            e.outilPedagogiqueInstrumentIrdsVo?.forEach(e => {
                instruments = e.instrumentIrdVo?.libelle + ',' + instruments;
            });
            return {
                Campagne: this.selectedCampagne?.libelle,
                Annee: this.selectedCampagne?.annee,
                Chercheur: this.selectedCampagne.cultureScientifiquesVo[0]?.chercheurVo.prenom + ' '
                    + this.selectedCampagne.cultureScientifiquesVo[0]?.chercheurVo.nom,
                'Nom de l\'outil pédagogique': e.nom,
                'Public cible': publicCible,
                'Type Outil pédagogique': typeOutils,
                'rôle sur ce nouvel outil pédagogique': e.roleOutilPedagogique,
                'Enjeux scientifiques concernés': enjeux,
                'Disciplines Scientifiques mobilisées': disciplines,
                Périodes: periodes,
                'Pays de Conception': paysConception,
                'Pays de Diffusion': paysDiffusion,
                'Disponible en Numérique': e.disponnibleNumerique,
                'Langues dans lesquelles l\'outil est disponible': langues,
                'Lien vers Description': e.lienWeb,
                'Partenaire éventuels': e.partenaireEventuel,
                'Instruments IRD liés à cet outil': instruments,
                Remarque: e.remarque,
                'Etat Saisi': e.etatEtapeCampagneVo?.libelle
            };
        }) : [];
        this.exportEncadrementDoctorantData = this.selectedCampagne.encadrementsVo?.[0]?.encadrementDoctorantsVo
            ? this.selectedCampagne.encadrementsVo?.[0]?.encadrementDoctorantsVo?.map(e => {

                let financements = '';
                let disciplines = '';
                let enjeux = '';
                e.financementEncadrementDoctorantsVo?.forEach(e => {
                    financements = financements + ',' + e.financementDoctorantVo?.libelle;
                });
                e.disciplineScientifiqueEncadrementDoctorantsVo?.forEach(e => {
                    disciplines = disciplines + ',' + e.disciplineScientifiqueVo?.libelle;
                });
                e.enjeuxIrdEncadrementDoctorantsVo?.forEach(e => {
                    enjeux = enjeux + ',' + e.enjeuxIrdVo?.libelle;
                });
                return {
                    Campagne: this.selectedCampagne?.libelle,
                    Annee: this.selectedCampagne?.annee,
                    Chercheur: this.selectedCampagne.encadrementsVo[0]?.chercheurVo.prenom + ' ' + this.selectedCampagne.encadrementsVo[0]?.chercheurVo.nom,
                    Doctorant: e.doctorantVo?.nom + ' ' + e.doctorantVo?.prenom,
                    'Role et responsabilité': e.responsabiliteEncadrementDoctorantVo?.libelle,
                    'Directeur de thèse': e.directeur,
                    'Inscrit dans au moins deux établissements de pays différents': e.codirectionInternationale,
                    'Sujet de thèse': e.sujetThese,
                    'Enjeux scientifiques abordés par le sujet': enjeux,
                    'Discipline(s) concernée(s) par le sujet': disciplines,
                    'Période Début thèse': e.dateDebutThese,
                    'Période de soutenance de thèse connue ou prévue': e.datePrevuSoutenanceThese,
                    'Intitulé de l’école doctorale': e.intituleEcoleDoctorale,
                    'Financement du doctorant': financements,
                    'Cursus d\'inscription internationale?': e.cursus,
                    'Etablissement d\'inscription': e.etablissementVo?.libelle,
                    'Pays d\'inscription': e.paysVo?.libelle,
                    'Etat Saisi': e.etatEtapeCampagneVo?.libelle
                };
            }) : [];
        this.exportEncadrementEtudiantData = this.selectedCampagne.encadrementsVo?.[0]?.encadrementEtudiantsVo ? this.selectedCampagne.encadrementsVo?.[0]?.encadrementEtudiantsVo?.map(e => {

            let disciplines = '';
            let enjeux = '';
            e.encadrementEtudiantDisciplineScientifiquesVo?.forEach(e => {
                disciplines = disciplines + ',' + e.disciplineScientifiqueVo?.libelle;
            });
            e.encadrementEtudiantEnjeuxIrdsVo?.forEach(e => {
                enjeux = enjeux + ',' + e.enjeuxIrdVo?.libelle;
            });
            return {
                Campagne: this.selectedCampagne?.libelle,
                Annee: this.selectedCampagne?.annee,
                Chercheur: this.selectedCampagne.encadrementsVo[0]?.chercheurVo.prenom + ' ' + this.selectedCampagne.encadrementsVo[0]?.chercheurVo.nom,
                Etudiant: e.etudiantVo?.nom + ' ' + e.etudiantVo?.prenom,
                'Niveau de formation': e.niveauFormationPostBacVo?.libelle,
                'Rôle et responsabilité': e.responsabiliteEncadrementEtudiantVo?.libelle,
                'Sujet scientifique de l\'étudiant': e.sujetEtude,
                'Enjeux scientifiques abordés par le sujet': enjeux,
                'Discipline(s) concernée(s) par le sujet': disciplines,
                'Cursus d\'inscription internationale?': e.cursus,
                'Etablissement d\'inscription': e.etablissementVo?.libelle,
                'Pays d\'inscription': e.paysVo?.libelle,
                'Etat Saisi': e.etatEtapeCampagneVo?.libelle
            };
        }) : [];
        this.exportEncadrementEquipeData = this.selectedCampagne.gestionEquipesVo?.[0]?.gestionEquipeDetailsVo ? this.selectedCampagne.gestionEquipesVo?.[0]?.gestionEquipeDetailsVo?.map(e => {
            return {
                Campagne: this.selectedCampagne?.libelle,
                Annee: this.selectedCampagne?.annee,
                Chercheur: this.selectedCampagne.gestionEquipesVo[0]?.chercheurVo.prenom + ' ' + this.selectedCampagne.gestionEquipesVo[0]?.chercheurVo.nom,
                'Nombre de personnes encadrées': e.nombrePersonneEncadre,
                'Nombre de personnes non personnels de l\'IRD': e.nombrePersonneHorsIrd,
                'Nombre de personnes sous convention': e.nombrePersonneSousConventions,
                'Formation au management et l\’encadrement d’équipes': e.formationManagement
            };
        }) : [];
    }

    prepareColumnExport(): void {

        this.exportData = this.campagnes.map(e => {
            return {
                Libellé: e.libelle,
                Code: e.code,
                'Année d’activités': e.annee,
                'Date de début': e.dateDepart,
                'Date de fin': e.dateFin,
                'Etat campagne': e.etatCampagneVo?.libelle,
                'Template ouverture': e.templateOuvertureVo?.code,
                'Objet du mail de ouverture': e.objetOuverture,
                'Message du mail de ouverture': e.messageOuverture,
                'Template cloture': e.templateClotureVo?.code,
                'Objet du mail d’ouverture': e.objetCloture,
                'Message du mail d’ouverture': e.messageCloture,
            };
        });


        this.criteriaData = [{
            Libellé: this.searchCampagne.libelle ? this.searchCampagne.libelle : '-----',
            Code: this.searchCampagne.code ? this.searchCampagne.code : '-----',
            'Année d’activités': this.searchCampagne.annee ? this.searchCampagne.annee : '-----',
            'Date de début': this.searchCampagne.dateDepart ? this.searchCampagne.dateDepart : '-----',
            'Date de fin': this.searchCampagne.dateFin ? this.searchCampagne.dateFin : '-----',
            'Etat campagne': this.searchCampagne.etatCampagneVo ? this.searchCampagne.etatCampagneVo : '-----'
        }];

    }

    public async sendEmailCampagne(campagne) {
        this.selectedCampagne = campagne;
        this.displayEmailRelance = true;
        await this.loadSelectedChercheursByCampagne(campagne);
        await this.loadAvailableChercheursByCampagne(campagne);
        this.headerRelance = 'Historique des E-mails de relance (campagne ' + this.selectedCampagne?.libelle + ' )';
        this.headerRappel = 'Historique des E-mails de rappel (campagne ' + this.selectedCampagne?.libelle + ' )';
    }

    public async loadAvailableChercheursByCampagne(campagne) {
        this.availableChercheurs = [];
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
        isPermistted ? this.chercheurService.findAvailableChercheurs(campagne).subscribe(chercheurs => {
                    this.availableChercheurs = chercheurs;
                }
                , error => console.log(error))
            : this.messageService.add({severity: 'error', summary: '', detail: 'permission problem'});
    }

    public async loadAvailableChercheurs() {
        this.availableChercheurs = [];
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => {
                    this.availableChercheurs = chercheurs;
                }
                , error => console.log(error))
            : this.messageService.add({severity: 'error', summary: '', detail: 'permission problem'});
    }


    public async loadSelectedChercheursByCampagne(campagne) {
        this.selectedChercheurs = [];
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
        isPermistted ? this.chercheurService.findByCampagne(campagne).subscribe(selectedChercheurs => {
                    this.selectedChercheurs = selectedChercheurs;
                }
                , error => console.log(error))
            : this.messageService.add({severity: 'error', summary: '', detail: 'permission problem'});
    }


    // getters and setters

    get campagnes(): Array<CampagneVo> {
        return this.campagneService.campagnes;
    }

    set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
    }

    get campagneSelections(): Array<CampagneVo> {
        return this.campagneService.campagneSelections;
    }

    set campagneSelections(value: Array<CampagneVo>) {
        this.campagneService.campagneSelections = value;
    }

    get selectedCampagne(): CampagneVo {
        return this.campagneService.selectedCampagne;
    }

    set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
    }

    get createCampagneDialog(): boolean {
        return this.campagneService.createCampagneDialog;
    }

    set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog = value;
    }


    get editCampagneDialog(): boolean {
        return this.campagneService.editCampagneDialog;
    }

    set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog = value;
    }

    get viewCampagneDialog(): boolean {
        return this.campagneService.viewCampagneDialog;
    }

    set viewCampagneDialog(value: boolean) {
        this.campagneService.viewCampagneDialog = value;
    }

    get searchCampagne(): CampagneVo {
        return this.campagneService.searchCampagne;
    }

    set searchCampagne(value: CampagneVo) {
        this.campagneService.searchCampagne = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


    get chercheurs(): Array<ChercheurVo> {
        return this.chercheurService.chercheurs;
    }

    set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
    }


    get selectedChercheurs(): Array<ChercheurVo> {
        return this.chercheurService.selectedChercheurs;
    }

    set selectedChercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.selectedChercheurs = value;
    }


    get campagneChercheurOuvertures(): Array<CampagneChercheurOuvertureVo> {
        return this.campagneChercheurOuvertureService.campagneChercheurOuvertures;
    }

    set campagneChercheurOuvertures(value: Array<CampagneChercheurOuvertureVo>) {
        this.campagneChercheurOuvertureService.campagneChercheurOuvertures = value;
    }


    get campagneChercheurFermetures(): Array<CampagneChercheurOuvertureVo> {
        return this.campagneChercheurFermetureService.campagneChercheurFermetures;
    }

    set campagneChercheurFermetures(value: Array<CampagneChercheurOuvertureVo>) {
        this.campagneChercheurFermetureService.campagneChercheurFermetures = value;
    }


    get availableChercheurs(): Array<ChercheurVo> {
        return this.chercheurService.availableChercheurs;
    }

    set availableChercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.availableChercheurs = value;
    }

    get sendEmailOuvertureDisabled(): boolean {
        return this.campagneService.sendEmailOuvertureDisabled;
    }

    set sendEmailOuvertureDisabled(value: boolean) {
        this.campagneService.sendEmailOuvertureDisabled = value;
    }


    get sendEmailFermetureDisabled(): boolean {
        return this.campagneService.sendEmailFermetureDisabled;
    }

    set sendEmailFermetureDisabled(value: boolean) {
        this.campagneService.sendEmailFermetureDisabled = value;
    }

    get selectedCampagneRelanceChercheur(): CampagneRelanceChercheurVo {
        return this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur;
    }

    set selectedCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur = value;
    }

    get selectedCampagneRelance(): CampagneRelanceVo {
        return this.campagneRelanceService.selectedCampagneRelance;
    }

    set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
    }

    get selectedCampagneRappel(): CampagneRappelVo {
        return this.campagneRappelService.selectedCampagneRappel;
    }

    set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
    }

    updateDisplay(event: boolean) {
        this.isCardDisplayActivated = event;
    }

    clearRequest() {
        this.searchCampagne = new CampagneVo();
        this.campagneService.findAll().subscribe(campagnes => {

            this.campagnes = campagnes;
            this.tableChercheur.first = 0;
        }, error => console.log(error));
    }
}
