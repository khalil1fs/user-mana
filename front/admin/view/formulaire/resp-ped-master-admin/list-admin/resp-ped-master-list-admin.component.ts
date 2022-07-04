import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueMasterService} from 'src/app/controller/service/formulaire/ResponsabilitePedagogiqueMaster.service';
import {ResponsabilitePedagogiqueMasterVo} from 'src/app/controller/model/formulaire/ResponsabilitePedagogiqueMaster.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {StatutMasterService} from 'src/app/controller/service/referentiel/StatutMaster.service';
import {MasterService} from 'src/app/controller/service/referentiel/Master.service';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {MasterVo} from 'src/app/controller/model/referentiel/Master.model';
import {StatutMasterVo} from 'src/app/controller/model/referentiel/StatutMaster.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-responsabilite-pedagogique-master-list-admin',
    templateUrl: './resp-ped-master-list-admin.component.html',
    styleUrls: ['./resp-ped-master-list-admin.component.css']
})
export class ResponsabilitePedagogiqueMasterListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'ResponsabilitePedagogiqueMaster';
    yesno: any[] = [];
    statutMasters: Array<StatutMasterVo>;
    masters: Array<MasterVo>;
    etablissements: Array<EtablissementVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;
    chercheurs: Array<ChercheurVo>;
    campagnes: Array<CampagneVo>;


    constructor(private responsabilitePedagogiqueMasterService: ResponsabilitePedagogiqueMasterService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private statutMasterService: StatutMasterService
        , private masterService: MasterService
        , private etablissementService: EtablissementService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadResponsabilitePedagogiqueMasters();
        this.initExport();
        this.initCol();
        this.loadStatutMaster();
        this.loadMaster();
        this.loadEtablissement();
        this.loadEtatEtapeCampagne();
        this.loadChercheur();
        this.loadCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadResponsabilitePedagogiqueMasters() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'list');
        isPermistted ? this.responsabilitePedagogiqueMasterService.findAll().subscribe(responsabilitePedagogiqueMasters => this.responsabilitePedagogiqueMasters = responsabilitePedagogiqueMasters, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.responsabilitePedagogiqueMasterService.findByCriteria(this.searchResponsabilitePedagogiqueMaster).subscribe(responsabilitePedagogiqueMasters => {

            this.responsabilitePedagogiqueMasters = responsabilitePedagogiqueMasters;
            // this.searchResponsabilitePedagogiqueMaster = new ResponsabilitePedagogiqueMasterVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'annee', header: 'Annee'},
            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
            {field: 'statutMaster?.libelle', header: 'Statut master'},
            {field: 'appelServiceRenforcementCapaciteSud', header: 'Appel service renforcement capacite sud'},
            {field: 'masterInternational', header: 'Master international'},
            {field: 'master?.intitule', header: 'Master'},
            {field: 'etablissement?.libelle', header: 'Etablissement'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'campagne?.libelle', header: 'Campagne'},
        ];
    }

    public async editResponsabilitePedagogiqueMaster(responsabilitePedagogiqueMaster: ResponsabilitePedagogiqueMasterVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'edit');
        if (isPermistted) {
            this.responsabilitePedagogiqueMasterService.findByIdWithAssociatedList(responsabilitePedagogiqueMaster).subscribe(res => {
                this.selectedResponsabilitePedagogiqueMaster = res;
                this.editResponsabilitePedagogiqueMasterDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewResponsabilitePedagogiqueMaster(responsabilitePedagogiqueMaster: ResponsabilitePedagogiqueMasterVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'view');
        if (isPermistted) {
            this.responsabilitePedagogiqueMasterService.findByIdWithAssociatedList(responsabilitePedagogiqueMaster).subscribe(res => {
                this.selectedResponsabilitePedagogiqueMaster = res;
                this.viewResponsabilitePedagogiqueMasterDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateResponsabilitePedagogiqueMaster(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedResponsabilitePedagogiqueMaster = new ResponsabilitePedagogiqueMasterVo();
            this.createResponsabilitePedagogiqueMasterDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteResponsabilitePedagogiqueMaster(responsabilitePedagogiqueMaster: ResponsabilitePedagogiqueMasterVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Responsabilite pedagogique master) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.responsabilitePedagogiqueMasterService.delete(responsabilitePedagogiqueMaster).subscribe(status => {
                        if (status > 0) {
                            const position = this.responsabilitePedagogiqueMasters.indexOf(responsabilitePedagogiqueMaster);
                            position > -1 ? this.responsabilitePedagogiqueMasters.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Responsabilite pedagogique master Supprimé',
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

    public async loadStatutMaster() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'list');
        isPermistted ? this.statutMasterService.findAll().subscribe(statutMasters => this.statutMasters = statutMasters, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadMaster() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'list');
        isPermistted ? this.masterService.findAll().subscribe(masters => this.masters = masters, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtablissement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'list');
        isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueMaster', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateResponsabilitePedagogiqueMaster(responsabilitePedagogiqueMaster: ResponsabilitePedagogiqueMasterVo) {

        this.responsabilitePedagogiqueMasterService.findByIdWithAssociatedList(responsabilitePedagogiqueMaster).subscribe(
            res => {
                this.initDuplicateResponsabilitePedagogiqueMaster(res);
                this.selectedResponsabilitePedagogiqueMaster = res;
                this.selectedResponsabilitePedagogiqueMaster.id = null;
                this.createResponsabilitePedagogiqueMasterDialog = true;

            });

    }

    initDuplicateResponsabilitePedagogiqueMaster(res: ResponsabilitePedagogiqueMasterVo) {


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
                {header: 'Statut master', dataKey: 'Statut master'},
                {header: 'Appel service renforcement capacite sud', dataKey: 'Appel service renforcement capacite sud'},
                {header: 'Master international', dataKey: 'Master international'},
                {header: 'Master', dataKey: 'Master'},
                {header: 'Etablissement', dataKey: 'Etablissement'},
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
        this.exportData = this.responsabilitePedagogiqueMasters.map(e => {
            return {
                'Annee': e.annee,
                'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne,
                'Statut master': e.statutMasterVo?.libelle,
                'Appel service renforcement capacite sud': e.appelServiceRenforcementCapaciteSud,
                'Master international': e.masterInternational,
                'Master': e.masterVo?.intitule,
                'Etablissement': e.etablissementVo?.libelle,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Campagne': e.campagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get responsabilitePedagogiqueMasters(): Array<ResponsabilitePedagogiqueMasterVo> {
        return this.responsabilitePedagogiqueMasterService.responsabilitePedagogiqueMasters;
    }

    set responsabilitePedagogiqueMasters(value: Array<ResponsabilitePedagogiqueMasterVo>) {
        this.responsabilitePedagogiqueMasterService.responsabilitePedagogiqueMasters = value;
    }

    get responsabilitePedagogiqueMasterSelections(): Array<ResponsabilitePedagogiqueMasterVo> {
        return this.responsabilitePedagogiqueMasterService.responsabilitePedagogiqueMasterSelections;
    }

    set responsabilitePedagogiqueMasterSelections(value: Array<ResponsabilitePedagogiqueMasterVo>) {
        this.responsabilitePedagogiqueMasterService.responsabilitePedagogiqueMasterSelections = value;
    }


    get selectedResponsabilitePedagogiqueMaster(): ResponsabilitePedagogiqueMasterVo {
        return this.responsabilitePedagogiqueMasterService.selectedResponsabilitePedagogiqueMaster;
    }

    set selectedResponsabilitePedagogiqueMaster(value: ResponsabilitePedagogiqueMasterVo) {
        this.responsabilitePedagogiqueMasterService.selectedResponsabilitePedagogiqueMaster = value;
    }

    get createResponsabilitePedagogiqueMasterDialog(): boolean {
        return this.responsabilitePedagogiqueMasterService.createResponsabilitePedagogiqueMasterDialog;
    }

    set createResponsabilitePedagogiqueMasterDialog(value: boolean) {
        this.responsabilitePedagogiqueMasterService.createResponsabilitePedagogiqueMasterDialog = value;
    }

    get editResponsabilitePedagogiqueMasterDialog(): boolean {
        return this.responsabilitePedagogiqueMasterService.editResponsabilitePedagogiqueMasterDialog;
    }

    set editResponsabilitePedagogiqueMasterDialog(value: boolean) {
        this.responsabilitePedagogiqueMasterService.editResponsabilitePedagogiqueMasterDialog = value;
    }

    get viewResponsabilitePedagogiqueMasterDialog(): boolean {
        return this.responsabilitePedagogiqueMasterService.viewResponsabilitePedagogiqueMasterDialog;
    }

    set viewResponsabilitePedagogiqueMasterDialog(value: boolean) {
        this.responsabilitePedagogiqueMasterService.viewResponsabilitePedagogiqueMasterDialog = value;
    }

    get searchResponsabilitePedagogiqueMaster(): ResponsabilitePedagogiqueMasterVo {
        return this.responsabilitePedagogiqueMasterService.searchResponsabilitePedagogiqueMaster;
    }

    set searchResponsabilitePedagogiqueMaster(value: ResponsabilitePedagogiqueMasterVo) {
        this.responsabilitePedagogiqueMasterService.searchResponsabilitePedagogiqueMaster = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
