import {Component, OnInit} from '@angular/core';
import {EncadrementDoctorantService} from 'src/app/controller/service/formulaire/EncadrementDoctorant.service';
import {EncadrementDoctorantVo} from 'src/app/controller/model/formulaire/EncadrementDoctorant.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {ResponsabiliteEncadrementDoctorantService} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementDoctorant.service';
import {FinancementDoctorantService} from 'src/app/controller/service/referentiel/FinancementDoctorant.service';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {DoctorantService} from 'src/app/controller/service/formulaire/Doctorant.service';
import {EncadrementService} from 'src/app/controller/service/formulaire/Encadrement.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {FinancementDoctorantVo} from 'src/app/controller/model/referentiel/FinancementDoctorant.model';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EncadrementVo} from 'src/app/controller/model/formulaire/Encadrement.model';
import {DoctorantVo} from 'src/app/controller/model/formulaire/Doctorant.model';
import {ResponsabiliteEncadrementDoctorantVo} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementDoctorant.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

@Component({
    selector: 'app-encadrement-doctorant-list-admin',
    templateUrl: './encadrement-doctorant-list-admin.component.html',
    styleUrls: ['./encadrement-doctorant-list-admin.component.css']
})
export class EncadrementDoctorantListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'EncadrementDoctorant';
    yesno: any[] = [];
    responsabiliteEncadrementDoctorants: Array<ResponsabiliteEncadrementDoctorantVo>;
    financementDoctorants: Array<FinancementDoctorantVo>;
    etablissements: Array<EtablissementVo>;
    payss: Array<PaysVo>;
    doctorants: Array<DoctorantVo>;
    encadrements: Array<EncadrementVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private encadrementDoctorantService: EncadrementDoctorantService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService
        , private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
        , private financementDoctorantService: FinancementDoctorantService
        , private etablissementService: EtablissementService
        , private paysService: PaysService
        , private doctorantService: DoctorantService
        , private encadrementService: EncadrementService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadEncadrementDoctorants();
        this.initExport();
        this.initCol();
        this.loadResponsabiliteEncadrementDoctorant();
        this.loadFinancementDoctorant();
        this.loadEtablissement();
        this.loadPays();
        this.loadDoctorant();
        this.loadEncadrement();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadEncadrementDoctorants() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.encadrementDoctorantService.findAll().subscribe(encadrementDoctorants => this.encadrementDoctorants = encadrementDoctorants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.encadrementDoctorantService.findByCriteria(this.searchEncadrementDoctorant).subscribe(encadrementDoctorants => {

            this.encadrementDoctorants = encadrementDoctorants;
            // this.searchEncadrementDoctorant = new EncadrementDoctorantVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'responsabiliteEncadrementDoctorant?.libelle', header: 'Responsabilite encadrement doctorant'},
            {field: 'codirectionInternationale', header: 'Codirection internationale'},
            {field: 'sujetThese', header: 'Sujet these'},
            {field: 'dateDebutThese', header: 'Date debut these'},
            {field: 'datePrevuSoutenanceThese', header: 'Date prevu soutenance these'},
            {field: 'intituleEcoleDoctorale', header: 'Intitule ecole doctorale'},
            {field: 'financementDoctorant?.libelle', header: 'Financement doctorant'},
            {field: 'etablissement?.libelle', header: 'Etablissement'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'doctorant?.id', header: 'Doctorant'},
            {field: 'encadrement?.id', header: 'Encadrement'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }

    public async editEncadrementDoctorant(encadrementDoctorant: EncadrementDoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'edit');
        if (isPermistted) {
            this.encadrementDoctorantService.findByIdWithAssociatedList(encadrementDoctorant).subscribe(res => {
                this.selectedEncadrementDoctorant = res;
                this.selectedEncadrementDoctorant.dateDebutThese = new Date(encadrementDoctorant.dateDebutThese);
                this.selectedEncadrementDoctorant.datePrevuSoutenanceThese = new Date(encadrementDoctorant.datePrevuSoutenanceThese);
                this.editEncadrementDoctorantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEncadrementDoctorant(encadrementDoctorant: EncadrementDoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'view');
        if (isPermistted) {
            this.encadrementDoctorantService.findByIdWithAssociatedList(encadrementDoctorant).subscribe(res => {
                this.selectedEncadrementDoctorant = res;
                this.selectedEncadrementDoctorant.dateDebutThese = new Date(encadrementDoctorant.dateDebutThese);
                this.selectedEncadrementDoctorant.datePrevuSoutenanceThese = new Date(encadrementDoctorant.datePrevuSoutenanceThese);
                this.viewEncadrementDoctorantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEncadrementDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
            this.createEncadrementDoctorantDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteEncadrementDoctorant(encadrementDoctorant: EncadrementDoctorantVo) {
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Encadrement doctorant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.encadrementDoctorantService.delete(encadrementDoctorant).subscribe(status => {
                        if (status > 0) {
                            const position = this.encadrementDoctorants.indexOf(encadrementDoctorant);
                            position > -1 ? this.encadrementDoctorants.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Encadrement doctorant Supprimé',
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

    public async loadResponsabiliteEncadrementDoctorant() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.responsabiliteEncadrementDoctorantService.findAll().subscribe(responsabiliteEncadrementDoctorants => this.responsabiliteEncadrementDoctorants = responsabiliteEncadrementDoctorants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadFinancementDoctorant() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.financementDoctorantService.findAll().subscribe(financementDoctorants => this.financementDoctorants = financementDoctorants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtablissement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadDoctorant() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.doctorantService.findAll().subscribe(doctorants => this.doctorants = doctorants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEncadrement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.encadrementService.findAll().subscribe(encadrements => this.encadrements = encadrements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateEncadrementDoctorant(encadrementDoctorant: EncadrementDoctorantVo) {

        this.encadrementDoctorantService.findByIdWithAssociatedList(encadrementDoctorant).subscribe(
            res => {
                this.initDuplicateEncadrementDoctorant(res);
                this.selectedEncadrementDoctorant = res;
                this.selectedEncadrementDoctorant.id = null;
                this.createEncadrementDoctorantDialog = true;

            });

    }

    initDuplicateEncadrementDoctorant(res: EncadrementDoctorantVo) {
        if (res.enjeuxIrdEncadrementDoctorantsVo != null) {
            res.enjeuxIrdEncadrementDoctorantsVo.forEach(d => {
                d.encadrementDoctorantVo = null;
                d.id = null;
            });
        }
        if (res.disciplineScientifiqueEncadrementDoctorantsVo != null) {
            res.disciplineScientifiqueEncadrementDoctorantsVo.forEach(d => {
                d.encadrementDoctorantVo = null;
                d.id = null;
            });
        }
        if (res.communauteSavoirEncadrementDoctorantsVo != null) {
            res.communauteSavoirEncadrementDoctorantsVo.forEach(d => {
                d.encadrementDoctorantVo = null;
                d.id = null;
            });
        }


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
                {header: 'Responsabilite encadrement doctorant', dataKey: 'Responsabilite encadrement doctorant'},
                {header: 'Codirection internationale', dataKey: 'Codirection internationale'},
                {header: 'Sujet these', dataKey: 'Sujet these'},
                {header: 'Date debut these', dataKey: 'Date debut these'},
                {header: 'Date prevu soutenance these', dataKey: 'Date prevu soutenance these'},
                {header: 'Intitule ecole doctorale', dataKey: 'Intitule ecole doctorale'},
                {header: 'Financement doctorant', dataKey: 'Financement doctorant'},
                {header: 'Etablissement', dataKey: 'Etablissement'},
                {header: 'Pays', dataKey: 'Pays'},
                {header: 'Doctorant', dataKey: 'Doctorant'},
                {header: 'Encadrement', dataKey: 'Encadrement'},
                {header: 'Etat etape campagne', dataKey: 'Etat etape campagne'},
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
        this.exportData = this.encadrementDoctorants.map(e => {
            return {
                'Responsabilite encadrement doctorant': e.responsabiliteEncadrementDoctorantVo?.libelle,
                'Codirection internationale': e.codirectionInternationale,
                'Sujet these': e.sujetThese,
                'Date debut these': e.dateDebutThese,
                'Date prevu soutenance these': e.datePrevuSoutenanceThese,
                'Intitule ecole doctorale': e.intituleEcoleDoctorale,
                'Doctorant': e.doctorantVo?.id,
                'Encadrement': e.encadrementVo?.id,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
        return this.encadrementDoctorantService.encadrementDoctorants;
    }

    set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
    }

    get encadrementDoctorantSelections(): Array<EncadrementDoctorantVo> {
        return this.encadrementDoctorantService.encadrementDoctorantSelections;
    }

    set encadrementDoctorantSelections(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorantSelections = value;
    }


    get selectedEncadrementDoctorant(): EncadrementDoctorantVo {
        return this.encadrementDoctorantService.selectedEncadrementDoctorant;
    }

    set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
    }

    get createEncadrementDoctorantDialog(): boolean {
        return this.encadrementDoctorantService.createEncadrementDoctorantDialog;
    }

    set createEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.createEncadrementDoctorantDialog = value;
    }

    get editEncadrementDoctorantDialog(): boolean {
        return this.encadrementDoctorantService.editEncadrementDoctorantDialog;
    }

    set editEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.editEncadrementDoctorantDialog = value;
    }

    get viewEncadrementDoctorantDialog(): boolean {
        return this.encadrementDoctorantService.viewEncadrementDoctorantDialog;
    }

    set viewEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.viewEncadrementDoctorantDialog = value;
    }

    get searchEncadrementDoctorant(): EncadrementDoctorantVo {
        return this.encadrementDoctorantService.searchEncadrementDoctorant;
    }

    set searchEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.searchEncadrementDoctorant = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
