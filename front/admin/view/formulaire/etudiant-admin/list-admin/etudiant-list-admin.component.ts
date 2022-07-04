import {Component, OnInit} from '@angular/core';
import {EtudiantService} from 'src/app/controller/service/formulaire/Etudiant.service';
import {EtudiantVo} from 'src/app/controller/model/formulaire/Etudiant.model';
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
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

@Component({
    selector: 'app-etudiant-list-admin',
    templateUrl: './etudiant-list-admin.component.html',
    styleUrls: ['./etudiant-list-admin.component.css']
})
export class EtudiantListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Etudiant';
    yesno: any[] = [];
    sexes: Array<SexeVo>;
    payss: Array<PaysVo>;


    constructor(private etudiantService: EtudiantService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService
        , private sexeService: SexeService
        , private paysService: PaysService
    ) {
    }

    ngOnInit(): void {
        this.loadEtudiants();
        this.initExport();
        this.initCol();
        this.loadSexe();
        this.loadPays();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadEtudiants() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'list');
        isPermistted ? this.etudiantService.findAll().subscribe(etudiants => this.etudiants = etudiants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.etudiantService.findByCriteria(this.searchEtudiant).subscribe(etudiants => {

            this.etudiants = etudiants;
            // this.searchEtudiant = new EtudiantVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'nom', header: 'Nom'},
            {field: 'prenom', header: 'Prenom'},
            {field: 'sexe?.libelle', header: 'Sexe'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
        ];
    }

    public async editEtudiant(etudiant: EtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'edit');
        if (isPermistted) {
            this.etudiantService.findByIdWithAssociatedList(etudiant).subscribe(res => {
                this.selectedEtudiant = res;
                this.selectedEtudiant.dateArchivage = new Date(etudiant.dateArchivage);
                this.editEtudiantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEtudiant(etudiant: EtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'view');
        if (isPermistted) {
            this.etudiantService.findByIdWithAssociatedList(etudiant).subscribe(res => {
                this.selectedEtudiant = res;
                this.selectedEtudiant.dateArchivage = new Date(etudiant.dateArchivage);
                this.viewEtudiantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEtudiant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEtudiant = new EtudiantVo();
            this.createEtudiantDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverEtudiant(etudiant: EtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Etudiant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.etudiantService.archiver(etudiant).subscribe(status => {
                        const myIndex = this.etudiants.indexOf(etudiant);
                        this.etudiants[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Etudiant archivé',
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

    public async desarchiverEtudiant(etudiant: EtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Etudiant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.etudiantService.desarchiver(etudiant).subscribe(status => {
                        const myIndex = this.etudiants.indexOf(etudiant);
                        this.etudiants[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Etudiant désarchivé',
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


    public async deleteEtudiant(etudiant: EtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Etudiant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.etudiantService.delete(etudiant).subscribe(status => {
                        if (status > 0) {
                            const position = this.etudiants.indexOf(etudiant);
                            position > -1 ? this.etudiants.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Etudiant Supprimé',
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
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'list');
        isPermistted ? this.sexeService.findAll().subscribe(sexes => this.sexes = sexes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateEtudiant(etudiant: EtudiantVo) {

        this.etudiantService.findByIdWithAssociatedList(etudiant).subscribe(
            res => {
                this.initDuplicateEtudiant(res);
                this.selectedEtudiant = res;
                this.selectedEtudiant.id = null;
                this.createEtudiantDialog = true;

            });

    }

    initDuplicateEtudiant(res: EtudiantVo) {


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
                {header: 'Pays', dataKey: 'Pays'},
                {header: 'Archive', dataKey: 'Archive'},
                {header: 'Date archivage', dataKey: 'Date archivage'},
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
        this.exportData = this.etudiants.map(e => {
            return {
                'Nom': e.nom,
                'Prenom': e.prenom,
                'Sexe': e.sexeVo?.libelle,
                'Pays': e.paysVo?.libelle,
                'Archive': e.archive,
                'Date archivage': e.dateArchivage,
            };
        });
    }

    // getters and setters

    get etudiants(): Array<EtudiantVo> {
        return this.etudiantService.etudiants;
    }

    set etudiants(value: Array<EtudiantVo>) {
        this.etudiantService.etudiants = value;
    }

    get etudiantSelections(): Array<EtudiantVo> {
        return this.etudiantService.etudiantSelections;
    }

    set etudiantSelections(value: Array<EtudiantVo>) {
        this.etudiantService.etudiantSelections = value;
    }


    get selectedEtudiant(): EtudiantVo {
        return this.etudiantService.selectedEtudiant;
    }

    set selectedEtudiant(value: EtudiantVo) {
        this.etudiantService.selectedEtudiant = value;
    }

    get createEtudiantDialog(): boolean {
        return this.etudiantService.createEtudiantDialog;
    }

    set createEtudiantDialog(value: boolean) {
        this.etudiantService.createEtudiantDialog = value;
    }

    get editEtudiantDialog(): boolean {
        return this.etudiantService.editEtudiantDialog;
    }

    set editEtudiantDialog(value: boolean) {
        this.etudiantService.editEtudiantDialog = value;
    }

    get viewEtudiantDialog(): boolean {
        return this.etudiantService.viewEtudiantDialog;
    }

    set viewEtudiantDialog(value: boolean) {
        this.etudiantService.viewEtudiantDialog = value;
    }

    get searchEtudiant(): EtudiantVo {
        return this.etudiantService.searchEtudiant;
    }

    set searchEtudiant(value: EtudiantVo) {
        this.etudiantService.searchEtudiant = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
