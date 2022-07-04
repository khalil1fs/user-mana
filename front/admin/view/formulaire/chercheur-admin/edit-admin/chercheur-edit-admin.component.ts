import {Component, OnInit} from '@angular/core';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {CommunauteSavoirChercheurVo} from 'src/app/controller/model/formulaire/CommunauteSavoirChercheur.model';
import {CommunauteSavoirChercheurService} from 'src/app/controller/service/formulaire/CommunauteSavoirChercheur.service';
import {TypeEntiteAdministrativeVo} from 'src/app/controller/model/referentiel/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from 'src/app/controller/service/referentiel/TypeEntiteAdministrative.service';
import {DepartementScientifiqueVo} from 'src/app/controller/model/formulaire/DepartementScientifique.model';
import {DepartementScientifiqueService} from 'src/app/controller/service/formulaire/DepartementScientifique.service';
import {ZoneActiviteInteractionRechercheVo} from 'src/app/controller/model/formulaire/ZoneActiviteInteractionRecherche.model';
import {ZoneActiviteInteractionRechercheService} from 'src/app/controller/service/formulaire/ZoneActiviteInteractionRecherche.service';
import {GradeVo} from 'src/app/controller/model/referentiel/Grade.model';
import {GradeService} from 'src/app/controller/service/referentiel/Grade.service';
import {CorpsVo} from 'src/app/controller/model/referentiel/Corps.model';
import {CorpsService} from 'src/app/controller/service/referentiel/Corps.service';
import {TypeInstrumentsEtDispositifsIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentsEtDispositifsIrd.model';
import {TypeInstrumentsEtDispositifsIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentsEtDispositifsIrd.service';
import {CommissionScientifiqueVo} from 'src/app/controller/model/formulaire/CommissionScientifique.model';
import {CommissionScientifiqueService} from 'src/app/controller/service/formulaire/CommissionScientifique.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {IdentifiantAuteurExpertVo} from 'src/app/controller/model/formulaire/IdentifiantAuteurExpert.model';
import {IdentifiantAuteurExpertService} from 'src/app/controller/service/formulaire/IdentifiantAuteurExpert.service';
import {DomaineScientifiqueChercheurVo} from 'src/app/controller/model/formulaire/DomaineScientifiqueChercheur.model';
import {DomaineScientifiqueChercheurService} from 'src/app/controller/service/formulaire/DomaineScientifiqueChercheur.service';
import {EntiteAdministrativeVo} from 'src/app/controller/model/referentiel/EntiteAdministrative.model';
import {EntiteAdministrativeService} from 'src/app/controller/service/referentiel/EntiteAdministrative.service';
import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {DomaineScientifiqueVo} from 'src/app/controller/model/formulaire/DomaineScientifique.model';
import {DomaineScientifiqueService} from 'src/app/controller/service/formulaire/DomaineScientifique.service';
import {CommunauteSavoirVo} from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import {CommunauteSavoirService} from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {IdentifiantRechercheVo} from 'src/app/controller/model/referentiel/IdentifiantRecherche.model';
import {IdentifiantRechercheService} from 'src/app/controller/service/referentiel/IdentifiantRecherche.service';
import {InstrumentsEtDispositifsIrdChercheurVo} from 'src/app/controller/model/formulaire/InstrumentsEtDispositifsIrdChercheur.model';
import {
    InstrumentsEtDispositifsIrdChercheurService
} from 'src/app/controller/service/formulaire/InstrumentsEtDispositifsIrdChercheur.service';
import {User} from '../../../../../../controller/model/formulaire/User.model';
import {UserService} from '../../../../../../controller/service/formulaire/user.service';

@Component({
    selector: 'app-chercheur-edit-admin',
    templateUrl: './chercheur-edit-admin.component.html',
    styleUrls: ['./chercheur-edit-admin.component.css']
})
export class ChercheurEditAdminComponent implements OnInit {

    readonly emailValidationRegex = environment.emailValidation;

    selectedDomaineScientifiqueChercheurs: DomaineScientifiqueChercheurVo = new DomaineScientifiqueChercheurVo();
    domaineScientifiqueChercheursListe: Array<DomaineScientifiqueChercheurVo> = [];

    myDomaineScientifiques: Array<DomaineScientifiqueVo> = [];

    selectedZoneActiviteInteractionRecherches: ZoneActiviteInteractionRechercheVo = new ZoneActiviteInteractionRechercheVo();
    zoneActiviteInteractionRecherchesListe: Array<ZoneActiviteInteractionRechercheVo> = [];

    myPayss: Array<PaysVo> = [];

    selectedCommunauteSavoirChercheurs: CommunauteSavoirChercheurVo = new CommunauteSavoirChercheurVo();
    communauteSavoirChercheursListe: Array<CommunauteSavoirChercheurVo> = [];

    myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

    selectedInstrumentsEtDispositifsIrdChercheurs: InstrumentsEtDispositifsIrdChercheurVo = new InstrumentsEtDispositifsIrdChercheurVo();
    instrumentsEtDispositifsIrdChercheursListe: Array<InstrumentsEtDispositifsIrdChercheurVo> = [];

    myTypeInstrumentsEtDispositifsIrds: Array<TypeInstrumentsEtDispositifsIrdVo> = [];

    selectedIdentifiantAuteurExperts: IdentifiantAuteurExpertVo = new IdentifiantAuteurExpertVo();
    identifiantAuteurExpertsListe: Array<IdentifiantAuteurExpertVo> = [];

    myIdentifiantRecherches: Array<IdentifiantRechercheVo> = [];


    constructor(private chercheurService: ChercheurService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private communauteSavoirChercheurService: CommunauteSavoirChercheurService
        , private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
        , private departementScientifiqueService: DepartementScientifiqueService
        , private zoneActiviteInteractionRechercheService: ZoneActiviteInteractionRechercheService
        , private gradeService: GradeService
        , private userService: UserService
        , private corpsService: CorpsService
        , private typeInstrumentsEtDispositifsIrdService: TypeInstrumentsEtDispositifsIrdService
        , private commissionScientifiqueService: CommissionScientifiqueService
        , private paysService: PaysService
        , private identifiantAuteurExpertService: IdentifiantAuteurExpertService
        , private domaineScientifiqueChercheurService: DomaineScientifiqueChercheurService
        , private entiteAdministrativeService: EntiteAdministrativeService
        , private sexeService: SexeService
        , private domaineScientifiqueService: DomaineScientifiqueService
        , private communauteSavoirService: CommunauteSavoirService
        , private villeService: VilleService
        , private identifiantRechercheService: IdentifiantRechercheService
        , private instrumentsEtDispositifsIrdChercheurService: InstrumentsEtDispositifsIrdChercheurService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedChercheur.password = '';
        this.selectedDomaineScientifiqueChercheurs.domaineScientifiqueVo = new DomaineScientifiqueVo();
        this.domaineScientifiqueService.findAll().subscribe((data) => this.domaineScientifiques = data);
        this.selectedZoneActiviteInteractionRecherches.paysVo = new PaysVo();
        this.paysService.findAll().subscribe((data) => this.payss = data);
        this.selectedCommunauteSavoirChercheurs.communauteSavoirVo = new CommunauteSavoirVo();
        this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
        this.selectedInstrumentsEtDispositifsIrdChercheurs.typeInstrumentsEtDispositifsIrdVo = new TypeInstrumentsEtDispositifsIrdVo();
        this.typeInstrumentsEtDispositifsIrdService.findAll().subscribe((data) => this.typeInstrumentsEtDispositifsIrds = data);
        this.selectedIdentifiantAuteurExperts.identifiantRechercheVo = new IdentifiantRechercheVo();
        this.identifiantRechercheService.findAll().subscribe((data) => this.identifiantRecherches = data);
        this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
        this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
        this.selectedEntiteAdministrative = new EntiteAdministrativeVo();
        this.entiteAdministrativeService.findAll().subscribe((data) => this.entiteAdministratives = data);
        this.selectedPays = new PaysVo();
        this.paysService.findAll().subscribe((data) => this.payss = data);
        this.selectedVille = new VilleVo();
        this.villeService.findAll().subscribe((data) => this.villes = data);
        this.selectedDepartementScientifique = new DepartementScientifiqueVo();
        this.departementScientifiqueService.findAll().subscribe((data) => this.departementScientifiques = data);
        this.selectedCommissionScientifique = new CommissionScientifiqueVo();
        this.commissionScientifiqueService.findAll().subscribe((data) => this.commissionScientifiques = data);
        this.selectedGrade = new GradeVo();
        this.gradeService.findAll().subscribe((data) => this.grades = data);
        this.selectedCorps = new CorpsVo();
        this.corpsService.findAll().subscribe((data) => this.corpss = data);
        this.selectedSexe = new SexeVo();
        this.sexeService.findAll().subscribe((data) => this.sexes = data);
    }

    addDomaineScientifiqueChercheur() {
        if (this.selectedChercheur.domaineScientifiqueChercheursVo == null) {
            this.selectedChercheur.domaineScientifiqueChercheursVo = new Array<DomaineScientifiqueChercheurVo>();
        }
        this.selectedChercheur.domaineScientifiqueChercheursVo.push(this.selectedDomaineScientifiqueChercheurs);
        this.selectedDomaineScientifiqueChercheurs = new DomaineScientifiqueChercheurVo();
    }

    deleteDomaineScientifiqueChercheurs(p: DomaineScientifiqueChercheurVo) {
        this.selectedChercheur.domaineScientifiqueChercheursVo.forEach((element, index) => {
            if (element === p) {
                this.selectedChercheur.domaineScientifiqueChercheursVo.splice(index, 1);
            }
        });
    }

    addZoneActiviteInteractionRecherche() {
        if (this.selectedChercheur.zoneActiviteInteractionRecherchesVo == null) {
            this.selectedChercheur.zoneActiviteInteractionRecherchesVo = new Array<ZoneActiviteInteractionRechercheVo>();
        }
        this.selectedChercheur.zoneActiviteInteractionRecherchesVo.push(this.selectedZoneActiviteInteractionRecherches);
        this.selectedZoneActiviteInteractionRecherches = new ZoneActiviteInteractionRechercheVo();
    }

    deleteZoneActiviteInteractionRecherches(p: ZoneActiviteInteractionRechercheVo) {
        this.selectedChercheur.zoneActiviteInteractionRecherchesVo.forEach((element, index) => {
            if (element === p) {
                this.selectedChercheur.zoneActiviteInteractionRecherchesVo.splice(index, 1);
            }
        });
    }

    addCommunauteSavoirChercheur() {
        if (this.selectedChercheur.communauteSavoirChercheursVo == null) {
            this.selectedChercheur.communauteSavoirChercheursVo = new Array<CommunauteSavoirChercheurVo>();
        }
        this.selectedChercheur.communauteSavoirChercheursVo.push(this.selectedCommunauteSavoirChercheurs);
        this.selectedCommunauteSavoirChercheurs = new CommunauteSavoirChercheurVo();
    }

    deleteCommunauteSavoirChercheurs(p: CommunauteSavoirChercheurVo) {
        this.selectedChercheur.communauteSavoirChercheursVo.forEach((element, index) => {
            if (element === p) {
                this.selectedChercheur.communauteSavoirChercheursVo.splice(index, 1);
            }
        });
    }

    addInstrumentsEtDispositifsIrdChercheur() {
        if (this.selectedChercheur.instrumentsEtDispositifsIrdChercheursVo == null) {
            this.selectedChercheur.instrumentsEtDispositifsIrdChercheursVo = new Array<InstrumentsEtDispositifsIrdChercheurVo>();
        }
        this.selectedChercheur.instrumentsEtDispositifsIrdChercheursVo.push(this.selectedInstrumentsEtDispositifsIrdChercheurs);
        this.selectedInstrumentsEtDispositifsIrdChercheurs = new InstrumentsEtDispositifsIrdChercheurVo();
    }

    deleteInstrumentsEtDispositifsIrdChercheurs(p: InstrumentsEtDispositifsIrdChercheurVo) {
        this.selectedChercheur.instrumentsEtDispositifsIrdChercheursVo.forEach((element, index) => {
            if (element === p) {
                this.selectedChercheur.instrumentsEtDispositifsIrdChercheursVo.splice(index, 1);
            }
        });
    }

    addIdentifiantAuteurExpert() {
        if (this.selectedChercheur.identifiantAuteurExpertsVo == null) {
            this.selectedChercheur.identifiantAuteurExpertsVo = new Array<IdentifiantAuteurExpertVo>();
        }
        this.selectedChercheur.identifiantAuteurExpertsVo.push(this.selectedIdentifiantAuteurExperts);
        this.selectedIdentifiantAuteurExperts = new IdentifiantAuteurExpertVo();
    }

    deleteIdentifiantAuteurExperts(p: IdentifiantAuteurExpertVo) {
        this.selectedChercheur.identifiantAuteurExpertsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedChercheur.identifiantAuteurExpertsVo.splice(index, 1);
            }
        });
    }

    public edit() {
        this.editWithShowOption(false);
    }

    public editWithShowOption(showList: boolean) {
        if (this.selectedChercheur.password != this.selectedChercheur.confirmPassword) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Mot de passe ne Correspond pas a la Confirmation'});
        } else if (!this.emailValidationRegex.test(this.selectedChercheur.email)) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'l\'Email Principal ne Correspond pas a la forme xxxx@ird.fr'})
        }else {
            this.selectedChercheur.createdAt = DateUtils.toDate(this.selectedChercheur.createdAt);
            this.selectedChercheur.updatedAt = DateUtils.toDate(this.selectedChercheur.updatedAt);
            this.selectedChercheur.dateArchivage = DateUtils.toDate(this.selectedChercheur.dateArchivage);
            this.chercheurService.edit().subscribe(chercheur => {
                    const myIndex = this.chercheurs.findIndex(e => e.id === this.selectedChercheur.id);
                    this.chercheurs[myIndex] = this.selectedChercheur;

                    const index = this.users.findIndex(e=> e.id === chercheur.id);
                    this.users[index] = this.selectedChercheur;
                    this.editChercheurDialog = false;
                    this.selectedChercheur = new ChercheurVo();
            }, error => {
                console.log(error);
                if (error.status === 512) {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cette Adress Email deja existe essayer une autre'});
                }
            });
        }
    }

    public async openCreateentiteAdministrative(entiteAdministrative: string) {
        const isPermistted = await this.roleService.isPermitted('EntiteAdministrative', 'add');
        if (isPermistted) {
            this.selectedEntiteAdministrative = new EntiteAdministrativeVo();
            this.createEntiteAdministrativeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatetypeInstrumentsEtDispositifsIrd(typeInstrumentsEtDispositifsIrd: string) {
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentsEtDispositifsIrd', 'add');
        if (isPermistted) {
            this.selectedTypeInstrumentsEtDispositifsIrd = new TypeInstrumentsEtDispositifsIrdVo();
            this.createTypeInstrumentsEtDispositifsIrdDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateville(ville: string) {
        const isPermistted = await this.roleService.isPermitted('Ville', 'add');
        if (isPermistted) {
            this.selectedVille = new VilleVo();
            this.createVilleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatetypeEntiteAdministrative(typeEntiteAdministrative: string) {
        const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'add');
        if (isPermistted) {
            this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
            this.createTypeEntiteAdministrativeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatecorps(corps: string) {
        const isPermistted = await this.roleService.isPermitted('Corps', 'add');
        if (isPermistted) {
            this.selectedCorps = new CorpsVo();
            this.createCorpsDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatesexe(sexe: string) {
        const isPermistted = await this.roleService.isPermitted('Sexe', 'add');
        if (isPermistted) {
            this.selectedSexe = new SexeVo();
            this.createSexeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    get users(): Array<User> {
        return this.userService.users;
    }

    set users(value: Array<User>) {
        this.userService.users = value;
    }


    public async openCreatecommissionScientifique(commissionScientifique: string) {
        const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'add');
        if (isPermistted) {
            this.selectedCommissionScientifique = new CommissionScientifiqueVo();
            this.createCommissionScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateidentifiantRecherche(identifiantRecherche: string) {
        const isPermistted = await this.roleService.isPermitted('IdentifiantRecherche', 'add');
        if (isPermistted) {
            this.selectedIdentifiantRecherche = new IdentifiantRechercheVo();
            this.createIdentifiantRechercheDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreategrade(grade: string) {
        const isPermistted = await this.roleService.isPermitted('Grade', 'add');
        if (isPermistted) {
            this.selectedGrade = new GradeVo();
            this.createGradeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatecommunauteSavoir(communauteSavoir: string) {
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

    public async openCreatedepartementScientifique(departementScientifique: string) {
        const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'add');
        if (isPermistted) {
            this.selectedDepartementScientifique = new DepartementScientifiqueVo();
            this.createDepartementScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatepays(pays: string) {
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

    public async openCreatedomaineScientifique(domaineScientifique: string) {
        const isPermistted = await this.roleService.isPermitted('DomaineScientifique', 'add');
        if (isPermistted) {
            this.selectedDomaineScientifique = new DomaineScientifiqueVo();
            this.createDomaineScientifiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideEditDialog() {
        this.editChercheurDialog = false;
    }

// getters and setters

    get chercheurs(): Array<ChercheurVo> {
        return this.chercheurService.chercheurs;
    }

    set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
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

    get selectedEntiteAdministrative(): EntiteAdministrativeVo {
        return this.entiteAdministrativeService.selectedEntiteAdministrative;
    }

    set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
    }

    get entiteAdministratives(): Array<EntiteAdministrativeVo> {
        return this.entiteAdministrativeService.entiteAdministratives;
    }

    set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
    }

    get createEntiteAdministrativeDialog(): boolean {
        return this.entiteAdministrativeService.createEntiteAdministrativeDialog;
    }

    set createEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.createEntiteAdministrativeDialog = value;
    }

    get selectedTypeInstrumentsEtDispositifsIrd(): TypeInstrumentsEtDispositifsIrdVo {
        return this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd;
    }

    set selectedTypeInstrumentsEtDispositifsIrd(value: TypeInstrumentsEtDispositifsIrdVo) {
        this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd = value;
    }

    get typeInstrumentsEtDispositifsIrds(): Array<TypeInstrumentsEtDispositifsIrdVo> {
        return this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds;
    }

    set typeInstrumentsEtDispositifsIrds(value: Array<TypeInstrumentsEtDispositifsIrdVo>) {
        this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds = value;
    }

    get createTypeInstrumentsEtDispositifsIrdDialog(): boolean {
        return this.typeInstrumentsEtDispositifsIrdService.createTypeInstrumentsEtDispositifsIrdDialog;
    }

    set createTypeInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.typeInstrumentsEtDispositifsIrdService.createTypeInstrumentsEtDispositifsIrdDialog = value;
    }

    get selectedVille(): VilleVo {
        return this.villeService.selectedVille;
    }

    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
    }

    get villes(): Array<VilleVo> {
        return this.villeService.villes;
    }

    set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
    }

    get createVilleDialog(): boolean {
        return this.villeService.createVilleDialog;
    }

    set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog = value;
    }

    get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
        return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
    }

    set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
    }

    get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
        return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
    }

    set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
    }

    get createTypeEntiteAdministrativeDialog(): boolean {
        return this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog;
    }

    set createTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog = value;
    }

    get selectedCorps(): CorpsVo {
        return this.corpsService.selectedCorps;
    }

    set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
    }

    get corpss(): Array<CorpsVo> {
        return this.corpsService.corpss;
    }

    set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
    }

    get createCorpsDialog(): boolean {
        return this.corpsService.createCorpsDialog;
    }

    set createCorpsDialog(value: boolean) {
        this.corpsService.createCorpsDialog = value;
    }

    get selectedSexe(): SexeVo {
        return this.sexeService.selectedSexe;
    }

    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
    }

    get sexes(): Array<SexeVo> {
        return this.sexeService.sexes;
    }

    set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
    }

    get createSexeDialog(): boolean {
        return this.sexeService.createSexeDialog;
    }

    set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog = value;
    }

    get selectedCommissionScientifique(): CommissionScientifiqueVo {
        return this.commissionScientifiqueService.selectedCommissionScientifique;
    }

    set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
    }

    get commissionScientifiques(): Array<CommissionScientifiqueVo> {
        return this.commissionScientifiqueService.commissionScientifiques;
    }

    set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
    }

    get createCommissionScientifiqueDialog(): boolean {
        return this.commissionScientifiqueService.createCommissionScientifiqueDialog;
    }

    set createCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.createCommissionScientifiqueDialog = value;
    }

    get selectedIdentifiantRecherche(): IdentifiantRechercheVo {
        return this.identifiantRechercheService.selectedIdentifiantRecherche;
    }

    set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
    }

    get identifiantRecherches(): Array<IdentifiantRechercheVo> {
        return this.identifiantRechercheService.identifiantRecherches;
    }

    set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
    }

    get createIdentifiantRechercheDialog(): boolean {
        return this.identifiantRechercheService.createIdentifiantRechercheDialog;
    }

    set createIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.createIdentifiantRechercheDialog = value;
    }

    get selectedGrade(): GradeVo {
        return this.gradeService.selectedGrade;
    }

    set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
    }

    get grades(): Array<GradeVo> {
        return this.gradeService.grades;
    }

    set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
    }

    get createGradeDialog(): boolean {
        return this.gradeService.createGradeDialog;
    }

    set createGradeDialog(value: boolean) {
        this.gradeService.createGradeDialog = value;
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

    get selectedDepartementScientifique(): DepartementScientifiqueVo {
        return this.departementScientifiqueService.selectedDepartementScientifique;
    }

    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
    }

    get departementScientifiques(): Array<DepartementScientifiqueVo> {
        return this.departementScientifiqueService.departementScientifiques;
    }

    set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
    }

    get createDepartementScientifiqueDialog(): boolean {
        return this.departementScientifiqueService.createDepartementScientifiqueDialog;
    }

    set createDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.createDepartementScientifiqueDialog = value;
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

    get selectedDomaineScientifique(): DomaineScientifiqueVo {
        return this.domaineScientifiqueService.selectedDomaineScientifique;
    }

    set selectedDomaineScientifique(value: DomaineScientifiqueVo) {
        this.domaineScientifiqueService.selectedDomaineScientifique = value;
    }

    get domaineScientifiques(): Array<DomaineScientifiqueVo> {
        return this.domaineScientifiqueService.domaineScientifiques;
    }

    set domaineScientifiques(value: Array<DomaineScientifiqueVo>) {
        this.domaineScientifiqueService.domaineScientifiques = value;
    }

    get createDomaineScientifiqueDialog(): boolean {
        return this.domaineScientifiqueService.createDomaineScientifiqueDialog;
    }

    set createDomaineScientifiqueDialog(value: boolean) {
        this.domaineScientifiqueService.createDomaineScientifiqueDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
