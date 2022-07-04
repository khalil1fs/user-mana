import {Component, OnInit} from '@angular/core';
import {
    CultureScientifiqueRecontreGrandPublicJeunePublicService
} from 'src/app/controller/service/formulaire/CultureScientifiqueRecontreGrandPublicJeunePublic.service';
import {
    CultureScientifiqueRecontreGrandPublicJeunePublicVo
} from 'src/app/controller/model/formulaire/CultureScientifiqueRecontreGrandPublicJeunePublic.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {FormatRencontreService} from 'src/app/controller/service/formulaire/FormatRencontre.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {FormatRencontreVo} from 'src/app/controller/model/formulaire/FormatRencontre.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-culture-scientifique-recontre-grand-public-jeune-public-list-admin',
    templateUrl: './culture-sci-recontre-gpjp-list-admin.component.html',
    styleUrls: ['./culture-sci-recontre-gpjp-list-admin.component.css']
})
export class CultureScientifiqueRecontreGrandPublicJeunePublicListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'CultureScientifiqueRecontreGrandPublicJeunePublic';
    yesno: any[] = [];
    formatRencontres: Array<FormatRencontreVo>;
    campagnes: Array<CampagneVo>;
    chercheurs: Array<ChercheurVo>;


    constructor(private cultureScientifiqueRecontreGrandPublicJeunePublicService: CultureScientifiqueRecontreGrandPublicJeunePublicService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private formatRencontreService: FormatRencontreService
        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
    ) {
    }

    ngOnInit(): void {
        this.loadCultureScientifiqueRecontreGrandPublicJeunePublics();
        this.initExport();
        this.initCol();
        this.loadFormatRencontre();
        this.loadCampagne();
        this.loadChercheur();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadCultureScientifiqueRecontreGrandPublicJeunePublics() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueRecontreGrandPublicJeunePublic', 'list');
        isPermistted ? this.cultureScientifiqueRecontreGrandPublicJeunePublicService.findAll().subscribe(cultureScientifiqueRecontreGrandPublicJeunePublics => this.cultureScientifiqueRecontreGrandPublicJeunePublics = cultureScientifiqueRecontreGrandPublicJeunePublics, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.findByCriteria(this.searchCultureScientifiqueRecontreGrandPublicJeunePublic).subscribe(cultureScientifiqueRecontreGrandPublicJeunePublics => {

            this.cultureScientifiqueRecontreGrandPublicJeunePublics = cultureScientifiqueRecontreGrandPublicJeunePublics;
            // this.searchCultureScientifiqueRecontreGrandPublicJeunePublic = new CultureScientifiqueRecontreGrandPublicJeunePublicVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
            {field: 'formatRencontre?.libelle', header: 'Format rencontre'},
            {field: 'intituleSujet', header: 'Intitule sujet'},
            {field: 'periodeAnnee', header: 'Periode annee'},
            {field: 'periodeMois', header: 'Periode mois'},
            {field: 'evenementGrandPublic', header: 'Evenement grand public'},
            {field: 'volumePublic', header: 'Volume public'},
            {field: 'lienWeb', header: 'Lien web'},
            {field: 'campagne?.libelle', header: 'Campagne'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
        ];
    }

    public async editCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic: CultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueRecontreGrandPublicJeunePublic', 'edit');
        if (isPermistted) {
            this.cultureScientifiqueRecontreGrandPublicJeunePublicService.findByIdWithAssociatedList(cultureScientifiqueRecontreGrandPublicJeunePublic).subscribe(res => {
                this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic = res;
                this.editCultureScientifiqueRecontreGrandPublicJeunePublicDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic: CultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueRecontreGrandPublicJeunePublic', 'view');
        if (isPermistted) {
            this.cultureScientifiqueRecontreGrandPublicJeunePublicService.findByIdWithAssociatedList(cultureScientifiqueRecontreGrandPublicJeunePublic).subscribe(res => {
                this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic = res;
                this.viewCultureScientifiqueRecontreGrandPublicJeunePublicDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCultureScientifiqueRecontreGrandPublicJeunePublic(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic = new CultureScientifiqueRecontreGrandPublicJeunePublicVo();
            this.createCultureScientifiqueRecontreGrandPublicJeunePublicDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic: CultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueRecontreGrandPublicJeunePublic', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Culture scientifique recontre grand public jeune public) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.cultureScientifiqueRecontreGrandPublicJeunePublicService.delete(cultureScientifiqueRecontreGrandPublicJeunePublic).subscribe(status => {
                        if (status > 0) {
                            const position = this.cultureScientifiqueRecontreGrandPublicJeunePublics.indexOf(cultureScientifiqueRecontreGrandPublicJeunePublic);
                            position > -1 ? this.cultureScientifiqueRecontreGrandPublicJeunePublics.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Culture scientifique recontre grand public jeune public Supprimé',
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
    }

    public async loadFormatRencontre() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueRecontreGrandPublicJeunePublic', 'list');
        isPermistted ? this.formatRencontreService.findAll().subscribe(formatRencontres => this.formatRencontres = formatRencontres, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueRecontreGrandPublicJeunePublic', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueRecontreGrandPublicJeunePublic', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic: CultureScientifiqueRecontreGrandPublicJeunePublicVo) {

        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.findByIdWithAssociatedList(cultureScientifiqueRecontreGrandPublicJeunePublic).subscribe(
            res => {
                this.initDuplicateCultureScientifiqueRecontreGrandPublicJeunePublic(res);
                this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic = res;
                this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.id = null;
                this.createCultureScientifiqueRecontreGrandPublicJeunePublicDialog = true;

            });

    }

    initDuplicateCultureScientifiqueRecontreGrandPublicJeunePublic(res: CultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        if (res.publicCibleCultureScientifiqueRecontresGrandPublicJeunePublicsVo != null) {
            res.publicCibleCultureScientifiqueRecontresGrandPublicJeunePublicsVo.forEach(d => {
                d.cultureScientifiqueRecontreGrandPublicJeunePublicVo = null;
                d.id = null;
            });
        }
        if (res.contexteCultureScientifiqueRecontreGrandPublicJeunePublicsVo != null) {
            res.contexteCultureScientifiqueRecontreGrandPublicJeunePublicsVo.forEach(d => {
                d.cultureScientifiqueRecontreGrandPublicJeunePublicVo = null;
                d.id = null;
            });
        }
        if (res.etablissementCultureScientifiqueRecontreGrandPublicJeunePublicsVo != null) {
            res.etablissementCultureScientifiqueRecontreGrandPublicJeunePublicsVo.forEach(d => {
                d.cultureScientifiqueRecontreGrandPublicJeunePublicVo = null;
                d.id = null;
            });
        }
        if (res.paysCultureScientifiqueRecontreGrandPublicJeunePublicsVo != null) {
            res.paysCultureScientifiqueRecontreGrandPublicJeunePublicsVo.forEach(d => {
                d.cultureScientifiqueRecontreGrandPublicJeunePublicVo = null;
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

    exportExcel(): void {
        import('xlsx').then(async xlsx => {
            this.prepareColumnExport();
            const worksheet = xlsx.utils.json_to_sheet(this.exportData);
            const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, this.fileName);
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
                {header: 'Temps estime pour cette annne', dataKey: 'Temps estime pour cette annne'},
                {header: 'Format rencontre', dataKey: 'Format rencontre'},
                {header: 'Intitule sujet', dataKey: 'Intitule sujet'},
                {header: 'Periode annee', dataKey: 'Periode annee'},
                {header: 'Periode mois', dataKey: 'Periode mois'},
                {header: 'Evenement grand public', dataKey: 'Evenement grand public'},
                {header: 'Volume public', dataKey: 'Volume public'},
                {header: 'Lien web', dataKey: 'Lien web'},
                {header: 'Campagne', dataKey: 'Campagne'},
                {header: 'Chercheur', dataKey: 'Chercheur'},
            ],
            body: this.exportData, styles: {fontSize: 5}
        });
        doc.save(this.fileName + '.pdf');
    }

    exportCSV() {
        this.prepareColumnExport();
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(this.exportData[0]);
        let csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
        csv.unshift(header.join(';'));
        let csvArray = csv.join('\r\n');
        var blob = new Blob([csvArray], {type: 'text/csv'});
        saveAs(blob, this.fileName + '.csv');
    }

    prepareColumnExport(): void {
        this.exportData = this.cultureScientifiqueRecontreGrandPublicJeunePublics.map(e => {
            return {
                'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne,
                'Format rencontre': e.formatRencontreVo?.libelle,
                'Intitule sujet': e.intituleSujet,
                'Periode annee': e.periodeAnnee,
                'Periode mois': e.periodeMois,
                'Evenement grand public': e.evenementGrandPublic,
                'Volume public': e.volumePublic,
                'Lien web': e.lienWeb,
                'Campagne': e.campagneVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
            };
        });
    }

    // getters and setters

    get cultureScientifiqueRecontreGrandPublicJeunePublics(): Array<CultureScientifiqueRecontreGrandPublicJeunePublicVo> {
        return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.cultureScientifiqueRecontreGrandPublicJeunePublics;
    }

    set cultureScientifiqueRecontreGrandPublicJeunePublics(value: Array<CultureScientifiqueRecontreGrandPublicJeunePublicVo>) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.cultureScientifiqueRecontreGrandPublicJeunePublics = value;
    }

    get cultureScientifiqueRecontreGrandPublicJeunePublicSelections(): Array<CultureScientifiqueRecontreGrandPublicJeunePublicVo> {
        return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.cultureScientifiqueRecontreGrandPublicJeunePublicSelections;
    }

    set cultureScientifiqueRecontreGrandPublicJeunePublicSelections(value: Array<CultureScientifiqueRecontreGrandPublicJeunePublicVo>) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.cultureScientifiqueRecontreGrandPublicJeunePublicSelections = value;
    }


    get selectedCultureScientifiqueRecontreGrandPublicJeunePublic(): CultureScientifiqueRecontreGrandPublicJeunePublicVo {
        return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.selectedCultureScientifiqueRecontreGrandPublicJeunePublic;
    }

    set selectedCultureScientifiqueRecontreGrandPublicJeunePublic(value: CultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.selectedCultureScientifiqueRecontreGrandPublicJeunePublic = value;
    }

    get createCultureScientifiqueRecontreGrandPublicJeunePublicDialog(): boolean {
        return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.createCultureScientifiqueRecontreGrandPublicJeunePublicDialog;
    }

    set createCultureScientifiqueRecontreGrandPublicJeunePublicDialog(value: boolean) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.createCultureScientifiqueRecontreGrandPublicJeunePublicDialog = value;
    }

    get editCultureScientifiqueRecontreGrandPublicJeunePublicDialog(): boolean {
        return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.editCultureScientifiqueRecontreGrandPublicJeunePublicDialog;
    }

    set editCultureScientifiqueRecontreGrandPublicJeunePublicDialog(value: boolean) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.editCultureScientifiqueRecontreGrandPublicJeunePublicDialog = value;
    }

    get viewCultureScientifiqueRecontreGrandPublicJeunePublicDialog(): boolean {
        return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.viewCultureScientifiqueRecontreGrandPublicJeunePublicDialog;
    }

    set viewCultureScientifiqueRecontreGrandPublicJeunePublicDialog(value: boolean) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.viewCultureScientifiqueRecontreGrandPublicJeunePublicDialog = value;
    }

    get searchCultureScientifiqueRecontreGrandPublicJeunePublic(): CultureScientifiqueRecontreGrandPublicJeunePublicVo {
        return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.searchCultureScientifiqueRecontreGrandPublicJeunePublic;
    }

    set searchCultureScientifiqueRecontreGrandPublicJeunePublic(value: CultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.searchCultureScientifiqueRecontreGrandPublicJeunePublic = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
