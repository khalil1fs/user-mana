import { Component, OnInit } from '@angular/core';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from 'src/app/controller/service/formulaire/DeveloppementDeSavoirEtInnovationScientifique.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueVo } from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifique.model';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';
import { MessageService } from 'primeng/api';
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
import { DeveloppementDeSavoirEtInnovationScientifiqueRoleVo } from 'src/app/controller/model/formulaire/DeveloppementDeSavoirEtInnovationScientifiqueRole.model';
import { DisciplineScientifiqueVo } from 'src/app/controller/model/referentiel/DisciplineScientifique.model';

@Component({
    selector: 'app-developpement-de-savoir-et-innovation-scientifique-create-admin',
    templateUrl: './dev-sav-innov-sci-create-admin.html',
    styleUrls: ['./dev-sav-innov-sci-create-admin.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent implements OnInit {

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

    selectedDeveloppementDeSavoirEtInnovationScientifiqueRoles: DeveloppementDeSavoirEtInnovationScientifiqueRoleVo = new DeveloppementDeSavoirEtInnovationScientifiqueRoleVo();
    developpementDeSavoirEtInnovationScientifiqueRolesListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueRoleVo> = [];


    _submitted = false;

    constructor(private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
        , private roleService: RoleService
        , private messageService: MessageService
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
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueRoles.roleDeveloppementDeSavoirVo = new RoleDeveloppementDeSavoirVo();
        this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
        this.roleDeveloppementDeSavoirService.findAll().subscribe((data) => this.roleDeveloppementDeSavoirs = data);
        this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
        this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
        this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    }
    addTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques() {
        if (this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo == null) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo = new Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo.push(this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques);
        this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
    }

    deleteTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(p: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesListe.forEach((element, index) => {
            if (element === p) { this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesListe.splice(index, 1); }
        });
    }
    addTypeUtilisateurSavoirConcus() {
        if (this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeUtilisateurSavoirConcusVo == null) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeUtilisateurSavoirConcusVo = new Array<TypeUtilisateurSavoirConcuVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeUtilisateurSavoirConcusVo.push(this.selectedTypeUtilisateurSavoirConcus);
        this.selectedTypeUtilisateurSavoirConcus = new TypeUtilisateurSavoirConcuVo();
    }

    deleteTypeUtilisateurSavoirConcus(p: TypeUtilisateurSavoirConcuVo) {
        this.typeUtilisateurSavoirConcusListe.forEach((element, index) => {
            if (element === p) { this.typeUtilisateurSavoirConcusListe.splice(index, 1); }
        });
    }
    addDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions() {
        if (this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo == null) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
    }

    deleteDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(p: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsListe.forEach((element, index) => {
            if (element === p) { this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsListe.splice(index, 1); }
        });
    }
    addDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds() {
        if (this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo == null) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
    }

    deleteDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(p: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsListe.forEach((element, index) => {
            if (element === p) { this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsListe.splice(index, 1); }
        });
    }
    addDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques() {
        if (this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo == null) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
    }

    deleteDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(p: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesListe.forEach((element, index) => {
            if (element === p) { this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesListe.splice(index, 1); }
        });
    }
    addDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs() {
        if (this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo == null) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
    }

    deleteDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(p: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsListe.forEach((element, index) => {
            if (element === p) { this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsListe.splice(index, 1); }
        });
    }
    addDeveloppementDeSavoirEtInnovationScientifiquePayss() {
        if (this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiquePayssVo == null) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiquePayssVo = new Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiquePayssVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiquePayss);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiquePayss = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
    }

    deleteDeveloppementDeSavoirEtInnovationScientifiquePayss(p: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this.developpementDeSavoirEtInnovationScientifiquePayssListe.forEach((element, index) => {
            if (element === p) { this.developpementDeSavoirEtInnovationScientifiquePayssListe.splice(index, 1); }
        });
    }
    addDeveloppementDeSavoirEtInnovationScientifiqueEtablissements() {
        if (this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueRolesVo == null) {
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueRolesVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueRoleVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueRolesVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueRoles);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueRoles = new DeveloppementDeSavoirEtInnovationScientifiqueRoleVo();
    }

    deleteDeveloppementDeSavoirEtInnovationScientifiqueEtablissements(p: DeveloppementDeSavoirEtInnovationScientifiqueRoleVo) {
        this.developpementDeSavoirEtInnovationScientifiqueRolesListe.forEach((element, index) => {
            if (element === p) { this.developpementDeSavoirEtInnovationScientifiqueRolesListe.splice(index, 1); }
        });
    }

    public save() {
        this.submitted = true;
        if (this.validateForm()) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire' });
        }
    }
    private validateForm(): boolean {
        return true;
    }
    public saveWithShowOption(showList: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.save().subscribe(developpementDeSavoirEtInnovationScientifique => {
            this.developpementDeSavoirEtInnovationScientifiques.push({ ...developpementDeSavoirEtInnovationScientifique });
            this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = false;
            this.submitted = false;
            this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();


        }, error => {
            console.log(error);
        });

    }

    //openPopup
    public async openCreateetablissement() {
        const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
        if (isPermistted) {
            this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
            this.createRoleDeveloppementDeSavoirDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateenjeuxIrd() {
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
        if (isPermistted) {
            this.selectedEnjeuxIrd = new EnjeuxIrdVo();
            this.createEnjeuxIrdDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatetypeSavoir() {
        const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'add');
        if (isPermistted) {
            this.selectedTypeSavoir = new TypeSavoirVo();
            this.createTypeSavoirDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatecommunauteSavoir() {
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
        if (isPermistted) {
            this.selectedCommunauteSavoir = new CommunauteSavoirVo();
            this.createCommunauteSavoirDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatesavoirEtInnovation() {
        const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'add');
        if (isPermistted) {
            this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
            this.createSavoirEtInnovationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatemodeDiffusion() {
        const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'add');
        if (isPermistted) {
            this.selectedModeDiffusion = new ModeDiffusionVo();
            this.createModeDiffusionDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateetatEtapeCampagne() {
        const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
        if (isPermistted) {
            this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
            this.createEtatEtapeCampagneDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatepays() {
        const isPermistted = await this.roleService.isPermitted('Pays', 'add');
        if (isPermistted) {
            this.selectedPays = new PaysVo();
            this.createPaysDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreateroleDeveloppementDeSavoir() {
        const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'add');
        if (isPermistted) {
            this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
            this.createRoleDeveloppementDeSavoirDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    public async openCreatetypeUtilisateur() {
        const isPermistted = await this.roleService.isPermitted('TypeUtilisateur', 'add');
        if (isPermistted) {
            this.selectedTypeUtilisateur = new TypeUtilisateurVo();
            this.createTypeUtilisateurDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
    // methods

    hideCreateDialog() {
        this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = false;
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

    get createDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;

    }
    set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
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
    get createEnjeuxIrdDialog(): boolean {
        return this.enjeuxIrdService.createEnjeuxIrdDialog;
    }
    set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog = value;
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
    get createTypeSavoirDialog(): boolean {
        return this.typeSavoirService.createTypeSavoirDialog;
    }
    set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog = value;
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
    get createCommunauteSavoirDialog(): boolean {
        return this.communauteSavoirService.createCommunauteSavoirDialog;
    }
    set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog = value;
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
    get createSavoirEtInnovationDialog(): boolean {
        return this.savoirEtInnovationService.createSavoirEtInnovationDialog;
    }
    set createSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.createSavoirEtInnovationDialog = value;
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
    get createModeDiffusionDialog(): boolean {
        return this.modeDiffusionService.createModeDiffusionDialog;
    }
    set createModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.createModeDiffusionDialog = value;
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
    get createEtatEtapeCampagneDialog(): boolean {
        return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
    }
    set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog = value;
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
    get createPaysDialog(): boolean {
        return this.paysService.createPaysDialog;
    }
    set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog = value;
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
    get createRoleDeveloppementDeSavoirDialog(): boolean {
        return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;
    }
    set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog = value;
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
    get createTypeUtilisateurDialog(): boolean {
        return this.typeUtilisateurService.createTypeUtilisateurDialog;
    }
    set createTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.createTypeUtilisateurDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }
}
