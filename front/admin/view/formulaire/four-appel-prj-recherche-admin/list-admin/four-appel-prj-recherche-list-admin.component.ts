import {Component, OnInit} from '@angular/core';
import {FournisseurAppelProjetRechercheService} from 'src/app/controller/service/formulaire/FournisseurAppelProjetRecherche.service';
import {FournisseurAppelProjetRechercheVo} from 'src/app/controller/model/formulaire/FournisseurAppelProjetRecherche.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-fournisseur-appel-projet-recherche-list-admin',
    templateUrl: './four-appel-prj-recherche-list-admin.component.html',
    styleUrls: ['./four-appel-prj-recherche-list-admin.component.css']
})
export class FournisseurAppelProjetRechercheListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'FournisseurAppelProjetRecherche';
    yesno: any[] = [];
    payss: Array<PaysVo>;


    constructor(private fournisseurAppelProjetRechercheService: FournisseurAppelProjetRechercheService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private paysService: PaysService
    ) {
    }

    ngOnInit(): void {
        this.loadFournisseurAppelProjetRecherches();
        this.initExport();
        this.initCol();
        this.loadPays();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadFournisseurAppelProjetRecherches() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'list');
        isPermistted ? this.fournisseurAppelProjetRechercheService.findAll().subscribe(fournisseurAppelProjetRecherches => this.fournisseurAppelProjetRecherches = fournisseurAppelProjetRecherches, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.fournisseurAppelProjetRechercheService.findByCriteria(this.searchFournisseurAppelProjetRecherche).subscribe(fournisseurAppelProjetRecherches => {

            this.fournisseurAppelProjetRecherches = fournisseurAppelProjetRecherches;
            // this.searchFournisseurAppelProjetRecherche = new FournisseurAppelProjetRechercheVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'pays?.libelle', header: 'Pays'},
        ];
    }

    public async editFournisseurAppelProjetRecherche(fournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo) {
        const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'edit');
        if (isPermistted) {
            this.fournisseurAppelProjetRechercheService.findByIdWithAssociatedList(fournisseurAppelProjetRecherche).subscribe(res => {
                this.selectedFournisseurAppelProjetRecherche = res;
                this.editFournisseurAppelProjetRechercheDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewFournisseurAppelProjetRecherche(fournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo) {
        const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'view');
        if (isPermistted) {
            this.fournisseurAppelProjetRechercheService.findByIdWithAssociatedList(fournisseurAppelProjetRecherche).subscribe(res => {
                this.selectedFournisseurAppelProjetRecherche = res;
                this.viewFournisseurAppelProjetRechercheDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateFournisseurAppelProjetRecherche(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedFournisseurAppelProjetRecherche = new FournisseurAppelProjetRechercheVo();
            this.createFournisseurAppelProjetRechercheDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteFournisseurAppelProjetRecherche(fournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo) {
        const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Fournisseur appel projet recherche) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.fournisseurAppelProjetRechercheService.delete(fournisseurAppelProjetRecherche).subscribe(status => {
                        if (status > 0) {
                            const position = this.fournisseurAppelProjetRecherches.indexOf(fournisseurAppelProjetRecherche);
                            position > -1 ? this.fournisseurAppelProjetRecherches.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Fournisseur appel projet recherche Supprimé',
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

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateFournisseurAppelProjetRecherche(fournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo) {

        this.fournisseurAppelProjetRechercheService.findByIdWithAssociatedList(fournisseurAppelProjetRecherche).subscribe(
            res => {
                this.initDuplicateFournisseurAppelProjetRecherche(res);
                this.selectedFournisseurAppelProjetRecherche = res;
                this.selectedFournisseurAppelProjetRecherche.id = null;
                this.createFournisseurAppelProjetRechercheDialog = true;

            });

    }

    initDuplicateFournisseurAppelProjetRecherche(res: FournisseurAppelProjetRechercheVo) {


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
                {header: 'Libelle', dataKey: 'Libelle'},
                {header: 'Code', dataKey: 'Code'},
                {header: 'Description', dataKey: 'Description'},
                {header: 'Pays', dataKey: 'Pays'},
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
        this.exportData = this.fournisseurAppelProjetRecherches.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Description': e.description,
                'Pays': e.paysVo?.libelle,
            };
        });
    }

    // getters and setters

    get fournisseurAppelProjetRecherches(): Array<FournisseurAppelProjetRechercheVo> {
        return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches;
    }

    set fournisseurAppelProjetRecherches(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches = value;
    }

    get fournisseurAppelProjetRechercheSelections(): Array<FournisseurAppelProjetRechercheVo> {
        return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRechercheSelections;
    }

    set fournisseurAppelProjetRechercheSelections(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRechercheSelections = value;
    }


    get selectedFournisseurAppelProjetRecherche(): FournisseurAppelProjetRechercheVo {
        return this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche;
    }

    set selectedFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche = value;
    }

    get createFournisseurAppelProjetRechercheDialog(): boolean {
        return this.fournisseurAppelProjetRechercheService.createFournisseurAppelProjetRechercheDialog;
    }

    set createFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.createFournisseurAppelProjetRechercheDialog = value;
    }

    get editFournisseurAppelProjetRechercheDialog(): boolean {
        return this.fournisseurAppelProjetRechercheService.editFournisseurAppelProjetRechercheDialog;
    }

    set editFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.editFournisseurAppelProjetRechercheDialog = value;
    }

    get viewFournisseurAppelProjetRechercheDialog(): boolean {
        return this.fournisseurAppelProjetRechercheService.viewFournisseurAppelProjetRechercheDialog;
    }

    set viewFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.viewFournisseurAppelProjetRechercheDialog = value;
    }

    get searchFournisseurAppelProjetRecherche(): FournisseurAppelProjetRechercheVo {
        return this.fournisseurAppelProjetRechercheService.searchFournisseurAppelProjetRecherche;
    }

    set searchFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.searchFournisseurAppelProjetRecherche = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
