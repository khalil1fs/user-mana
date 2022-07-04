import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleService } from './Role.service';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';


import { ChercheurVo } from '../../model/formulaire/Chercheur.model';
import { CommunauteSavoirChercheurVo } from '../../model/formulaire/CommunauteSavoirChercheur.model';
import { TypeEntiteAdministrativeVo } from '../../model/referentiel/TypeEntiteAdministrative.model';
import { DepartementScientifiqueVo } from '../../model/formulaire/DepartementScientifique.model';
import { ZoneActiviteInteractionRechercheVo } from '../../model/formulaire/ZoneActiviteInteractionRecherche.model';
import { GradeVo } from '../../model/referentiel/Grade.model';
import { CorpsVo } from '../../model/referentiel/Corps.model';
import { CommissionScientifiqueVo } from '../../model/formulaire/CommissionScientifique.model';
import { PaysVo } from '../../model/referentiel/Pays.model';
import { IdentifiantAuteurExpertVo } from '../../model/formulaire/IdentifiantAuteurExpert.model';
import { DomaineScientifiqueChercheurVo } from '../../model/formulaire/DomaineScientifiqueChercheur.model';
import { EntiteAdministrativeVo } from '../../model/referentiel/EntiteAdministrative.model';
import { SexeVo } from '../../model/referentiel/Sexe.model';
import { VilleVo } from '../../model/referentiel/Ville.model';
import { InstrumentsEtDispositifsIrdChercheurVo } from '../../model/formulaire/InstrumentsEtDispositifsIrdChercheur.model';
import { CampagneVo } from '../../model/formulaire/Campagne.model';

import { ImportChercheurVO } from '../../model/formulaire/ImportChercheur.model';
import {User} from '../../model/formulaire/User.model';

@Injectable({
    providedIn: 'root'
})
export class ChercheurService {
    private API = ''
    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/chercheur/';
        })
    }
    private _chercheurs: Array<ChercheurVo>;
    private _selectedChercheur: ChercheurVo;
    private _chercheurSelections: Array<ChercheurVo>;
    private _createChercheurDialog: boolean;
    private _editChercheurDialog: boolean;
    private _viewChercheurDialog: boolean;
    public editChercheur$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchChercheur: ChercheurVo;
    private _selectedChercheurs: Array<ChercheurVo>;
    private _availableChercheurs: Array<ChercheurVo>;
    private _connectedChercheur: ChercheurVo;
    private _switchChercheurDialog: boolean;

    // methods

    public findByCampagne(campagne: CampagneVo): Observable<Array<ChercheurVo>> {
        return this.http.get<Array<ChercheurVo>>(this.API + 'findByCampagne/id/' + campagne.id);
    }


    public findAll() {
        return this.http.get<Array<ChercheurVo>>(this.API);
    }

    public findAllUser() {
        return this.http.get<Array<User>>(this.API + 'all-user-with-set/');
    }



    public findByUserName(username): Observable<ChercheurVo> {
        return this.http.get<ChercheurVo>(this.API + 'username/'+username);
    }


    findAvailableChercheurs(campagne: CampagneVo): Observable<Array<ChercheurVo>> {
        return this.http.get<Array<ChercheurVo>>(this.API + 'findAvailableChercheurs/id/' + campagne.id);
    }

    public save(): Observable<ChercheurVo> {
        return this.http.post<ChercheurVo>(this.API, { ...this.selectedChercheur, updatedAt: moment(this.selectedChercheur.updatedAt).format("YYYY-MM-DD") });
    }

    public count(username) {
        return this.http.get<number>(this.API + 'profile/username/'+username);
    }

    delete(chercheur: ChercheurVo) {
        return this.http.delete<number>(this.API + 'id/' + chercheur.id);
    }


    public edit(): Observable<ChercheurVo> {
        return this.http.put<ChercheurVo>(this.API, this.selectedChercheur);
    }


    public findByCriteria(chercheur: ChercheurVo): Observable<Array<ChercheurVo>> {
        return this.http.post<Array<ChercheurVo>>(this.API + 'search', chercheur);
    }

    public updateChercheurGraph(username){
        return this.http.get<ImportChercheurVO>(this.API + 'chercheur-update-graphql/'+username);
    }

    public findByIdWithAssociatedList(chercheur: ChercheurVo): Observable<ChercheurVo> {
        return this.http.get<ChercheurVo>(this.API + 'detail/id/' + chercheur.id);
    }

    // getters and setters


    get chercheurs(): Array<ChercheurVo> {
        if (this._chercheurs == null) {
            this._chercheurs = new Array<ChercheurVo>();
        }
        return this._chercheurs;
    }

    set chercheurs(value: Array<ChercheurVo>) {
        this._chercheurs = value;
    }


    get availableChercheurs(): Array<ChercheurVo> {
        if (this._availableChercheurs == null) {
            this._availableChercheurs = new Array<ChercheurVo>();
        }
        return this._availableChercheurs;
    }

    set availableChercheurs(value: Array<ChercheurVo>) {
        this._availableChercheurs = value;
    }





    get selectedChercheurs(): Array<ChercheurVo> {
        if (this._selectedChercheurs == null) {
            this._selectedChercheurs = new Array<ChercheurVo>();
        }
        return this._selectedChercheurs;
    }

    set selectedChercheurs(value: Array<ChercheurVo>) {
        this._selectedChercheurs = value;
    }




    get selectedChercheur(): ChercheurVo {
        if (this._selectedChercheur == null) {
            this._selectedChercheur = new ChercheurVo();
        }
        return this._selectedChercheur;
    }

    set selectedChercheur(value: ChercheurVo) {
        this._selectedChercheur = value;
    }

    get chercheurSelections(): Array<ChercheurVo> {
        if (this._chercheurSelections == null) {
            this._chercheurSelections = new Array<ChercheurVo>();
        }
        return this._chercheurSelections;
    }


    set chercheurSelections(value: Array<ChercheurVo>) {
        this._chercheurSelections = value;
    }

    get createChercheurDialog(): boolean {
        return this._createChercheurDialog;
    }

    set createChercheurDialog(value: boolean) {
        this._createChercheurDialog = value;
    }

    get editChercheurDialog(): boolean {
        return this._editChercheurDialog;
    }

    set editChercheurDialog(value: boolean) {
        this._editChercheurDialog = value;
    }

    get viewChercheurDialog(): boolean {
        return this._viewChercheurDialog;
    }

    set viewChercheurDialog(value: boolean) {
        this._viewChercheurDialog = value;
    }

    get searchChercheur(): ChercheurVo {
        if (this._searchChercheur == null) {
            this._searchChercheur = new ChercheurVo();
        }
        return this._searchChercheur;
    }

    set searchChercheur(value: ChercheurVo) {
        this._searchChercheur = value;
    }
    public importFromGraphql() {
        return this.http.get<ImportChercheurVO>(this.API + 'chercheurs-import');
    }

    get connectedChercheur(): ChercheurVo {
        if(this._connectedChercheur==null){
            this._connectedChercheur=new ChercheurVo();
        }
        return this._connectedChercheur;
    }

    set connectedChercheur(value: ChercheurVo) {
        this._connectedChercheur = value;
    }
    get switchChercheurDialog(): boolean {
        return this._switchChercheurDialog;
    }

    set switchChercheurDialog(value: boolean) {
        this._switchChercheurDialog = value;
    }

}
