import {Component, OnInit} from '@angular/core';

import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {TypeUtilisateurService} from 'src/app/controller/service/referentiel/TypeUtilisateur.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {TypeUtilisateurVo} from 'src/app/controller/model/referentiel/TypeUtilisateur.model';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';


@Component({
    selector: 'app-type-utilisateur-edit-admin',
    templateUrl: './type-utilisateur-edit-admin.component.html',
    styleUrls: ['./type-utilisateur-edit-admin.component.css']
})
export class TypeUtilisateurEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validTypeUtilisateurLibelle = true;
    _validTypeUtilisateurCode = true;


    constructor(private datePipe: DatePipe, private typeUtilisateurService: TypeUtilisateurService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


// methods
    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validTypeUtilisateurLibelle = value;
        this.validTypeUtilisateurCode = value;
    }


    public edit() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public editWithShowOption(showList: boolean) {
        this.typeUtilisateurService.edit().subscribe(typeUtilisateur => {
            const myIndex = this.typeUtilisateurs.findIndex(e => e.id === this.selectedTypeUtilisateur.id);
            this.typeUtilisateurs[myIndex] = typeUtilisateur;
            this.editTypeUtilisateurDialog = false;
            this.submitted = false;
            this.selectedTypeUtilisateur = new TypeUtilisateurVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateTypeUtilisateurLibelle();
        this.validateTypeUtilisateurCode();

    }

    private validateTypeUtilisateurLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedTypeUtilisateur.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeUtilisateurLibelle = false;
        } else {
            this.validTypeUtilisateurLibelle = true;
        }
    }

    private validateTypeUtilisateurCode() {
        if (this.stringUtilService.isEmpty(this.selectedTypeUtilisateur.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeUtilisateurCode = false;
        } else {
            this.validTypeUtilisateurCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editTypeUtilisateurDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get typeUtilisateurs(): Array<TypeUtilisateurVo> {
        return this.typeUtilisateurService.typeUtilisateurs;
    }

    set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
    }

    get selectedTypeUtilisateur(): TypeUtilisateurVo {
        return this.typeUtilisateurService.selectedTypeUtilisateur;
    }

    set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
    }

    get editTypeUtilisateurDialog(): boolean {
        return this.typeUtilisateurService.editTypeUtilisateurDialog;

    }

    set editTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.editTypeUtilisateurDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatEdit;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }


    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validTypeUtilisateurLibelle(): boolean {
        return this._validTypeUtilisateurLibelle;
    }

    set validTypeUtilisateurLibelle(value: boolean) {
        this._validTypeUtilisateurLibelle = value;
    }

    get validTypeUtilisateurCode(): boolean {
        return this._validTypeUtilisateurCode;
    }

    set validTypeUtilisateurCode(value: boolean) {
        this._validTypeUtilisateurCode = value;
    }

}
