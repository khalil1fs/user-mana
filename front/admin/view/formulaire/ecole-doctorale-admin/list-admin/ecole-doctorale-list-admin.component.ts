import {Component, OnInit} from '@angular/core';
import {EcoleDoctoraleService} from 'src/app/controller/service/formulaire/EcoleDoctorale.service';
import {EcoleDoctoraleVo} from 'src/app/controller/model/formulaire/EcoleDoctorale.model';
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
    selector: 'app-ecole-doctorale-list-admin',
    templateUrl: './ecole-doctorale-list-admin.component.html',
    styleUrls: ['./ecole-doctorale-list-admin.component.css']
})
export class EcoleDoctoraleListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'EcoleDoctorale';
    yesno: any[] = [];
    payss: Array<PaysVo>;


    constructor(private ecoleDoctoraleService: EcoleDoctoraleService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private paysService: PaysService
    ) {
    }

    ngOnInit(): void {
        this.loadEcoleDoctorales();
        this.initExport();
        this.initCol();
        this.loadPays();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadEcoleDoctorales() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EcoleDoctorale', 'list');
        isPermistted ? this.ecoleDoctoraleService.findAll().subscribe(ecoleDoctorales => this.ecoleDoctorales = ecoleDoctorales, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.ecoleDoctoraleService.findByCriteria(this.searchEcoleDoctorale).subscribe(ecoleDoctorales => {

            this.ecoleDoctorales = ecoleDoctorales;
            // this.searchEcoleDoctorale = new EcoleDoctoraleVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'intitule', header: 'Intitule'},
            {field: 'international', header: 'International'},
            {field: 'pays?.libelle', header: 'Pays'},
        ];
    }

    public async editEcoleDoctorale(ecoleDoctorale: EcoleDoctoraleVo) {
        const isPermistted = await this.roleService.isPermitted('EcoleDoctorale', 'edit');
        if (isPermistted) {
            this.ecoleDoctoraleService.findByIdWithAssociatedList(ecoleDoctorale).subscribe(res => {
                this.selectedEcoleDoctorale = res;
                this.editEcoleDoctoraleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEcoleDoctorale(ecoleDoctorale: EcoleDoctoraleVo) {
        const isPermistted = await this.roleService.isPermitted('EcoleDoctorale', 'view');
        if (isPermistted) {
            this.ecoleDoctoraleService.findByIdWithAssociatedList(ecoleDoctorale).subscribe(res => {
                this.selectedEcoleDoctorale = res;
                this.viewEcoleDoctoraleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEcoleDoctorale(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEcoleDoctorale = new EcoleDoctoraleVo();
            this.createEcoleDoctoraleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteEcoleDoctorale(ecoleDoctorale: EcoleDoctoraleVo) {
        const isPermistted = await this.roleService.isPermitted('EcoleDoctorale', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Ecole doctorale) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.ecoleDoctoraleService.delete(ecoleDoctorale).subscribe(status => {
                        if (status > 0) {
                            const position = this.ecoleDoctorales.indexOf(ecoleDoctorale);
                            position > -1 ? this.ecoleDoctorales.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Ecole doctorale Supprimé',
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
        const isPermistted = await this.roleService.isPermitted('EcoleDoctorale', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateEcoleDoctorale(ecoleDoctorale: EcoleDoctoraleVo) {

        this.ecoleDoctoraleService.findByIdWithAssociatedList(ecoleDoctorale).subscribe(
            res => {
                this.initDuplicateEcoleDoctorale(res);
                this.selectedEcoleDoctorale = res;
                this.selectedEcoleDoctorale.id = null;
                this.createEcoleDoctoraleDialog = true;

            });

    }

    initDuplicateEcoleDoctorale(res: EcoleDoctoraleVo) {


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
                {header: 'Intitule', dataKey: 'Intitule'},
                {header: 'International', dataKey: 'International'},
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
        this.exportData = this.ecoleDoctorales.map(e => {
            return {
                'Intitule': e.intitule,
                'International': e.international,
                'Pays': e.paysVo?.libelle,
            };
        });
    }

    // getters and setters

    get ecoleDoctorales(): Array<EcoleDoctoraleVo> {
        return this.ecoleDoctoraleService.ecoleDoctorales;
    }

    set ecoleDoctorales(value: Array<EcoleDoctoraleVo>) {
        this.ecoleDoctoraleService.ecoleDoctorales = value;
    }

    get ecoleDoctoraleSelections(): Array<EcoleDoctoraleVo> {
        return this.ecoleDoctoraleService.ecoleDoctoraleSelections;
    }

    set ecoleDoctoraleSelections(value: Array<EcoleDoctoraleVo>) {
        this.ecoleDoctoraleService.ecoleDoctoraleSelections = value;
    }


    get selectedEcoleDoctorale(): EcoleDoctoraleVo {
        return this.ecoleDoctoraleService.selectedEcoleDoctorale;
    }

    set selectedEcoleDoctorale(value: EcoleDoctoraleVo) {
        this.ecoleDoctoraleService.selectedEcoleDoctorale = value;
    }

    get createEcoleDoctoraleDialog(): boolean {
        return this.ecoleDoctoraleService.createEcoleDoctoraleDialog;
    }

    set createEcoleDoctoraleDialog(value: boolean) {
        this.ecoleDoctoraleService.createEcoleDoctoraleDialog = value;
    }

    get editEcoleDoctoraleDialog(): boolean {
        return this.ecoleDoctoraleService.editEcoleDoctoraleDialog;
    }

    set editEcoleDoctoraleDialog(value: boolean) {
        this.ecoleDoctoraleService.editEcoleDoctoraleDialog = value;
    }

    get viewEcoleDoctoraleDialog(): boolean {
        return this.ecoleDoctoraleService.viewEcoleDoctoraleDialog;
    }

    set viewEcoleDoctoraleDialog(value: boolean) {
        this.ecoleDoctoraleService.viewEcoleDoctoraleDialog = value;
    }

    get searchEcoleDoctorale(): EcoleDoctoraleVo {
        return this.ecoleDoctoraleService.searchEcoleDoctorale;
    }

    set searchEcoleDoctorale(value: EcoleDoctoraleVo) {
        this.ecoleDoctoraleService.searchEcoleDoctorale = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
