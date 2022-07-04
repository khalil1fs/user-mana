import {Component, OnInit} from '@angular/core';
import {CaracterisationService} from 'src/app/controller/service/referentiel/Caracterisation.service';
import {CaracterisationVo} from 'src/app/controller/model/referentiel/Caracterisation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-caracterisation-edit-admin',
    templateUrl: './caracterisation-edit-admin.component.html',
    styleUrls: ['./caracterisation-edit-admin.component.css']
})
export class CaracterisationEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validCaracterisationLibelle = true;
    _validCaracterisationCode = true;


    constructor(private datePipe: DatePipe, private caracterisationService: CaracterisationService
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
        this.validCaracterisationLibelle = value;
        this.validCaracterisationCode = value;
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
        this.caracterisationService.edit().subscribe(caracterisation => {
            const myIndex = this.caracterisations.findIndex(e => e.id === this.selectedCaracterisation.id);
            this.caracterisations[myIndex] = caracterisation;
            this.editCaracterisationDialog = false;
            this.submitted = false;
            this.selectedCaracterisation = new CaracterisationVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateCaracterisationLibelle();
        this.validateCaracterisationCode();

    }

    private validateCaracterisationLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedCaracterisation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCaracterisationLibelle = false;
        } else {
            this.validCaracterisationLibelle = true;
        }
    }

    private validateCaracterisationCode() {
        if (this.stringUtilService.isEmpty(this.selectedCaracterisation.code)) {
            this.errorMessages.push('Code non valide');
            this.validCaracterisationCode = false;
        } else {
            this.validCaracterisationCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editCaracterisationDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get caracterisations(): Array<CaracterisationVo> {
        return this.caracterisationService.caracterisations;
    }

    set caracterisations(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisations = value;
    }

    get selectedCaracterisation(): CaracterisationVo {
        return this.caracterisationService.selectedCaracterisation;
    }

    set selectedCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.selectedCaracterisation = value;
    }

    get editCaracterisationDialog(): boolean {
        return this.caracterisationService.editCaracterisationDialog;

    }

    set editCaracterisationDialog(value: boolean) {
        this.caracterisationService.editCaracterisationDialog = value;
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

    get validCaracterisationLibelle(): boolean {
        return this._validCaracterisationLibelle;
    }

    set validCaracterisationLibelle(value: boolean) {
        this._validCaracterisationLibelle = value;
    }

    get validCaracterisationCode(): boolean {
        return this._validCaracterisationCode;
    }

    set validCaracterisationCode(value: boolean) {
        this._validCaracterisationCode = value;
    }

}
