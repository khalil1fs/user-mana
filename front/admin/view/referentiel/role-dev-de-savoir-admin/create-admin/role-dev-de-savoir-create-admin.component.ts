import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {RoleDeveloppementDeSavoirVo} from 'src/app/controller/model/referentiel/RoleDeveloppementDeSavoir.model';
import {environment} from 'src/environments/environment';
import {RoleDeveloppementDeSavoirService} from 'src/app/controller/service/referentiel/RoleDeveloppementDeSavoir.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-role-developpement-de-savoir-create-admin',
    templateUrl: './role-dev-de-savoir-create-admin.component.html',
    styleUrls: ['./role-dev-de-savoir-create-admin.component.css']
})
export class RoleDeveloppementDeSavoirCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validRoleDeveloppementDeSavoirLibelle = true;
    _validRoleDeveloppementDeSavoirCode = true;


    constructor(private datePipe: DatePipe, private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validRoleDeveloppementDeSavoirLibelle = value;
        this.validRoleDeveloppementDeSavoirCode = value;
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
        this.roleDeveloppementDeSavoirService.save().subscribe(roleDeveloppementDeSavoir => {
            if (roleDeveloppementDeSavoir != null) {
                this.roleDeveloppementDeSavoirs.push({...roleDeveloppementDeSavoir});
                this.createRoleDeveloppementDeSavoirDialog = false;
                this.submitted = false;
                this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Role developpement de savoir existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateRoleDeveloppementDeSavoirLibelle();
        this.validateRoleDeveloppementDeSavoirCode();

    }

    private validateRoleDeveloppementDeSavoirLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedRoleDeveloppementDeSavoir.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRoleDeveloppementDeSavoirLibelle = false;
        } else {
            this.validRoleDeveloppementDeSavoirLibelle = true;
        }
    }

    private validateRoleDeveloppementDeSavoirCode() {
        if (this.stringUtilService.isEmpty(this.selectedRoleDeveloppementDeSavoir.code)) {
            this.errorMessages.push('Code non valide');
            this.validRoleDeveloppementDeSavoirCode = false;
        } else {
            this.validRoleDeveloppementDeSavoirCode = true;
        }
    }


    hideCreateDialog() {
        this.createRoleDeveloppementDeSavoirDialog = false;
        this.setValidation(true);
    }

    get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
        return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
    }

    set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
    }

    get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
        return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
    }

    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
    }

    get createRoleDeveloppementDeSavoirDialog(): boolean {
        return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;

    }

    set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog = value;
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

    get validRoleDeveloppementDeSavoirLibelle(): boolean {
        return this._validRoleDeveloppementDeSavoirLibelle;
    }

    set validRoleDeveloppementDeSavoirLibelle(value: boolean) {
        this._validRoleDeveloppementDeSavoirLibelle = value;
    }

    get validRoleDeveloppementDeSavoirCode(): boolean {
        return this._validRoleDeveloppementDeSavoirCode;
    }

    set validRoleDeveloppementDeSavoirCode(value: boolean) {
        this._validRoleDeveloppementDeSavoirCode = value;
    }


}
