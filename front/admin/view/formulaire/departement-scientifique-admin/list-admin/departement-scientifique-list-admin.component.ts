import {Component, OnInit} from '@angular/core';
import {DepartementScientifiqueService} from 'src/app/controller/service/formulaire/DepartementScientifique.service';
import {DepartementScientifiqueVo} from 'src/app/controller/model/formulaire/DepartementScientifique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-departement-scientifique-list-admin',
    templateUrl: './departement-scientifique-list-admin.component.html',
    styleUrls: ['./departement-scientifique-list-admin.component.css']
})
export class DepartementScientifiqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'DepartementScientifique';
    yesno: any[] = [];


    constructor(private departementScientifiqueService: DepartementScientifiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
    ) {
    }

    ngOnInit(): void {
        this.loadDepartementScientifiques();
        this.initExport();
        this.initCol();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadDepartementScientifiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'list');
        isPermistted ? this.departementScientifiqueService.findAll().subscribe(departementScientifiques => this.departementScientifiques = departementScientifiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.departementScientifiqueService.findByCriteria(this.searchDepartementScientifique).subscribe(departementScientifiques => {

            this.departementScientifiques = departementScientifiques;
            // this.searchDepartementScientifique = new DepartementScientifiqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
        ];
    }

    public async editDepartementScientifique(departementScientifique: DepartementScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'edit');
        if (isPermistted) {
            this.departementScientifiqueService.findByIdWithAssociatedList(departementScientifique).subscribe(res => {
                this.selectedDepartementScientifique = res;
                this.editDepartementScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewDepartementScientifique(departementScientifique: DepartementScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'view');
        if (isPermistted) {
            this.departementScientifiqueService.findByIdWithAssociatedList(departementScientifique).subscribe(res => {
                this.selectedDepartementScientifique = res;
                this.viewDepartementScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateDepartementScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedDepartementScientifique = new DepartementScientifiqueVo();
            this.createDepartementScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteDepartementScientifique(departementScientifique: DepartementScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Departement scientifique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.departementScientifiqueService.delete(departementScientifique).subscribe(status => {
                        if (status > 0) {
                            const position = this.departementScientifiques.indexOf(departementScientifique);
                            position > -1 ? this.departementScientifiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Departement scientifique Supprimé',
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


    public async duplicateDepartementScientifique(departementScientifique: DepartementScientifiqueVo) {

        this.departementScientifiqueService.findByIdWithAssociatedList(departementScientifique).subscribe(
            res => {
                this.initDuplicateDepartementScientifique(res);
                this.selectedDepartementScientifique = res;
                this.selectedDepartementScientifique.id = null;
                this.createDepartementScientifiqueDialog = true;

            });

    }

    initDuplicateDepartementScientifique(res: DepartementScientifiqueVo) {


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
        this.exportData = this.departementScientifiques.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
            };
        });
    }

    // getters and setters

    get departementScientifiques(): Array<DepartementScientifiqueVo> {
        return this.departementScientifiqueService.departementScientifiques;
    }

    set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
    }

    get departementScientifiqueSelections(): Array<DepartementScientifiqueVo> {
        return this.departementScientifiqueService.departementScientifiqueSelections;
    }

    set departementScientifiqueSelections(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiqueSelections = value;
    }


    get selectedDepartementScientifique(): DepartementScientifiqueVo {
        return this.departementScientifiqueService.selectedDepartementScientifique;
    }

    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
    }

    get createDepartementScientifiqueDialog(): boolean {
        return this.departementScientifiqueService.createDepartementScientifiqueDialog;
    }

    set createDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.createDepartementScientifiqueDialog = value;
    }

    get editDepartementScientifiqueDialog(): boolean {
        return this.departementScientifiqueService.editDepartementScientifiqueDialog;
    }

    set editDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.editDepartementScientifiqueDialog = value;
    }

    get viewDepartementScientifiqueDialog(): boolean {
        return this.departementScientifiqueService.viewDepartementScientifiqueDialog;
    }

    set viewDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.viewDepartementScientifiqueDialog = value;
    }

    get searchDepartementScientifique(): DepartementScientifiqueVo {
        return this.departementScientifiqueService.searchDepartementScientifique;
    }

    set searchDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.searchDepartementScientifique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
