import {Component, OnInit} from '@angular/core';
import {
    CultureScientifiqueOutilPedagogiqueService
} from 'src/app/controller/service/formulaire/CultureScientifiqueOutilPedagogique.service';
import {CultureScientifiqueOutilPedagogiqueVo} from 'src/app/controller/model/formulaire/CultureScientifiqueOutilPedagogique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-culture-scientifique-outil-pedagogique-list-admin',
    templateUrl: './culture-sci-outil-peda-list-admin.html',
    styleUrls: ['./culture-sci-outil-peda-list-admin.css']
})
export class CultureSciOutilPedaListAdmin implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'CultureScientifiqueOutilPedagogique';
    yesno: any[] = [];
    campagnes: Array<CampagneVo>;
    chercheurs: Array<ChercheurVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private cultureScientifiqueOutilPedagogiqueService: CultureScientifiqueOutilPedagogiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadCultureScientifiqueOutilPedagogiques();
        this.initExport();
        this.initCol();
        this.loadCampagne();
        this.loadChercheur();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadCultureScientifiqueOutilPedagogiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueOutilPedagogique', 'list');
        isPermistted ? this.cultureScientifiqueOutilPedagogiqueService.findAll().subscribe(cultureScientifiqueOutilPedagogiques => this.cultureScientifiqueOutilPedagogiques = cultureScientifiqueOutilPedagogiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.cultureScientifiqueOutilPedagogiqueService.findByCriteria(this.searchCultureScientifiqueOutilPedagogique).subscribe(cultureScientifiqueOutilPedagogiques => {

            this.cultureScientifiqueOutilPedagogiques = cultureScientifiqueOutilPedagogiques;
            // this.searchCultureScientifiqueOutilPedagogique = new CultureScientifiqueOutilPedagogiqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'role', header: 'Role'},
            {field: 'nomOutil', header: 'Nom outil'},
            {field: 'sortieAnnee', header: 'Sortie annee'},
            {field: 'sortieMois', header: 'Sortie mois'},
            {field: 'lienWeb', header: 'Lien web'},
            {field: 'campagne?.libelle', header: 'Campagne'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }

    public async editCultureScientifiqueOutilPedagogique(cultureScientifiqueOutilPedagogique: CultureScientifiqueOutilPedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueOutilPedagogique', 'edit');
        if (isPermistted) {
            this.cultureScientifiqueOutilPedagogiqueService.findByIdWithAssociatedList(cultureScientifiqueOutilPedagogique).subscribe(res => {
                this.selectedCultureScientifiqueOutilPedagogique = res;
                this.editCultureScientifiqueOutilPedagogiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewCultureScientifiqueOutilPedagogique(cultureScientifiqueOutilPedagogique: CultureScientifiqueOutilPedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueOutilPedagogique', 'view');
        if (isPermistted) {
            this.cultureScientifiqueOutilPedagogiqueService.findByIdWithAssociatedList(cultureScientifiqueOutilPedagogique).subscribe(res => {
                this.selectedCultureScientifiqueOutilPedagogique = res;
                this.viewCultureScientifiqueOutilPedagogiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCultureScientifiqueOutilPedagogique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCultureScientifiqueOutilPedagogique = new CultureScientifiqueOutilPedagogiqueVo();
            this.createCultureScientifiqueOutilPedagogiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteCultureScientifiqueOutilPedagogique(cultureScientifiqueOutilPedagogique: CultureScientifiqueOutilPedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueOutilPedagogique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Culture scientifique outil pedagogique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.cultureScientifiqueOutilPedagogiqueService.delete(cultureScientifiqueOutilPedagogique).subscribe(status => {
                        if (status > 0) {
                            const position = this.cultureScientifiqueOutilPedagogiques.indexOf(cultureScientifiqueOutilPedagogique);
                            position > -1 ? this.cultureScientifiqueOutilPedagogiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Culture scientifique outil pedagogique Supprimé',
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

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueOutilPedagogique', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueOutilPedagogique', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueOutilPedagogique', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateCultureScientifiqueOutilPedagogique(cultureScientifiqueOutilPedagogique: CultureScientifiqueOutilPedagogiqueVo) {

        this.cultureScientifiqueOutilPedagogiqueService.findByIdWithAssociatedList(cultureScientifiqueOutilPedagogique).subscribe(
            res => {
                this.initDuplicateCultureScientifiqueOutilPedagogique(res);
                this.selectedCultureScientifiqueOutilPedagogique = res;
                this.selectedCultureScientifiqueOutilPedagogique.id = null;
                this.createCultureScientifiqueOutilPedagogiqueDialog = true;

            });

    }

    initDuplicateCultureScientifiqueOutilPedagogique(res: CultureScientifiqueOutilPedagogiqueVo) {
        if (res.publicCibleCultureScientifiqueOutilPedagogiquesVo != null) {
            res.publicCibleCultureScientifiqueOutilPedagogiquesVo.forEach(d => {
                d.cultureScientifiqueOutilPedagogiqueVo = null;
                d.id = null;
            });
        }
        if (res.typeOutilCultureScientifiqueOutilPedagogiquesVo != null) {
            res.typeOutilCultureScientifiqueOutilPedagogiquesVo.forEach(d => {
                d.cultureScientifiqueOutilPedagogiqueVo = null;
                d.id = null;
            });
        }
        if (res.paysTypeOutilCultureScientifiqueOutilPedagogiquesVo != null) {
            res.paysTypeOutilCultureScientifiqueOutilPedagogiquesVo.forEach(d => {
                d.cultureScientifiqueOutilPedagogiqueVo = null;
                d.id = null;
            });
        }
        if (res.etablissementCultureScientifiqueOutilPedagogiquesVo != null) {
            res.etablissementCultureScientifiqueOutilPedagogiquesVo.forEach(d => {
                d.cultureScientifiqueOutilPedagogiqueVo = null;
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
                {header: 'Role', dataKey: 'Role'},
                {header: 'Nom outil', dataKey: 'Nom outil'},
                {header: 'Sortie annee', dataKey: 'Sortie annee'},
                {header: 'Sortie mois', dataKey: 'Sortie mois'},
                {header: 'Lien web', dataKey: 'Lien web'},
                {header: 'Campagne', dataKey: 'Campagne'},
                {header: 'Chercheur', dataKey: 'Chercheur'},
                {header: 'Etat etape campagne', dataKey: 'Etat etape campagne'},
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
        this.exportData = this.cultureScientifiqueOutilPedagogiques.map(e => {
            return {
                'Role': e.role,
                'Nom outil': e.nomOutil,
                'Sortie annee': e.sortieAnnee,
                'Sortie mois': e.sortieMois,
                'Lien web': e.lienWeb,
                'Campagne': e.campagneVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get cultureScientifiqueOutilPedagogiques(): Array<CultureScientifiqueOutilPedagogiqueVo> {
        return this.cultureScientifiqueOutilPedagogiqueService.cultureScientifiqueOutilPedagogiques;
    }

    set cultureScientifiqueOutilPedagogiques(value: Array<CultureScientifiqueOutilPedagogiqueVo>) {
        this.cultureScientifiqueOutilPedagogiqueService.cultureScientifiqueOutilPedagogiques = value;
    }

    get cultureScientifiqueOutilPedagogiqueSelections(): Array<CultureScientifiqueOutilPedagogiqueVo> {
        return this.cultureScientifiqueOutilPedagogiqueService.cultureScientifiqueOutilPedagogiqueSelections;
    }

    set cultureScientifiqueOutilPedagogiqueSelections(value: Array<CultureScientifiqueOutilPedagogiqueVo>) {
        this.cultureScientifiqueOutilPedagogiqueService.cultureScientifiqueOutilPedagogiqueSelections = value;
    }


    get selectedCultureScientifiqueOutilPedagogique(): CultureScientifiqueOutilPedagogiqueVo {
        return this.cultureScientifiqueOutilPedagogiqueService.selectedCultureScientifiqueOutilPedagogique;
    }

    set selectedCultureScientifiqueOutilPedagogique(value: CultureScientifiqueOutilPedagogiqueVo) {
        this.cultureScientifiqueOutilPedagogiqueService.selectedCultureScientifiqueOutilPedagogique = value;
    }

    get createCultureScientifiqueOutilPedagogiqueDialog(): boolean {
        return this.cultureScientifiqueOutilPedagogiqueService.createCultureScientifiqueOutilPedagogiqueDialog;
    }

    set createCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.cultureScientifiqueOutilPedagogiqueService.createCultureScientifiqueOutilPedagogiqueDialog = value;
    }

    get editCultureScientifiqueOutilPedagogiqueDialog(): boolean {
        return this.cultureScientifiqueOutilPedagogiqueService.editCultureScientifiqueOutilPedagogiqueDialog;
    }

    set editCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.cultureScientifiqueOutilPedagogiqueService.editCultureScientifiqueOutilPedagogiqueDialog = value;
    }

    get viewCultureScientifiqueOutilPedagogiqueDialog(): boolean {
        return this.cultureScientifiqueOutilPedagogiqueService.viewCultureScientifiqueOutilPedagogiqueDialog;
    }

    set viewCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.cultureScientifiqueOutilPedagogiqueService.viewCultureScientifiqueOutilPedagogiqueDialog = value;
    }

    get searchCultureScientifiqueOutilPedagogique(): CultureScientifiqueOutilPedagogiqueVo {
        return this.cultureScientifiqueOutilPedagogiqueService.searchCultureScientifiqueOutilPedagogique;
    }

    set searchCultureScientifiqueOutilPedagogique(value: CultureScientifiqueOutilPedagogiqueVo) {
        this.cultureScientifiqueOutilPedagogiqueService.searchCultureScientifiqueOutilPedagogique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
