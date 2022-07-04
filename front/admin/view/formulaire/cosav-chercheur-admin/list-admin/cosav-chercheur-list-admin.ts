import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirChercheurService} from 'src/app/controller/service/formulaire/CommunauteSavoirChercheur.service';
import {CommunauteSavoirChercheurVo} from 'src/app/controller/model/formulaire/CommunauteSavoirChercheur.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {CommunauteSavoirService} from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

import {CommunauteSavoirVo} from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-communaute-savoir-chercheur-list-admin',
    templateUrl: './cosav-chercheur-list-admin.html',
    styleUrls: ['./cosav-chercheur-list-admin.css']
})
export class CommunauteSavoirChercheurListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'CommunauteSavoirChercheur';
    yesno: any[] = [];
    communauteSavoirs: Array<CommunauteSavoirVo>;
    chercheurs: Array<ChercheurVo>;


    constructor(private communauteSavoirChercheurService: CommunauteSavoirChercheurService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private communauteSavoirService: CommunauteSavoirService
        , private chercheurService: ChercheurService
    ) {
    }

    ngOnInit(): void {
        this.loadCommunauteSavoirChercheurs();
        this.initExport();
        this.initCol();
        this.loadCommunauteSavoir();
        this.loadChercheur();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadCommunauteSavoirChercheurs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'list');
        isPermistted ? this.communauteSavoirChercheurService.findAll().subscribe(communauteSavoirChercheurs => this.communauteSavoirChercheurs = communauteSavoirChercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.communauteSavoirChercheurService.findByCriteria(this.searchCommunauteSavoirChercheur).subscribe(communauteSavoirChercheurs => {

            this.communauteSavoirChercheurs = communauteSavoirChercheurs;
            // this.searchCommunauteSavoirChercheur = new CommunauteSavoirChercheurVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
        ];
    }

    public async editCommunauteSavoirChercheur(communauteSavoirChercheur: CommunauteSavoirChercheurVo) {
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'edit');
        if (isPermistted) {
            this.communauteSavoirChercheurService.findByIdWithAssociatedList(communauteSavoirChercheur).subscribe(res => {
                this.selectedCommunauteSavoirChercheur = res;
                this.editCommunauteSavoirChercheurDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewCommunauteSavoirChercheur(communauteSavoirChercheur: CommunauteSavoirChercheurVo) {
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'view');
        if (isPermistted) {
            this.communauteSavoirChercheurService.findByIdWithAssociatedList(communauteSavoirChercheur).subscribe(res => {
                this.selectedCommunauteSavoirChercheur = res;
                this.viewCommunauteSavoirChercheurDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCommunauteSavoirChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCommunauteSavoirChercheur = new CommunauteSavoirChercheurVo();
            this.createCommunauteSavoirChercheurDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteCommunauteSavoirChercheur(communauteSavoirChercheur: CommunauteSavoirChercheurVo) {
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Communaute savoir chercheur) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.communauteSavoirChercheurService.delete(communauteSavoirChercheur).subscribe(status => {
                        if (status > 0) {
                            const position = this.communauteSavoirChercheurs.indexOf(communauteSavoirChercheur);
                            position > -1 ? this.communauteSavoirChercheurs.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Communaute savoir chercheur Supprimé',
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

    public async loadCommunauteSavoir() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'list');
        isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateCommunauteSavoirChercheur(communauteSavoirChercheur: CommunauteSavoirChercheurVo) {

        this.communauteSavoirChercheurService.findByIdWithAssociatedList(communauteSavoirChercheur).subscribe(
            res => {
                this.initDuplicateCommunauteSavoirChercheur(res);
                this.selectedCommunauteSavoirChercheur = res;
                this.selectedCommunauteSavoirChercheur.id = null;
                this.createCommunauteSavoirChercheurDialog = true;

            });

    }

    initDuplicateCommunauteSavoirChercheur(res: CommunauteSavoirChercheurVo) {


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
                {header: 'Communaute savoir', dataKey: 'Communaute savoir'},
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
        this.exportData = this.communauteSavoirChercheurs.map(e => {
            return {
                'Communaute savoir': e.communauteSavoirVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
            };
        });
    }

    // getters and setters

    get communauteSavoirChercheurs(): Array<CommunauteSavoirChercheurVo> {
        return this.communauteSavoirChercheurService.communauteSavoirChercheurs;
    }

    set communauteSavoirChercheurs(value: Array<CommunauteSavoirChercheurVo>) {
        this.communauteSavoirChercheurService.communauteSavoirChercheurs = value;
    }

    get communauteSavoirChercheurSelections(): Array<CommunauteSavoirChercheurVo> {
        return this.communauteSavoirChercheurService.communauteSavoirChercheurSelections;
    }

    set communauteSavoirChercheurSelections(value: Array<CommunauteSavoirChercheurVo>) {
        this.communauteSavoirChercheurService.communauteSavoirChercheurSelections = value;
    }


    get selectedCommunauteSavoirChercheur(): CommunauteSavoirChercheurVo {
        return this.communauteSavoirChercheurService.selectedCommunauteSavoirChercheur;
    }

    set selectedCommunauteSavoirChercheur(value: CommunauteSavoirChercheurVo) {
        this.communauteSavoirChercheurService.selectedCommunauteSavoirChercheur = value;
    }

    get createCommunauteSavoirChercheurDialog(): boolean {
        return this.communauteSavoirChercheurService.createCommunauteSavoirChercheurDialog;
    }

    set createCommunauteSavoirChercheurDialog(value: boolean) {
        this.communauteSavoirChercheurService.createCommunauteSavoirChercheurDialog = value;
    }

    get editCommunauteSavoirChercheurDialog(): boolean {
        return this.communauteSavoirChercheurService.editCommunauteSavoirChercheurDialog;
    }

    set editCommunauteSavoirChercheurDialog(value: boolean) {
        this.communauteSavoirChercheurService.editCommunauteSavoirChercheurDialog = value;
    }

    get viewCommunauteSavoirChercheurDialog(): boolean {
        return this.communauteSavoirChercheurService.viewCommunauteSavoirChercheurDialog;
    }

    set viewCommunauteSavoirChercheurDialog(value: boolean) {
        this.communauteSavoirChercheurService.viewCommunauteSavoirChercheurDialog = value;
    }

    get searchCommunauteSavoirChercheur(): CommunauteSavoirChercheurVo {
        return this.communauteSavoirChercheurService.searchCommunauteSavoirChercheur;
    }

    set searchCommunauteSavoirChercheur(value: CommunauteSavoirChercheurVo) {
        this.communauteSavoirChercheurService.searchCommunauteSavoirChercheur = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
