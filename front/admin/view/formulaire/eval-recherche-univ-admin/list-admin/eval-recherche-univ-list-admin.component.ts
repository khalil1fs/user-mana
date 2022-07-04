import {Component, OnInit} from '@angular/core';
import {EvaluationRechercheUniversitaireService} from 'src/app/controller/service/formulaire/EvaluationRechercheUniversitaire.service';
import {EvaluationRechercheUniversitaireVo} from 'src/app/controller/model/formulaire/EvaluationRechercheUniversitaire.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {TypeExpertService} from 'src/app/controller/service/referentiel/TypeExpert.service';
import {
    RoleEvaluationRechercheUniversitaireService
} from 'src/app/controller/service/referentiel/RoleEvaluationRechercheUniversitaire.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {RoleEvaluationRechercheUniversitaireVo} from 'src/app/controller/model/referentiel/RoleEvaluationRechercheUniversitaire.model';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {TypeExpertVo} from 'src/app/controller/model/referentiel/TypeExpert.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-evaluation-recherche-universitaire-list-admin',
    templateUrl: './eval-recherche-univ-list-admin.component.html',
    styleUrls: ['./eval-recherche-univ-list-admin.component.css']
})
export class EvaluationRechercheUniversitaireListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'EvaluationRechercheUniversitaire';
    yesno: any[] = [];
    typeExperts: Array<TypeExpertVo>;
    roleEvaluationRechercheUniversitaires: Array<RoleEvaluationRechercheUniversitaireVo>;
    payss: Array<PaysVo>;
    etablissements: Array<EtablissementVo>;
    chercheurs: Array<ChercheurVo>;
    campagnes: Array<CampagneVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private evaluationRechercheUniversitaireService: EvaluationRechercheUniversitaireService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private typeExpertService: TypeExpertService
        , private roleEvaluationRechercheUniversitaireService: RoleEvaluationRechercheUniversitaireService
        , private paysService: PaysService
        , private etablissementService: EtablissementService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadEvaluationRechercheUniversitaires();
        this.initExport();
        this.initCol();
        this.loadTypeExpert();
        this.loadRoleEvaluationRechercheUniversitaire();
        this.loadPays();
        this.loadEtablissement();
        this.loadChercheur();
        this.loadCampagne();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadEvaluationRechercheUniversitaires() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.evaluationRechercheUniversitaireService.findAll().subscribe(evaluationRechercheUniversitaires => this.evaluationRechercheUniversitaires = evaluationRechercheUniversitaires, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.evaluationRechercheUniversitaireService.findByCriteria(this.searchEvaluationRechercheUniversitaire).subscribe(evaluationRechercheUniversitaires => {

            this.evaluationRechercheUniversitaires = evaluationRechercheUniversitaires;
            // this.searchEvaluationRechercheUniversitaire = new EvaluationRechercheUniversitaireVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'annee', header: 'Annee'},
            {field: 'typeExpert?.libelle', header: 'Type expert'},
            {field: 'roleEvaluationRechercheUniversitaire?.libelle', header: 'Role evaluation recherche universitaire'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'etablissement?.libelle', header: 'Etablissement'},
            {field: 'nombreJourConsacrePourCetteAnnee', header: 'Nombre jour consacre pour cette annee'},
            {field: 'commentaire', header: 'Commentaire'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'campagne?.libelle', header: 'Campagne'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }

    public async editEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire: EvaluationRechercheUniversitaireVo) {
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'edit');
        if (isPermistted) {
            this.evaluationRechercheUniversitaireService.findByIdWithAssociatedList(evaluationRechercheUniversitaire).subscribe(res => {
                this.selectedEvaluationRechercheUniversitaire = res;
                this.editEvaluationRechercheUniversitaireDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire: EvaluationRechercheUniversitaireVo) {
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'view');
        if (isPermistted) {
            this.evaluationRechercheUniversitaireService.findByIdWithAssociatedList(evaluationRechercheUniversitaire).subscribe(res => {
                this.selectedEvaluationRechercheUniversitaire = res;
                this.viewEvaluationRechercheUniversitaireDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEvaluationRechercheUniversitaire(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEvaluationRechercheUniversitaire = new EvaluationRechercheUniversitaireVo();
            this.createEvaluationRechercheUniversitaireDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire: EvaluationRechercheUniversitaireVo) {
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Evaluation recherche universitaire) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.evaluationRechercheUniversitaireService.delete(evaluationRechercheUniversitaire).subscribe(status => {
                        if (status > 0) {
                            const position = this.evaluationRechercheUniversitaires.indexOf(evaluationRechercheUniversitaire);
                            position > -1 ? this.evaluationRechercheUniversitaires.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Evaluation recherche universitaire Supprimé',
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

    public async loadTypeExpert() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.typeExpertService.findAll().subscribe(typeExperts => this.typeExperts = typeExperts, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadRoleEvaluationRechercheUniversitaire() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.roleEvaluationRechercheUniversitaireService.findAll().subscribe(roleEvaluationRechercheUniversitaires => this.roleEvaluationRechercheUniversitaires = roleEvaluationRechercheUniversitaires, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtablissement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationRechercheUniversitaire', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire: EvaluationRechercheUniversitaireVo) {

        this.evaluationRechercheUniversitaireService.findByIdWithAssociatedList(evaluationRechercheUniversitaire).subscribe(
            res => {
                this.initDuplicateEvaluationRechercheUniversitaire(res);
                this.selectedEvaluationRechercheUniversitaire = res;
                this.selectedEvaluationRechercheUniversitaire.id = null;
                this.createEvaluationRechercheUniversitaireDialog = true;

            });

    }

    initDuplicateEvaluationRechercheUniversitaire(res: EvaluationRechercheUniversitaireVo) {
        if (res.communauteSavoirEvaluationRechercheUniversitairesVo != null) {
            res.communauteSavoirEvaluationRechercheUniversitairesVo.forEach(d => {
                d.evaluationRechercheUniversitaireVo = null;
                d.id = null;
            });
        }
        if (res.disciplineScientifiqueEvaluationRechercheUniversitairesVo != null) {
            res.disciplineScientifiqueEvaluationRechercheUniversitairesVo.forEach(d => {
                d.evaluationRechercheUniversitaireVo = null;
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
                {header: 'Annee', dataKey: 'Annee'},
                {header: 'Type expert', dataKey: 'Type expert'},
                {header: 'Role evaluation recherche universitaire', dataKey: 'Role evaluation recherche universitaire'},
                {header: 'Pays', dataKey: 'Pays'},
                {header: 'Etablissement', dataKey: 'Etablissement'},
                {header: 'Nombre jour consacre pour cette annee', dataKey: 'Nombre jour consacre pour cette annee'},
                {header: 'Commentaire', dataKey: 'Commentaire'},
                {header: 'Chercheur', dataKey: 'Chercheur'},
                {header: 'Campagne', dataKey: 'Campagne'},
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
        this.exportData = this.evaluationRechercheUniversitaires.map(e => {
            return {
                'Annee': e.annee,
                'Type expert': e.typeExpertVo?.libelle,
                'Role evaluation recherche universitaire': e.roleEvaluationRechercheUniversitaireVo?.libelle,
                'Pays': e.paysVo?.libelle,
                'Etablissement': e.etablissementVo?.libelle,
                'Nombre jour consacre pour cette annee': e.nombreJourConsacrePourCetteAnnee,
                'Commentaire': e.commentaire,
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Campagne': e.campagneVo?.libelle,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get evaluationRechercheUniversitaires(): Array<EvaluationRechercheUniversitaireVo> {
        return this.evaluationRechercheUniversitaireService.evaluationRechercheUniversitaires;
    }

    set evaluationRechercheUniversitaires(value: Array<EvaluationRechercheUniversitaireVo>) {
        this.evaluationRechercheUniversitaireService.evaluationRechercheUniversitaires = value;
    }

    get evaluationRechercheUniversitaireSelections(): Array<EvaluationRechercheUniversitaireVo> {
        return this.evaluationRechercheUniversitaireService.evaluationRechercheUniversitaireSelections;
    }

    set evaluationRechercheUniversitaireSelections(value: Array<EvaluationRechercheUniversitaireVo>) {
        this.evaluationRechercheUniversitaireService.evaluationRechercheUniversitaireSelections = value;
    }


    get selectedEvaluationRechercheUniversitaire(): EvaluationRechercheUniversitaireVo {
        return this.evaluationRechercheUniversitaireService.selectedEvaluationRechercheUniversitaire;
    }

    set selectedEvaluationRechercheUniversitaire(value: EvaluationRechercheUniversitaireVo) {
        this.evaluationRechercheUniversitaireService.selectedEvaluationRechercheUniversitaire = value;
    }

    get createEvaluationRechercheUniversitaireDialog(): boolean {
        return this.evaluationRechercheUniversitaireService.createEvaluationRechercheUniversitaireDialog;
    }

    set createEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.evaluationRechercheUniversitaireService.createEvaluationRechercheUniversitaireDialog = value;
    }

    get editEvaluationRechercheUniversitaireDialog(): boolean {
        return this.evaluationRechercheUniversitaireService.editEvaluationRechercheUniversitaireDialog;
    }

    set editEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.evaluationRechercheUniversitaireService.editEvaluationRechercheUniversitaireDialog = value;
    }

    get viewEvaluationRechercheUniversitaireDialog(): boolean {
        return this.evaluationRechercheUniversitaireService.viewEvaluationRechercheUniversitaireDialog;
    }

    set viewEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.evaluationRechercheUniversitaireService.viewEvaluationRechercheUniversitaireDialog = value;
    }

    get searchEvaluationRechercheUniversitaire(): EvaluationRechercheUniversitaireVo {
        return this.evaluationRechercheUniversitaireService.searchEvaluationRechercheUniversitaire;
    }

    set searchEvaluationRechercheUniversitaire(value: EvaluationRechercheUniversitaireVo) {
        this.evaluationRechercheUniversitaireService.searchEvaluationRechercheUniversitaire = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
