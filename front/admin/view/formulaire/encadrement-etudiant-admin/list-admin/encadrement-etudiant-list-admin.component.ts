import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantService} from 'src/app/controller/service/formulaire/EncadrementEtudiant.service';
import {EncadrementEtudiantVo} from 'src/app/controller/model/formulaire/EncadrementEtudiant.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {NiveauFormationPostBacService} from 'src/app/controller/service/referentiel/NiveauFormationPostBac.service';
import {ResponsabiliteEncadrementEtudiantService} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementEtudiant.service';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {EncadrementService} from 'src/app/controller/service/formulaire/Encadrement.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {ResponsabiliteEncadrementEtudiantVo} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementEtudiant.model';
import {EncadrementVo} from 'src/app/controller/model/formulaire/Encadrement.model';
import {NiveauFormationPostBacVo} from 'src/app/controller/model/referentiel/NiveauFormationPostBac.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

@Component({
    selector: 'app-encadrement-etudiant-list-admin',
    templateUrl: './encadrement-etudiant-list-admin.component.html',
    styleUrls: ['./encadrement-etudiant-list-admin.component.css']
})
export class EncadrementEtudiantListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'EncadrementEtudiant';
    yesno: any[] = [];
    niveauFormationPostBacs: Array<NiveauFormationPostBacVo>;
    responsabiliteEncadrementEtudiants: Array<ResponsabiliteEncadrementEtudiantVo>;
    etablissements: Array<EtablissementVo>;
    payss: Array<PaysVo>;
    encadrements: Array<EncadrementVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private encadrementEtudiantService: EncadrementEtudiantService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService
        , private niveauFormationPostBacService: NiveauFormationPostBacService
        , private responsabiliteEncadrementEtudiantService: ResponsabiliteEncadrementEtudiantService
        , private etablissementService: EtablissementService
        , private paysService: PaysService
        , private encadrementService: EncadrementService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadEncadrementEtudiants();
        this.initExport();
        this.initCol();
        this.loadNiveauFormationPostBac();
        this.loadResponsabiliteEncadrementEtudiant();
        this.loadEtablissement();
        this.loadPays();
        this.loadEncadrement();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadEncadrementEtudiants() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
        isPermistted ? this.encadrementEtudiantService.findAll().subscribe(encadrementEtudiants => this.encadrementEtudiants = encadrementEtudiants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.encadrementEtudiantService.findByCriteria(this.searchEncadrementEtudiant).subscribe(encadrementEtudiants => {

            this.encadrementEtudiants = encadrementEtudiants;
            // this.searchEncadrementEtudiant = new EncadrementEtudiantVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'niveauFormationPostBac?.libelle', header: 'Niveau formation post bac'},
            {field: 'responsabiliteEncadrementEtudiant?.libelle', header: 'Responsabilite direction encadrement etudiant'},
            {field: 'sujetEtude', header: 'Sujet etude'},
            {field: 'etablissement?.libelle', header: 'Etablissement'},
            {field: 'cursus', header: 'Cursus'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'encadrement?.id', header: 'Encadrement'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }

    public async editEncadrementEtudiant(encadrementEtudiant: EncadrementEtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'edit');
        if (isPermistted) {
            this.encadrementEtudiantService.findByIdWithAssociatedList(encadrementEtudiant).subscribe(res => {
                this.selectedEncadrementEtudiant = res;
                this.editEncadrementEtudiantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEncadrementEtudiant(encadrementEtudiant: EncadrementEtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'view');
        if (isPermistted) {
            this.encadrementEtudiantService.findByIdWithAssociatedList(encadrementEtudiant).subscribe(res => {
                this.selectedEncadrementEtudiant = res;
                this.viewEncadrementEtudiantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEncadrementEtudiant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
            this.createEncadrementEtudiantDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteEncadrementEtudiant(encadrementEtudiant: EncadrementEtudiantVo) {
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Encadrement etudiant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.encadrementEtudiantService.delete(encadrementEtudiant).subscribe(status => {
                        if (status > 0) {
                            const position = this.encadrementEtudiants.indexOf(encadrementEtudiant);
                            position > -1 ? this.encadrementEtudiants.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Encadrement etudiant Supprimé',
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

    public async loadNiveauFormationPostBac() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
        isPermistted ? this.niveauFormationPostBacService.findAll().subscribe(niveauFormationPostBacs => this.niveauFormationPostBacs = niveauFormationPostBacs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadResponsabiliteEncadrementEtudiant() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
        isPermistted ? this.responsabiliteEncadrementEtudiantService.findAll().subscribe(responsabiliteEncadrementEtudiants => this.responsabiliteEncadrementEtudiants = responsabiliteEncadrementEtudiants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtablissement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
        isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEncadrement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
        isPermistted ? this.encadrementService.findAll().subscribe(encadrements => this.encadrements = encadrements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateEncadrementEtudiant(encadrementEtudiant: EncadrementEtudiantVo) {

        this.encadrementEtudiantService.findByIdWithAssociatedList(encadrementEtudiant).subscribe(
            res => {
                this.initDuplicateEncadrementEtudiant(res);
                this.selectedEncadrementEtudiant = res;
                this.selectedEncadrementEtudiant.id = null;
                this.createEncadrementEtudiantDialog = true;

            });

    }

    initDuplicateEncadrementEtudiant(res: EncadrementEtudiantVo) {
        if (res.encadrementEtudiantEnjeuxIrdsVo != null) {
            res.encadrementEtudiantEnjeuxIrdsVo.forEach(d => {
                d.encadrementEtudiantVo = null;
                d.id = null;
            });
        }
        if (res.encadrementEtudiantDisciplineScientifiquesVo != null) {
            res.encadrementEtudiantDisciplineScientifiquesVo.forEach(d => {
                d.encadrementEtudiantVo = null;
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
                {header: 'Niveau formation post bac', dataKey: 'Niveau formation post bac'},
                {header: 'Responsabilite direction encadrement etudiant', dataKey: 'Responsabilite direction encadrement etudiant'},
                {header: 'Sujet etude', dataKey: 'Sujet etude'},
                {header: 'Etablissement', dataKey: 'Etablissement'},
                {header: 'Cursus', dataKey: 'Cursus'},
                {header: 'Pays', dataKey: 'Pays'},
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
        this.exportData = this.encadrementEtudiants.map(e => {
            return {
                'Niveau formation post bac': e.niveauFormationPostBacVo?.libelle,
                'Responsabilite direction encadrement etudiant': e.responsabiliteEncadrementEtudiantVo?.libelle,
                'Sujet etude': e.sujetEtude,
                'Etablissement': e.etablissementVo?.libelle,
                'Cursus': e.cursus,
                'Pays': e.paysVo?.libelle,
                'Encadrement': e.encadrementVo?.id,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
        return this.encadrementEtudiantService.encadrementEtudiants;
    }

    set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
    }

    get encadrementEtudiantSelections(): Array<EncadrementEtudiantVo> {
        return this.encadrementEtudiantService.encadrementEtudiantSelections;
    }

    set encadrementEtudiantSelections(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiantSelections = value;
    }


    get selectedEncadrementEtudiant(): EncadrementEtudiantVo {
        return this.encadrementEtudiantService.selectedEncadrementEtudiant;
    }

    set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
    }

    get createEncadrementEtudiantDialog(): boolean {
        return this.encadrementEtudiantService.createEncadrementEtudiantDialog;
    }

    set createEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.createEncadrementEtudiantDialog = value;
    }

    get editEncadrementEtudiantDialog(): boolean {
        return this.encadrementEtudiantService.editEncadrementEtudiantDialog;
    }

    set editEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.editEncadrementEtudiantDialog = value;
    }

    get viewEncadrementEtudiantDialog(): boolean {
        return this.encadrementEtudiantService.viewEncadrementEtudiantDialog;
    }

    set viewEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.viewEncadrementEtudiantDialog = value;
    }

    get searchEncadrementEtudiant(): EncadrementEtudiantVo {
        return this.encadrementEtudiantService.searchEncadrementEtudiant;
    }

    set searchEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.searchEncadrementEtudiant = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
