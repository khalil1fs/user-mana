import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {StatusCursusVo} from 'src/app/controller/model/referentiel/StatusCursus.model';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {StatusCursusService} from 'src/app/controller/service/referentiel/StatusCursus.service';

@Component({
    selector: 'app-status-cursus-create-admin',
    templateUrl: './status-cursus-create-admin.component.html',
    styleUrls: ['./status-cursus-create-admin.component.css']
})
export class StatusCursusCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validStatusCursusLibelle = true;
    _validStatusCursusCode = true;


    constructor(private datePipe: DatePipe, private statusCursusService: StatusCursusService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validStatusCursusLibelle = value;
        this.validStatusCursusCode = value;
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
        this.statusCursusService.save().subscribe(statusCursus => {
            if (statusCursus != null) {
                this.statusCursuss.push({...statusCursus});
                this.createStatusCursusDialog = false;
                this.submitted = false;
                this.selectedStatusCursus = new StatusCursusVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Status cursus existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateStatusCursusLibelle();
        this.validateStatusCursusCode();

    }

    private validateStatusCursusLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedStatusCursus.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStatusCursusLibelle = false;
        } else {
            this.validStatusCursusLibelle = true;
        }
    }

    private validateStatusCursusCode() {
        if (this.stringUtilService.isEmpty(this.selectedStatusCursus.code)) {
            this.errorMessages.push('Code non valide');
            this.validStatusCursusCode = false;
        } else {
            this.validStatusCursusCode = true;
        }
    }


    hideCreateDialog() {
        this.createStatusCursusDialog = false;
        this.setValidation(true);
    }

    get statusCursuss(): Array<StatusCursusVo> {
        return this.statusCursusService.statusCursuss;
    }

    set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
    }

    get selectedStatusCursus(): StatusCursusVo {
        return this.statusCursusService.selectedStatusCursus;
    }

    set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
    }

    get createStatusCursusDialog(): boolean {
        return this.statusCursusService.createStatusCursusDialog;

    }

    set createStatusCursusDialog(value: boolean) {
        this.statusCursusService.createStatusCursusDialog = value;
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

    get validStatusCursusLibelle(): boolean {
        return this._validStatusCursusLibelle;
    }

    set validStatusCursusLibelle(value: boolean) {
        this._validStatusCursusLibelle = value;
    }

    get validStatusCursusCode(): boolean {
        return this._validStatusCursusCode;
    }

    set validStatusCursusCode(value: boolean) {
        this._validStatusCursusCode = value;
    }


}
