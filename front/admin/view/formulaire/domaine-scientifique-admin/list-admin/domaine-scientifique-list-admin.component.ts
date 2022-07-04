import {Component, OnInit} from '@angular/core';
import {DomaineScientifiqueService} from 'src/app/controller/service/formulaire/DomaineScientifique.service';
import {DomaineScientifiqueVo} from 'src/app/controller/model/formulaire/DomaineScientifique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-domaine-scientifique-list-admin',
    templateUrl: './domaine-scientifique-list-admin.component.html',
    styleUrls: ['./domaine-scientifique-list-admin.component.css']
})
export class DomaineScientifiqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'DomaineScientifique';
    yesno: any[] = [];


    constructor(private domaineScientifiqueService: DomaineScientifiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
    ) {
    }

    ngOnInit(): void {
        this.loadDomaineScientifiques();
        this.initExport();
        this.initCol();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadDomaineScientifiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DomaineScientifique', 'list');
        isPermistted ? this.domaineScientifiqueService.findAll().subscribe(domaineScientifiques => this.domaineScientifiques = domaineScientifiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.domaineScientifiqueService.findByCriteria(this.searchDomaineScientifique).subscribe(domaineScientifiques => {

            this.domaineScientifiques = domaineScientifiques;
            // this.searchDomaineScientifique = new DomaineScientifiqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
        ];
    }

    public async editDomaineScientifique(domaineScientifique: DomaineScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DomaineScientifique', 'edit');
        if (isPermistted) {
            this.domaineScientifiqueService.findByIdWithAssociatedList(domaineScientifique).subscribe(res => {
                this.selectedDomaineScientifique = res;
                this.editDomaineScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewDomaineScientifique(domaineScientifique: DomaineScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DomaineScientifique', 'view');
        if (isPermistted) {
            this.domaineScientifiqueService.findByIdWithAssociatedList(domaineScientifique).subscribe(res => {
                this.selectedDomaineScientifique = res;
                this.viewDomaineScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateDomaineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedDomaineScientifique = new DomaineScientifiqueVo();
            this.createDomaineScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteDomaineScientifique(domaineScientifique: DomaineScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DomaineScientifique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Domaine scientifique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.domaineScientifiqueService.delete(domaineScientifique).subscribe(status => {
                        if (status > 0) {
                            const position = this.domaineScientifiques.indexOf(domaineScientifique);
                            position > -1 ? this.domaineScientifiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Domaine scientifique Supprimé',
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


    public async duplicateDomaineScientifique(domaineScientifique: DomaineScientifiqueVo) {

        this.domaineScientifiqueService.findByIdWithAssociatedList(domaineScientifique).subscribe(
            res => {
                this.initDuplicateDomaineScientifique(res);
                this.selectedDomaineScientifique = res;
                this.selectedDomaineScientifique.id = null;
                this.createDomaineScientifiqueDialog = true;

            });

    }

    initDuplicateDomaineScientifique(res: DomaineScientifiqueVo) {


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
        this.exportData = this.domaineScientifiques.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Description': e.description,
            };
        });
    }

    // getters and setters

    get domaineScientifiques(): Array<DomaineScientifiqueVo> {
        return this.domaineScientifiqueService.domaineScientifiques;
    }

    set domaineScientifiques(value: Array<DomaineScientifiqueVo>) {
        this.domaineScientifiqueService.domaineScientifiques = value;
    }

    get domaineScientifiqueSelections(): Array<DomaineScientifiqueVo> {
        return this.domaineScientifiqueService.domaineScientifiqueSelections;
    }

    set domaineScientifiqueSelections(value: Array<DomaineScientifiqueVo>) {
        this.domaineScientifiqueService.domaineScientifiqueSelections = value;
    }


    get selectedDomaineScientifique(): DomaineScientifiqueVo {
        return this.domaineScientifiqueService.selectedDomaineScientifique;
    }

    set selectedDomaineScientifique(value: DomaineScientifiqueVo) {
        this.domaineScientifiqueService.selectedDomaineScientifique = value;
    }

    get createDomaineScientifiqueDialog(): boolean {
        return this.domaineScientifiqueService.createDomaineScientifiqueDialog;
    }

    set createDomaineScientifiqueDialog(value: boolean) {
        this.domaineScientifiqueService.createDomaineScientifiqueDialog = value;
    }

    get editDomaineScientifiqueDialog(): boolean {
        return this.domaineScientifiqueService.editDomaineScientifiqueDialog;
    }

    set editDomaineScientifiqueDialog(value: boolean) {
        this.domaineScientifiqueService.editDomaineScientifiqueDialog = value;
    }

    get viewDomaineScientifiqueDialog(): boolean {
        return this.domaineScientifiqueService.viewDomaineScientifiqueDialog;
    }

    set viewDomaineScientifiqueDialog(value: boolean) {
        this.domaineScientifiqueService.viewDomaineScientifiqueDialog = value;
    }

    get searchDomaineScientifique(): DomaineScientifiqueVo {
        return this.domaineScientifiqueService.searchDomaineScientifique;
    }

    set searchDomaineScientifique(value: DomaineScientifiqueVo) {
        this.domaineScientifiqueService.searchDomaineScientifique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
