import {Component, OnInit} from '@angular/core';
import {CommissionScientifiqueService} from 'src/app/controller/service/formulaire/CommissionScientifique.service';
import {CommissionScientifiqueVo} from 'src/app/controller/model/formulaire/CommissionScientifique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-commission-scientifique-list-admin',
    templateUrl: './commis-scien-list-admin.component.html',
    styleUrls: ['./commis-scien-list-admin.component.css']
})
export class CommisScienListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'CommissionScientifique';
    yesno: any[] = [];


    constructor(private commissionScientifiqueService: CommissionScientifiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
    ) {
    }

    ngOnInit(): void {
        this.loadCommissionScientifiques();
        this.initExport();
        this.initCol();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadCommissionScientifiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'list');
        isPermistted ? this.commissionScientifiqueService.findAll().subscribe(commissionScientifiques => this.commissionScientifiques = commissionScientifiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.commissionScientifiqueService.findByCriteria(this.searchCommissionScientifique).subscribe(commissionScientifiques => {

            this.commissionScientifiques = commissionScientifiques;
            // this.searchCommissionScientifique = new CommissionScientifiqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
        ];
    }

    public async editCommissionScientifique(commissionScientifique: CommissionScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'edit');
        if (isPermistted) {
            this.commissionScientifiqueService.findByIdWithAssociatedList(commissionScientifique).subscribe(res => {
                this.selectedCommissionScientifique = res;
                this.editCommissionScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewCommissionScientifique(commissionScientifique: CommissionScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'view');
        if (isPermistted) {
            this.commissionScientifiqueService.findByIdWithAssociatedList(commissionScientifique).subscribe(res => {
                this.selectedCommissionScientifique = res;
                this.viewCommissionScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCommissionScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCommissionScientifique = new CommissionScientifiqueVo();
            this.createCommissionScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteCommissionScientifique(commissionScientifique: CommissionScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Commission scientifique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.commissionScientifiqueService.delete(commissionScientifique).subscribe(status => {
                        if (status > 0) {
                            const position = this.commissionScientifiques.indexOf(commissionScientifique);
                            position > -1 ? this.commissionScientifiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Commission scientifique Supprimé',
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


    public async duplicateCommissionScientifique(commissionScientifique: CommissionScientifiqueVo) {

        this.commissionScientifiqueService.findByIdWithAssociatedList(commissionScientifique).subscribe(
            res => {
                this.initDuplicateCommissionScientifique(res);
                this.selectedCommissionScientifique = res;
                this.selectedCommissionScientifique.id = null;
                this.createCommissionScientifiqueDialog = true;

            });

    }

    initDuplicateCommissionScientifique(res: CommissionScientifiqueVo) {


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
        this.exportData = this.commissionScientifiques.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
            };
        });
    }

    // getters and setters

    get commissionScientifiques(): Array<CommissionScientifiqueVo> {
        return this.commissionScientifiqueService.commissionScientifiques;
    }

    set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
    }

    get commissionScientifiqueSelections(): Array<CommissionScientifiqueVo> {
        return this.commissionScientifiqueService.commissionScientifiqueSelections;
    }

    set commissionScientifiqueSelections(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiqueSelections = value;
    }


    get selectedCommissionScientifique(): CommissionScientifiqueVo {
        return this.commissionScientifiqueService.selectedCommissionScientifique;
    }

    set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
    }

    get createCommissionScientifiqueDialog(): boolean {
        return this.commissionScientifiqueService.createCommissionScientifiqueDialog;
    }

    set createCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.createCommissionScientifiqueDialog = value;
    }

    get editCommissionScientifiqueDialog(): boolean {
        return this.commissionScientifiqueService.editCommissionScientifiqueDialog;
    }

    set editCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.editCommissionScientifiqueDialog = value;
    }

    get viewCommissionScientifiqueDialog(): boolean {
        return this.commissionScientifiqueService.viewCommissionScientifiqueDialog;
    }

    set viewCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.viewCommissionScientifiqueDialog = value;
    }

    get searchCommissionScientifique(): CommissionScientifiqueVo {
        return this.commissionScientifiqueService.searchCommissionScientifique;
    }

    set searchCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.searchCommissionScientifique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
