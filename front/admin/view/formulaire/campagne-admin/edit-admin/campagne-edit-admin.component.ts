import { Component, Input, OnInit } from '@angular/core';
import { CampagneService } from 'src/app/controller/service/formulaire/Campagne.service';
import { CampagneVo } from 'src/app/controller/model/formulaire/Campagne.model';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DateUtils } from '../../../../../../utils/DateUtils';

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
import { CampagneChercheurOuvertureVo } from 'src/app/controller/model/formulaire/CampagneChercheurOuverture.model';
import { CampagneChercheurOuvertureService } from 'src/app/controller/service/formulaire/CampagneChercheurOuverture.service';
import { CampagneChercheurFermetureVo } from 'src/app/controller/model/formulaire/CampagneChercheurFermeture.model';
import { CampagneChercheurFermetureService } from 'src/app/controller/service/formulaire/CampagneChercheurFermeture.service';
import { CampagneRelanceVo } from 'src/app/controller/model/formulaire/CampagneRelance.model';
import { CampagneRelanceService } from 'src/app/controller/service/formulaire/CampagneRelance.service';
import { CampagneRappelVo } from 'src/app/controller/model/formulaire/CampagneRappel.model';
import { CampagneRappelService } from 'src/app/controller/service/formulaire/CampagneRappel.service';

@Component({
    selector: 'app-campagne-edit-admin',
    templateUrl: './campagne-edit-admin.component.html',
    styleUrls: ['./campagne-edit-admin.component.css']
})
export class CampagneEditAdminComponent implements OnInit {

    selectedCampagneChercheurs: CampagneChercheurVo = new CampagneChercheurVo();
    isTemplateOuverture = false;
    isTemplateCloture = false;
    submitted: boolean;
    isOverlappingDepartDate: boolean = false;

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
        , private campagneChercheurFermetureService: CampagneChercheurFermetureService
        , private campagneRelanceService: CampagneRelanceService
        , private campagneRappelService: CampagneRappelService
    ) {
    }

    // methods
    ngOnInit(): void {
        this.selectedCampagneChercheurs.chercheurVo = new ChercheurVo();
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



    addCampagneChercheurs() {
        if (this.selectedCampagne.campagneChercheurOuverturesVo == null) {
            this.selectedCampagne.campagneChercheurOuverturesVo = new Array<CampagneChercheurOuvertureVo>();
        }
        this.selectedCampagne.campagneChercheurOuverturesVo.push(this.selectedCampagneChercheurOuverture);
        this.selectedCampagneChercheurs = new CampagneChercheurVo();
    }



    selectDateDepart() {
        this.isOverlappingDepartDate = false;
        if (this.selectedCampagne.dateDepart && this.selectedCampagne.dateDepart != null) {
            if (this.selectedCampagne.dateFin && this.selectedCampagne.dateFin != null) {
                if (this.selectedCampagne.dateDepart < this.selectedCampagne.dateFin) {
                    this.campagneService.checkOverlappingEditDepartDate().subscribe(data => {
                        this.isOverlappingDepartDate = data;
                        if (!this.isOverlappingDepartDate) {
                            this.messageService.add({ severity: 'error', summary: '', detail: 'Problème de dates qui se chevauchent' });
                            this.selectedCampagne.dateDepart = null;
                        }

                    })
                    this.sendEmailOuvertureDisabled = false;
                }
                else {
                    this.messageService.add({ severity: 'error', summary: '', detail: 'Date de début doit être antérieure à la date de fin' });
                    this.selectedCampagne.dateDepart = null;
                }
            }
            else {
                this.campagneService.checkOverlappingEditDepartDate().subscribe(data => {
                    this.isOverlappingDepartDate = data;
                    if (!this.isOverlappingDepartDate) {
                        this.messageService.add({ severity: 'error', summary: '', detail: 'Problème de dates qui se chevauchent' });
                        this.selectedCampagne.dateDepart = null;
                    }

                })
                this.sendEmailOuvertureDisabled = false;
            }
        }
    }



    selectDateFin() {
        if (this.selectedCampagne.dateFin && this.selectedCampagne.dateFin != null) {
            if (this.selectedCampagne.dateDepart && this.selectedCampagne.dateDepart != null) {
                if (this.selectedCampagne.dateDepart < this.selectedCampagne.dateFin) {
                    this.isOverlappingDepartDate = false;
                    this.campagneService.checkOverlappingEditFinDate().subscribe(data => {
                        this.isOverlappingDepartDate = data;
                        if (!this.isOverlappingDepartDate) {
                            this.messageService.add({ severity: 'error', summary: '', detail: 'Problème de dates qui se chevauchent' });
                            this.selectedCampagne.dateFin = null;
                        }
                    })
                    this.sendEmailFermetureDisabled = false;
                }
                else {
                    this.messageService.add({ severity: 'error', summary: '', detail: 'Date de début doit être antérieure à la date de fin' });
                    this.selectedCampagne.dateFin = null;
                }
            }
            else {
                this.isOverlappingDepartDate = false;
                this.campagneService.checkOverlappingEditFinDate().subscribe(data => {
                    this.isOverlappingDepartDate = data;
                    if (!this.isOverlappingDepartDate) {
                        this.messageService.add({ severity: 'error', summary: '', detail: 'Problème de dates qui se chevauchent' });
                        this.selectedCampagne.dateFin = null;
                    }
                })
                this.sendEmailFermetureDisabled = false;

            }
        }
    }



    checkCampagneChercheur(chercheur: ChercheurVo, campagneChercheurOuvertures) {

        let isChecked = false
        campagneChercheurOuvertures.forEach(campagneChercheurOuverture => {
            if (campagneChercheurOuverture?.chercheurVo?.id == chercheur?.id) {
                isChecked = true;
            }
        })
        return isChecked;
    }

    public beforeEdit() {
        if (this.selectedChercheurs && this.selectedChercheurs.length > 0) {
            if (this.selectedCampagne.campagneChercheurOuverturesVo) {
                let campagneChercheurOuvertureSelected = [];
                this.selectedChercheurs.forEach(chercheur => {
                    if (this.checkCampagneChercheur(chercheur, this.selectedCampagne.campagneChercheurOuverturesVo)) {
                        this.selectedCampagne.campagneChercheurOuverturesVo.forEach(campagneChercheurOuverture => {
                            if (campagneChercheurOuverture?.chercheurVo?.id == chercheur?.id) {
                                campagneChercheurOuvertureSelected.push({ ...campagneChercheurOuverture })
                            }
                        })
                    }
                    else {
                        this.selectedCampagneChercheurOuverture.chercheurVo = chercheur;
                        campagneChercheurOuvertureSelected.push({ ...this.selectedCampagneChercheurOuverture })
                    }
                })
                this.selectedCampagne.campagneChercheurOuverturesVo = campagneChercheurOuvertureSelected;
            }
            else {
                this.selectedCampagne.campagneChercheurOuverturesVo = [];
                this.selectedChercheurs.forEach(chercheur => {
                    this.selectedCampagneChercheurOuverture.chercheurVo = chercheur;
                    this.selectedCampagne.campagneChercheurOuverturesVo.push({ ...this.selectedCampagneChercheurOuverture });
                })
            }


            if (this.selectedCampagne.campagneChercheurFermeturesVo) {
                let campagneChercheurFermetureSelected = [];
                this.selectedChercheurs.forEach(chercheur => {
                    if (this.checkCampagneChercheur(chercheur, this.selectedCampagne.campagneChercheurFermeturesVo)) {
                        this.selectedCampagne.campagneChercheurFermeturesVo.forEach(campagneChercheurFermeture => {
                            if (campagneChercheurFermeture?.chercheurVo?.id == chercheur?.id) {
                                campagneChercheurFermetureSelected.push({ ...campagneChercheurFermeture })
                            }
                        })
                    }
                    else {
                        this.selectedCampagneChercheurFermeture.chercheurVo = chercheur;
                        campagneChercheurFermetureSelected.push({ ...this.selectedCampagneChercheurFermeture })
                    }
                })
                this.selectedCampagne.campagneChercheurFermeturesVo = campagneChercheurFermetureSelected;
            }
            else {
                this.selectedCampagne.campagneChercheurFermeturesVo = [];
                this.selectedChercheurs.forEach(chercheur => {
                    this.selectedCampagneChercheurFermeture.chercheurVo = chercheur;
                    this.selectedCampagne.campagneChercheurFermeturesVo.push({ ...this.selectedCampagneChercheurFermeture });
                })
            }
            this.editWithShowOption(false);
        }

        else {
            this.messageService.add({ severity: 'error', summary: '', detail: 'Aucun chercheur sélectionné' });

        }
    }
    public edit() {
        this.submitted = true;
        if (this.isValid()) {
            this.beforeEdit();
        }
        else {
            this.messageService.add({ severity: 'error', summary: '', detail: 'Saisir les champs obligatoires' });
        }

    }


    isValid() {
        if (this.selectedCampagne.dateDepart != null
            && this.selectedCampagne.dateFin != null
            && this.selectedCampagne.libelle != null
            && this.selectedCampagne.messageCloture != null
            && this.selectedCampagne.objetCloture != null
            && this.selectedCampagne.messageOuverture != null
            && this.selectedCampagne.objetOuverture != null
            && this.selectedCampagne.annee != null) {
            return true;
        }
        return false;
    }

    public editWithShowOption(showList: boolean) {
        this.selectedCampagne.campagneRelancesVo = [];
        this.selectedCampagne.campagneRelancesVo.push({ ...this.selectedCampagneRelance })
        this.campagneService.edit().subscribe(campagne => {
            const myIndex = this.campagnes.findIndex(e => e.id === this.selectedCampagne.id);
            this.campagnes[myIndex] = this.selectedCampagne;
            this.editCampagneDialog = false;
            this.selectedCampagne = new CampagneVo();
            this.selectedCampagneRelance = new CampagneRelanceVo();
            // window.location.reload();


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
            this.editChercheurDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }


    public changeTemplateOuverture() {
        if (this.selectedCampagne.templateOuvertureVo !== null) {
            this.isTemplateOuverture = true;
            this.selectedCampagne.objetOuverture = this.selectedCampagne.templateOuvertureVo.objet;
            this.selectedCampagne.messageOuverture = this.selectedCampagne.templateOuvertureVo.message;
        }
        else {
            this.isTemplateOuverture = false;
            this.selectedCampagne.objetOuverture = "";
            this.selectedCampagne.messageOuverture = "";
        }
    }


    public changeTemplateCloture() {
        if (this.selectedCampagne.templateClotureVo !== null) {
            this.isTemplateCloture = true;
            this.selectedCampagne.objetCloture = this.selectedCampagne.templateClotureVo.objet;
            this.selectedCampagne.messageCloture = this.selectedCampagne.templateClotureVo.message;
        }

        else {
            this.isTemplateCloture = false;
            this.selectedCampagne.objetCloture = "";
            this.selectedCampagne.messageCloture = "";
        }

    }

    hideEditDialog() {
        this.editCampagneDialog = false;
    }

    public preparedEmailFermeture(selectedChercheurs) {
        this.selectedCampagne.campagneChercheurFermeturesVo = []
        if (this.selectedCampagne.messageCloture && this.selectedCampagne.objetCloture !== "" && this.selectedCampagne.messageCloture !== "") {
            this.sendEmailFermetureDisabled = true;
            selectedChercheurs.forEach(chercheur => {
                this.selectedCampagneChercheurFermeture.chercheurVo = chercheur;
                this.selectedCampagne.campagneChercheurFermeturesVo.push({ ...this.selectedCampagneChercheurFermeture });
            })
            this.campagneService.sendEmailFermeture().subscribe(campagne => {
                this.messageService.add({ severity: 'info', summary: '', detail: 'Email envoyé avec succès' });
                this.editCampagneDialog = false;
            }, error => {
                console.log(error);
            });

        }
        else {
            this.messageService.add({ severity: 'error', summary: '', detail: 'Saisir un template fermeture' });
        }

    }


    public preparedEmailOuverture(selectedChercheurs) {
        this.selectedCampagne.campagneChercheurOuverturesVo = []
        if (this.selectedCampagne.messageOuverture && this.selectedCampagne.objetOuverture !== "" && this.selectedCampagne.messageOuverture !== "") {
            this.sendEmailOuvertureDisabled = true;
            selectedChercheurs.forEach(chercheur => {
                this.selectedCampagneChercheurOuverture.chercheurVo = chercheur;
                this.selectedCampagne.campagneChercheurOuverturesVo.push({ ...this.selectedCampagneChercheurOuverture });
            })
            this.availableChercheurs.concat(this.selectedChercheurs);
            this.campagneService.sendEmailOuverture().subscribe(campagne => {
                this.messageService.add({ severity: 'info', summary: '', detail: 'Email envoyé' });
                this.editCampagneDialog = false;

            }, error => {
                console.log(error);
            });

        }

        else this.messageService.add({ severity: 'error', summary: '', detail: 'Saisir l\'objet et le message d\'ouverture' });
    }


    public beforeSendFermetureEmail() {
        if (this.selectedChercheurs && this.selectedChercheurs.length > 0) {
            this.preparedEmailFermeture(this.selectedChercheurs);
        }
        else this.messageService.add({ severity: 'error', summary: '', detail: 'Aucun chercheur sélectionné' });
    }


    beforeSendOuvertureEmail() {

        if (this.selectedChercheurs && this.selectedChercheurs.length > 0) {
            this.preparedEmailOuverture(this.selectedChercheurs);
        }
        else this.messageService.add({ severity: 'error', summary: '', detail: 'Aucun chercheur sélectionné' });

    }

    sendEmailFermeture() {
        this.beforeSendFermetureEmail();
    }


    sendEmailOuverture() {
        this.beforeSendOuvertureEmail();
    }

    public serachRequest() {
        this.availableChercheurs = [];
        this.chercheurService.findByCriteria(this.searchChercheur).subscribe(data => {
            this.availableChercheurs = [];
            this.availableChercheurs = data;
        }, error => console.log(error));
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

    get editCampagneDialog(): boolean {
        return this.campagneService.editCampagneDialog;

    }
    set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog = value;
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

    get editChercheurDialog(): boolean {
        return this.chercheurService.editChercheurDialog;
    }

    set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
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

    get selectedCampagneChercheur(): CampagneChercheurVo {
        return this.campagneChercheurService.selectedCampagneChercheur;
    }

    set selectedCampagneChercheur(value: CampagneChercheurVo) {
        this.campagneChercheurService.selectedCampagneChercheur = value;
    }



    get selectedChercheurs(): Array<ChercheurVo> {
        return this.chercheurService.selectedChercheurs;
    }

    set selectedChercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.selectedChercheurs = value;
    }

    get availableChercheurs(): Array<ChercheurVo> {
        return this.chercheurService.availableChercheurs;

    }

    set availableChercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.availableChercheurs = value;
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


    get sendEmailOuvertureDisabled(): boolean {
        return this.campagneService.sendEmailOuvertureDisabled;
    }

    set sendEmailOuvertureDisabled(value: boolean) {
        this.campagneService.sendEmailOuvertureDisabled = value;
    }


    get sendEmailFermetureDisabled(): boolean {
        return this.campagneService.sendEmailFermetureDisabled;
    }

    set sendEmailFermetureDisabled(value: boolean) {
        this.campagneService.sendEmailFermetureDisabled = value;
    }


    get selectedCampagneRelance(): CampagneRelanceVo {
        return this.campagneRelanceService.selectedCampagneRelance;
    }
    set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
    }

    get selectedCampagneRappel(): CampagneRappelVo {
        return this.campagneRappelService.selectedCampagneRappel;
    }
    set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
    }



}
