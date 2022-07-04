import {Component, OnInit} from '@angular/core';
import {
    ResponsabilitePedagogiqueEcoleDoctoraleService
} from 'src/app/controller/service/formulaire/ResponsabilitePedagogiqueEcoleDoctorale.service';
import {ResponsabilitePedagogiqueEcoleDoctoraleVo} from 'src/app/controller/model/formulaire/ResponsabilitePedagogiqueEcoleDoctorale.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {StatutEcoleDoctoraleService} from 'src/app/controller/service/formulaire/StatutEcoleDoctorale.service';
import {EcoleDoctoraleService} from 'src/app/controller/service/formulaire/EcoleDoctorale.service';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EcoleDoctoraleVo} from 'src/app/controller/model/formulaire/EcoleDoctorale.model';
import {StatutEcoleDoctoraleVo} from 'src/app/controller/model/referentiel/StatutEcoleDoctorale.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-responsabilite-pedagogique-ecole-doctorale-list-admin',
    templateUrl: './resp-ped-ecole-doctorale-list-admin.component.html',
    styleUrls: ['./resp-ped-ecole-doctorale-list-admin.component.css']
})
export class ResponsabilitePedagogiqueEcoleDoctoraleListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'ResponsabilitePedagogiqueEcoleDoctorale';
    yesno: any[] = [];
    statutEcoleDoctorales: Array<StatutEcoleDoctoraleVo>;
    ecoleDoctorales: Array<EcoleDoctoraleVo>;
    etablissements: Array<EtablissementVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;
    chercheurs: Array<ChercheurVo>;
    campagnes: Array<CampagneVo>;


    constructor(private responsabilitePedagogiqueEcoleDoctoraleService: ResponsabilitePedagogiqueEcoleDoctoraleService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private statutEcoleDoctoraleService: StatutEcoleDoctoraleService
        , private ecoleDoctoraleService: EcoleDoctoraleService
        , private etablissementService: EtablissementService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
    ) {
    }

    ngOnInit(): void {
        this.loadResponsabilitePedagogiqueEcoleDoctorales();
        this.initExport();
        this.initCol();
        this.loadStatutEcoleDoctorale();
        this.loadEcoleDoctorale();
        this.loadEtablissement();
        this.loadEtatEtapeCampagne();
        this.loadChercheur();
        this.loadCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadResponsabilitePedagogiqueEcoleDoctorales() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'list');
        isPermistted ? this.responsabilitePedagogiqueEcoleDoctoraleService.findAll().subscribe(responsabilitePedagogiqueEcoleDoctorales => this.responsabilitePedagogiqueEcoleDoctorales = responsabilitePedagogiqueEcoleDoctorales, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.responsabilitePedagogiqueEcoleDoctoraleService.findByCriteria(this.searchResponsabilitePedagogiqueEcoleDoctorale).subscribe(responsabilitePedagogiqueEcoleDoctorales => {

            this.responsabilitePedagogiqueEcoleDoctorales = responsabilitePedagogiqueEcoleDoctorales;
            // this.searchResponsabilitePedagogiqueEcoleDoctorale = new ResponsabilitePedagogiqueEcoleDoctoraleVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'annee', header: 'Annee'},
            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
            {field: 'statutEcoleDoctorale?.libelle', header: 'Statut ecole doctorale'},
            {field: 'appelServiceRenforcementCapaciteSud', header: 'Appel service renforcement capacite sud'},
            {field: 'ecoleDoctoraleInternational', header: 'Ecole doctorale international'},
            {field: 'ecoleDoctorale?.intitule', header: 'Ecole doctorale'},
            {field: 'etablissement?.libelle', header: 'Etablissement'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'campagne?.libelle', header: 'Campagne'},
        ];
    }

    public async editResponsabilitePedagogiqueEcoleDoctorale(responsabilitePedagogiqueEcoleDoctorale: ResponsabilitePedagogiqueEcoleDoctoraleVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'edit');
        if (isPermistted) {
            this.responsabilitePedagogiqueEcoleDoctoraleService.findByIdWithAssociatedList(responsabilitePedagogiqueEcoleDoctorale).subscribe(res => {
                this.selectedResponsabilitePedagogiqueEcoleDoctorale = res;
                this.editResponsabilitePedagogiqueEcoleDoctoraleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewResponsabilitePedagogiqueEcoleDoctorale(responsabilitePedagogiqueEcoleDoctorale: ResponsabilitePedagogiqueEcoleDoctoraleVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'view');
        if (isPermistted) {
            this.responsabilitePedagogiqueEcoleDoctoraleService.findByIdWithAssociatedList(responsabilitePedagogiqueEcoleDoctorale).subscribe(res => {
                this.selectedResponsabilitePedagogiqueEcoleDoctorale = res;
                this.viewResponsabilitePedagogiqueEcoleDoctoraleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateResponsabilitePedagogiqueEcoleDoctorale(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedResponsabilitePedagogiqueEcoleDoctorale = new ResponsabilitePedagogiqueEcoleDoctoraleVo();
            this.createResponsabilitePedagogiqueEcoleDoctoraleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteResponsabilitePedagogiqueEcoleDoctorale(responsabilitePedagogiqueEcoleDoctorale: ResponsabilitePedagogiqueEcoleDoctoraleVo) {
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Responsabilite pedagogique ecole doctorale) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.responsabilitePedagogiqueEcoleDoctoraleService.delete(responsabilitePedagogiqueEcoleDoctorale).subscribe(status => {
                        if (status > 0) {
                            const position = this.responsabilitePedagogiqueEcoleDoctorales.indexOf(responsabilitePedagogiqueEcoleDoctorale);
                            position > -1 ? this.responsabilitePedagogiqueEcoleDoctorales.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Responsabilite pedagogique ecole doctorale Supprimé',
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

    public async loadStatutEcoleDoctorale() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'list');
        isPermistted ? this.statutEcoleDoctoraleService.findAll().subscribe(statutEcoleDoctorales => this.statutEcoleDoctorales = statutEcoleDoctorales, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEcoleDoctorale() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'list');
        isPermistted ? this.ecoleDoctoraleService.findAll().subscribe(ecoleDoctorales => this.ecoleDoctorales = ecoleDoctorales, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtablissement() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'list');
        isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEcoleDoctorale', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateResponsabilitePedagogiqueEcoleDoctorale(responsabilitePedagogiqueEcoleDoctorale: ResponsabilitePedagogiqueEcoleDoctoraleVo) {

        this.responsabilitePedagogiqueEcoleDoctoraleService.findByIdWithAssociatedList(responsabilitePedagogiqueEcoleDoctorale).subscribe(
            res => {
                this.initDuplicateResponsabilitePedagogiqueEcoleDoctorale(res);
                this.selectedResponsabilitePedagogiqueEcoleDoctorale = res;
                this.selectedResponsabilitePedagogiqueEcoleDoctorale.id = null;
                this.createResponsabilitePedagogiqueEcoleDoctoraleDialog = true;

            });

    }

    initDuplicateResponsabilitePedagogiqueEcoleDoctorale(res: ResponsabilitePedagogiqueEcoleDoctoraleVo) {


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
                {header: 'Statut ecole doctorale', dataKey: 'Statut ecole doctorale'},
                {header: 'Appel service renforcement capacite sud', dataKey: 'Appel service renforcement capacite sud'},
                {header: 'Ecole doctorale international', dataKey: 'Ecole doctorale international'},
                {header: 'Ecole doctorale', dataKey: 'Ecole doctorale'},
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
        this.exportData = this.responsabilitePedagogiqueEcoleDoctorales.map(e => {
            return {
                'Annee': e.annee,
                'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne,
                'Statut ecole doctorale': e.statutEcoleDoctoraleVo?.libelle,
                'Appel service renforcement capacite sud': e.appelServiceRenforcementCapaciteSud,
                'Ecole doctorale international': e.ecoleDoctoraleInternational,
                'Ecole doctorale': e.ecoleDoctoraleVo?.intitule,
                'Etablissement': e.etablissementVo?.libelle,
                'Etat etape campagne': e.etatEtapeCampagneVo?.libelle,
                'Chercheur': e.chercheurVo?.numeroMatricule,
                'Campagne': e.campagneVo?.libelle,
            };
        });
    }

    // getters and setters

    get responsabilitePedagogiqueEcoleDoctorales(): Array<ResponsabilitePedagogiqueEcoleDoctoraleVo> {
        return this.responsabilitePedagogiqueEcoleDoctoraleService.responsabilitePedagogiqueEcoleDoctorales;
    }

    set responsabilitePedagogiqueEcoleDoctorales(value: Array<ResponsabilitePedagogiqueEcoleDoctoraleVo>) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.responsabilitePedagogiqueEcoleDoctorales = value;
    }

    get responsabilitePedagogiqueEcoleDoctoraleSelections(): Array<ResponsabilitePedagogiqueEcoleDoctoraleVo> {
        return this.responsabilitePedagogiqueEcoleDoctoraleService.responsabilitePedagogiqueEcoleDoctoraleSelections;
    }

    set responsabilitePedagogiqueEcoleDoctoraleSelections(value: Array<ResponsabilitePedagogiqueEcoleDoctoraleVo>) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.responsabilitePedagogiqueEcoleDoctoraleSelections = value;
    }


    get selectedResponsabilitePedagogiqueEcoleDoctorale(): ResponsabilitePedagogiqueEcoleDoctoraleVo {
        return this.responsabilitePedagogiqueEcoleDoctoraleService.selectedResponsabilitePedagogiqueEcoleDoctorale;
    }

    set selectedResponsabilitePedagogiqueEcoleDoctorale(value: ResponsabilitePedagogiqueEcoleDoctoraleVo) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.selectedResponsabilitePedagogiqueEcoleDoctorale = value;
    }

    get createResponsabilitePedagogiqueEcoleDoctoraleDialog(): boolean {
        return this.responsabilitePedagogiqueEcoleDoctoraleService.createResponsabilitePedagogiqueEcoleDoctoraleDialog;
    }

    set createResponsabilitePedagogiqueEcoleDoctoraleDialog(value: boolean) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.createResponsabilitePedagogiqueEcoleDoctoraleDialog = value;
    }

    get editResponsabilitePedagogiqueEcoleDoctoraleDialog(): boolean {
        return this.responsabilitePedagogiqueEcoleDoctoraleService.editResponsabilitePedagogiqueEcoleDoctoraleDialog;
    }

    set editResponsabilitePedagogiqueEcoleDoctoraleDialog(value: boolean) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.editResponsabilitePedagogiqueEcoleDoctoraleDialog = value;
    }

    get viewResponsabilitePedagogiqueEcoleDoctoraleDialog(): boolean {
        return this.responsabilitePedagogiqueEcoleDoctoraleService.viewResponsabilitePedagogiqueEcoleDoctoraleDialog;
    }

    set viewResponsabilitePedagogiqueEcoleDoctoraleDialog(value: boolean) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.viewResponsabilitePedagogiqueEcoleDoctoraleDialog = value;
    }

    get searchResponsabilitePedagogiqueEcoleDoctorale(): ResponsabilitePedagogiqueEcoleDoctoraleVo {
        return this.responsabilitePedagogiqueEcoleDoctoraleService.searchResponsabilitePedagogiqueEcoleDoctorale;
    }

    set searchResponsabilitePedagogiqueEcoleDoctorale(value: ResponsabilitePedagogiqueEcoleDoctoraleVo) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.searchResponsabilitePedagogiqueEcoleDoctorale = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
