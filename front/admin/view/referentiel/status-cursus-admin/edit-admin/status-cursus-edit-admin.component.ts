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
    selector: 'app-status-cursus-edit-admin',
    templateUrl: './status-cursus-edit-admin.component.html',
    styleUrls: ['./status-cursus-edit-admin.component.css']
})
export class StatusCursusEditAdminComponent implements OnInit {

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


// methods
    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validStatusCursusLibelle = value;
        this.validStatusCursusCode = value;
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
        this.statusCursusService.edit().subscribe(statusCursus => {
            const myIndex = this.statusCursuss.findIndex(e => e.id === this.selectedStatusCursus.id);
            this.statusCursuss[myIndex] = statusCursus;
            this.editStatusCursusDialog = false;
            this.submitted = false;
            this.selectedStatusCursus = new StatusCursusVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
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


//openPopup
// methods

    hideEditDialog() {
        this.editStatusCursusDialog = false;
        this.setValidation(true);
    }

// getters and setters

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

    get editStatusCursusDialog(): boolean {
        return this.statusCursusService.editStatusCursusDialog;

    }

    set editStatusCursusDialog(value: boolean) {
        this.statusCursusService.editStatusCursusDialog = value;
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
