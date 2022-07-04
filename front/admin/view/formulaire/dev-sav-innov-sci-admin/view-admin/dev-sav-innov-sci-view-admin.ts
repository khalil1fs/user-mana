import { Component, OnInit } from '@angular/core';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from 'src/app/controller/service/formulaire/DeveloppementDeSavoirEtInnovationScientifique.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueVo } from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifique.model';
import { environment } from 'src/environments/environment';

import { TypeSavoirVo } from 'src/app/controller/model/referentiel/TypeSavoir.model';
import { TypeSavoirService } from 'src/app/controller/service/referentiel/TypeSavoir.service';
import { TypeUtilisateurVo } from 'src/app/controller/model/referentiel/TypeUtilisateur.model';
import { TypeUtilisateurService } from 'src/app/controller/service/referentiel/TypeUtilisateur.service';
import { EtatEtapeCampagneVo } from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import { EtatEtapeCampagneService } from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import { EnjeuxIrdVo } from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import { EnjeuxIrdService } from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysVo } from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import { RoleDeveloppementDeSavoirVo } from 'src/app/controller/model/referentiel/RoleDeveloppementDeSavoir.model';
import { RoleDeveloppementDeSavoirService } from 'src/app/controller/service/referentiel/RoleDeveloppementDeSavoir.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo } from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
import { TypeUtilisateurSavoirConcuVo } from 'src/app/controller/model/formulaire/TypeUtilisateurSavoirConcu.model';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo } from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import { EtablissementVo } from 'src/app/controller/model/referentiel/Etablissement.model';
import { EtablissementService } from 'src/app/controller/service/referentiel/Etablissement.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo } from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import { SavoirEtInnovationVo } from 'src/app/controller/model/formulaire/SavoirEtInnovation.model';
import { SavoirEtInnovationService } from 'src/app/controller/service/formulaire/SavoirEtInnovation.service';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo } from 'src/app/controller/model/formulaire/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import { ModeDiffusionVo } from 'src/app/controller/model/referentiel/ModeDiffusion.model';
import { ModeDiffusionService } from 'src/app/controller/service/referentiel/ModeDiffusion.service';
import { CommunauteSavoirVo } from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import { CommunauteSavoirService } from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo } from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import { PaysVo } from 'src/app/controller/model/referentiel/Pays.model';
import { PaysService } from 'src/app/controller/service/referentiel/Pays.service';
import { DisciplineScientifiqueVo } from 'src/app/controller/model/referentiel/DisciplineScientifique.model';

@Component({
    selector: 'app-developpement-de-savoir-et-innovation-scientifique-view-admin',
    templateUrl: './dev-sav-innov-sci-view-admin.html',
    styleUrls: ['./dev-sav-innov-sci-view-admin.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent implements OnInit {

    selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
    typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesListe: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> = [];

    myTypeSavoirs: Array<TypeSavoirVo> = [];

    selectedTypeUtilisateurSavoirConcus: TypeUtilisateurSavoirConcuVo = new TypeUtilisateurSavoirConcuVo();
    typeUtilisateurSavoirConcusListe: Array<TypeUtilisateurSavoirConcuVo> = [];

    myTypeUtilisateurs: Array<TypeUtilisateurVo> = [];

    selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
    developpementDeSavoirEtInnovationScientifiqueModeDiffusionsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> = [];

    myModeDiffusions: Array<ModeDiffusionVo> = [];

    selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
    developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> = [];

    myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

    selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
    developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> = [];

    myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

    selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
    developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> = [];


    selectedDeveloppementDeSavoirEtInnovationScientifiquePayss: DeveloppementDeSavoirEtInnovationScientifiquePaysVo = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
    developpementDeSavoirEtInnovationScientifiquePayssListe: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> = [];

    myPayss: Array<PaysVo> = [];




    constructor(private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
        , private typeSavoirService: TypeSavoirService
        , private typeUtilisateurService: TypeUtilisateurService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private enjeuxIrdService: EnjeuxIrdService
        , private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
        , private savoirEtInnovationService: SavoirEtInnovationService
        , private modeDiffusionService: ModeDiffusionService
        , private communauteSavoirService: CommunauteSavoirService
        , private paysService: PaysService
    ) {
    }

    // methods
    ngOnInit(): void {
        this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques.typeSavoirVo = new TypeSavoirVo();
        this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
        this.selectedTypeUtilisateurSavoirConcus.typeUtilisateurVo = new TypeUtilisateurVo();
        this.typeUtilisateurService.findAll().subscribe((data) => this.typeUtilisateurs = data);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions.modeDiffusionVo = new ModeDiffusionVo();
        this.modeDiffusionService.findAll().subscribe((data) => this.modeDiffusions = data);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
        this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
        this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs.communauteSavoirVo = new CommunauteSavoirVo();
        this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiquePayss.paysVo = new PaysVo();
        this.paysService.findAll().subscribe((data) => this.payss = data);

        this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
        this.roleDeveloppementDeSavoirService.findAll().subscribe((data) => this.roleDeveloppementDeSavoirs = data);
        this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
        this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
        this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    }

    hideViewDialog() {
        this.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog = false;
    }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
        return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
    }
    set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
    }

    get selectedDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
        return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
    }
    set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
    }

    get viewDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this.developpementDeSavoirEtInnovationScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog;

    }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
    }


    get selectedEnjeuxIrd(): EnjeuxIrdVo {
        return this.enjeuxIrdService.selectedEnjeuxIrd;
    }
    set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
    }
    get enjeuxIrds(): Array<EnjeuxIrdVo> {
        return this.enjeuxIrdService.enjeuxIrds;
    }
    set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
    }
    get editEnjeuxIrdDialog(): boolean {
        return this.enjeuxIrdService.editEnjeuxIrdDialog;
    }
    set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog = value;
    }
    get selectedTypeSavoir(): TypeSavoirVo {
        return this.typeSavoirService.selectedTypeSavoir;
    }
    set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
    }
    get typeSavoirs(): Array<TypeSavoirVo> {
        return this.typeSavoirService.typeSavoirs;
    }
    set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
    }
    get editTypeSavoirDialog(): boolean {
        return this.typeSavoirService.editTypeSavoirDialog;
    }
    set editTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.editTypeSavoirDialog = value;
    }
    get selectedCommunauteSavoir(): CommunauteSavoirVo {
        return this.communauteSavoirService.selectedCommunauteSavoir;
    }
    set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
    }
    get communauteSavoirs(): Array<CommunauteSavoirVo> {
        return this.communauteSavoirService.communauteSavoirs;
    }
    set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
    }
    get editCommunauteSavoirDialog(): boolean {
        return this.communauteSavoirService.editCommunauteSavoirDialog;
    }
    set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog = value;
    }
    get selectedSavoirEtInnovation(): SavoirEtInnovationVo {
        return this.savoirEtInnovationService.selectedSavoirEtInnovation;
    }
    set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
    }
    get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
        return this.savoirEtInnovationService.savoirEtInnovations;
    }
    set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
    }
    get editSavoirEtInnovationDialog(): boolean {
        return this.savoirEtInnovationService.editSavoirEtInnovationDialog;
    }
    set editSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.editSavoirEtInnovationDialog = value;
    }
    get selectedModeDiffusion(): ModeDiffusionVo {
        return this.modeDiffusionService.selectedModeDiffusion;
    }
    set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
    }
    get modeDiffusions(): Array<ModeDiffusionVo> {
        return this.modeDiffusionService.modeDiffusions;
    }
    set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
    }
    get editModeDiffusionDialog(): boolean {
        return this.modeDiffusionService.editModeDiffusionDialog;
    }
    set editModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.editModeDiffusionDialog = value;
    }
    get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
        return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
    }
    set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
    }
    get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
        return this.etatEtapeCampagneService.etatEtapeCampagnes;
    }
    set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
    }
    get editEtatEtapeCampagneDialog(): boolean {
        return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
    }
    set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog = value;
    }
    get selectedPays(): PaysVo {
        return this.paysService.selectedPays;
    }
    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
    }
    get payss(): Array<PaysVo> {
        return this.paysService.payss;
    }
    set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
    }
    get editPaysDialog(): boolean {
        return this.paysService.editPaysDialog;
    }
    set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog = value;
    }
    get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
        return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
    }
    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
    }
    get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
        return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
    }
    set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
    }
    get editRoleDeveloppementDeSavoirDialog(): boolean {
        return this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog;
    }
    set editRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog = value;
    }
    get selectedTypeUtilisateur(): TypeUtilisateurVo {
        return this.typeUtilisateurService.selectedTypeUtilisateur;
    }
    set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
    }
    get typeUtilisateurs(): Array<TypeUtilisateurVo> {
        return this.typeUtilisateurService.typeUtilisateurs;
    }
    set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
    }
    get editTypeUtilisateurDialog(): boolean {
        return this.typeUtilisateurService.editTypeUtilisateurDialog;
    }
    set editTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.editTypeUtilisateurDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
