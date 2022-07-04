import {Component, OnInit} from '@angular/core';
import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';
import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {CardviewService} from 'src/app/controller/service/formulaire/cardview.service';

@Component({
    selector: 'app-categorie-faq-list-admin',
    templateUrl: './categorie-faq-list-admin.component.html',
    styleUrls: ['./categorie-faq-list-admin.component.css']
})
export class CategorieFaqListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'CategorieFaq';
    yesno: any[] = [];


    constructor(private categorieFaqService: CategorieFaqService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router,
                private cardViewService: CardviewService) {
    }

    ngOnInit(): void {
        this.loadCategorieFaqs();
        this.initExport();
        this.initCol();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadCategorieFaqs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'list');
        isPermistted ? this.categorieFaqService.findAll().subscribe(categorieFaqs => this.categorieFaqs = categorieFaqs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.categorieFaqService.findByCriteria(this.searchCategorieFaq).subscribe(categorieFaqs => {

            this.categorieFaqs = categorieFaqs;
            // this.searchCategorieFaq = new CategorieFaqVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'ordre', header: 'Ordre'},
            {field: 'archive', header: 'Archive'},
        ];
    }

    public async editCategorieFaq(categorieFaq: CategorieFaqVo) {
        const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'edit');
        if (isPermistted) {
            this.categorieFaqService.findByIdWithAssociatedList(categorieFaq).subscribe(res => {
                this.selectedCategorieFaq = res;
                this.editCategorieFaqDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }


    public async viewCategorieFaq(categorieFaq: CategorieFaqVo) {
        const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'view');
        if (isPermistted) {
            this.categorieFaqService.findByIdWithAssociatedList(categorieFaq).subscribe(res => {
                this.selectedCategorieFaq = res;
                this.viewCategorieFaqDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCategorieFaq(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCategorieFaq = new CategorieFaqVo();
            this.createCategorieFaqDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteCategorieFaq(categorieFaq: CategorieFaqVo) {
        const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Categorie faq) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.categorieFaqService.delete(categorieFaq).subscribe(status => {
                        if (status > 0) {
                            const position = this.categorieFaqs.indexOf(categorieFaq);
                            position > -1 ? this.categorieFaqs.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Categorie faq Supprimé',
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


    public async duplicateCategorieFaq(categorieFaq: CategorieFaqVo) {

        this.categorieFaqService.findByIdWithAssociatedList(categorieFaq).subscribe(
            res => {
                this.selectedCategorieFaq = res;
                this.selectedCategorieFaq.id = null;
                this.createCategorieFaqDialog = true;

            });
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
                {header: 'Libelle', dataKey: 'Libelle'},
                {header: 'Ordre', dataKey: 'Ordre'},
                {header: 'Archive', dataKey: 'Archive'},
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
        this.exportData = this.categorieFaqs.map(e => {
            return {
                Libelle: e.libelle,
                Ordre: e.ordre,
                Archive: e.archive,
            };
        });
    }

    // getters and setters

    get categorieFaqs(): Array<CategorieFaqVo> {
        return this.categorieFaqService.categorieFaqs;
    }

    set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
    }

    get categorieFaqSelections(): Array<CategorieFaqVo> {
        return this.categorieFaqService.categorieFaqSelections;
    }

    set categorieFaqSelections(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqSelections = value;
    }


    get selectedCategorieFaq(): CategorieFaqVo {
        return this.categorieFaqService.selectedCategorieFaq;
    }

    set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
    }

    get createCategorieFaqDialog(): boolean {
        return this.categorieFaqService.createCategorieFaqDialog;
    }

    set createCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.createCategorieFaqDialog = value;
    }

    get editCategorieFaqDialog(): boolean {
        return this.categorieFaqService.editCategorieFaqDialog;
    }

    set editCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.editCategorieFaqDialog = value;
    }

    get viewCategorieFaqDialog(): boolean {
        return this.categorieFaqService.viewCategorieFaqDialog;
    }

    set viewCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.viewCategorieFaqDialog = value;
    }

    get searchCategorieFaq(): CategorieFaqVo {
        return this.categorieFaqService.searchCategorieFaq;
    }

    set searchCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.searchCategorieFaq = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }
}
