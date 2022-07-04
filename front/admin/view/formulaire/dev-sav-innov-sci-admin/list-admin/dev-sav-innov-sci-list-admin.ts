import {Component, OnInit} from '@angular/core';
import {
    DeveloppementDeSavoirEtInnovationScientifiqueService
} from 'src/app/controller/service/formulaire/DeveloppementDeSavoirEtInnovationScientifique.service';
import {
    DeveloppementDeSavoirEtInnovationScientifiqueVo
} from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {RoleDeveloppementDeSavoirService} from 'src/app/controller/service/referentiel/RoleDeveloppementDeSavoir.service';
import {SavoirEtInnovationService} from 'src/app/controller/service/formulaire/SavoirEtInnovation.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {SavoirEtInnovationVo} from 'src/app/controller/model/formulaire/SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {RoleDeveloppementDeSavoirVo} from 'src/app/controller/model/referentiel/RoleDeveloppementDeSavoir.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

@Component({
    selector: 'app-developpement-de-savoir-et-innovation-scientifique-list-admin',
    templateUrl: './dev-sav-innov-sci-list-admin.html',
    styleUrls: ['./dev-sav-innov-sci-list-admin.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'DeveloppementDeSavoirEtInnovationScientifique';
    yesno: any[] = [];
    roleDeveloppementDeSavoirs: Array<RoleDeveloppementDeSavoirVo>;
    savoirEtInnovations: Array<SavoirEtInnovationVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService
        , private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
        , private savoirEtInnovationService: SavoirEtInnovationService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadDeveloppementDeSavoirEtInnovationScientifiques();
        this.initExport();
        this.initCol();
        this.loadRoleDeveloppementDeSavoir();
        this.loadSavoirEtInnovation();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadDeveloppementDeSavoirEtInnovationScientifiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'list');
        isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.developpementDeSavoirEtInnovationScientifiqueService.findByCriteria(this.searchDeveloppementDeSavoirEtInnovationScientifique).subscribe(developpementDeSavoirEtInnovationScientifiques => {

            this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques;
            // this.searchDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'titreInstrument', header: 'Titre instrument'},
            {field: 'roleDeveloppementDeSavoir?.libelle', header: 'Role developpement de savoir'},
            {field: 'anneeMiseEnOeuvre', header: 'Annee mise en oeuvre'},
            {field: 'lienWeb', header: 'Lien web'},
            {field: 'savoirEtInnovation?.id', header: 'Savoir et innovation'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }

    public async editDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'edit');
        if (isPermistted) {
            this.developpementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifique).subscribe(res => {
                this.selectedDeveloppementDeSavoirEtInnovationScientifique = res;
                this.editDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'view');
        if (isPermistted) {
            this.developpementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifique).subscribe(res => {
                this.selectedDeveloppementDeSavoirEtInnovationScientifique = res;
                this.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateDeveloppementDeSavoirEtInnovationScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
            this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Developpement de savoir et innovation scientifique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.developpementDeSavoirEtInnovationScientifiqueService.delete(developpementDeSavoirEtInnovationScientifique).subscribe(status => {
                        if (status > 0) {
                            const position = this.developpementDeSavoirEtInnovationScientifiques.indexOf(developpementDeSavoirEtInnovationScientifique);
                            position > -1 ? this.developpementDeSavoirEtInnovationScientifiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Developpement de savoir et innovation scientifique Supprimé',
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

    public async loadRoleDeveloppementDeSavoir() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'list');
        isPermistted ? this.roleDeveloppementDeSavoirService.findAll().subscribe(roleDeveloppementDeSavoirs => this.roleDeveloppementDeSavoirs = roleDeveloppementDeSavoirs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadSavoirEtInnovation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'list');
        isPermistted ? this.savoirEtInnovationService.findAll().subscribe(savoirEtInnovations => this.savoirEtInnovations = savoirEtInnovations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: DeveloppementDeSavoirEtInnovationScientifiqueVo) {

        this.developpementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifique).subscribe(
            res => {
                this.initDuplicateDeveloppementDeSavoirEtInnovationScientifique(res);
                this.selectedDeveloppementDeSavoirEtInnovationScientifique = res;
                this.selectedDeveloppementDeSavoirEtInnovationScientifique.id = null;
                this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;

            });

    }

    initDuplicateDeveloppementDeSavoirEtInnovationScientifique(res: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        if (res.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo != null) {
            res.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo.forEach(d => {
                d.developpementDeSavoirEtInnovationScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.typeUtilisateurSavoirConcusVo != null) {
            res.typeUtilisateurSavoirConcusVo.forEach(d => {
                d.developpementDeSavoirEtInnovationScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo != null) {
            res.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo.forEach(d => {
                d.developpementDeSavoirEtInnovationScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo != null) {
            res.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo.forEach(d => {
                d.developpementDeSavoirEtInnovationScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo != null) {
            res.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo.forEach(d => {
                d.developpementDeSavoirEtInnovationScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo != null) {
            res.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo.forEach(d => {
                d.developpementDeSavoirEtInnovationScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.developpementDeSavoirEtInnovationScientifiquePayssVo != null) {
            res.developpementDeSavoirEtInnovationScientifiquePayssVo.forEach(d => {
                d.developpementDeSavoirEtInnovationScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.developpementDeSavoirEtInnovationScientifiqueRolesVo != null) {
            res.developpementDeSavoirEtInnovationScientifiqueRolesVo.forEach(d => {
                d.developpementDeSavoirEtInnovationScientifiqueVo = null;
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
                {header: 'Titre instrument', dataKey: 'Titre instrument'},
                {header: 'Role developpement de savoir', dataKey: 'Role developpement de savoir'},
                {header: 'Annee mise en oeuvre', dataKey: 'Annee mise en oeuvre'},
                {header: 'Lien web', dataKey: 'Lien web'},
                {header: 'Savoir et innovation', dataKey: 'Savoir et innovation'},
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
        this.exportData = this.developpementDeSavoirEtInnovationScientifiques.map(e => {
            return {
                'Titre instrument': e.titreInstrument,
                'Role developpement de savoir': e.roleDeveloppementDeSavoirVo?.libelle,
                'Annee mise en oeuvre': e.anneeMiseEnOeuvre,
                'Lien web': e.lienWeb,
                'Savoir et innovation': e.savoirEtInnovationVo?.id,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
        return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
    }

    set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
    }

    get developpementDeSavoirEtInnovationScientifiqueSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
        return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiqueSelections;
    }

    set developpementDeSavoirEtInnovationScientifiqueSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiqueSelections = value;
    }


    get selectedDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
        return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
    }

    set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
    }

    get createDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;
    }

    set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
    }

    get editDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog;
    }

    set editDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
    }

    get viewDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this.developpementDeSavoirEtInnovationScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog;
    }

    set viewDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
    }

    get searchDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
        return this.developpementDeSavoirEtInnovationScientifiqueService.searchDeveloppementDeSavoirEtInnovationScientifique;
    }

    set searchDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.searchDeveloppementDeSavoirEtInnovationScientifique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
