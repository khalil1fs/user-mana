import {Component, OnInit} from '@angular/core';
import {BourseService} from 'src/app/controller/service/formulaire/Bourse.service';
import {BourseVo} from 'src/app/controller/model/formulaire/Bourse.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {ProjetActiviteRechercheService} from 'src/app/controller/service/formulaire/ProjetActiviteRecherche.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

import {ProjetActiviteRechercheVo} from 'src/app/controller/model/formulaire/ProjetActiviteRecherche.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-bourse-list-admin',
    templateUrl: './bourse-list-admin.component.html',
    styleUrls: ['./bourse-list-admin.component.css']
})
export class BourseListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'Bourse';
    yesno: any[] = [];
    projetActiviteRecherches: Array<ProjetActiviteRechercheVo>;
    campagnes: Array<CampagneVo>;
    chercheurs: Array<ChercheurVo>;


    constructor(private bourseService: BourseService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private projetActiviteRechercheService: ProjetActiviteRechercheService
        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
    ) {
    }

    ngOnInit(): void {
        this.loadBourses();
        this.initExport();
        this.initCol();
        this.loadProjetActiviteRecherche();
        this.loadCampagne();
        this.loadChercheur();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadBourses() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Bourse', 'list');
        isPermistted ? this.bourseService.findAll().subscribe(bourses => this.bourses = bourses, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.bourseService.findByCriteria(this.searchBourse).subscribe(bourses => {

            this.bourses = bourses;
            // this.searchBourse = new BourseVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'dateObtention', header: 'Date obtention'},
            {field: 'intitule', header: 'Intitule'},
            {field: 'participationIndividuelle', header: 'Participation individuelle'},
            {field: 'montant', header: 'Montant'},
            {field: 'dureeEnMois', header: 'Duree en mois'},
            {field: 'projetActiviteRecherche?.annee', header: 'Projet activite recherche'},
            {field: 'campagne?.libelle', header: 'Campagne'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
        ];
    }

    public async editBourse(bourse: BourseVo) {
        const isPermistted = await this.roleService.isPermitted('Bourse', 'edit');
        if (isPermistted) {
            this.bourseService.findByIdWithAssociatedList(bourse).subscribe(res => {
                this.selectedBourse = res;
                this.selectedBourse.dateObtention = new Date(bourse.dateObtention);
                this.editBourseDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewBourse(bourse: BourseVo) {
        const isPermistted = await this.roleService.isPermitted('Bourse', 'view');
        if (isPermistted) {
            this.bourseService.findByIdWithAssociatedList(bourse).subscribe(res => {
                this.selectedBourse = res;
                this.selectedBourse.dateObtention = new Date(bourse.dateObtention);
                this.viewBourseDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateBourse(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedBourse = new BourseVo();
            this.createBourseDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteBourse(bourse: BourseVo) {
        const isPermistted = await this.roleService.isPermitted('Bourse', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Bourse) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.bourseService.delete(bourse).subscribe(status => {
                        if (status > 0) {
                            const position = this.bourses.indexOf(bourse);
                            position > -1 ? this.bourses.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Bourse Supprimé',
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

    public async loadProjetActiviteRecherche() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Bourse', 'list');
        isPermistted ? this.projetActiviteRechercheService.findAll().subscribe(projetActiviteRecherches => this.projetActiviteRecherches = projetActiviteRecherches, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Bourse', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Bourse', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateBourse(bourse: BourseVo) {

        this.bourseService.findByIdWithAssociatedList(bourse).subscribe(
            res => {
                this.initDuplicateBourse(res);
                this.selectedBourse = res;
                this.selectedBourse.id = null;
                this.createBourseDialog = true;

            });

    }

    initDuplicateBourse(res: BourseVo) {


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
                {header: 'Date obtention', dataKey: 'Date obtention'},
                {header: 'Intitule', dataKey: 'Intitule'},
                {header: 'Participation individuelle', dataKey: 'Participation individuelle'},
                {header: 'Montant', dataKey: 'Montant'},
                {header: 'Duree en mois', dataKey: 'Duree en mois'},
                {header: 'Projet activite recherche', dataKey: 'Projet activite recherche'},
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
        this.exportData = this.bourses.map(e => {
            return {
                'Date obtention': e.dateObtention,
                'Intitule': e.intitule,
                'Participation individuelle': e.participationIndividuelle,
                'Montant': e.montant,
                'Duree en mois': e.dureeEnMois,
                'Projet activite recherche': e.projetActiviteRechercheVo?.annee,
                'Campagne': e.campagneVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
            };
        });
    }

    // getters and setters

    get bourses(): Array<BourseVo> {
        return this.bourseService.bourses;
    }

    set bourses(value: Array<BourseVo>) {
        this.bourseService.bourses = value;
    }

    get bourseSelections(): Array<BourseVo> {
        return this.bourseService.bourseSelections;
    }

    set bourseSelections(value: Array<BourseVo>) {
        this.bourseService.bourseSelections = value;
    }


    get selectedBourse(): BourseVo {
        return this.bourseService.selectedBourse;
    }

    set selectedBourse(value: BourseVo) {
        this.bourseService.selectedBourse = value;
    }

    get createBourseDialog(): boolean {
        return this.bourseService.createBourseDialog;
    }

    set createBourseDialog(value: boolean) {
        this.bourseService.createBourseDialog = value;
    }

    get editBourseDialog(): boolean {
        return this.bourseService.editBourseDialog;
    }

    set editBourseDialog(value: boolean) {
        this.bourseService.editBourseDialog = value;
    }

    get viewBourseDialog(): boolean {
        return this.bourseService.viewBourseDialog;
    }

    set viewBourseDialog(value: boolean) {
        this.bourseService.viewBourseDialog = value;
    }

    get searchBourse(): BourseVo {
        return this.bourseService.searchBourse;
    }

    set searchBourse(value: BourseVo) {
        this.bourseService.searchBourse = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
