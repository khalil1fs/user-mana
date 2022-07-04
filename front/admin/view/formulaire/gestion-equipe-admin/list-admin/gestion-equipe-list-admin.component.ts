import {Component, OnInit} from '@angular/core';
import {GestionEquipeService} from 'src/app/controller/service/formulaire/GestionEquipe.service';
import {GestionEquipeVo} from 'src/app/controller/model/formulaire/GestionEquipe.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {CardviewService} from 'src/app/controller/service/formulaire/cardview.service';

@Component({
    selector: 'app-gestion-equipe-list-admin',
    templateUrl: './gestion-equipe-list-admin.component.html',
    styleUrls: ['./gestion-equipe-list-admin.component.css']
})
export class GestionEquipeListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'GestionEquipe';
    yesno: any[] = [];
    chercheurs: Array<ChercheurVo>;
    campagnes: Array<CampagneVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private router: Router, private gestionEquipeService: GestionEquipeService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private roleService: RoleService,
                private authService: AuthService,
                private chercheurService: ChercheurService,
                private campagneService: CampagneService,
                private etatEtapeCampagneService: EtatEtapeCampagneService,
                private cardViewService: CardviewService
    ) {
    }

    ngOnInit(): void {
        this.initExport();
        this.loadChercheur();
        this.loadCampagne();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
        this.isCardDisplayActivated = this.cardViewService.isDefaultModeCards();
    }

    // methods


    public searchRequest() {
        this.gestionEquipeService.findByCriteria(this.searchGestionEquipe).subscribe(gestionEquipes => {

            this.gestionEquipes = gestionEquipes;
            // this.searchGestionEquipe = new GestionEquipeVo();
        }, error => console.log(error));
    }


    public async openCreateGestionEquipe(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedGestionEquipe = new GestionEquipeVo();
            this.createGestionEquipeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});
    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

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
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
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
                {header: 'Chercheur', dataKey: 'Chercheur'},
                {header: 'Campagne', dataKey: 'Campagne'},
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
        const csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
        csv.unshift(header.join(';'));
        const csvArray = csv.join('\r\n');
        const blob = new Blob([csvArray], {type: 'text/csv'});
        saveAs(blob, this.fileName + '.csv');
    }

    prepareColumnExport(): void {
        this.exportData = this.gestionEquipes.map(e => {
            return {
                'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne,
                Chercheur: e.chercheurVo?.numeroMatricule,
                Campagne: e.campagneVo?.libelle,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get gestionEquipes(): Array<GestionEquipeVo> {
        return this.gestionEquipeService.gestionEquipes;
    }

    set gestionEquipes(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipes = value;
    }

    get gestionEquipeSelections(): Array<GestionEquipeVo> {
        return this.gestionEquipeService.gestionEquipeSelections;
    }

    set gestionEquipeSelections(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipeSelections = value;
    }


    get selectedGestionEquipe(): GestionEquipeVo {
        return this.gestionEquipeService.selectedGestionEquipe;
    }

    set selectedGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.selectedGestionEquipe = value;
    }

    get createGestionEquipeDialog(): boolean {
        return this.gestionEquipeService.createGestionEquipeDialog;
    }

    set createGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.createGestionEquipeDialog = value;
    }

    get editGestionEquipeDialog(): boolean {
        return this.gestionEquipeService.editGestionEquipeDialog;
    }

    set editGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.editGestionEquipeDialog = value;
    }

    get viewGestionEquipeDialog(): boolean {
        return this.gestionEquipeService.viewGestionEquipeDialog;
    }

    set viewGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.viewGestionEquipeDialog = value;
    }

    get searchGestionEquipe(): GestionEquipeVo {
        return this.gestionEquipeService.searchGestionEquipe;
    }

    set searchGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.searchGestionEquipe = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
