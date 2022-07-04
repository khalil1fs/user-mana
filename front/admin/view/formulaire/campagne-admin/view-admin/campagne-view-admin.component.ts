import { Component, Input, OnInit } from '@angular/core';
import { CampagneService } from 'src/app/controller/service/formulaire/Campagne.service';
import { CampagneVo } from 'src/app/controller/model/formulaire/Campagne.model';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { CampagneChercheurOuvertureService } from 'src/app/controller/service/formulaire/CampagneChercheurOuverture.service';
import { CampagneChercheurOuvertureVo } from 'src/app/controller/model/formulaire/CampagneChercheurOuverture.model';
import { CampagneChercheurFermetureService } from 'src/app/controller/service/formulaire/CampagneChercheurFermeture.service';
import { CampagneRelanceChercheurVo } from 'src/app/controller/model/formulaire/CampagneRelanceChercheur.model';
import { CampagneChercheurFermetureVo } from 'src/app/controller/model/formulaire/CampagneChercheurFermeture.model';

@Component({
    selector: 'app-campagne-view-admin',
    templateUrl: './campagne-view-admin.component.html',
    styleUrls: ['./campagne-view-admin.component.css']
})
export class CampagneViewAdminComponent implements OnInit {
    selectedCampagneChercheurs: CampagneChercheurVo = new CampagneChercheurVo();



    constructor(private campagneService: CampagneService
        , private roleService: RoleService
        , private messageService: MessageService
        , private etatCampagneChercheurService: EtatCampagneChercheurService
        , private etatCampagneService: EtatCampagneService
        , private templateClotureService: TemplateClotureService
        , private templateRappelService: TemplateRappelService
        , private chercheurService: ChercheurService
        , private templateOuvertureService: TemplateOuvertureService
        , private templateRelanceService: TemplateRelanceService
        , private campagneChercheurOuvertureService: CampagneChercheurOuvertureService
        , private campagneChercheurFermetureService: CampagneChercheurFermetureService
        , private confirmationService: ConfirmationService

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



    hideViewDialog() {
        this.viewCampagneDialog = false;
    }





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

    get viewCampagneDialog(): boolean {
        return this.campagneService.viewCampagneDialog;

    }
    set viewCampagneDialog(value: boolean) {
        this.campagneService.viewCampagneDialog = value;
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
    get editEtatCampagneChercheurDialog(): boolean {
        return this.etatCampagneChercheurService.editEtatCampagneChercheurDialog;
    }
    set editEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.editEtatCampagneChercheurDialog = value;
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
    get editEtatCampagneDialog(): boolean {
        return this.etatCampagneService.editEtatCampagneDialog;
    }
    set editEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.editEtatCampagneDialog = value;
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
    get editTemplateRappelDialog(): boolean {
        return this.templateRappelService.editTemplateRappelDialog;
    }
    set editTemplateRappelDialog(value: boolean) {
        this.templateRappelService.editTemplateRappelDialog = value;
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
    get editTemplateOuvertureDialog(): boolean {
        return this.templateOuvertureService.editTemplateOuvertureDialog;
    }
    set editTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.editTemplateOuvertureDialog = value;
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
    get editTemplateClotureDialog(): boolean {
        return this.templateClotureService.editTemplateClotureDialog;
    }
    set editTemplateClotureDialog(value: boolean) {
        this.templateClotureService.editTemplateClotureDialog = value;
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
    get editTemplateRelanceDialog(): boolean {
        return this.templateRelanceService.editTemplateRelanceDialog;
    }
    set editTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.editTemplateRelanceDialog = value;
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
        return environment.dateFormatView;
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

    get campagneChercheurOuvertures(): Array<CampagneChercheurOuvertureVo> {
        return this.campagneChercheurOuvertureService.campagneChercheurOuvertures;
    }
    set campagneChercheurOuvertures(value: Array<CampagneChercheurOuvertureVo>) {
        this.campagneChercheurOuvertureService.campagneChercheurOuvertures = value;
    }


    get campagneChercheurFermetures(): Array<CampagneChercheurOuvertureVo> {
        return this.campagneChercheurFermetureService.campagneChercheurFermetures;
    }
    set campagneChercheurFermetures(value: Array<CampagneChercheurOuvertureVo>) {
        this.campagneChercheurFermetureService.campagneChercheurFermetures = value;
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


}
