import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiqueService} from 'src/app/controller/service/formulaire/EvenementColloqueScienntifique.service';
import {EvenementColloqueScienntifiqueVo} from 'src/app/controller/model/formulaire/EvenementColloqueScienntifique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {ModaliteService} from 'src/app/controller/service/referentiel/Modalite.service';
import {ModaliteInterventionService} from 'src/app/controller/service/referentiel/ModaliteIntervention.service';
import {SavoirEtInnovationService} from 'src/app/controller/service/formulaire/SavoirEtInnovation.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {ModaliteVo} from 'src/app/controller/model/referentiel/Modalite.model';
import {SavoirEtInnovationVo} from 'src/app/controller/model/formulaire/SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {ModaliteInterventionVo} from 'src/app/controller/model/referentiel/ModaliteIntervention.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

@Component({
    selector: 'app-evenement-colloque-scienntifique-list-admin',
    templateUrl: './evm-colloque-sci-list-admin.component.html',
    styleUrls: ['./evm-colloque-sci-list-admin.component.css']
})
export class EvenementColloqueScienntifiqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'EvenementColloqueScienntifique';
    yesno: any[] = [];
    modalites: Array<ModaliteVo>;
    modaliteInterventions: Array<ModaliteInterventionVo>;
    savoirEtInnovations: Array<SavoirEtInnovationVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService
        , private modaliteService: ModaliteService
        , private modaliteInterventionService: ModaliteInterventionService
        , private savoirEtInnovationService: SavoirEtInnovationService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadEvenementColloqueScienntifiques();
        this.initExport();
        this.initCol();
        this.loadModalite();
        this.loadModaliteIntervention();
        this.loadSavoirEtInnovation();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadEvenementColloqueScienntifiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
        isPermistted ? this.evenementColloqueScienntifiqueService.findAll().subscribe(evenementColloqueScienntifiques => this.evenementColloqueScienntifiques = evenementColloqueScienntifiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.evenementColloqueScienntifiqueService.findByCriteria(this.searchEvenementColloqueScienntifique).subscribe(evenementColloqueScienntifiques => {

            this.evenementColloqueScienntifiques = evenementColloqueScienntifiques;
            // this.searchEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'intitule', header: 'Intitule'},
            {field: 'modalite?.libelle', header: 'Modalite'},
            {field: 'typeDeParticipation', header: 'Type de participation'},
            {field: 'dateEvenement', header: 'Date evenement'},
            {field: 'diplomatieStategique', header: 'Diplomatie stategique'},
            {field: 'modaliteIntervention?.libelle', header: 'Modalite intervention'},
            {field: 'volumeParticipant', header: 'Volume participant'},
            {field: 'savoirEtInnovation?.id', header: 'Savoir et innovation'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }

    public async editEvenementColloqueScienntifique(evenementColloqueScienntifique: EvenementColloqueScienntifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'edit');
        if (isPermistted) {
            this.evenementColloqueScienntifiqueService.findByIdWithAssociatedList(evenementColloqueScienntifique).subscribe(res => {
                this.selectedEvenementColloqueScienntifique = res;
                this.selectedEvenementColloqueScienntifique.dateEvenement = new Date(evenementColloqueScienntifique.dateEvenement);
                this.editEvenementColloqueScienntifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEvenementColloqueScienntifique(evenementColloqueScienntifique: EvenementColloqueScienntifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'view');
        if (isPermistted) {
            this.evenementColloqueScienntifiqueService.findByIdWithAssociatedList(evenementColloqueScienntifique).subscribe(res => {
                this.selectedEvenementColloqueScienntifique = res;
                this.selectedEvenementColloqueScienntifique.dateEvenement = new Date(evenementColloqueScienntifique.dateEvenement);
                this.viewEvenementColloqueScienntifiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEvenementColloqueScienntifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
            this.createEvenementColloqueScienntifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteEvenementColloqueScienntifique(evenementColloqueScienntifique: EvenementColloqueScienntifiqueVo) {
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Evenement colloque scienntifique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.evenementColloqueScienntifiqueService.delete(evenementColloqueScienntifique).subscribe(status => {
                        if (status > 0) {
                            const position = this.evenementColloqueScienntifiques.indexOf(evenementColloqueScienntifique);
                            position > -1 ? this.evenementColloqueScienntifiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Evenement colloque scienntifique Supprimé',
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

    public async loadModalite() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
        isPermistted ? this.modaliteService.findAll().subscribe(modalites => this.modalites = modalites, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadModaliteIntervention() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
        isPermistted ? this.modaliteInterventionService.findAll().subscribe(modaliteInterventions => this.modaliteInterventions = modaliteInterventions, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadSavoirEtInnovation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
        isPermistted ? this.savoirEtInnovationService.findAll().subscribe(savoirEtInnovations => this.savoirEtInnovations = savoirEtInnovations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateEvenementColloqueScienntifique(evenementColloqueScienntifique: EvenementColloqueScienntifiqueVo) {

        this.evenementColloqueScienntifiqueService.findByIdWithAssociatedList(evenementColloqueScienntifique).subscribe(
            res => {
                this.initDuplicateEvenementColloqueScienntifique(res);
                this.selectedEvenementColloqueScienntifique = res;
                this.selectedEvenementColloqueScienntifique.id = null;
                this.createEvenementColloqueScienntifiqueDialog = true;

            });

    }

    initDuplicateEvenementColloqueScienntifique(res: EvenementColloqueScienntifiqueVo) {
        if (res.evenementColloqueScienntifiqueEnjeuxIrdsVo != null) {
            res.evenementColloqueScienntifiqueEnjeuxIrdsVo.forEach(d => {
                d.evenementColloqueScienntifiqueVo = null;
                d.id = null;
            });
        }
        if (res.communauteSavoirEvenementColloqueScientifiquesVo != null) {
            res.communauteSavoirEvenementColloqueScientifiquesVo.forEach(d => {
                d.evenementColloqueScienntifiqueVo = null;
                d.id = null;
            });
        }
        if (res.disciplineScientifiqueEvenementColloqueScientifiquesVo != null) {
            res.disciplineScientifiqueEvenementColloqueScientifiquesVo.forEach(d => {
                d.evenementColloqueScienntifiqueVo = null;
                d.id = null;
            });
        }
        if (res.evenementColloqueScienntifiquePayssVo != null) {
            res.evenementColloqueScienntifiquePayssVo.forEach(d => {
                d.evenementColloqueScienntifiqueVo = null;
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
                {header: 'Intitule', dataKey: 'Intitule'},
                {header: 'Modalite', dataKey: 'Modalite'},
                {header: 'Type de participation', dataKey: 'Type de participation'},
                {header: 'Date evenement', dataKey: 'Date evenement'},
                {header: 'Diplomatie stategique', dataKey: 'Diplomatie stategique'},
                {header: 'Modalite intervention', dataKey: 'Modalite intervention'},
                {header: 'Volume participant', dataKey: 'Volume participant'},
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
        this.exportData = this.evenementColloqueScienntifiques.map(e => {
            return {
                'Intitule': e.intitule,
                'Modalite': e.modaliteVo?.libelle,
                'Type de participation': e.typeDeParticipation,
                'Date evenement': e.dateEvenement,
                'Diplomatie stategique': e.diplomatieStategique,
                'Modalite intervention': e.modaliteInterventionVo?.libelle,
                'Volume participant': e.volumeParticipant,
                'Savoir et innovation': e.savoirEtInnovationVo?.id,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
        return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
    }

    set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
    }

    get evenementColloqueScienntifiqueSelections(): Array<EvenementColloqueScienntifiqueVo> {
        return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiqueSelections;
    }

    set evenementColloqueScienntifiqueSelections(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiqueSelections = value;
    }


    get selectedEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
        return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
    }

    set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
    }

    get createEvenementColloqueScienntifiqueDialog(): boolean {
        return this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog;
    }

    set createEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog = value;
    }

    get editEvenementColloqueScienntifiqueDialog(): boolean {
        return this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog;
    }

    set editEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog = value;
    }

    get viewEvenementColloqueScienntifiqueDialog(): boolean {
        return this.evenementColloqueScienntifiqueService.viewEvenementColloqueScienntifiqueDialog;
    }

    set viewEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.viewEvenementColloqueScienntifiqueDialog = value;
    }

    get searchEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
        return this.evenementColloqueScienntifiqueService.searchEvenementColloqueScienntifique;
    }

    set searchEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.searchEvenementColloqueScienntifique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
