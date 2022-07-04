import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {StatusContratEtConventionVo} from 'src/app/controller/model/referentiel/StatusContratEtConvention.model';
import {environment} from 'src/environments/environment';
import {StatusContratEtConventionService} from 'src/app/controller/service/referentiel/StatusContratEtConvention.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-status-contrat-et-convention-edit-admin',
    templateUrl: './status-cont-conv-edit-admin.component.html',
    styleUrls: ['./status-cont-conv-edit-admin.component.css']
})
export class StatusContratEtConventionEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validStatusContratEtConventionLibelle = true;
    _validStatusContratEtConventionCode = true;


    constructor(private datePipe: DatePipe, private statusContratEtConventionService: StatusContratEtConventionService
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
        this.validStatusContratEtConventionLibelle = value;
        this.validStatusContratEtConventionCode = value;
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
        this.statusContratEtConventionService.edit().subscribe(statusContratEtConvention => {
            const myIndex = this.statusContratEtConventions.findIndex(e => e.id === this.selectedStatusContratEtConvention.id);
            this.statusContratEtConventions[myIndex] = statusContratEtConvention;
            this.editStatusContratEtConventionDialog = false;
            this.submitted = false;
            this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateStatusContratEtConventionLibelle();
        this.validateStatusContratEtConventionCode();

    }

    private validateStatusContratEtConventionLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedStatusContratEtConvention.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStatusContratEtConventionLibelle = false;
        } else {
            this.validStatusContratEtConventionLibelle = true;
        }
    }

    private validateStatusContratEtConventionCode() {
        if (this.stringUtilService.isEmpty(this.selectedStatusContratEtConvention.code)) {
            this.errorMessages.push('Code non valide');
            this.validStatusContratEtConventionCode = false;
        } else {
            this.validStatusContratEtConventionCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editStatusContratEtConventionDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
        return this.statusContratEtConventionService.statusContratEtConventions;
    }

    set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
    }

    get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
        return this.statusContratEtConventionService.selectedStatusContratEtConvention;
    }

    set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
    }

    get editStatusContratEtConventionDialog(): boolean {
        return this.statusContratEtConventionService.editStatusContratEtConventionDialog;

    }

    set editStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.editStatusContratEtConventionDialog = value;
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

    get validStatusContratEtConventionLibelle(): boolean {
        return this._validStatusContratEtConventionLibelle;
    }

    set validStatusContratEtConventionLibelle(value: boolean) {
        this._validStatusContratEtConventionLibelle = value;
    }

    get validStatusContratEtConventionCode(): boolean {
        return this._validStatusContratEtConventionCode;
    }

    set validStatusContratEtConventionCode(value: boolean) {
        this._validStatusContratEtConventionCode = value;
    }

}
