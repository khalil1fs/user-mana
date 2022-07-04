import {Component, OnInit} from '@angular/core';
import {TypeInstrumentsEtDispositifsIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentsEtDispositifsIrd.service';
import {TypeInstrumentsEtDispositifsIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentsEtDispositifsIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-type-instruments-et-dispositifs-ird-edit-admin',
    templateUrl: './type-instruments-et-dispositifs-ird-edit-admin.component.html',
    styleUrls: ['./type-instruments-et-dispositifs-ird-edit-admin.component.css']
})
export class TypeInstrumentsEtDispositifsIrdEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validTypeInstrumentsEtDispositifsIrdLibelle = true;
    _validTypeInstrumentsEtDispositifsIrdCode = true;


    constructor(private datePipe: DatePipe, private typeInstrumentsEtDispositifsIrdService: TypeInstrumentsEtDispositifsIrdService
        ,       private stringUtilService: StringUtilService
        ,       private roleService: RoleService
        ,       private messageService: MessageService
        ,       private router: Router
    ) {

    }


// methods
    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validTypeInstrumentsEtDispositifsIrdLibelle = value;
        this.validTypeInstrumentsEtDispositifsIrdCode = value;
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
        this.typeInstrumentsEtDispositifsIrdService.edit().subscribe(typeInstrumentsEtDispositifsIrd => {
            const myIndex = this.typeInstrumentsEtDispositifsIrds.findIndex(e => e.id === this.selectedTypeInstrumentsEtDispositifsIrd.id);
            this.typeInstrumentsEtDispositifsIrds[myIndex] = typeInstrumentsEtDispositifsIrd;
            this.editTypeInstrumentsEtDispositifsIrdDialog = false;
            this.submitted = false;
            this.selectedTypeInstrumentsEtDispositifsIrd = new TypeInstrumentsEtDispositifsIrdVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateTypeInstrumentsEtDispositifsIrdLibelle();
        this.validateTypeInstrumentsEtDispositifsIrdCode();

    }

    private validateTypeInstrumentsEtDispositifsIrdLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedTypeInstrumentsEtDispositifsIrd.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeInstrumentsEtDispositifsIrdLibelle = false;
        } else {
            this.validTypeInstrumentsEtDispositifsIrdLibelle = true;
        }
    }

    private validateTypeInstrumentsEtDispositifsIrdCode() {
        if (this.stringUtilService.isEmpty(this.selectedTypeInstrumentsEtDispositifsIrd.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeInstrumentsEtDispositifsIrdCode = false;
        } else {
            this.validTypeInstrumentsEtDispositifsIrdCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editTypeInstrumentsEtDispositifsIrdDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get typeInstrumentsEtDispositifsIrds(): Array<TypeInstrumentsEtDispositifsIrdVo> {
        return this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds;
    }

    set typeInstrumentsEtDispositifsIrds(value: Array<TypeInstrumentsEtDispositifsIrdVo>) {
        this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds = value;
    }

    get selectedTypeInstrumentsEtDispositifsIrd(): TypeInstrumentsEtDispositifsIrdVo {
        return this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd;
    }

    set selectedTypeInstrumentsEtDispositifsIrd(value: TypeInstrumentsEtDispositifsIrdVo) {
        this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd = value;
    }

    get editTypeInstrumentsEtDispositifsIrdDialog(): boolean {
        return this.typeInstrumentsEtDispositifsIrdService.editTypeInstrumentsEtDispositifsIrdDialog;

    }

    set editTypeInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.typeInstrumentsEtDispositifsIrdService.editTypeInstrumentsEtDispositifsIrdDialog = value;
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

    get validTypeInstrumentsEtDispositifsIrdLibelle(): boolean {
        return this._validTypeInstrumentsEtDispositifsIrdLibelle;
    }

    set validTypeInstrumentsEtDispositifsIrdLibelle(value: boolean) {
        this._validTypeInstrumentsEtDispositifsIrdLibelle = value;
    }

    get validTypeInstrumentsEtDispositifsIrdCode(): boolean {
        return this._validTypeInstrumentsEtDispositifsIrdCode;
    }

    set validTypeInstrumentsEtDispositifsIrdCode(value: boolean) {
        this._validTypeInstrumentsEtDispositifsIrdCode = value;
    }

}
