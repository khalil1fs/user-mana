import {Component, OnInit} from '@angular/core';
import {FaqService} from 'src/app/controller/service/formulaire/Faq.service';
import {FaqVo} from 'src/app/controller/model/formulaire/Faq.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';

import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-faq-list-admin',
    templateUrl: './faq-list-admin.component.html',
    styleUrls: ['./faq-list-admin.component.css']
})
export class FaqListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Faq';
    yesno: any[] = [];
    categorieFaqs: Array<CategorieFaqVo>;
    selectedRows: Array<FaqVo> = [];

    constructor(private faqService: FaqService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private categorieFaqService: CategorieFaqService
    ) {
    }

    ngOnInit(): void {
        this.loadFaqs();
        this.initExport();
        this.initCol();
        this.loadCategorieFaq();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadFaqs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Faq', 'list');
        isPermistted ? this.faqService.findAll().subscribe(faqs => this.faqs = faqs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.faqService.findByCriteria(this.searchFaq).subscribe(faqs => {

            this.faqs = faqs;
            // this.searchFaq = new FaqVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'question', header: 'Question'},
            {field: 'contact', header: 'Contact'},
            {field: 'categorieFaq?.libelle', header: 'Categorie faq'},
            {field: 'ordre', header: 'Ordre'},
            {field: 'archive', header: 'Archive'},
            {field: 'lien', header: 'Lien'},
            {field: 'dernierMisAJour', header: 'Dernier mis a jour'},
        ];
    }

    public async editFaq(faq: FaqVo) {
        const isPermistted = await this.roleService.isPermitted('Faq', 'edit');
        if (isPermistted) {
            this.faqService.findByIdWithAssociatedList(faq).subscribe(res => {
                this.selectedFaq = res;
                this.selectedFaq.dernierMisAJour = new Date(faq.dernierMisAJour);
                this.editFaqDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewFaq(faq: FaqVo) {
        const isPermistted = await this.roleService.isPermitted('Faq', 'view');
        if (isPermistted) {
            this.faqService.findByIdWithAssociatedList(faq).subscribe(res => {
                this.selectedFaq = res;
                this.selectedFaq.dernierMisAJour = new Date(faq.dernierMisAJour);
                this.viewFaqDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateFaq(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedFaq = new FaqVo();
            this.createFaqDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteFaq(faq: FaqVo) {
        const isPermistted = await this.roleService.isPermitted('Faq', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Faq) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.faqService.delete(faq).subscribe(status => {
                        if (status > 0) {
                            const position = this.faqs.indexOf(faq);
                            position > -1 ? this.faqs.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Faq Supprimé',
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

    public async loadCategorieFaq() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Faq', 'list');
        isPermistted ? this.categorieFaqService.findAll().subscribe(categorieFaqs => this.categorieFaqs = categorieFaqs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateFaq(faq: FaqVo) {

        this.faqService.findByIdWithAssociatedList(faq).subscribe(
            res => {
                this.initDuplicateFaq(res);
                this.selectedFaq = res;
                this.selectedFaq.id = null;
                this.createFaqDialog = true;

            });

    }

    initDuplicateFaq(res: FaqVo) {


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
                {header: 'Question', dataKey: 'Question'},
                {header: 'Reponse', dataKey: 'Reponse'},
                {header: 'Contact', dataKey: 'Contact'},
                {header: 'Categorie faq', dataKey: 'Categorie faq'},
                {header: 'Ordre', dataKey: 'Ordre'},
                {header: 'Archive', dataKey: 'Archive'},
                {header: 'Lien', dataKey: 'Lien'},
                {header: 'Dernier mis a jour', dataKey: 'Dernier mis a jour'},
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
        if (this.selectedRows.length == 0) {
            this.exportData = this.faqs.map(e => {
                return {
                    'Question': e.question,
                    'Reponse': e.reponse,
                    'Contact': e.contact,
                    'Categorie faq': e.categorieFaqVo?.libelle,
                    'Ordre': e.ordre,
                    'Archive': e.archive,
                    'Lien': e.lien,
                    'Dernier mis a jour': e.dernierMisAJour,
                };
            });
        } else {
            this.exportData = this.selectedRows.map(e => {
                return {
                    'Question': e.question,
                    'Reponse': e.reponse,
                    'Contact': e.contact,
                    'Categorie faq': e.categorieFaqVo?.libelle,
                    'Ordre': e.ordre,
                    'Archive': e.archive,
                    'Lien': e.lien,
                    'Dernier mis a jour': e.dernierMisAJour,
                };
            });
        }
    }

    // getters and setters

    get faqs(): Array<FaqVo> {
        return this.faqService.faqs;
    }

    set faqs(value: Array<FaqVo>) {
        this.faqService.faqs = value;
    }

    get faqSelections(): Array<FaqVo> {
        return this.faqService.faqSelections;
    }

    set faqSelections(value: Array<FaqVo>) {
        this.faqService.faqSelections = value;
    }


    get selectedFaq(): FaqVo {
        return this.faqService.selectedFaq;
    }

    set selectedFaq(value: FaqVo) {
        this.faqService.selectedFaq = value;
    }

    get createFaqDialog(): boolean {
        return this.faqService.createFaqDialog;
    }

    set createFaqDialog(value: boolean) {
        this.faqService.createFaqDialog = value;
    }

    get editFaqDialog(): boolean {
        return this.faqService.editFaqDialog;
    }

    set editFaqDialog(value: boolean) {
        this.faqService.editFaqDialog = value;
    }

    get viewFaqDialog(): boolean {
        return this.faqService.viewFaqDialog;
    }

    set viewFaqDialog(value: boolean) {
        this.faqService.viewFaqDialog = value;
    }

    get searchFaq(): FaqVo {
        return this.faqService.searchFaq;
    }

    set searchFaq(value: FaqVo) {
        this.faqService.searchFaq = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
