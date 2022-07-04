import {Component, OnInit} from '@angular/core';
import {ConseilEtComiteScientifiqueService} from 'src/app/controller/service/formulaire/ConseilEtComiteScientifique.service';
import {ConseilEtComiteScientifiqueVo} from 'src/app/controller/model/formulaire/ConseilEtComiteScientifique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-conseil-et-comite-scientifique-list-admin',
    templateUrl: './conseil-comite-sci-list-admin.component.html',
    styleUrls: ['./conseil-comite-sci-list-admin.component.css']
})
export class ConseilEtComiteScientifiqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'ConseilEtComiteScientifique';
    yesno: any[] = [];
    payss: Array<PaysVo>;
    etablissements: Array<EtablissementVo>;
    chercheurs: Array<ChercheurVo>;
    campagnes: Array<CampagneVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private conseilEtComiteScientifiqueService: ConseilEtComiteScientifiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private paysService: PaysService
        , private etablissementService: EtablissementService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadConseilEtComiteScientifiques();
        this.initExport();
        this.initCol();
        this.loadPays();
        this.loadEtablissement();
        this.loadChercheur();
        this.loadCampagne();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadConseilEtComiteScientifiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
        isPermistted ? this.conseilEtComiteScientifiqueService.findAll().subscribe(conseilEtComiteScientifiques => this.conseilEtComiteScientifiques = conseilEtComiteScientifiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.conseilEtComiteScientifiqueService.findByCriteria(this.searchConseilEtComiteScientifique).subscribe(conseilEtComiteScientifiques => {

            this.conseilEtComiteScientifiques = conseilEtComiteScientifiques;
            // this.searchConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'annee', header: 'Annee'},
            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
            {field: 'intitule', header: 'Intitule'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'etablissement?.libelle', header: 'Etablissement'},
            {field: 'nombreJoursParAnnee', header: 'Nombre jours par annee'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'campagne?.libelle', header: 'Campagne'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }

    public async editConseilEtComiteScientifique(conseilEtComiteScientifique: ConseilEtComiteScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'edit');
        if (isPermistted) {
            this.conseilEtComiteScientifiqueService.findByIdWithAssociatedList(conseilEtComiteScientifique).subscribe(res => {
                this.selectedConseilEtComiteScientifique = res;
                this.editConseilEtComiteScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewConseilEtComiteScientifique(conseilEtComiteScientifique: ConseilEtComiteScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'view');
        if (isPermistted) {
            this.conseilEtComiteScientifiqueService.findByIdWithAssociatedList(conseilEtComiteScientifique).subscribe(res => {
                this.selectedConseilEtComiteScientifique = res;
                this.viewConseilEtComiteScientifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateConseilEtComiteScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
            this.createConseilEtComiteScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteConseilEtComiteScientifique(conseilEtComiteScientifique: ConseilEtComiteScientifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Conseil et comite scientifique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.conseilEtComiteScientifiqueService.delete(conseilEtComiteScientifique).subscribe(status => {
                        if (status > 0) {
                            const position = this.conseilEtComiteScientifiques.indexOf(conseilEtComiteScientifique);
                            position > -1 ? this.conseilEtComiteScientifiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Conseil et comite scientifique Supprimé',
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
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtablissement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
        isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateConseilEtComiteScientifique(conseilEtComiteScientifique: ConseilEtComiteScientifiqueVo) {

        this.conseilEtComiteScientifiqueService.findByIdWithAssociatedList(conseilEtComiteScientifique).subscribe(
            res => {
                this.initDuplicateConseilEtComiteScientifique(res);
                this.selectedConseilEtComiteScientifique = res;
                this.selectedConseilEtComiteScientifique.id = null;
                this.createConseilEtComiteScientifiqueDialog = true;

            });

    }

    initDuplicateConseilEtComiteScientifique(res: ConseilEtComiteScientifiqueVo) {
        if (res.communauteSavoirConseilEtComiteScientifiquesVo != null) {
            res.communauteSavoirConseilEtComiteScientifiquesVo.forEach(d => {
                d.conseilEtComiteScientifiqueVo = null;
                d.id = null;
            });
        }
        if (res.disciplineScientifiqueConseilEtComiteScientifiquesVo != null) {
            res.disciplineScientifiqueConseilEtComiteScientifiquesVo.forEach(d => {
                d.conseilEtComiteScientifiqueVo = null;
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
                {header: 'Temps estime pour cette annne', dataKey: 'Temps estime pour cette annne'},
                {header: 'Intitule', dataKey: 'Intitule'},
                {header: 'Pays', dataKey: 'Pays'},
                {header: 'Etablissement', dataKey: 'Etablissement'},
                {header: 'Nombre jours par annee', dataKey: 'Nombre jours par annee'},
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
        this.exportData = this.conseilEtComiteScientifiques.map(e => {
            return {
                'Annee': e.annee,
                'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne,
                'Intitule': e.intitule,
                'Pays': e.paysVo?.libelle,
                'Etablissement': e.etablissementVo?.libelle,
                'Nombre jours par annee': e.nombreJoursParAnnee,
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Campagne': e.campagneVo?.libelle,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get conseilEtComiteScientifiques(): Array<ConseilEtComiteScientifiqueVo> {
        return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques;
    }

    set conseilEtComiteScientifiques(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques = value;
    }

    get conseilEtComiteScientifiqueSelections(): Array<ConseilEtComiteScientifiqueVo> {
        return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiqueSelections;
    }

    set conseilEtComiteScientifiqueSelections(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiqueSelections = value;
    }


    get selectedConseilEtComiteScientifique(): ConseilEtComiteScientifiqueVo {
        return this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique;
    }

    set selectedConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique = value;
    }

    get createConseilEtComiteScientifiqueDialog(): boolean {
        return this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog;
    }

    set createConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog = value;
    }

    get editConseilEtComiteScientifiqueDialog(): boolean {
        return this.conseilEtComiteScientifiqueService.editConseilEtComiteScientifiqueDialog;
    }

    set editConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.editConseilEtComiteScientifiqueDialog = value;
    }

    get viewConseilEtComiteScientifiqueDialog(): boolean {
        return this.conseilEtComiteScientifiqueService.viewConseilEtComiteScientifiqueDialog;
    }

    set viewConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.viewConseilEtComiteScientifiqueDialog = value;
    }

    get searchConseilEtComiteScientifique(): ConseilEtComiteScientifiqueVo {
        return this.conseilEtComiteScientifiqueService.searchConseilEtComiteScientifique;
    }

    set searchConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.searchConseilEtComiteScientifique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
