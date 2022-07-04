import {Component, OnInit} from '@angular/core';
import {DoctorantService} from 'src/app/controller/service/formulaire/Doctorant.service';
import {DoctorantVo} from 'src/app/controller/model/formulaire/Doctorant.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-doctorant-list-admin',
    templateUrl: './doctorant-list-admin.component.html',
    styleUrls: ['./doctorant-list-admin.component.css']
})
export class DoctorantListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'Doctorant';
    yesno: any[] = [];
    sexes: Array<SexeVo>;
    payss: Array<PaysVo>;


    constructor(private doctorantService: DoctorantService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private sexeService: SexeService
        , private paysService: PaysService
    ) {
    }

    ngOnInit(): void {
        this.loadDoctorants();
        this.initExport();
        this.initCol();
        this.loadSexe();
        this.loadPays();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadDoctorants() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'list');
        isPermistted ? this.doctorantService.findAll().subscribe(doctorants => this.doctorants = doctorants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.doctorantService.findByCriteria(this.searchDoctorant).subscribe(doctorants => {

            this.doctorants = doctorants;
            // this.searchDoctorant = new DoctorantVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'nom', header: 'Nom'},
            {field: 'prenom', header: 'Prenom'},
            {field: 'sexe?.libelle', header: 'Sexe'},
            {field: 'anneeNaissance', header: 'Annee naissance'},
            {field: 'pays?.libelle', header: 'Pays'},
        ];
    }

    public async editDoctorant(doctorant: DoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'edit');
        if (isPermistted) {
            this.doctorantService.findByIdWithAssociatedList(doctorant).subscribe(res => {
                this.selectedDoctorant = res;
                this.editDoctorantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewDoctorant(doctorant: DoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'view');
        if (isPermistted) {
            this.doctorantService.findByIdWithAssociatedList(doctorant).subscribe(res => {
                this.selectedDoctorant = res;
                this.viewDoctorantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedDoctorant = new DoctorantVo();
            this.createDoctorantDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteDoctorant(doctorant: DoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Doctorant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.doctorantService.delete(doctorant).subscribe(status => {
                        if (status > 0) {
                            const position = this.doctorants.indexOf(doctorant);
                            position > -1 ? this.doctorants.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Doctorant Supprimé',
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

    public async loadSexe() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'list');
        isPermistted ? this.sexeService.findAll().subscribe(sexes => this.sexes = sexes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateDoctorant(doctorant: DoctorantVo) {

        this.doctorantService.findByIdWithAssociatedList(doctorant).subscribe(
            res => {
                this.initDuplicateDoctorant(res);
                this.selectedDoctorant = res;
                this.selectedDoctorant.id = null;
                this.createDoctorantDialog = true;

            });

    }

    initDuplicateDoctorant(res: DoctorantVo) {


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
                {header: 'Nom', dataKey: 'Nom'},
                {header: 'Prenom', dataKey: 'Prenom'},
                {header: 'Sexe', dataKey: 'Sexe'},
                {header: 'Annee naissance', dataKey: 'Annee naissance'},
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
        this.exportData = this.doctorants.map(e => {
            return {
                'Nom': e.nom,
                'Prenom': e.prenom,
                'Sexe': e.sexeVo?.libelle,
                'Annee naissance': e.anneeNaissance,
                'Pays': e.paysVo?.libelle,
            };
        });
    }

    // getters and setters

    get doctorants(): Array<DoctorantVo> {
        return this.doctorantService.doctorants;
    }

    set doctorants(value: Array<DoctorantVo>) {
        this.doctorantService.doctorants = value;
    }

    get doctorantSelections(): Array<DoctorantVo> {
        return this.doctorantService.doctorantSelections;
    }

    set doctorantSelections(value: Array<DoctorantVo>) {
        this.doctorantService.doctorantSelections = value;
    }


    get selectedDoctorant(): DoctorantVo {
        return this.doctorantService.selectedDoctorant;
    }

    set selectedDoctorant(value: DoctorantVo) {
        this.doctorantService.selectedDoctorant = value;
    }

    get createDoctorantDialog(): boolean {
        return this.doctorantService.createDoctorantDialog;
    }

    set createDoctorantDialog(value: boolean) {
        this.doctorantService.createDoctorantDialog = value;
    }

    get editDoctorantDialog(): boolean {
        return this.doctorantService.editDoctorantDialog;
    }

    set editDoctorantDialog(value: boolean) {
        this.doctorantService.editDoctorantDialog = value;
    }

    get viewDoctorantDialog(): boolean {
        return this.doctorantService.viewDoctorantDialog;
    }

    set viewDoctorantDialog(value: boolean) {
        this.doctorantService.viewDoctorantDialog = value;
    }

    get searchDoctorant(): DoctorantVo {
        return this.doctorantService.searchDoctorant;
    }

    set searchDoctorant(value: DoctorantVo) {
        this.doctorantService.searchDoctorant = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
