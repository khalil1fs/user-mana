import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GestionEquipeService} from 'src/app/controller/service/formulaire/GestionEquipe.service';
import {GestionEquipeVo} from 'src/app/controller/model/formulaire/GestionEquipe.model';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CardviewService} from 'src/app/controller/service/formulaire/cardview.service';
import {Table} from 'primeng/table';
import {FaaTableColumnsModel} from 'src/app/controller/model/formulaire/FaaTableColumns.model';
import {EtatEnum} from 'src/app/utils/EtatEnum';


@Component({
    selector: 'app-table-gestion-equipe-admin',
    templateUrl: './table-gestion-equipe-admin.component.html',
    styleUrls: ['./table-gestion-equipe-admin.component.scss'],
})
export class TableGestionEquipeAdminComponent implements OnInit, AfterViewInit {

    // Titre des colonnes
    cols: FaaTableColumnsModel[] = [];

    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;

    // Date
    dateActuelle: Date = new Date();

    constructor(private gestionEquipeService: GestionEquipeService,
                private authService: AuthService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private cardViewService: CardviewService,
                private roleService: RoleService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.loadGestionEquipes();
        this.initCol();
        this.isCardDisplayActivated = this.cardViewService.isDefaultModeCards();
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
    }


    private initCol() {
        this.cols = [
            new FaaTableColumnsModel('tempsEstimePourCetteAnnne', 'Temps estimé pour cette annnée'),
            new FaaTableColumnsModel('chercheur?.numeroMatricule', 'Chercheur'),
            new FaaTableColumnsModel('campagne.libelle', 'Campagne'),
            new FaaTableColumnsModel('etatEtapeCampagneVo.libelle', 'Etat étape campagne')
        ];
    }


    // methods
    public async loadGestionEquipes() {
        const chercheur = this.authService.authenticatedUserByAdmin();
        await this.roleService.findAll();
        if (chercheur !== null) {
            const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
            isPermistted ? this.gestionEquipeService.findByChercheurId(chercheur.id)
                    .subscribe(gestionEquipes => this.gestionEquipes = gestionEquipes, error => console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        } else {
            const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
            isPermistted ? this.gestionEquipeService.findAll()
                    .subscribe(gestionEquipes => this.gestionEquipes = gestionEquipes, error => console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
    }

    public async duplicateGestionEquipe(gestionEquipe: GestionEquipeVo) {
        this.gestionEquipeService.findByIdWithAssociatedList(gestionEquipe).subscribe(
            res => {
                this.initDuplicateGestionEquipe(res);
                this.selectedGestionEquipe = res;
                this.selectedGestionEquipe.id = null;
                this.createGestionEquipeDialog = true;
            });
    }

    initDuplicateGestionEquipe(res: GestionEquipeVo) {
        if (res.gestionEquipeDetailsVo != null) {
            res.gestionEquipeDetailsVo.forEach(d => {
                d.gestionEquipeVo = null;
                d.id = null;
            });
        }
    }

    public async editGestionEquipe(gestionEquipe: GestionEquipeVo) {
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'edit');
        if (isPermistted) {
            this.gestionEquipeService.findByIdWithAssociatedList(gestionEquipe).subscribe(res => {
                this.selectedGestionEquipe = res;
                this.editGestionEquipeDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }

    public async deleteGestionEquipe(gestionEquipe: GestionEquipeVo) {
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Gestion equipe) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.gestionEquipeService.delete(gestionEquipe).subscribe(status => {
                        if (status > 0) {
                            const position = this.gestionEquipes.indexOf(gestionEquipe);
                            position > -1 ? this.gestionEquipes.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Gestion equipe Supprimé',
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

    updateDisplay(event: boolean) {
        this.isCardDisplayActivated = event;
    }

    public async viewGestionEquipe(gestionEquipe: GestionEquipeVo) {
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'view');
        if (isPermistted) {
            this.gestionEquipeService.findByIdWithAssociatedList(gestionEquipe).subscribe(res => {
                this.selectedGestionEquipe = res;
                this.viewGestionEquipeDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    sortByColumnName($event: any, gridObject: Table) {
        const columnToSort = gridObject.columns.find(col => col.field === $event.field);
        gridObject.sortField = columnToSort.field;
        gridObject.sortOrder = $event.order ? 1 : -1;
        gridObject.sortSingle();
        console.log(columnToSort);
    }

    // TODO TAREG A RETIRER Uniquement pour présentation
    getRandomStatus(position: string) {
        const arrayOfStatus = [EtatEnum.TERMINE, EtatEnum.ARCHIVE, EtatEnum.INITIALISE, EtatEnum.ENCOURS, 'Sevère', 'Courant', '', null, 'Testé'];
        let postTable = Math.floor(parseInt(position)) < arrayOfStatus.length ? Math.floor(parseInt(position)) : Math.floor(parseInt(position)) % arrayOfStatus.length;
        console.log(arrayOfStatus[postTable]);
        return arrayOfStatus[postTable];
    }

    /**
     * GETTERS & SETTERS
     */
    get gestionEquipes(): Array<GestionEquipeVo> {
        return this.gestionEquipeService.gestionEquipes;
    }


    set gestionEquipes(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipes = value;
    }

    get viewGestionEquipeDialog(): boolean {
        return this.gestionEquipeService.viewGestionEquipeDialog;
    }

    set viewGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.viewGestionEquipeDialog = value;
    }

    get editGestionEquipeDialog(): boolean {
        return this.gestionEquipeService.editGestionEquipeDialog;
    }

    set editGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.editGestionEquipeDialog = value;
    }

    get selectedGestionEquipe(): GestionEquipeVo {
        return this.gestionEquipeService.selectedGestionEquipe;
    }

    set selectedGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.selectedGestionEquipe = value;
    }

    get createGestionEquipeDialog(): boolean {
        return this.gestionEquipeService.createGestionEquipeDialog;
    }

    set createGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.createGestionEquipeDialog = value;
    }


}
