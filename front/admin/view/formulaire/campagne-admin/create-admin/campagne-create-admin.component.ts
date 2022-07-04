import { Component, OnInit, Input } from '@angular/core';
import { CampagneService } from 'src/app/controller/service/formulaire/Campagne.service';
import { CampagneVo } from 'src/app/controller/model/formulaire/Campagne.model';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';


import { EtatCampagneChercheurVo } from 'src/app/controller/model/config/EtatCampagneChercheur.model';
import { EtatCampagneChercheurService } from 'src/app/controller/service/config/EtatCampagneChercheur.service';
import { EtatCampagneVo } from 'src/app/controller/model/config/EtatCampagne.model';
import { EtatCampagneService } from 'src/app/controller/service/config/EtatCampagne.service';
import { TemplateClotureVo } from 'src/app/controller/model/referentiel/TemplateCloture.model';
import { TemplateClotureService } from 'src/app/controller/service/referentiel/TemplateCloture.service';
import { TemplateRappelVo } from 'src/app/controller/model/referentiel/TemplateRappel.model';
import { TemplateRappelService } from 'src/app/controller/service/referentiel/TemplateRappel.service';
import { ChercheurVo } from 'src/app/controller/model/formulaire/Chercheur.model';
import { ChercheurService } from 'src/app/controller/service/formulaire/Chercheur.service';
import { TemplateOuvertureVo } from 'src/app/controller/model/referentiel/TemplateOuverture.model';
import { TemplateOuvertureService } from 'src/app/controller/service/referentiel/TemplateOuverture.service';
import { TemplateRelanceVo } from 'src/app/controller/model/referentiel/TemplateRelance.model';
import { TemplateRelanceService } from 'src/app/controller/service/referentiel/TemplateRelance.service';
import { CampagneChercheurVo } from 'src/app/controller/model/formulaire/CampagneChercheur.model';
import { CampagneChercheurService } from 'src/app/controller/service/formulaire/CampagneChercheur.service';
import { DateUtils } from 'src/app/utils/DateUtils';
import { CampagneChercheurOuvertureService } from 'src/app/controller/service/formulaire/CampagneChercheurOuverture.service';
import { CampagneChercheurOuvertureVo } from 'src/app/controller/model/formulaire/CampagneChercheurOuverture.model';
import { CampagneRelanceChercheurVo } from 'src/app/controller/model/formulaire/CampagneRelanceChercheur.model';
import { CampagneRelanceChercheurService } from 'src/app/controller/service/formulaire/CampagneRelanceChercheur.service';
import { CampagneRelanceVo } from 'src/app/controller/model/formulaire/CampagneRelance.model';
import { CampagneRelanceService } from 'src/app/controller/service/formulaire/CampagneRelance.service';
import * as moment from 'moment';
import { CampagneRappelChercheurVo } from 'src/app/controller/model/formulaire/CampagneRappelChercheur.model';
import { CampagneRappelChercheurService } from 'src/app/controller/service/formulaire/CampagneRappelChercheur.service';
import { CampagneRappelVo } from 'src/app/controller/model/formulaire/CampagneRappel.model';
import { CampagneRappelService } from 'src/app/controller/service/formulaire/CampagneRappel.service';
import { CampagneChercheurFermetureVo } from 'src/app/controller/model/formulaire/CampagneChercheurFermeture.model';
import { CampagneChercheurFermetureService } from 'src/app/controller/service/formulaire/CampagneChercheurFermeture.service';

@Component({
    selector: 'app-campagne-create-admin',
    templateUrl: './campagne-create-admin.component.html',
    styleUrls: ['./campagne-create-admin.component.css']
})
export class CampagneCreateAdminComponent implements OnInit {

    selectedCampagneChercheurs: CampagneChercheurVo = new CampagneChercheurVo();

    selectedCampagneChercheursOuverture: CampagneChercheurVo = new CampagneChercheurVo();
    campagneChercheursListe: Array<CampagneChercheurVo> = [];
    isTemplateOuverture = false;
    isTemplateCloture = false;
    minDate: Date;
    maxDate: Date;
    isOverlappingDepartDate: boolean = false;
    submitted: boolean;
    date10: Date;
    constructor(private campagneService: CampagneService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router

        , private etatCampagneChercheurService: EtatCampagneChercheurService
        , private etatCampagneService: EtatCampagneService
        , private templateClotureService: TemplateClotureService
        , private templateRappelService: TemplateRappelService
        , private chercheurService: ChercheurService
        , private templateOuvertureService: TemplateOuvertureService
        , private templateRelanceService: TemplateRelanceService
        , private campagneChercheurService: CampagneChercheurService
        , private campagneChercheurOuvertureService: CampagneChercheurOuvertureService
        , private campagneRelanceChercheurService: CampagneRelanceChercheurService
        , private campagneRelanceService: CampagneRelanceService
        , private campagneRappelChercheurService: CampagneRappelChercheurService
        , private campagneRappelService: CampagneRappelService
        , private campagneChercheurFermetureService:CampagneChercheurFermetureService
    ) {

    }


    // methods
    ngOnInit(): void {
        this.minDate = new Date();
        this.maxDate = this.selectedCampagne?.dateFin ? new Date(this.selectedCampagne.dateFin) : null;
        this.selectedCampagneChercheurs.chercheurVo = new ChercheurVo();
        this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
        this.selectedCampagneChercheurs.etatCampagneChercheurVo = new EtatCampagneChercheurVo();
        this.etatCampagneChercheurService.findAll().subscribe((data) => this.etatCampagneChercheurs = data);
        this.selectedEtatCampagne = new EtatCampagneVo();
        this.etatCampagneService.findAll().subscribe((data) => this.etatCampagnes = data);
        this.selectedTemplateOuverture = new TemplateOuvertureVo();
        this.templateOuvertureService.findAll().subscribe((data) => this.templateOuvertures = data);
        this.selectedTemplateCloture = new TemplateClotureVo();
        this.templateClotureService.findAll().subscribe((data) => this.templateClotures = data);
        this.selectedTemplateRelance = new TemplateRelanceVo();
        this.templateRelanceService.findAll().subscribe((data) => this.templateRelances = data);
        this.selectedTemplateRappel = new TemplateRappelVo();
        this.templateRappelService.findAll().subscribe((data) => this.templateRappels = data);



    }



    selectDateFin() {
        if (this.selectedCampagne.dateFin && this.selectedCampagne.dateFin != null) {
            if (this.selectedCampagne.dateDepart && this.selectedCampagne.dateDepart != null) {
                if (this.selectedCampagne.dateDepart < this.selectedCampagne.dateFin) {
                    this.isOverlappingDepartDate = false;
                    this.campagneService.checkOverlappingFinDate().subscribe(data => {
                        this.isOverlappingDepartDate = data;
                        if (!this.isOverlappingDepartDate) {
                            this.messageService.add({ severity: 'error', summary: '', detail: 'Problème de dates qui se chevauchent' });
                            this.selectedCampagne.dateFin = null;
                        }
                    })
                }
                else {
                    this.selectedCampagne.dateFin = null;
                    this.messageService.add({ severity: 'error', summary: '', detail: 'Date de début doit être antérieure à la date de fin' });
                    
                }
            }
            else {
                this.isOverlappingDepartDate = false;
                this.campagneService.checkOverlappingFinDate().subscribe(data => {
                    this.isOverlappingDepartDate = data;
                    if (!this.isOverlappingDepartDate) {
                        this.messageService.add({ severity: 'error', summary: '', detail: 'Problème de dates qui se chevauchent' });
                        this.selectedCampagne.dateFin = null;
                    }

                })
            }
        }
    }

    selectDateDepart() {
        if (this.selectedCampagne.dateDepart && this.selectedCampagne.dateDepart != null) {
            if (this.selectedCampagne.dateFin && this.selectedCampagne.dateFin != null) {
                if (this.selectedCampagne.dateDepart < this.selectedCampagne.dateFin) {
                    this.isOverlappingDepartDate = false;
                    this.campagneService.checkOverlappingDepartDate().subscribe(data => {
                        this.isOverlappingDepartDate = data;
                        if (!this.isOverlappingDepartDate) {
                            this.messageService.add({ severity: 'error', summary: '', detail: 'Problème de dates qui se chevauchent' });
                            this.selectedCampagne.dateDepart = null;
                        }
                    })
                }
                else {
                    this.messageService.add({ severity: 'error', summary: '', detail: 'Date de début doit être antérieure à la date de fin' });
                    this.selectedCampagne.dateDepart = null;
                }
            }
            else {
                this.campagneService.checkOverlappingDepartDate().subscribe(data => {
                    this.isOverlappingDepartDate = data;
                    if (!this.isOverlappingDepartDate) {
                        this.messageService.add({ severity: 'error', summary: '', detail: 'Problème de dates qui se chevauchent' });
                        this.selectedCampagne.dateDepart = null;
                    }
                })
            }
        }
    }

    addCampagneChercheurs() {
        if (this.selectedCampagne.campagneChercheurOuverturesVo == null) {
            this.selectedCampagne.campagneChercheurOuverturesVo = new Array<CampagneChercheurOuvertureVo>();
        }
        this.selectedCampagne.campagneChercheurOuverturesVo.push(this.selectedCampagneChercheurOuverture);
        this.selectedCampagneChercheurs = new CampagneChercheurVo();
    }

    deleteCampagneChercheurs(p: CampagneChercheurVo) {
        this.campagneChercheursListe.forEach((element, index) => {
            if (element === p) { this.campagneChercheursListe.splice(index, 1); }
        });
    }

    public serachRequest() {
        this.availableChercheurs = [];
        this.chercheurService.findByCriteria(this.searchChercheur).subscribe(data => {
            this.availableChercheurs = [];
            this.availableChercheurs = data;
        }, error => console.log(error));
    }



    public save() {
        if (this.isValid()) {
            this.beforeSave();
        }
        else {
            this.messageService.add({ severity: 'error', summary: '', detail: 'Saisir les champs obligatoires' });
        }
        this.submitted = true;

    }



    isValid() {
        if (this.selectedCampagne.dateDepart != null
            && this.selectedCampagne.dateFin != null
            && this.selectedCampagne.libelle != null
            && this.selectedCampagne.messageCloture != null
            && this.selectedCampagne.objetCloture != null
            && this.selectedCampagne.messageOuverture != null
            && this.selectedCampagne.objetOuverture != null
            && this.selectedCampagne.annee != null
        ) {


            return true;
        }

        return false;
    }

    public beforeSave() {
        this.selectedCampagne.campagneChercheurOuverturesVo = [];
        this.selectedCampagne.campagneChercheurFermeturesVo = [];
        if (this.selectedChercheurs && this.selectedChercheurs.length > 0) {
            this.selectedChercheurs.forEach(chercheur => {
                this.selectedCampagneChercheurOuverture.chercheurVo = chercheur;
                this.selectedCampagne.campagneChercheurOuverturesVo.push({ ...this.selectedCampagneChercheurOuverture });
                this.selectedCampagneChercheurFermeture.chercheurVo = chercheur;
                this.selectedCampagne.campagneChercheurFermeturesVo.push({ ...this.selectedCampagneChercheurFermeture });
                this.chercheurs.concat(this.selectedChercheurs)
                this.chercheurs.concat(this.selectedChercheurs)
            })
            if (this.selectedCampagneRelance) {
                this.selectedCampagne.campagneRelancesVo = [];
                this.selectedCampagne.campagneRelancesVo.push({ ...this.selectedCampagneRelance });
            }
            if (this.selectedCampagneRappel) {
                this.selectedCampagne.campagneRappelsVo = [];
                this.selectedCampagne.campagneRappelsVo.push({ ...this.selectedCampagneRappel });
            }
            this.saveWithShowOption(false);
        }

        else {
            this.messageService.add({ severity: 'error', summary: '', detail: 'Aucun chercheur sélectionné' });

        }
    }

    public saveWithShowOption(showList: boolean) {
        this.campagneService.save().subscribe(campagne => {
            this.campagnes.push({ ...campagne });
            this.createCampagneDialog = false;
            this.selectedCampagne = new CampagneVo();
            this.selectedCampagneRelance= new CampagneRelanceVo();
            this.selectedCampagneRappel= new CampagneRappelVo();
            this.messageService.add({ severity: 'success', summary: '', detail: 'Campagne a été ajoutée avec succès' });
            
        }, error => {
            console.log(error);
        });

    }


    public async openCreateetatCampagneChercheur(etatCampagneChercheur: string) {
        const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'add');
        if (isPermistted) {
            this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
            this.createEtatCampagneChercheurDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateetatCampagne(etatCampagne: string) {
        const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'add');
        if (isPermistted) {
            this.selectedEtatCampagne = new EtatCampagneVo();
            this.createEtatCampagneDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }


    public async openCreatetemplateOuverture(templateOuverture: string) {

        const isPermistted = await this.roleService.isPermitted('TemplateOuverture', 'add');
        if (isPermistted) {
            this.selectedTemplateOuverture = new TemplateOuvertureVo();
            this.createTemplateOuvertureDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }


    public changeTemplateRappel($event) {
        if (this.selectedCampagneRappel.templateRappelVo && this.selectedCampagneRappel.templateRappelVo !== null) {
            this.selectedCampagneRappel.objetRappel = $event?.value.objet;
            this.selectedCampagneRappel.messageRappel = $event?.value.message;
        }
        else {
            this.selectedCampagneRappel.objetRappel = "";
            this.selectedCampagneRappel.messageRappel = "";
        }
    }

    public async openCreatetemplateCloture(templateCloture: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateCloture', 'add');
        if (isPermistted) {
            this.selectedTemplateCloture = new TemplateClotureVo();
            this.createTemplateClotureDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatetemplateRelance(templateRelance: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateRelance', 'add');
        if (isPermistted) {
            this.selectedTemplateRelance = new TemplateRelanceVo();
            this.createTemplateRelanceDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatechercheur(chercheur: string) {
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
        if (isPermistted) {
            this.selectedChercheur = new ChercheurVo();
            this.createChercheurDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    // changeTemplateRelance($event)

    public changeTemplateOuverture($event) {
        if (this.selectedCampagne.templateOuvertureVo && this.selectedCampagne.templateOuvertureVo !== null) {
            this.isTemplateOuverture = true;
            this.selectedCampagne.objetOuverture = $event?.value.objet;
            this.selectedCampagne.messageOuverture = $event?.value.message;
        }
        else {

            this.isTemplateOuverture = false;
            this.selectedCampagne.objetOuverture = "";
            this.selectedCampagne.messageOuverture = "";
        }
    }


    public changeTemplateCloture($event) {
        if (this.selectedCampagne.templateClotureVo && this.selectedCampagne.templateClotureVo !== null) {
            this.isTemplateCloture = true;
            this.selectedCampagne.objetCloture = $event?.value.objet;
            this.selectedCampagne.messageCloture = $event?.value.message;
        }
        else {
            this.isTemplateCloture = false;
            this.selectedCampagne.objetCloture = "";
            this.selectedCampagne.messageCloture = "";
        }
    }


    public changeTemplateRelance($event) {
        if (this.selectedCampagneRelance.templateRelanceVo && this.selectedCampagneRelance.templateRelanceVo !== null) {
            this.selectedCampagneRelance.objetRelance = $event?.value.objet;
            this.selectedCampagneRelance.messageRelance = $event?.value.message;
        }
        else {
            this.selectedCampagneRelance.objetRelance = "";
            this.selectedCampagneRelance.messageRelance = "";
        }
    }

    public async openCreatetemplateRappel(templateRappel: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'add');
        if (isPermistted) {
            this.selectedTemplateRappel = new TemplateRappelVo();
            this.createTemplateRappelDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }


    hideCreateDialog() {
        this.createCampagneDialog = false;
    }


    // methods


    // getters and setters

    get campagnes(): Array<CampagneVo> {
        return this.campagneService.campagnes;
    }
    set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
    }

    get selectedCampagne(): CampagneVo {
        return this.campagneService.selectedCampagne;
    }
    set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
    }

    get createCampagneDialog(): boolean {
        return this.campagneService.createCampagneDialog;

    }
    set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog = value;
    }

    get selectedEtatCampagneChercheur(): EtatCampagneChercheurVo {
        return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
    }
    set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
    }
    get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
        return this.etatCampagneChercheurService.etatCampagneChercheurs;
    }
    set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
    }
    get createEtatCampagneChercheurDialog(): boolean {
        return this.etatCampagneChercheurService.createEtatCampagneChercheurDialog;
    }
    set createEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.createEtatCampagneChercheurDialog = value;
    }
    get selectedEtatCampagne(): EtatCampagneVo {
        return this.etatCampagneService.selectedEtatCampagne;
    }
    set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
    }
    get etatCampagnes(): Array<EtatCampagneVo> {
        return this.etatCampagneService.etatCampagnes;
    }
    set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
    }
    get createEtatCampagneDialog(): boolean {
        return this.etatCampagneService.createEtatCampagneDialog;
    }
    set createEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.createEtatCampagneDialog = value;
    }
    get selectedTemplateRappel(): TemplateRappelVo {
        return this.templateRappelService.selectedTemplateRappel;
    }
    set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
    }
    get templateRappels(): Array<TemplateRappelVo> {
        return this.templateRappelService.templateRappels;
    }
    set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
    }
    get createTemplateRappelDialog(): boolean {
        return this.templateRappelService.createTemplateRappelDialog;
    }
    set createTemplateRappelDialog(value: boolean) {
        this.templateRappelService.createTemplateRappelDialog = value;
    }
    get selectedTemplateOuverture(): TemplateOuvertureVo {
        return this.templateOuvertureService.selectedTemplateOuverture;
    }
    set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
    }
    get templateOuvertures(): Array<TemplateOuvertureVo> {
        return this.templateOuvertureService.templateOuvertures;
    }
    set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
    }
    get createTemplateOuvertureDialog(): boolean {
        return this.templateOuvertureService.createTemplateOuvertureDialog;
    }
    set createTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.createTemplateOuvertureDialog = value;
    }
    get selectedTemplateCloture(): TemplateClotureVo {
        return this.templateClotureService.selectedTemplateCloture;
    }
    set selectedTemplateCloture(value: TemplateClotureVo) {
        this.templateClotureService.selectedTemplateCloture = value;
    }
    get templateClotures(): Array<TemplateClotureVo> {
        return this.templateClotureService.templateClotures;
    }
    set templateClotures(value: Array<TemplateClotureVo>) {
        this.templateClotureService.templateClotures = value;
    }
    get createTemplateClotureDialog(): boolean {
        return this.templateClotureService.createTemplateClotureDialog;
    }
    set createTemplateClotureDialog(value: boolean) {
        this.templateClotureService.createTemplateClotureDialog = value;
    }
    get selectedTemplateRelance(): TemplateRelanceVo {
        return this.templateRelanceService.selectedTemplateRelance;
    }
    set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
    }
    get templateRelances(): Array<TemplateRelanceVo> {
        return this.templateRelanceService.templateRelances;
    }
    set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
    }
    get createTemplateRelanceDialog(): boolean {
        return this.templateRelanceService.createTemplateRelanceDialog;
    }
    set createTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.createTemplateRelanceDialog = value;
    }
    get selectedChercheur(): ChercheurVo {
        return this.chercheurService.selectedChercheur;
    }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
    }
    get chercheurs(): Array<ChercheurVo> {
        return this.chercheurService.chercheurs;
    }
    set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
    }
    get createChercheurDialog(): boolean {
        return this.chercheurService.createChercheurDialog;
    }
    set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

    get searchChercheur(): ChercheurVo {
        return this.chercheurService.searchChercheur;
    }

    set searchChercheur(value: ChercheurVo) {
        this.chercheurService.searchChercheur = value;
    }

    get selectedCampagneChercheurOuverture(): CampagneChercheurOuvertureVo {
        return this.campagneChercheurOuvertureService.selectedCampagneChercheurOuverture;
    }

    set selectedCampagneChercheurOuverture(value: CampagneChercheurOuvertureVo) {
        this.campagneChercheurOuvertureService.selectedCampagneChercheurOuverture = value;
    }

    get selectedCampagneChercheurFermeture(): CampagneChercheurFermetureVo {
        return this.campagneChercheurFermetureService.selectedCampagneChercheurFermeture;
    }
    
    set selectedCampagneChercheurFermeture(value: CampagneChercheurFermetureVo) {
        this.campagneChercheurFermetureService.selectedCampagneChercheurFermeture = value;
    }


    get availableChercheurs(): Array<ChercheurVo> {
        return this.chercheurService.availableChercheurs;

    }

    set availableChercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.availableChercheurs = value;
    }

    get selectedChercheurs(): Array<ChercheurVo> {
        return this.chercheurService.selectedChercheurs;
    }

    set selectedChercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.selectedChercheurs = value;
    }

    get selectedCampagneRelanceChercheur(): CampagneRelanceChercheurVo {
        return this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur;
    }

    set selectedCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur = value;
    }

    get selectedCampagneRelance(): CampagneRelanceVo {
        return this.campagneRelanceService.selectedCampagneRelance;
    }
    set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
    }

    get selectedCampagneRappelChercheur(): CampagneRappelChercheurVo {
        return this.campagneRappelChercheurService.selectedCampagneRappelChercheur;
    }

    set selectedCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this.campagneRappelChercheurService.selectedCampagneRappelChercheur = value;
    }

    get selectedCampagneRappel(): CampagneRappelVo {
        return this.campagneRappelService.selectedCampagneRappel;
    }

    set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
    }
}
