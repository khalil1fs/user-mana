import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';
import {TypeEtudeVo} from 'src/app/controller/model/referentiel/TypeEtude.model';
import {MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {TypeEtudeService} from 'src/app/controller/service/referentiel/TypeEtude.service';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-type-etude-edit-admin',
    templateUrl: './type-etude-edit-admin.component.html',
    styleUrls: ['./type-etude-edit-admin.component.css']
})
export class TypeEtudeEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validTypeEtudeLibelle = true;
    _validTypeEtudeCode = true;


    constructor(private datePipe: DatePipe, private typeEtudeService: TypeEtudeService
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
        this.validTypeEtudeLibelle = value;
        this.validTypeEtudeCode = value;
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
        this.typeEtudeService.edit().subscribe(typeEtude => {
            const myIndex = this.typeEtudes.findIndex(e => e.id === this.selectedTypeEtude.id);
            this.typeEtudes[myIndex] = typeEtude;
            this.editTypeEtudeDialog = false;
            this.submitted = false;
            this.selectedTypeEtude = new TypeEtudeVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateTypeEtudeLibelle();
        this.validateTypeEtudeCode();

    }

    private validateTypeEtudeLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedTypeEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeEtudeLibelle = false;
        } else {
            this.validTypeEtudeLibelle = true;
        }
    }

    private validateTypeEtudeCode() {
        if (this.stringUtilService.isEmpty(this.selectedTypeEtude.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeEtudeCode = false;
        } else {
            this.validTypeEtudeCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editTypeEtudeDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get typeEtudes(): Array<TypeEtudeVo> {
        return this.typeEtudeService.typeEtudes;
    }

    set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
    }

    get selectedTypeEtude(): TypeEtudeVo {
        return this.typeEtudeService.selectedTypeEtude;
    }

    set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
    }

    get editTypeEtudeDialog(): boolean {
        return this.typeEtudeService.editTypeEtudeDialog;

    }

    set editTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.editTypeEtudeDialog = value;
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

    get validTypeEtudeLibelle(): boolean {
        return this._validTypeEtudeLibelle;
    }

    set validTypeEtudeLibelle(value: boolean) {
        this._validTypeEtudeLibelle = value;
    }

    get validTypeEtudeCode(): boolean {
        return this._validTypeEtudeCode;
    }

    set validTypeEtudeCode(value: boolean) {
        this._validTypeEtudeCode = value;
    }

}
