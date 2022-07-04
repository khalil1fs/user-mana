import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem, Message, MessageService} from 'primeng/api';
import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/referentiel/TypeEntiteAdministrative.model';
import {EntiteAdministrativeVo} from '../../../../../controller/model/referentiel/EntiteAdministrative.model';
import {PaysVo} from '../../../../../controller/model/referentiel/Pays.model';
import {VilleVo} from '../../../../../controller/model/referentiel/Ville.model';
import {DepartementScientifiqueVo} from '../../../../../controller/model/formulaire/DepartementScientifique.model';
import {CommissionScientifiqueVo} from '../../../../../controller/model/formulaire/CommissionScientifique.model';
import {GradeVo} from '../../../../../controller/model/referentiel/Grade.model';
import {CorpsVo} from '../../../../../controller/model/referentiel/Corps.model';
import {SexeVo} from '../../../../../controller/model/referentiel/Sexe.model';
import {ImportChercheurVO} from '../../../../../controller/model/formulaire/ImportChercheur.model';
import {Table} from 'primeng/table';
import {ChercheurService} from '../../../../../controller/service/formulaire/Chercheur.service';
import {RoleService} from '../../../../../controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/referentiel/TypeEntiteAdministrative.service';
import {EntiteAdministrativeService} from '../../../../../controller/service/referentiel/EntiteAdministrative.service';
import {PaysService} from '../../../../../controller/service/referentiel/Pays.service';
import {VilleService} from '../../../../../controller/service/referentiel/Ville.service';
import {DepartementScientifiqueService} from '../../../../../controller/service/formulaire/DepartementScientifique.service';
import {CommissionScientifiqueService} from '../../../../../controller/service/formulaire/CommissionScientifique.service';
import {GradeService} from '../../../../../controller/service/referentiel/Grade.service';
import {CorpsService} from '../../../../../controller/service/referentiel/Corps.service';
import {SexeService} from '../../../../../controller/service/referentiel/Sexe.service';
import {CardviewService} from '../../../../../controller/service/formulaire/cardview.service';
import {ChercheurVo} from '../../../../../controller/model/formulaire/Chercheur.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {environment} from '../../../../../../environments/environment';
import {User} from '../../../../../controller/model/formulaire/User.model';
import {UserService} from '../../../../../controller/service/formulaire/user.service';
import {TokenService} from '../../../../../controller/service/formulaire/Token.service';
import {DateUtils} from '../../../../../utils/DateUtils';

@Component({
  selector: 'app-user-app-list',
  templateUrl: './user-app-list.component.html',
  styleUrls: ['./user-app-list.component.scss']
})
export class UserAppListComponent implements OnInit {

  // declarations
  findByCriteriaShow = false;
  cols: any[] = [];

  excelPdfButons: MenuItem[];
  userButtons: MenuItem[];

  // users: User[];
  // Permet de choisir quelle vue on souhaite (carte ou lignes)
  isCardDisplayActivated = true;
  exportData: any[] = [];
  fileName = 'Chercheur';
  typeEntiteAdministratives: Array<TypeEntiteAdministrativeVo>;
  entiteAdministratives: Array<EntiteAdministrativeVo>;
  payss: Array<PaysVo>;
  villes: Array<VilleVo>;
  departementScientifiques: Array<DepartementScientifiqueVo>;
  commissionScientifiques: Array<CommissionScientifiqueVo>;
  grades: Array<GradeVo>;
  corpss: Array<CorpsVo>;
  sexes: Array<SexeVo>;
  chargement = false;
  chargementTermine = false;
  chargementFailed = false;
  importChercheurVO: ImportChercheurVO;
  msgsSuccessImport: Message[];
  msgsFailedImport: Message[];
  btnChargementDisabled = false;

  // Contient une liste de chercheurs mise à plat.
  flatChercheurs: FlatChercheurs[] = [];


  yesOrNoFormationEnManagement: any[] = [];
  yesOrNoCredentialsNonExpired: any[] = [];
  yesOrNoEnabled: any[] = [];
  yesOrNoAccountNonExpired: any[] = [];
  yesOrNoAccountNonLocked: any[] = [];
  yesOrNoPasswordChanged: any[] = [];

  @ViewChild('dt')
  tableChercheur: Table;


  constructor(private chercheurService: ChercheurService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private roleService: RoleService,
              private router: Router, private typeEntiteAdministrativeService: TypeEntiteAdministrativeService,
              private entiteAdministrativeService: EntiteAdministrativeService, private paysService: PaysService,
              private villeService: VilleService, private departementScientifiqueService: DepartementScientifiqueService,
              private commissionScientifiqueService: CommissionScientifiqueService, private gradeService: GradeService,
              private corpsService: CorpsService, private sexeService: SexeService
              , private cardViewService: CardviewService, private userService: UserService
              , private tokenService: TokenService
  ) {
  }

  sortByColumnName($event: any, gridObject: Table) {
    const columnToSort = gridObject.columns.find(col => col.field === $event.field);
    gridObject.sortField = columnToSort.field;
    gridObject.sortOrder = $event.order ? 1 : -1;
    gridObject.sortSingle();
  }


  /**
   * Construit une copie de liste de chercheurs avec les champs profonds mis à plat
   */
  buildFlatChercheurs() {
    this.flatChercheurs = this.chercheurs.map(chercheur => new FlatChercheurs(chercheur));
    return this.flatChercheurs;
  }

  buildFlatusers() {
    this.flatChercheurs = this.chercheurs.map(chercheur => new FlatChercheurs(chercheur));
    return this.flatChercheurs;
  }

  ngOnInit(): void {
    this.initButtonAddUser();
    this.loadChercheurs();
    this.initExport();
    this.initCol();
    this.loadTypeEntiteAdministrative();
    this.loadEntiteAdministrative();
    this.loadPays();
    this.loadVille();
    this.loadDepartementScientifique();
    this.loadCommissionScientifique();
    this.loadGrade();
    this.loadCorps();
    this.loadSexe();
    this.initYesOrNo();
    this.buildFlatChercheurs();
  }

  private initYesOrNo(): void {
    this.yesOrNoFormationEnManagement = [{label: 'Formation en management', value: null}, {
      label: 'Oui',
      value: 1
    }, {
      label: 'Non',
      value: 0
    }];
    this.yesOrNoCredentialsNonExpired = [{label: 'Identifiants non expirés', value: null}, {
      label: 'Oui',
      value: 1
    }, {
      label: 'Non',
      value: 0
    }];
    this.yesOrNoEnabled = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    this.yesOrNoAccountNonExpired = [{label: 'Comptes non expirés', value: null}, {
      label: 'Oui',
      value: 1
    }, {label: 'Non', value: 0}];
    this.yesOrNoAccountNonLocked = [{label: 'Comptes non vérouillés', value: null}, {
      label: 'Oui',
      value: 1
    }, {label: 'Non', value: 0}];
    this.yesOrNoPasswordChanged = [{label: 'Mots de passes changés', value: null}, {label: 'Oui', value: 1}, {
      label: 'Non',
      value: 0
    }];
  }

  // methods
  public async loadChercheurs() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.chercheurService.findAllUser().subscribe(data => {
          this.users = data;
          this.buildFlatChercheurs();
        } , error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
  }

  // validateEmailAdress(email: string): boolean {
  //   var regex = /[a-zA-Z0-9_.+-]+@ird\.fr/
  //   return regex.test(email);
  // }

  get users(): Array<User> {
    return this.userService.users;
  }

  set users(value: Array<User>) {
    this.userService.users = value;
  }

  get user(): User {
    return this.userService.user;
  }

  set user(value: User) {
    this.userService.user = value;
  }

  public searchRequest() {
    this.userService.findByCriteria(this.searchChercheur).subscribe(data => {
      this.users = data;
      console.log('data: '+data);
      this.buildFlatChercheurs();
      this.tableChercheur.first = 0;
    }, error => console.log(error));
  }

  private initCol() {
    this.cols = [
      {field: 'numeroMatricule', header: 'Numéro matricule'},
      {field: 'email', header: 'Email'},
      {field: 'typeEntiteAdministrative?.libelle', header: 'Type entité administrative'},
      {field: 'entiteAdministrative?.libelle', header: 'Entité administrative'},
      {field: 'pays', header: 'Pays'},
      {field: 'ville', header: 'Ville'},
      {field: 'departementScientifique?.libelle', header: 'Département scientifique'},
      {field: 'commissionScientifique?.libelle', header: 'Commission scientifique'},
      {field: 'grade?.libelle', header: 'Grade'},
      {field: 'corps?.libelle', header: 'Corps'},
      {field: 'sexe?.libelle', header: 'Sexe'},
      {field: 'natureImplication', header: 'Nature implication'},
      {field: 'resume', header: 'Resume'},
      {field: 'formationEnManagement', header: 'Formation en management'},
      {field: 'credentialsNonExpired', header: 'Credentials non expired'},
      {field: 'enabled', header: 'Enabled'},
      {field: 'createdAt', header: 'Crée le'},
      {field: 'updatedAt', header: 'Mis-à-jour le'},
      {field: 'accountNonExpired', header: 'Compte non expiré'},
      {field: 'accountNonLocked', header: 'Compte non vérouillé'},
      {field: 'username', header: 'Nom d\'utilisateur'},
      {field: 'password', header: 'Mot de passe'},
      {field: 'prenom', header: 'Prénom'},
      {field: 'nom', header: 'Nom'},
      {field: 'role', header: 'Role'},
      {field: 'passwordChanged', header: 'Mot de passe changé'},
    ];
  }

  public async editChercheur(chercheur: ChercheurVo) {
    // const chercheur = this.chercheurs.find(tmpChercheur => tmpChercheur.id === flatChercheur.id);
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'edit');
    if (isPermistted) {
      this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(res => {
        res.role = this.selectedChercheur.role;
        this.selectedChercheur = res;
        this.selectedChercheur.createdAt = new Date(chercheur.createdAt);
        this.selectedChercheur.updatedAt = new Date(chercheur.updatedAt);
        this.selectedChercheur.dateArchivage = new Date(chercheur.dateArchivage);
        this.selectedChercheur.password = null;
        this.userDialogTitle = 'Editer un Chercheur';
        this.editChercheurDialog = true;
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
      });
    }

  }


  public async viewChercheur(chercheur: ChercheurVo) {
    // const chercheur = this.chercheurs.find(tmpChercheur => tmpChercheur.id === flatChercheur.id);
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'view');
    if (isPermistted) {
      this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(res => {
        this.selectedChercheur = res;
        this.selectedChercheur.createdAt = new Date(chercheur.createdAt);
        this.selectedChercheur.updatedAt = new Date(chercheur.updatedAt);
        this.selectedChercheur.dateArchivage = new Date(chercheur.dateArchivage);
        this.viewChercheurDialog = true;
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
      });
    }

  }

  public async openCreateChercheur(pojo: string) {
    const isPermistted = await this.roleService.isPermitted(pojo, 'add');
    if (isPermistted) {
      this.selectedChercheur = new ChercheurVo();
      this.createChercheurDialog = true;
    } else {
      this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
      });
    }

  }

  public async deleteChercheur(flatChercheur: FlatChercheurs) {
    const chercheur = this.chercheurs.find(tmpChercheur => tmpChercheur.id === flatChercheur.id);
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'delete');
    if (isPermistted) {
      this.confirmationService.confirm({
        message: 'Voulez-vous supprimé cet élément (Chercheur) ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.chercheurService.delete(chercheur).subscribe(status => {
            if (status > 0) {
              const position = this.chercheurs.indexOf(chercheur);
              // tslint:disable-next-line:no-unused-expression
              position > -1 ? this.chercheurs.splice(position, 1) : false;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Chercheur Supprimé',
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

  public async loadTypeEntiteAdministrative() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');

    // tslint:disable-next-line:max-line-length
    isPermistted ? this.typeEntiteAdministrativeService.findAll().subscribe(typeEntiteAdministratives => this.typeEntiteAdministratives = typeEntiteAdministratives, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

  }

  public async loadEntiteAdministrative() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    // tslint:disable-next-line:max-line-length
    isPermistted ? this.entiteAdministrativeService.findAll().subscribe(entiteAdministratives => this.entiteAdministratives = entiteAdministratives, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});
  }

  public async loadPays() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

  }

  public async loadVille() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

  }

  public async loadDepartementScientifique() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    // tslint:disable-next-line:max-line-length
    isPermistted ? this.departementScientifiqueService.findAll().subscribe(departementScientifiques => this.departementScientifiques = departementScientifiques, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

  }

  deleteUser(user: User) {
    const tokenDecoded = this.tokenService.decode();
    const username = tokenDecoded.sub;
    if(username == user.username){
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Vous ne pouvez pas suprimer '+username+' car c\'est l\'Utilisateur courant', life: 3000})
    }else {
      this.confirmationService.confirm({
        message: 'Voulez vous supprimez l\'Utilisateur '+ user.prenom + ' ' + user.nom + ' ?',
        header: 'Confirmer',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userService.delete(user.id);
          this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Utilisateur suprimé', life: 2000});
        }
      });
    }
  }

  public async loadCommissionScientifique() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    // tslint:disable-next-line:max-line-length
    isPermistted ? this.commissionScientifiqueService.findAll().subscribe(commissionScientifiques => this.commissionScientifiques = commissionScientifiques, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

  }

  public async loadGrade() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.gradeService.findAll().subscribe(grades => this.grades = grades, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

  }

  public async loadCorps() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.corpsService.findAll().subscribe(corpss => this.corpss = corpss, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

  }

  public async loadSexe() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.sexeService.findAll().subscribe(sexes => this.sexes = sexes, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

  }

  public async duplicateChercheur(flatChercheur: FlatChercheurs) {
    const chercheur = this.chercheurs.find(tmpChercheur => tmpChercheur.id === flatChercheur.id);

    this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(
        res => {
          this.initDuplicateChercheur(res);
          this.selectedChercheur = res;
          this.selectedChercheur.id = null;
          this.createChercheurDialog = true;

        });

  }

  initDuplicateChercheur(res: ChercheurVo) {
    if (res.domaineScientifiqueChercheursVo != null) {
      res.domaineScientifiqueChercheursVo.forEach(d => {
        d.chercheurVo = null;
        d.id = null;
      });
    }
    if (res.zoneActiviteInteractionRecherchesVo != null) {
      res.zoneActiviteInteractionRecherchesVo.forEach(d => {
        d.chercheurVo = null;
        d.id = null;
      });
    }
    if (res.communauteSavoirChercheursVo != null) {
      res.communauteSavoirChercheursVo.forEach(d => {
        d.chercheurVo = null;
        d.id = null;
      });
    }
    if (res.instrumentsEtDispositifsIrdChercheursVo != null) {
      res.instrumentsEtDispositifsIrdChercheursVo.forEach(d => {
        d.chercheurVo = null;
        d.id = null;
      });
    }
    if (res.identifiantAuteurExpertsVo != null) {
      res.identifiantAuteurExpertsVo.forEach(d => {
        d.chercheurVo = null;
        d.id = null;
      });
    }


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

  get userDialog():boolean{
    return this.userService.userDialog;
  }
  set userDialog(userDialog:boolean){
    this.userService.userDialog = userDialog;
  }




  private openCreateAdmin(add: string) {
    this.userDialogTitle = 'Ajouter un Admin';
    this.userDialog = true;
    this.user = new User();
    this.user.passwordChanged = false;
  }

  private openCreatePilot(add: string) {
    this.userDialogTitle = 'Ajouter un Pilot de Donnee';
    this.userDialog = true;
    this.user = new User();
    this.user.passwordChanged = true;
  }


  initButtonAddUser(): void {
    this.userButtons = [
      {
        label: 'Admin', icon: 'pi pi-cog', command: () => {
          this.openCreateAdmin('admin');
        }
      },
      {
        label: 'Chercheur', icon: 'pi pi-search', command: () => {
          this.openCreateChercheur('chercheur');
        }
      },
      {
        label: 'Pilot', icon: 'pi pi-fw pi-plus-circle', command: () => {
          this.openCreatePilot('pilot');
        }
      }
    ];
  }





  exportExcel(): void {
    import('xlsx').then(async xlsx => {
      this.prepareColumnExport();
      const worksheet = xlsx.utils.json_to_sheet(this.exportData);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
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
    const doc = new jsPDF('landscape');
    autoTable(doc, {
      columns: [
        {header: 'Numero matricule', dataKey: 'Numero matricule'},
        {header: 'Email', dataKey: 'Email'},
        {header: 'Type entite administrative', dataKey: 'Type entite administrative'},
        {header: 'Entite administrative', dataKey: 'Entite administrative'},
        {header: 'Pays', dataKey: 'Pays'},
        {header: 'Ville', dataKey: 'Ville'},
        {header: 'Departement scientifique', dataKey: 'Departement scientifique'},
        {header: 'Commission scientifique', dataKey: 'Commission scientifique'},
        {header: 'Grade', dataKey: 'Grade'},
        {header: 'Corps', dataKey: 'Corps'},
        {header: 'Sexe', dataKey: 'Sexe'},
        {header: 'Nature implication', dataKey: 'Nature implication'},
        {header: 'Resume', dataKey: 'Resume'},
        {header: 'Formation en management', dataKey: 'Formation en management'},
        {header: 'Credentials non expired', dataKey: 'Credentials non expired'},
        {header: 'Enabled', dataKey: 'Enabled'},
        {header: 'Created at', dataKey: 'Created at'},
        {header: 'Updated at', dataKey: 'Updated at'},
        {header: 'Account non expired', dataKey: 'Account non expired'},
        {header: 'Account non locked', dataKey: 'Account non locked'},
        {header: 'Username', dataKey: 'Username'},
        {header: 'Password', dataKey: 'Password'},
        {header: 'Prenom', dataKey: 'Prenom'},
        {header: 'Nom', dataKey: 'Nom'},
        {header: 'Role', dataKey: 'Role'},
        {header: 'Password changed', dataKey: 'Password changed'},
      ],
      body: this.exportData, styles: {fontSize: 5}
    });
    doc.save(this.fileName + '.pdf');
  }

   saveAs(blob: Blob, s: string) {

  }

  exportCSV() {
    this.prepareColumnExport();
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.exportData[0]);
    const csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
    csv.unshift(header.join(';'));
    const csvArray = csv.join('\r\n');
    const blob = new Blob([csvArray], {type: 'text/csv'});

    this.saveAs(blob, this.fileName + '.csv');
  }

  prepareColumnExport(): void {
    this.exportData = this.chercheurs.map(e => {
      return {
        'Numero matricule': e.numeroMatricule,
        Email: e.email,
        'Type entite administrative': e.typeEntiteAdministrativeVo?.libelle,
        'Entite administrative': e.entiteAdministrativeVo?.libelle,
        Pays: e.paysVo?.libelle,
        Ville: e.villeVo?.libelle,
        'Departement scientifique': e.departementScientifiqueVo?.libelle,
        'Commission scientifique': e.commissionScientifiqueVo?.libelle,
        Grade: e.gradeVo?.libelle,
        Corps: e.corpsVo?.libelle,
        Sexe: e.sexeVo?.libelle,
        'Nature implication': e.natureImplication,
        Resume: e.resume,
        'Formation en management': e.formationEnManagement,
        'Credentials non expired': e.credentialsNonExpired,
        Enabled: e.enabled,
        'Created at': e.createdAt,
        'Updated at': e.updatedAt,
        'Account non expired': e.accountNonExpired,
        'Account non locked': e.accountNonLocked,
        Username: e.username,
        Password: e.password,
        Prenom: e.prenom,
        Nom: e.nom,
        Role: e.role,
        'Password changed': e.passwordChanged,
      };
    });
  }

  // getters and setters

  get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
  }

  set chercheurs(value: Array<ChercheurVo>) {
    this.chercheurService.chercheurs = value;
  }

  get chercheurSelections(): Array<ChercheurVo> {
    return this.chercheurService.chercheurSelections;
  }

  set chercheurSelections(value: Array<ChercheurVo>) {
    this.chercheurService.chercheurSelections = value;
  }


  get selectedChercheur(): ChercheurVo {
    return this.chercheurService.selectedChercheur;
  }

  set selectedChercheur(value: ChercheurVo) {
    this.chercheurService.selectedChercheur = value;
  }

  get createChercheurDialog(): boolean {
    return this.chercheurService.createChercheurDialog;
  }

  set createChercheurDialog(value: boolean) {
    this.chercheurService.createChercheurDialog = value;
  }

  get editChercheurDialog(): boolean {
    return this.chercheurService.editChercheurDialog;
  }

  set editChercheurDialog(value: boolean) {
    this.chercheurService.editChercheurDialog = value;
  }

  get viewChercheurDialog(): boolean {
    return this.chercheurService.viewChercheurDialog;
  }


  get userDialogTitle(): string {
    return this.userService.userDialogTitle;
  }

  set userDialogTitle(value: string){
    this.userService.userDialogTitle = value;
  }


  set viewChercheurDialog(value: boolean) {
    this.chercheurService.viewChercheurDialog = value;
  }

  get searchChercheur(): ChercheurVo {
    return this.chercheurService.searchChercheur;
  }

  set searchChercheur(value: ChercheurVo) {
    this.chercheurService.searchChercheur = value;
  }

  get dateFormat() {
    return environment.dateFormatList;
  }

  importFromGraphql() {
    this.chargement = true;
    this.chargementTermine = false;
    this.chargementFailed = false;
    this.btnChargementDisabled = true;
    this.chercheurService.importFromGraphql().subscribe(response => {
      this.importChercheurVO = response;
      console.log(response);
      this.chargementTermine = true;
      console.log('chercheurs is being loaded');
      this.loadChercheurs();
      this.msgsSuccessImport = [
        {
          severity: 'success',
          closable: false,
          summary: 'Succès',
          detail: 'Nombre des chercheurs ajoutés: ' + this.importChercheurVO?.nbAdded
        },
        {
          severity: 'success',
          closable: false,
          summary: 'Succès',
          detail: 'Nombre des chercheurs modifiés: ' + this.importChercheurVO?.nbmodified
        },
      ];
      this.btnChargementDisabled = false;
    }, error => {
      console.log(error);
      this.msgsFailedImport = [
        {
          severity: 'error',
          closable: false,
          summary: 'Error',
          detail: 'Une erreur est survenue lors de l\'importation des chercheurs merci de ressayer'
        },
      ];
      this.chargementFailed = true;
      this.btnChargementDisabled = false;
    });
  }

  get submitted():boolean{
    return this.userService.submitted;
  }
  set submitted(submitted:boolean){
    this.userService.submitted = submitted;
  }

  get userViewDialog():boolean{
    return this.userService.userViewDialog;
  }

  set userViewDialog(value:boolean){
    this.userService.userViewDialog = value;
  }

  /**
   * Si la vue 'cartes' est à true, on désactive le multi-tri.
   * sinon, on l'active.
   */
  getSortMode() {
    if (this.isCardDisplayActivated) {
      return 'single';
    }
    return 'multiple';
  }

  clearRequest() {
    this.searchChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe(chercheurs => {

      this.chercheurs = chercheurs;
      this.buildFlatChercheurs();
      this.tableChercheur.first = 0;
    }, error => console.log(error));
  }


  viewUser(user: User) {
    this.user = user;
    this.user.dateArchivage = new Date(user.dateArchivage);
    this.user.createdAt = new Date(user.createdAt);
    this.user.updatedAt = new Date(user.updatedAt);
    this.user.password = null;
    this.userDialogTitle = 'Details d\'un Utilisateur';
    this.userViewDialog = true;
  }


  edit(user: User) {
    console.log('hani f edit');
    this.user = user;
    // this.user.dateArchivage = DateUtils.toDate(user.dateArchivage);
    this.user.dateArchivage = new Date(user.dateArchivage);
    this.user.password = null;
    this.userDialogTitle = 'Editer un Utilisateur';
    this.submitted = true;
    this.userDialog = true;
    console.log('hani f edit');
  }


}


class FlatChercheurs {
  public id: string;
  public numeroMatricule: string;
  public email: string;
  public username: string;
  public prenom: string;
  public nom: string;
  public pays: string;
  public ville: string;
  public createdAt: Date | string;
  public updatedAt: Date | string;


  constructor(chercheur: ChercheurVo) {
    this.id = chercheur.id;
    this.createdAt = chercheur.createdAt ? chercheur.createdAt : '';
    this.updatedAt = chercheur.updatedAt ? chercheur.updatedAt : '';
    this.numeroMatricule = chercheur.numeroMatricule ? chercheur.numeroMatricule : '';
    this.email = chercheur.email ? chercheur.email : '';
    this.username = chercheur.username ? chercheur.username : '';
    this.prenom = chercheur.prenom ? chercheur.prenom : '';
    this.nom = chercheur.nom ? chercheur.nom : '';
    this.pays = chercheur.paysVo?.libelle ? chercheur.paysVo?.libelle : '';
    this.ville = chercheur.villeVo?.libelle ? chercheur.villeVo?.libelle : '';
  }

}
