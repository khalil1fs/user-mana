import {Component, OnInit} from '@angular/core';
import {ReclamationService} from 'src/app/controller/service/formulaire/Reclamation.service';
import {ReclamationVo} from 'src/app/controller/model/formulaire/Reclamation.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {EtatReclamationService} from 'src/app/controller/service/config/EtatReclamation.service';
import {TypeReclamationService} from 'src/app/controller/service/referentiel/TypeReclamation.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

import {TypeReclamationVo} from 'src/app/controller/model/referentiel/TypeReclamation.model';
import {EtatReclamationVo} from 'src/app/controller/model/config/EtatReclamation.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-reclamation-list-admin',
    templateUrl: './reclamation-list-admin.component.html',
    styleUrls: ['./reclamation-list-admin.component.css']
})
export class ReclamationListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'Reclamation';
    yesno: any[] = [];
    etatReclamations: Array<EtatReclamationVo>;
    typeReclamations: Array<TypeReclamationVo>;
    chercheurs: Array<ChercheurVo>;


    constructor(private reclamationService: ReclamationService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private etatReclamationService: EtatReclamationService
        , private typeReclamationService: TypeReclamationService
        , private chercheurService: ChercheurService
    ) {
    }

    ngOnInit(): void {
        this.loadReclamations();
        this.initExport();
        this.initCol();
        this.loadEtatReclamation();
        this.loadTypeReclamation();
        this.loadChercheur();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadReclamations() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
        isPermistted ? this.reclamationService.findAll().subscribe(reclamations => this.reclamations = reclamations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.reclamationService.findByCriteria(this.searchReclamation).subscribe(reclamations => {

            this.reclamations = reclamations;
            // this.searchReclamation = new ReclamationVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'objet', header: 'Objet'},
            {field: 'etatReclamation?.libelle', header: 'Etat reclamation'},
            {field: 'typeReclamation?.libelle', header: 'Type reclamation'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'dateReclamation', header: 'Date reclamation'},
            {field: 'dateTraitement', header: 'Date traitement'},
        ];
    }

    public async editReclamation(reclamation: ReclamationVo) {
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'edit');
        if (isPermistted) {
            this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(res => {
                this.selectedReclamation = res;
                this.selectedReclamation.dateReclamation = new Date(reclamation.dateReclamation);
                this.selectedReclamation.dateTraitement = new Date(reclamation.dateTraitement);
                this.editReclamationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewReclamation(reclamation: ReclamationVo) {
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'view');
        if (isPermistted) {
            this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(res => {
                this.selectedReclamation = res;
                this.selectedReclamation.dateReclamation = new Date(reclamation.dateReclamation);
                this.selectedReclamation.dateTraitement = new Date(reclamation.dateTraitement);
                this.viewReclamationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedReclamation = new ReclamationVo();
            this.createReclamationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteReclamation(reclamation: ReclamationVo) {
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Reclamation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.reclamationService.delete(reclamation).subscribe(status => {
                        if (status > 0) {
                            const position = this.reclamations.indexOf(reclamation);
                            position > -1 ? this.reclamations.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Reclamation Supprimé',
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

    public async loadEtatReclamation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
        isPermistted ? this.etatReclamationService.findAll().subscribe(etatReclamations => this.etatReclamations = etatReclamations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadTypeReclamation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
        isPermistted ? this.typeReclamationService.findAll().subscribe(typeReclamations => this.typeReclamations = typeReclamations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateReclamation(reclamation: ReclamationVo) {

        this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(
            res => {
                this.initDuplicateReclamation(res);
                this.selectedReclamation = res;
                this.selectedReclamation.id = null;
                this.createReclamationDialog = true;

            });

    }

    initDuplicateReclamation(res: ReclamationVo) {


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
                {header: 'Objet', dataKey: 'Objet'},
                {header: 'Message', dataKey: 'Message'},
                {header: 'Etat reclamation', dataKey: 'Etat reclamation'},
                {header: 'Type reclamation', dataKey: 'Type reclamation'},
                {header: 'Chercheur', dataKey: 'Chercheur'},
                {header: 'Date reclamation', dataKey: 'Date reclamation'},
                {header: 'Date traitement', dataKey: 'Date traitement'},
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
        this.exportData = this.reclamations.map(e => {
            return {
                'Objet': e.objet,
                'Message': e.message,
                'Etat reclamation': e.etatReclamationVo?.libelle,
                'Type reclamation': e.typeReclamationVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Date reclamation': e.dateReclamation,
                'Date traitement': e.dateTraitement,
            };
        });
    }

    // getters and setters

    get reclamations(): Array<ReclamationVo> {
        return this.reclamationService.reclamations;
    }

    set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
    }

    get reclamationSelections(): Array<ReclamationVo> {
        return this.reclamationService.reclamationSelections;
    }

    set reclamationSelections(value: Array<ReclamationVo>) {
        this.reclamationService.reclamationSelections = value;
    }


    get selectedReclamation(): ReclamationVo {
        return this.reclamationService.selectedReclamation;
    }

    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
    }

    get createReclamationDialog(): boolean {
        return this.reclamationService.createReclamationDialog;
    }

    set createReclamationDialog(value: boolean) {
        this.reclamationService.createReclamationDialog = value;
    }

    get editReclamationDialog(): boolean {
        return this.reclamationService.editReclamationDialog;
    }

    set editReclamationDialog(value: boolean) {
        this.reclamationService.editReclamationDialog = value;
    }

    get viewReclamationDialog(): boolean {
        return this.reclamationService.viewReclamationDialog;
    }

    set viewReclamationDialog(value: boolean) {
        this.reclamationService.viewReclamationDialog = value;
    }

    get searchReclamation(): ReclamationVo {
        return this.reclamationService.searchReclamation;
    }

    set searchReclamation(value: ReclamationVo) {
        this.reclamationService.searchReclamation = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
