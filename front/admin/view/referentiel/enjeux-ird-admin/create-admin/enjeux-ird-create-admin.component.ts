import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdService} from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import {EnjeuxIrdVo} from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-enjeux-ird-create-admin',
    templateUrl: './enjeux-ird-create-admin.component.html',
    styleUrls: ['./enjeux-ird-create-admin.component.css']
})
export class EnjeuxIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;


    constructor(private datePipe: DatePipe, private enjeuxIrdService: EnjeuxIrdService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validEnjeuxIrdLibelle = value;
        this.validEnjeuxIrdCode = value;
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
        this.enjeuxIrdService.save().subscribe(enjeuxIrd => {
            console.log('haaa ==> ' + enjeuxIrd);
            if (enjeuxIrd != null) {
                this.enjeuxIrds.push({...enjeuxIrd});
                this.createEnjeuxIrdDialog = false;
                this.submitted = false;
                this.selectedEnjeuxIrd = new EnjeuxIrdVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Enjeux ird existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateEnjeuxIrdLibelle();
        this.validateEnjeuxIrdCode();

    }

    private validateEnjeuxIrdLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedEnjeuxIrd.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEnjeuxIrdLibelle = false;
        } else {
            this.validEnjeuxIrdLibelle = true;
        }
    }

    private validateEnjeuxIrdCode() {
        if (this.stringUtilService.isEmpty(this.selectedEnjeuxIrd.code)) {
            this.errorMessages.push('Code non valide');
            this.validEnjeuxIrdCode = false;
        } else {
            this.validEnjeuxIrdCode = true;
        }
    }


    hideCreateDialog() {
        this.createEnjeuxIrdDialog = false;
        this.setValidation(true);
    }

    get enjeuxIrds(): Array<EnjeuxIrdVo> {
        return this.enjeuxIrdService.enjeuxIrds;
    }

    set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
    }

    get selectedEnjeuxIrd(): EnjeuxIrdVo {
        return this.enjeuxIrdService.selectedEnjeuxIrd;
    }

    set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
    }

    get createEnjeuxIrdDialog(): boolean {
        return this.enjeuxIrdService.createEnjeuxIrdDialog;

    }

    set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog = value;
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

    get validEnjeuxIrdLibelle(): boolean {
        return this._validEnjeuxIrdLibelle;
    }

    set validEnjeuxIrdLibelle(value: boolean) {
        this._validEnjeuxIrdLibelle = value;
    }

    get validEnjeuxIrdCode(): boolean {
        return this._validEnjeuxIrdCode;
    }

    set validEnjeuxIrdCode(value: boolean) {
        this._validEnjeuxIrdCode = value;
    }


}
