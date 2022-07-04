import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleService} from 'src/app/controller/service/formulaire/VieInstitutionnelle.service';
import {VieInstitutionnelleVo} from 'src/app/controller/model/formulaire/VieInstitutionnelle.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
    selector: 'app-vie-institutionnelle-list-admin',
    templateUrl: './vie-institutionnelle-list-admin.component.html',
    styleUrls: ['./vie-institutionnelle-list-admin.component.css']
})
export class VieInstitutionnelleListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    criteriaData: any[] = [];
    exportData: any[] = [];
    fileName = 'VieInstitutionnelle';
    yesno: any[] = [];
    campagnes: Array<CampagneVo>;
    chercheurs: Array<ChercheurVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;


    constructor(private vieInstitutionnelleService: VieInstitutionnelleService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService
        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadVieInstitutionnelles();
        this.initExport();
        this.initCol();
        this.loadCampagne();
        this.loadChercheur();
        this.loadEtatEtapeCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods

    public async loadVieInstitutionnelles() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
        isPermistted ? this.vieInstitutionnelleService.findAll().subscribe(vieInstitutionnelles => this.vieInstitutionnelles = vieInstitutionnelles, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.vieInstitutionnelleService.findByCriteria(this.searchVieInstitutionnelle).subscribe(vieInstitutionnelles => {

            this.vieInstitutionnelles = vieInstitutionnelles;
            // this.searchVieInstitutionnelle = new VieInstitutionnelleVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'tempsEstime', header: 'Temps estime'},
            {field: 'campagne?.libelle', header: 'Campagne'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
            {field: 'annee', header: 'Annee'},
        ];
    }

    public async editVieInstitutionnelle(vieInstitutionnelle: VieInstitutionnelleVo) {
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'edit');
        if (isPermistted) {
            this.vieInstitutionnelleService.findByIdWithAssociatedList(vieInstitutionnelle).subscribe(res => {
                this.selectedVieInstitutionnelle = res;
                this.editVieInstitutionnelleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewVieInstitutionnelle(vieInstitutionnelle: VieInstitutionnelleVo) {
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'view');
        if (isPermistted) {
            this.vieInstitutionnelleService.findByIdWithAssociatedList(vieInstitutionnelle).subscribe(res => {
                this.selectedVieInstitutionnelle = res;
                this.viewVieInstitutionnelleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateVieInstitutionnelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();
            this.createVieInstitutionnelleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteVieInstitutionnelle(vieInstitutionnelle: VieInstitutionnelleVo) {
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Vie institutionnelle) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.vieInstitutionnelleService.delete(vieInstitutionnelle).subscribe(status => {
                        if (status > 0) {
                            const position = this.vieInstitutionnelles.indexOf(vieInstitutionnelle);
                            position > -1 ? this.vieInstitutionnelles.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Vie institutionnelle Supprimé',
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

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateVieInstitutionnelle(vieInstitutionnelle: VieInstitutionnelleVo) {

        this.vieInstitutionnelleService.findByIdWithAssociatedList(vieInstitutionnelle).subscribe(
            res => {
                this.initDuplicateVieInstitutionnelle(res);
                this.selectedVieInstitutionnelle = res;
                this.selectedVieInstitutionnelle.id = null;
                this.createVieInstitutionnelleDialog = true;

            });

    }

    initDuplicateVieInstitutionnelle(res: VieInstitutionnelleVo) {
        if (res.vieInstitutionnelleDetailsVo != null) {
            res.vieInstitutionnelleDetailsVo.forEach(d => {
                d.vieInstitutionnelleVo = null;
                d.id = null;
                d.vieInstitutionnelleDetailEtablissementsVo.forEach(etab => {
                    etab.id = null;
                });
                d.vieInstitutionnelleDetailInstrumentIrdsVo.forEach(instr => {
                    instr.id = null;
                });
            });
        }
    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.export('CSV');
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.export('XLS');
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.export('PDF');
                }
            }
        ];
    }

    export(type: string): void {
        if (type == 'XLS') {
            this.exportService.exportExcel(this.criteriaData, this.exportData, [], [], 'Distinctions', null, null, this.fileName);
        }
        if (type == 'PDF') {
            this.exportService.exportPdf(this.criteriaData, this.exportData, [], [], 'Distinctions', null, null, this.fileName);
        }
        if (type == 'CSV') {
            this.exportService.exportCSV(this.criteriaData, this.exportData, [], [], 'Distinctions', null, null);
        }
    }

    prepareColumnExport(): void {
        this.criteriaData = [{
            'Campagne': this.searchVieInstitutionnelle.campagneVo ? this.searchVieInstitutionnelle.campagneVo?.libelle : '-----',
            'Chercheur': this.searchVieInstitutionnelle.chercheurVo ? (this.searchVieInstitutionnelle.chercheurVo?.prenom + ' ' + this.searchVieInstitutionnelle.chercheurVo?.nom) : '-----',
            'Année min': this.searchVieInstitutionnelle.anneeMin ? this.searchVieInstitutionnelle.anneeMin : '-----',
            'Année max': this.searchVieInstitutionnelle.anneeMax ? this.searchVieInstitutionnelle.anneeMax : '-----',
        }];
        this.exportData = this.vieInstitutionnelles[0].vieInstitutionnelleDetailsVo.map(e => {
            let etablissements: string = '';
            let instruments: string = '';

            e.vieInstitutionnelleDetailEtablissementsVo?.forEach(v => {
                etablissements = v.etablissementVo?.libelle + ' ,' + etablissements;
            });
            e.vieInstitutionnelleDetailInstrumentIrdsVo?.forEach(v => {
                instruments = v.instrumentIrdVo?.libelle + ' ,' + instruments;
            });
            return {
                'Temps estime': this.vieInstitutionnelles[0].tempsEstime,
                'Campagne': this.vieInstitutionnelles[0].campagneVo?.libelle,
                'Chercheur': this.vieInstitutionnelles[0].chercheurVo?.nom + ' ' + this.vieInstitutionnelles[0].chercheurVo?.prenom,
                'Etat etape campagne': this.vieInstitutionnelles[0].campagneVo.etatCampagneVo?.libelle,
                'Annee': this.vieInstitutionnelles[0].campagneVo?.annee,
                'Libelle': e.libelle,
                'TYpe d\'instance': e.typeInstanceVo?.libelle,
                'Coorele structure ird': e.cooreleStructureIrd,
                'Structure IRD': e.structureIrdVo?.libelle,
                'Coorele Instrument ird': e.cooreleInstrumentIrd,
                'Instruments IRD': instruments,
                'Etablissments': etablissements
            };
        });
    }

    // getters and setters

    get vieInstitutionnelles(): Array<VieInstitutionnelleVo> {
        return this.vieInstitutionnelleService.vieInstitutionnelles;
    }

    set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelles = value;
    }

    get vieInstitutionnelleSelections(): Array<VieInstitutionnelleVo> {
        return this.vieInstitutionnelleService.vieInstitutionnelleSelections;
    }

    set vieInstitutionnelleSelections(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelleSelections = value;
    }

    get selectedVieInstitutionnelle(): VieInstitutionnelleVo {
        return this.vieInstitutionnelleService.selectedVieInstitutionnelle;
    }

    set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.selectedVieInstitutionnelle = value;
    }

    get createVieInstitutionnelleDialog(): boolean {
        return this.vieInstitutionnelleService.createVieInstitutionnelleDialog;
    }

    set createVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.createVieInstitutionnelleDialog = value;
    }

    get editVieInstitutionnelleDialog(): boolean {
        return this.vieInstitutionnelleService.editVieInstitutionnelleDialog;
    }

    set editVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.editVieInstitutionnelleDialog = value;
    }

    get viewVieInstitutionnelleDialog(): boolean {
        return this.vieInstitutionnelleService.viewVieInstitutionnelleDialog;
    }

    set viewVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.viewVieInstitutionnelleDialog = value;
    }

    get searchVieInstitutionnelle(): VieInstitutionnelleVo {
        return this.vieInstitutionnelleService.searchVieInstitutionnelle;
    }

    set searchVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.searchVieInstitutionnelle = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
