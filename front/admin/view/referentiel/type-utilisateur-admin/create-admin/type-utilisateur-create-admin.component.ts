import {Component, OnInit} from '@angular/core';

import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {TypeUtilisateurService} from 'src/app/controller/service/referentiel/TypeUtilisateur.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {TypeUtilisateurVo} from 'src/app/controller/model/referentiel/TypeUtilisateur.model';


@Component({
    selector: 'app-type-utilisateur-create-admin',
    templateUrl: './type-utilisateur-create-admin.component.html',
    styleUrls: ['./type-utilisateur-create-admin.component.css']
})
export class TypeUtilisateurCreateAdminComponent implements OnInit {

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


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validTypeUtilisateurLibelle = value;
        this.validTypeUtilisateurCode = value;
    }


    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.typeUtilisateurService.save().subscribe(typeUtilisateur => {
            if (typeUtilisateur != null) {
                this.typeUtilisateurs.push({...typeUtilisateur});
                this.createTypeUtilisateurDialog = false;
                this.submitted = false;
                this.selectedTypeUtilisateur = new TypeUtilisateurVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Type utilisateur existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

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


    hideCreateDialog() {
        this.createTypeUtilisateurDialog = false;
        this.setValidation(true);
    }

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
        return environment.dateFormatCreate;
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
