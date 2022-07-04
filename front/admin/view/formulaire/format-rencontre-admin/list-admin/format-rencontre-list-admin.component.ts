import {Component, OnInit} from '@angular/core';
import {FormatRencontreService} from 'src/app/controller/service/formulaire/FormatRencontre.service';
import {FormatRencontreVo} from 'src/app/controller/model/formulaire/FormatRencontre.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-format-rencontre-list-admin',
    templateUrl: './format-rencontre-list-admin.component.html',
    styleUrls: ['./format-rencontre-list-admin.component.css']
})
export class FormatRencontreListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'FormatRencontre';
    yesno: any[] = [];


    constructor(private formatRencontreService: FormatRencontreService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
    ) {
    }

    ngOnInit(): void {
        this.loadFormatRencontres();
        this.initExport();
        this.initCol();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadFormatRencontres() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'list');
        isPermistted ? this.formatRencontreService.findAll().subscribe(formatRencontres => this.formatRencontres = formatRencontres, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.formatRencontreService.findByCriteria(this.searchFormatRencontre).subscribe(formatRencontres => {

            this.formatRencontres = formatRencontres;
            // this.searchFormatRencontre = new FormatRencontreVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
        ];
    }

    public async editFormatRencontre(formatRencontre: FormatRencontreVo) {
        const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'edit');
        if (isPermistted) {
            this.formatRencontreService.findByIdWithAssociatedList(formatRencontre).subscribe(res => {
                this.selectedFormatRencontre = res;
                this.editFormatRencontreDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewFormatRencontre(formatRencontre: FormatRencontreVo) {
        const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'view');
        if (isPermistted) {
            this.formatRencontreService.findByIdWithAssociatedList(formatRencontre).subscribe(res => {
                this.selectedFormatRencontre = res;
                this.viewFormatRencontreDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateFormatRencontre(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedFormatRencontre = new FormatRencontreVo();
            this.createFormatRencontreDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteFormatRencontre(formatRencontre: FormatRencontreVo) {
        const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Format rencontre) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.formatRencontreService.delete(formatRencontre).subscribe(status => {
                        if (status > 0) {
                            const position = this.formatRencontres.indexOf(formatRencontre);
                            position > -1 ? this.formatRencontres.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Format rencontre Supprimé',
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


    public async duplicateFormatRencontre(formatRencontre: FormatRencontreVo) {

        this.formatRencontreService.findByIdWithAssociatedList(formatRencontre).subscribe(
            res => {
                this.initDuplicateFormatRencontre(res);
                this.selectedFormatRencontre = res;
                this.selectedFormatRencontre.id = null;
                this.createFormatRencontreDialog = true;

            });

    }

    initDuplicateFormatRencontre(res: FormatRencontreVo) {


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
        this.exportData = this.formatRencontres.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
            };
        });
    }

    // getters and setters

    get formatRencontres(): Array<FormatRencontreVo> {
        return this.formatRencontreService.formatRencontres;
    }

    set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
    }

    get formatRencontreSelections(): Array<FormatRencontreVo> {
        return this.formatRencontreService.formatRencontreSelections;
    }

    set formatRencontreSelections(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontreSelections = value;
    }


    get selectedFormatRencontre(): FormatRencontreVo {
        return this.formatRencontreService.selectedFormatRencontre;
    }

    set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
    }

    get createFormatRencontreDialog(): boolean {
        return this.formatRencontreService.createFormatRencontreDialog;
    }

    set createFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.createFormatRencontreDialog = value;
    }

    get editFormatRencontreDialog(): boolean {
        return this.formatRencontreService.editFormatRencontreDialog;
    }

    set editFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.editFormatRencontreDialog = value;
    }

    get viewFormatRencontreDialog(): boolean {
        return this.formatRencontreService.viewFormatRencontreDialog;
    }

    set viewFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.viewFormatRencontreDialog = value;
    }

    get searchFormatRencontre(): FormatRencontreVo {
        return this.formatRencontreService.searchFormatRencontre;
    }

    set searchFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.searchFormatRencontre = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
