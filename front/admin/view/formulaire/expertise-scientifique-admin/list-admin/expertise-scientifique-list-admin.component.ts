import {Component, OnInit} from '@angular/core';
import {ExpertiseScientifiqueService} from 'src/app/controller/service/formulaire/ExpertiseScientifique.service';
import {ExpertiseScientifiqueVo} from 'src/app/controller/model/formulaire/ExpertiseScientifique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {TypeExpertiseService} from 'src/app/controller/service/referentiel/TypeExpertise.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {TypeExpertiseVo} from 'src/app/controller/model/referentiel/TypeExpertise.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-expertise-scientifique-list-admin',
    templateUrl: './expertise-scientifique-list-admin.component.html',
    styleUrls: ['./expertise-scientifique-list-admin.component.css']
})
export class ExpertiseScientifiqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'ExpertiseScientifique';
    yesno: any[] = [];
    typeExpertises: Array<TypeExpertiseVo>;
    payss: Array<PaysVo>;
    etablissements: Array<EtablissementVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;
    chercheurs: Array<ChercheurVo>;
    campagnes: Array<CampagneVo>;


    constructor(private expertiseScientifiqueService: ExpertiseScientifiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private typeExpertiseService: TypeExpertiseService
        , private paysService: PaysService
        , private etablissementService: EtablissementService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadExpertiseScientifiques();
        this.initExport();
        this.initCol();
        this.loadTypeExpertise();
        this.loadPays();
        this.loadEtablissement();
        this.loadEtatEtapeCampagne();
        this.loadChercheur();
        this.loadCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadExpertiseScientifiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
        isPermistted ? this.expertiseScientifiqueService.findAll().subscribe(expertiseScientifiques => this.expertiseScientifiques = expertiseScientifiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.expertiseScientifiqueService.findByCriteria(this.searchExpertiseScientifique).subscribe(expertiseScientifiques => {

            this.expertiseScientifiques = expertiseScientifiques;
            // this.searchExpertiseScientifique = new ExpertiseScientifiqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'annee', header: 'Annee'},
            {field: 'intitule', header: 'Intitule'},
            {field: 'typeExpertise?.libelle', header: 'Type expertise'},
            {field: 'nombreJourConsacrePourCetteAnnee', header: 'Nombre jour consacre pour cette annee'},
            {field: 'periodeRemiseRapportMois', header: 'Periode remise rapport mois'},
            {field: 'periodeRemiseRapportAnnee', header: 'Periode remise rapport annee'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'etablissement?.libelle', header: 'Etablissement'},
            {field: 'commentairesEventuels', header: 'Commentaires eventuels'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'campagne?.libelle', header: 'Campagne'},
        ];
    }

    public async editExpertiseScientifique(expertiseScientifique: ExpertiseScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'edit');
        if (isPermistted) {
            this.expertiseScientifiqueService.findByIdWithAssociatedList(expertiseScientifique).subscribe(res => {
                this.selectedExpertiseScientifique = res;
                this.editExpertiseScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewExpertiseScientifique(expertiseScientifique: ExpertiseScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'view');
        if (isPermistted) {
            this.expertiseScientifiqueService.findByIdWithAssociatedList(expertiseScientifique).subscribe(res => {
                this.selectedExpertiseScientifique = res;
                this.viewExpertiseScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateExpertiseScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedExpertiseScientifique = new ExpertiseScientifiqueVo();
            this.createExpertiseScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteExpertiseScientifique(expertiseScientifique: ExpertiseScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Expertise scientifique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.expertiseScientifiqueService.delete(expertiseScientifique).subscribe(status => {
                        if (status > 0) {
                            const position = this.expertiseScientifiques.indexOf(expertiseScientifique);
                            position > -1 ? this.expertiseScientifiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Expertise scientifique Supprimé',
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

    public async loadTypeExpertise() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
        isPermistted ? this.typeExpertiseService.findAll().subscribe(typeExpertises => this.typeExpertises = typeExpertises, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtablissement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
        isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateExpertiseScientifique(expertiseScientifique: ExpertiseScientifiqueVo) {

        this.expertiseScientifiqueService.findByIdWithAssociatedList(expertiseScientifique).subscribe(
            res => {
                this.initDuplicateExpertiseScientifique(res);
                this.selectedExpertiseScientifique = res;
                this.selectedExpertiseScientifique.id = null;
                this.createExpertiseScientifiqueDialog = true;

            });

    }

    initDuplicateExpertiseScientifique(res: ExpertiseScientifiqueVo) {
        if (res.communauteSavoirExpertiseScientifiquesVo != null) {
            res.communauteSavoirExpertiseScientifiquesVo.forEach(d => {
                d.expertiseScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.disciplineScientifiqueExpertiseScientifiquesVo != null) {
            res.disciplineScientifiqueExpertiseScientifiquesVo.forEach(d => {
                d.expertiseScientifiqueVo = null;
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
                {header: 'Intitule', dataKey: 'Intitule'},
                {header: 'Type expertise', dataKey: 'Type expertise'},
                {header: 'Nombre jour consacre pour cette annee', dataKey: 'Nombre jour consacre pour cette annee'},
                {header: 'Periode remise rapport mois', dataKey: 'Periode remise rapport mois'},
                {header: 'Periode remise rapport annee', dataKey: 'Periode remise rapport annee'},
                {header: 'Pays', dataKey: 'Pays'},
                {header: 'Etablissement', dataKey: 'Etablissement'},
                {header: 'Commentaires eventuels', dataKey: 'Commentaires eventuels'},
                {header: 'Etat etape campagne', dataKey: 'Etat etape campagne'},
                {header: 'Chercheur', dataKey: 'Chercheur'},
                {header: 'Campagne', dataKey: 'Campagne'},
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
        this.exportData = this.expertiseScientifiques.map(e => {
            return {
                'Annee': e.annee,
                'Intitule': e.intitule,
                'Type expertise': e.typeExpertiseVo?.libelle,
                'Nombre jour consacre pour cette annee': e.nombreJourConsacrePourCetteAnnee,
                'Periode remise rapport mois': e.periodeRemiseRapportMois,
                'Periode remise rapport annee': e.periodeRemiseRapportAnnee,
                'Pays': e.paysVo?.libelle,
                'Etablissement': e.etablissementVo?.libelle,
                'Commentaires eventuels': e.commentairesEventuels,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Campagne': e.campagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get expertiseScientifiques(): Array<ExpertiseScientifiqueVo> {
        return this.expertiseScientifiqueService.expertiseScientifiques;
    }

    set expertiseScientifiques(value: Array<ExpertiseScientifiqueVo>) {
        this.expertiseScientifiqueService.expertiseScientifiques = value;
    }

    get expertiseScientifiqueSelections(): Array<ExpertiseScientifiqueVo> {
        return this.expertiseScientifiqueService.expertiseScientifiqueSelections;
    }

    set expertiseScientifiqueSelections(value: Array<ExpertiseScientifiqueVo>) {
        this.expertiseScientifiqueService.expertiseScientifiqueSelections = value;
    }


    get selectedExpertiseScientifique(): ExpertiseScientifiqueVo {
        return this.expertiseScientifiqueService.selectedExpertiseScientifique;
    }

    set selectedExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this.expertiseScientifiqueService.selectedExpertiseScientifique = value;
    }

    get createExpertiseScientifiqueDialog(): boolean {
        return this.expertiseScientifiqueService.createExpertiseScientifiqueDialog;
    }

    set createExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.createExpertiseScientifiqueDialog = value;
    }

    get editExpertiseScientifiqueDialog(): boolean {
        return this.expertiseScientifiqueService.editExpertiseScientifiqueDialog;
    }

    set editExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.editExpertiseScientifiqueDialog = value;
    }

    get viewExpertiseScientifiqueDialog(): boolean {
        return this.expertiseScientifiqueService.viewExpertiseScientifiqueDialog;
    }

    set viewExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.viewExpertiseScientifiqueDialog = value;
    }

    get searchExpertiseScientifique(): ExpertiseScientifiqueVo {
        return this.expertiseScientifiqueService.searchExpertiseScientifique;
    }

    set searchExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this.expertiseScientifiqueService.searchExpertiseScientifique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
