import {Component, OnInit} from '@angular/core';
import {CampagneChercheurService} from 'src/app/controller/service/formulaire/CampagneChercheur.service';
import {CampagneChercheurVo} from 'src/app/controller/model/formulaire/CampagneChercheur.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {EtatCampagneChercheurService} from 'src/app/controller/service/config/EtatCampagneChercheur.service';

import {EtatCampagneChercheurVo} from 'src/app/controller/model/config/EtatCampagneChercheur.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-campagne-chercheur-list-admin',
    templateUrl: './campagne-chercheur-list-admin.component.html',
    styleUrls: ['./campagne-chercheur-list-admin.component.css']
})
export class CampagneChercheurListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'CampagneChercheur';
    yesno: any[] = [];
    chercheurs: Array<ChercheurVo>;
    campagnes: Array<CampagneVo>;
    etatCampagneChercheurs: Array<EtatCampagneChercheurVo>;


    constructor(private campagneChercheurService: CampagneChercheurService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
        , private etatCampagneChercheurService: EtatCampagneChercheurService
    ) {
    }

    ngOnInit(): void {
        this.loadCampagneChercheurs();
        this.initExport();
        this.initCol();
        this.loadChercheur();
        this.loadCampagne();
        this.loadEtatCampagneChercheur();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadCampagneChercheurs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneChercheur', 'list');
        isPermistted ? this.campagneChercheurService.findAll().subscribe(campagneChercheurs => this.campagneChercheurs = campagneChercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.campagneChercheurService.findByCriteria(this.searchCampagneChercheur).subscribe(campagneChercheurs => {

            this.campagneChercheurs = campagneChercheurs;
            // this.searchCampagneChercheur = new CampagneChercheurVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'campagne?.libelle', header: 'Campagne'},
            {field: 'avancement', header: 'Avancement'},
            {field: 'etatCampagneChercheur?.libelle', header: 'Etat campagne chercheur'},
        ];
    }

    public async editCampagneChercheur(campagneChercheur: CampagneChercheurVo) {
        const isPermistted = await this.roleService.isPermitted('CampagneChercheur', 'edit');
        if (isPermistted) {
            this.campagneChercheurService.findByIdWithAssociatedList(campagneChercheur).subscribe(res => {
                this.selectedCampagneChercheur = res;
                this.editCampagneChercheurDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewCampagneChercheur(campagneChercheur: CampagneChercheurVo) {
        const isPermistted = await this.roleService.isPermitted('CampagneChercheur', 'view');
        if (isPermistted) {
            this.campagneChercheurService.findByIdWithAssociatedList(campagneChercheur).subscribe(res => {
                this.selectedCampagneChercheur = res;
                this.viewCampagneChercheurDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCampagneChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCampagneChercheur = new CampagneChercheurVo();
            this.createCampagneChercheurDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteCampagneChercheur(campagneChercheur: CampagneChercheurVo) {
        const isPermistted = await this.roleService.isPermitted('CampagneChercheur', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Campagne chercheur) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.campagneChercheurService.delete(campagneChercheur).subscribe(status => {
                        if (status > 0) {
                            const position = this.campagneChercheurs.indexOf(campagneChercheur);
                            position > -1 ? this.campagneChercheurs.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Campagne chercheur Supprimé',
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

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneChercheur', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneChercheur', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatCampagneChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneChercheur', 'list');
        isPermistted ? this.etatCampagneChercheurService.findAll().subscribe(etatCampagneChercheurs => this.etatCampagneChercheurs = etatCampagneChercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateCampagneChercheur(campagneChercheur: CampagneChercheurVo) {

        this.campagneChercheurService.findByIdWithAssociatedList(campagneChercheur).subscribe(
            res => {
                this.initDuplicateCampagneChercheur(res);
                this.selectedCampagneChercheur = res;
                this.selectedCampagneChercheur.id = null;
                this.createCampagneChercheurDialog = true;

            });

    }

    initDuplicateCampagneChercheur(res: CampagneChercheurVo) {


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
                {header: 'Chercheur', dataKey: 'Chercheur'},
                {header: 'Campagne', dataKey: 'Campagne'},
                {header: 'Avancement', dataKey: 'Avancement'},
                {header: 'Etat campagne chercheur', dataKey: 'Etat campagne chercheur'},
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
        this.exportData = this.campagneChercheurs.map(e => {
            return {
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Campagne': e.campagneVo?.libelle,
                'Avancement': e.avancement,
                'Etat campagne chercheur': e.etatCampagneChercheurVo?.libelle,
            };
        });
    }

    // getters and setters

    get campagneChercheurs(): Array<CampagneChercheurVo> {
        return this.campagneChercheurService.campagneChercheurs;
    }

    set campagneChercheurs(value: Array<CampagneChercheurVo>) {
        this.campagneChercheurService.campagneChercheurs = value;
    }

    get campagneChercheurSelections(): Array<CampagneChercheurVo> {
        return this.campagneChercheurService.campagneChercheurSelections;
    }

    set campagneChercheurSelections(value: Array<CampagneChercheurVo>) {
        this.campagneChercheurService.campagneChercheurSelections = value;
    }


    get selectedCampagneChercheur(): CampagneChercheurVo {
        return this.campagneChercheurService.selectedCampagneChercheur;
    }

    set selectedCampagneChercheur(value: CampagneChercheurVo) {
        this.campagneChercheurService.selectedCampagneChercheur = value;
    }

    get createCampagneChercheurDialog(): boolean {
        return this.campagneChercheurService.createCampagneChercheurDialog;
    }

    set createCampagneChercheurDialog(value: boolean) {
        this.campagneChercheurService.createCampagneChercheurDialog = value;
    }

    get editCampagneChercheurDialog(): boolean {
        return this.campagneChercheurService.editCampagneChercheurDialog;
    }

    set editCampagneChercheurDialog(value: boolean) {
        this.campagneChercheurService.editCampagneChercheurDialog = value;
    }

    get viewCampagneChercheurDialog(): boolean {
        return this.campagneChercheurService.viewCampagneChercheurDialog;
    }

    set viewCampagneChercheurDialog(value: boolean) {
        this.campagneChercheurService.viewCampagneChercheurDialog = value;
    }

    get searchCampagneChercheur(): CampagneChercheurVo {
        return this.campagneChercheurService.searchCampagneChercheur;
    }

    set searchCampagneChercheur(value: CampagneChercheurVo) {
        this.campagneChercheurService.searchCampagneChercheur = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
