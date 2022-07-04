import {Component, OnInit} from '@angular/core';
import {EtablissementProjetService} from 'src/app/controller/service/formulaire/EtablissementProjet.service';
import {EtablissementProjetVo} from 'src/app/controller/model/formulaire/EtablissementProjet.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-etablissement-projet-list-admin',
    templateUrl: './etablissement-projet-list-admin.component.html',
    styleUrls: ['./etablissement-projet-list-admin.component.css']
})
export class EtablissementProjetListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'EtablissementProjet';
    yesno: any[] = [];
    villes: Array<VilleVo>;
    payss: Array<PaysVo>;


    constructor(private etablissementProjetService: EtablissementProjetService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private villeService: VilleService
        , private paysService: PaysService
    ) {
    }

    ngOnInit(): void {
        this.loadEtablissementProjets();
        this.initExport();
        this.initCol();
        this.loadVille();
        this.loadPays();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadEtablissementProjets() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'list');
        isPermistted ? this.etablissementProjetService.findAll().subscribe(etablissementProjets => this.etablissementProjets = etablissementProjets, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.etablissementProjetService.findByCriteria(this.searchEtablissementProjet).subscribe(etablissementProjets => {

            this.etablissementProjets = etablissementProjets;
            // this.searchEtablissementProjet = new EtablissementProjetVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'sigleOfficiel', header: 'Sigle officiel'},
            {field: 'nomEnFrancais', header: 'Nom en francais'},
            {field: 'sigleEnFrancais', header: 'Sigle en francais'},
            {field: 'anciensNom', header: 'Anciens nom'},
            {field: 'ville?.libelle', header: 'Ville'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'champIntervention', header: 'Champ intervention'},
            {field: 'valide', header: 'Valide'},
        ];
    }

    public async editEtablissementProjet(etablissementProjet: EtablissementProjetVo) {
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'edit');
        if (isPermistted) {
            this.etablissementProjetService.findByIdWithAssociatedList(etablissementProjet).subscribe(res => {
                this.selectedEtablissementProjet = res;
                this.editEtablissementProjetDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEtablissementProjet(etablissementProjet: EtablissementProjetVo) {
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'view');
        if (isPermistted) {
            this.etablissementProjetService.findByIdWithAssociatedList(etablissementProjet).subscribe(res => {
                this.selectedEtablissementProjet = res;
                this.viewEtablissementProjetDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEtablissementProjet(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEtablissementProjet = new EtablissementProjetVo();
            this.createEtablissementProjetDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteEtablissementProjet(etablissementProjet: EtablissementProjetVo) {
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Etablissement projet) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.etablissementProjetService.delete(etablissementProjet).subscribe(status => {
                        if (status > 0) {
                            const position = this.etablissementProjets.indexOf(etablissementProjet);
                            position > -1 ? this.etablissementProjets.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Etablissement projet Supprimé',
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

    public async loadVille() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'list');
        isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateEtablissementProjet(etablissementProjet: EtablissementProjetVo) {

        this.etablissementProjetService.findByIdWithAssociatedList(etablissementProjet).subscribe(
            res => {
                this.initDuplicateEtablissementProjet(res);
                this.selectedEtablissementProjet = res;
                this.selectedEtablissementProjet.id = null;
                this.createEtablissementProjetDialog = true;

            });

    }

    initDuplicateEtablissementProjet(res: EtablissementProjetVo) {


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
                {header: 'Sigle officiel', dataKey: 'Sigle officiel'},
                {header: 'Nom en francais', dataKey: 'Nom en francais'},
                {header: 'Sigle en francais', dataKey: 'Sigle en francais'},
                {header: 'Anciens nom', dataKey: 'Anciens nom'},
                {header: 'Ville', dataKey: 'Ville'},
                {header: 'Pays', dataKey: 'Pays'},
                {header: 'Champ intervention', dataKey: 'Champ intervention'},
                {header: 'Valide', dataKey: 'Valide'},
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
        this.exportData = this.etablissementProjets.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Description': e.description,
                'Sigle officiel': e.sigleOfficiel,
                'Nom en francais': e.nomEnFrancais,
                'Sigle en francais': e.sigleEnFrancais,
                'Anciens nom': e.anciensNom,
                'Ville': e.villeVo?.libelle,
                'Pays': e.paysVo?.libelle,
                'Champ intervention': e.champIntervention,
                'Valide': e.valide,
            };
        });
    }

    // getters and setters

    get etablissementProjets(): Array<EtablissementProjetVo> {
        return this.etablissementProjetService.etablissementProjets;
    }

    set etablissementProjets(value: Array<EtablissementProjetVo>) {
        this.etablissementProjetService.etablissementProjets = value;
    }

    get etablissementProjetSelections(): Array<EtablissementProjetVo> {
        return this.etablissementProjetService.etablissementProjetSelections;
    }

    set etablissementProjetSelections(value: Array<EtablissementProjetVo>) {
        this.etablissementProjetService.etablissementProjetSelections = value;
    }


    get selectedEtablissementProjet(): EtablissementProjetVo {
        return this.etablissementProjetService.selectedEtablissementProjet;
    }

    set selectedEtablissementProjet(value: EtablissementProjetVo) {
        this.etablissementProjetService.selectedEtablissementProjet = value;
    }

    get createEtablissementProjetDialog(): boolean {
        return this.etablissementProjetService.createEtablissementProjetDialog;
    }

    set createEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.createEtablissementProjetDialog = value;
    }

    get editEtablissementProjetDialog(): boolean {
        return this.etablissementProjetService.editEtablissementProjetDialog;
    }

    set editEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.editEtablissementProjetDialog = value;
    }

    get viewEtablissementProjetDialog(): boolean {
        return this.etablissementProjetService.viewEtablissementProjetDialog;
    }

    set viewEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.viewEtablissementProjetDialog = value;
    }

    get searchEtablissementProjet(): EtablissementProjetVo {
        return this.etablissementProjetService.searchEtablissementProjet;
    }

    set searchEtablissementProjet(value: EtablissementProjetVo) {
        this.etablissementProjetService.searchEtablissementProjet = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
