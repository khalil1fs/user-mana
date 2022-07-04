import {Component, OnInit} from '@angular/core';
import {IdentifiantAuteurExpertService} from 'src/app/controller/service/formulaire/IdentifiantAuteurExpert.service';
import {IdentifiantAuteurExpertVo} from 'src/app/controller/model/formulaire/IdentifiantAuteurExpert.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {IdentifiantRechercheService} from 'src/app/controller/service/referentiel/IdentifiantRecherche.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

import {IdentifiantRechercheVo} from 'src/app/controller/model/referentiel/IdentifiantRecherche.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-identifiant-auteur-expert-list-admin',
    templateUrl: './identifiant-auteur-expert-list-admin.component.html',
    styleUrls: ['./identifiant-auteur-expert-list-admin.component.css']
})
export class IdentifiantAuteurExpertListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'IdentifiantAuteurExpert';
    yesno: any[] = [];
    identifiantRecherches: Array<IdentifiantRechercheVo>;
    chercheurs: Array<ChercheurVo>;


    constructor(private identifiantAuteurExpertService: IdentifiantAuteurExpertService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private identifiantRechercheService: IdentifiantRechercheService
        , private chercheurService: ChercheurService
    ) {
    }

    ngOnInit(): void {
        this.loadIdentifiantAuteurExperts();
        this.initExport();
        this.initCol();
        this.loadIdentifiantRecherche();
        this.loadChercheur();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadIdentifiantAuteurExperts() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('IdentifiantAuteurExpert', 'list');
        isPermistted ? this.identifiantAuteurExpertService.findAll().subscribe(identifiantAuteurExperts => this.identifiantAuteurExperts = identifiantAuteurExperts, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.identifiantAuteurExpertService.findByCriteria(this.searchIdentifiantAuteurExpert).subscribe(identifiantAuteurExperts => {

            this.identifiantAuteurExperts = identifiantAuteurExperts;
            // this.searchIdentifiantAuteurExpert = new IdentifiantAuteurExpertVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'identifiantRecherche?.libelle', header: 'Identifiant recherche'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'valeur', header: 'Valeur'},
        ];
    }

    public async editIdentifiantAuteurExpert(identifiantAuteurExpert: IdentifiantAuteurExpertVo) {
        const isPermistted = await this.roleService.isPermitted('IdentifiantAuteurExpert', 'edit');
        if (isPermistted) {
            this.identifiantAuteurExpertService.findByIdWithAssociatedList(identifiantAuteurExpert).subscribe(res => {
                this.selectedIdentifiantAuteurExpert = res;
                this.editIdentifiantAuteurExpertDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewIdentifiantAuteurExpert(identifiantAuteurExpert: IdentifiantAuteurExpertVo) {
        const isPermistted = await this.roleService.isPermitted('IdentifiantAuteurExpert', 'view');
        if (isPermistted) {
            this.identifiantAuteurExpertService.findByIdWithAssociatedList(identifiantAuteurExpert).subscribe(res => {
                this.selectedIdentifiantAuteurExpert = res;
                this.viewIdentifiantAuteurExpertDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateIdentifiantAuteurExpert(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedIdentifiantAuteurExpert = new IdentifiantAuteurExpertVo();
            this.createIdentifiantAuteurExpertDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteIdentifiantAuteurExpert(identifiantAuteurExpert: IdentifiantAuteurExpertVo) {
        const isPermistted = await this.roleService.isPermitted('IdentifiantAuteurExpert', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Identifiant auteur expert) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.identifiantAuteurExpertService.delete(identifiantAuteurExpert).subscribe(status => {
                        if (status > 0) {
                            const position = this.identifiantAuteurExperts.indexOf(identifiantAuteurExpert);
                            position > -1 ? this.identifiantAuteurExperts.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Identifiant auteur expert Supprimé',
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

    public async loadIdentifiantRecherche() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('IdentifiantAuteurExpert', 'list');
        isPermistted ? this.identifiantRechercheService.findAll().subscribe(identifiantRecherches => this.identifiantRecherches = identifiantRecherches, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('IdentifiantAuteurExpert', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateIdentifiantAuteurExpert(identifiantAuteurExpert: IdentifiantAuteurExpertVo) {

        this.identifiantAuteurExpertService.findByIdWithAssociatedList(identifiantAuteurExpert).subscribe(
            res => {
                this.initDuplicateIdentifiantAuteurExpert(res);
                this.selectedIdentifiantAuteurExpert = res;
                this.selectedIdentifiantAuteurExpert.id = null;
                this.createIdentifiantAuteurExpertDialog = true;

            });

    }

    initDuplicateIdentifiantAuteurExpert(res: IdentifiantAuteurExpertVo) {


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
                {header: 'Identifiant recherche', dataKey: 'Identifiant recherche'},
                {header: 'Chercheur', dataKey: 'Chercheur'},
                {header: 'Valeur', dataKey: 'Valeur'},
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
        this.exportData = this.identifiantAuteurExperts.map(e => {
            return {
                'Identifiant recherche': e.identifiantRechercheVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Valeur': e.valeur,
            };
        });
    }

    // getters and setters

    get identifiantAuteurExperts(): Array<IdentifiantAuteurExpertVo> {
        return this.identifiantAuteurExpertService.identifiantAuteurExperts;
    }

    set identifiantAuteurExperts(value: Array<IdentifiantAuteurExpertVo>) {
        this.identifiantAuteurExpertService.identifiantAuteurExperts = value;
    }

    get identifiantAuteurExpertSelections(): Array<IdentifiantAuteurExpertVo> {
        return this.identifiantAuteurExpertService.identifiantAuteurExpertSelections;
    }

    set identifiantAuteurExpertSelections(value: Array<IdentifiantAuteurExpertVo>) {
        this.identifiantAuteurExpertService.identifiantAuteurExpertSelections = value;
    }


    get selectedIdentifiantAuteurExpert(): IdentifiantAuteurExpertVo {
        return this.identifiantAuteurExpertService.selectedIdentifiantAuteurExpert;
    }

    set selectedIdentifiantAuteurExpert(value: IdentifiantAuteurExpertVo) {
        this.identifiantAuteurExpertService.selectedIdentifiantAuteurExpert = value;
    }

    get createIdentifiantAuteurExpertDialog(): boolean {
        return this.identifiantAuteurExpertService.createIdentifiantAuteurExpertDialog;
    }

    set createIdentifiantAuteurExpertDialog(value: boolean) {
        this.identifiantAuteurExpertService.createIdentifiantAuteurExpertDialog = value;
    }

    get editIdentifiantAuteurExpertDialog(): boolean {
        return this.identifiantAuteurExpertService.editIdentifiantAuteurExpertDialog;
    }

    set editIdentifiantAuteurExpertDialog(value: boolean) {
        this.identifiantAuteurExpertService.editIdentifiantAuteurExpertDialog = value;
    }

    get viewIdentifiantAuteurExpertDialog(): boolean {
        return this.identifiantAuteurExpertService.viewIdentifiantAuteurExpertDialog;
    }

    set viewIdentifiantAuteurExpertDialog(value: boolean) {
        this.identifiantAuteurExpertService.viewIdentifiantAuteurExpertDialog = value;
    }

    get searchIdentifiantAuteurExpert(): IdentifiantAuteurExpertVo {
        return this.identifiantAuteurExpertService.searchIdentifiantAuteurExpert;
    }

    set searchIdentifiantAuteurExpert(value: IdentifiantAuteurExpertVo) {
        this.identifiantAuteurExpertService.searchIdentifiantAuteurExpert = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
