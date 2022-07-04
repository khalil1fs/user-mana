import {Component, OnInit} from '@angular/core';
import {DistinctionService} from 'src/app/controller/service/formulaire/Distinction.service';
import {DistinctionVo} from 'src/app/controller/model/formulaire/Distinction.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {TypeParticipationService} from 'src/app/controller/service/referentiel/TypeParticipation.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {TypeParticipationVo} from 'src/app/controller/model/referentiel/TypeParticipation.model';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-distinction-list-admin',
    templateUrl: './distinction-list-admin.component.html',
    styleUrls: ['./distinction-list-admin.component.css']
})
export class DistinctionListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    criteriaData: any[] = [];
    exportData: any[] = [];
    fileName = 'Distinction';
    yesno: any[] = [];
    typeParticipations: Array<TypeParticipationVo>;
    payss: Array<PaysVo>;
    etatEtapeCampagnes: Array<EtatEtapeCampagneVo>;
    chercheurs: Array<ChercheurVo>;
    campagnes: Array<CampagneVo>;


    constructor(private distinctionService: DistinctionService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService
        , private typeParticipationService: TypeParticipationService
        , private paysService: PaysService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
        , private exportService: ExportService
        , private datepipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        this.loadDistinctions();
        this.initExport();
        this.initCol();
        this.loadTypeParticipation();
        this.loadPays();
        this.loadEtatEtapeCampagne();
        this.loadChercheur();
        this.loadCampagne();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadDistinctions() {
        const chercheur = this.authService.authenticatedUserByAdmin();
        await this.roleService.findAll();
        if (chercheur !== null) {
            const isPermistted = await this.roleService.isPermitted('Distinction', 'list');
            isPermistted ? this.distinctionService.findByChercheurId(chercheur.id).subscribe(distinctions => this.distinctions = distinctions, error => console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        } else {
            const isPermistted = await this.roleService.isPermitted('Distinction', 'list');
            isPermistted ? this.distinctionService.findAll().subscribe(distinctions => this.distinctions = distinctions, error => console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
    }


    public searchRequest() {
        this.distinctionService.findByCriteria(this.searchDistinction).subscribe(distinctions => {

            this.distinctions = distinctions;
            // this.searchDistinction = new DistinctionVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'dateObtention', header: 'Date d’obtention'},
            {field: 'intitule', header: 'Intitulé ou le nom'},
            {field: 'typeParticipation?.libelle', header: 'Type de titre'},
            {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
            {field: 'campagne?.libelle', header: 'Campagne'},
        ];
    }

    public async editDistinction(distinction: DistinctionVo) {
        const isPermistted = await this.roleService.isPermitted('Distinction', 'edit');
        if (isPermistted) {
            this.distinctionService.findByIdWithAssociatedList(distinction).subscribe(res => {
                this.selectedDistinction = res;
                this.selectedDistinction.dateObtention = new Date(distinction.dateObtention);
                this.typeParticipationService.selectedTypeParticipationCode = this.selectedDistinction.typeParticipationVo.code;
                this.editDistinctionDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }

    public async viewDistinction(distinction: DistinctionVo) {
        const isPermistted = await this.roleService.isPermitted('Distinction', 'view');
        if (isPermistted) {
            this.distinctionService.findByIdWithAssociatedList(distinction).subscribe(res => {
                this.selectedDistinction = res;
                this.selectedDistinction.dateObtention = new Date(distinction.dateObtention);
                this.typeParticipationService.selectedTypeParticipationCode = this.selectedDistinction.typeParticipationVo.code;
                this.viewDistinctionDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateDistinction(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedDistinction = new DistinctionVo();
            this.createDistinctionDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteDistinction(distinction: DistinctionVo) {
        const isPermistted = await this.roleService.isPermitted('Distinction', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Distinction) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.distinctionService.delete(distinction).subscribe(status => {
                        if (status > 0) {
                            const position = this.distinctions.indexOf(distinction);
                            position > -1 ? this.distinctions.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Distinction Supprimé',
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

    public async loadTypeParticipation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Distinction', 'list');
        isPermistted ? this.typeParticipationService.findAll().subscribe(typeParticipations => this.typeParticipations = typeParticipations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Distinction', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatEtapeCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Distinction', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadChercheur() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Distinction', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadCampagne() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Distinction', 'list');
        isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateDistinction(distinction: DistinctionVo) {

        this.distinctionService.findByIdWithAssociatedList(distinction).subscribe(
            res => {
                this.initDuplicateDistinction(res);
                this.selectedDistinction = res;
                if (res.dateObtention != null) {
                    this.selectedDistinction.dateObtention = new Date(res.dateObtention);
                }
                this.typeParticipationService.selectedTypeParticipationCode = this.selectedDistinction.typeParticipationVo.code;
                this.selectedDistinction.id = null;
                this.createDistinctionDialog = true;
            });

    }

    initDuplicateDistinction(res: DistinctionVo) {

        if (res.distinctionEtablissementPayssVo != null) {
            res.distinctionEtablissementPayssVo.forEach(d => {
                d.distinctionVo = null;
                d.id = null;
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

    prepareColumnExport(): void {
        this.criteriaData = [{
            'Campagne': this.searchDistinction.campagneVo ? this.searchDistinction.campagneVo?.libelle : '-----',
            'Chercheur': this.searchDistinction.chercheurVo ? (this.searchDistinction.chercheurVo?.prenom + ' ' + this.searchDistinction.chercheurVo?.nom) : '-----',
            'Date obtention min': this.searchDistinction.dateObtentionMin ? this.searchDistinction.dateObtentionMin : '-----',
            'Date obtention max': this.searchDistinction.dateObtentionMax ? this.searchDistinction.dateObtentionMax : '-----',
            'Intitule': this.searchDistinction.intitule ? this.searchDistinction.intitule : '-----',
            'Participation individuelle': this.searchDistinction.typeParticipationVo ? (this.searchDistinction.typeParticipationVo?.libelle) : '-----',
            'Etat de Saisie': this.searchDistinction.etatEtapeCampagneVo?.libelle ? this.searchDistinction.etatEtapeCampagneVo?.libelle : '-----',
        }];
        this.exportData = this.distinctions.map(e => {
            return {
                'Campagne': e.campagneVo?.libelle,
                'Chercheur': e.chercheurVo?.nom + ' ' + e.chercheurVo?.prenom,
                'Année': e.campagneVo?.annee,
                'Intitule': e.intitule,
                'Date obtention': this.datepipe.transform(e.dateObtention, 'dd/MM/YYYY'),
                'Participation Individuelle': e.typeParticipationVo?.libelle,
                'Pays': e.paysVo?.libelle,
                'Etat de Saisie': e.etatEtapeCampagneVo?.libelle
            };
        });
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

    // getters and setters

    get distinctions(): Array<DistinctionVo> {
        return this.distinctionService.distinctions;
    }

    set distinctions(value: Array<DistinctionVo>) {
        this.distinctionService.distinctions = value;
    }

    get distinctionSelections(): Array<DistinctionVo> {
        return this.distinctionService.distinctionSelections;
    }

    set distinctionSelections(value: Array<DistinctionVo>) {
        this.distinctionService.distinctionSelections = value;
    }

    get selectedDistinction(): DistinctionVo {
        return this.distinctionService.selectedDistinction;
    }

    set selectedDistinction(value: DistinctionVo) {
        this.distinctionService.selectedDistinction = value;
    }

    get createDistinctionDialog(): boolean {
        return this.distinctionService.createDistinctionDialog;
    }

    set createDistinctionDialog(value: boolean) {
        this.distinctionService.createDistinctionDialog = value;
    }

    get editDistinctionDialog(): boolean {
        return this.distinctionService.editDistinctionDialog;
    }

    set editDistinctionDialog(value: boolean) {
        this.distinctionService.editDistinctionDialog = value;
    }

    get viewDistinctionDialog(): boolean {
        return this.distinctionService.viewDistinctionDialog;
    }

    set viewDistinctionDialog(value: boolean) {
        this.distinctionService.viewDistinctionDialog = value;
    }

    get searchDistinction(): DistinctionVo {
        return this.distinctionService.searchDistinction;
    }

    set searchDistinction(value: DistinctionVo) {
        this.distinctionService.searchDistinction = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
