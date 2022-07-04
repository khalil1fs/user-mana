import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {StatusContratEtConventionVo} from 'src/app/controller/model/referentiel/StatusContratEtConvention.model';
import {environment} from 'src/environments/environment';
import {StatusContratEtConventionService} from 'src/app/controller/service/referentiel/StatusContratEtConvention.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

@Component({
    selector: 'app-status-contrat-et-convention-create-admin',
    templateUrl: './status-cont-conv-create-admin.component.html',
    styleUrls: ['./status-cont-conv-create-admin.component.css']
})
export class StatusContratEtConventionCreateAdminComponent implements OnInit {

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


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validStatusContratEtConventionLibelle = value;
        this.validStatusContratEtConventionCode = value;
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
        this.statusContratEtConventionService.save().subscribe(statusContratEtConvention => {
            if (statusContratEtConvention != null) {
                this.statusContratEtConventions.push({...statusContratEtConvention});
                this.createStatusContratEtConventionDialog = false;
                this.submitted = false;
                this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Status contrat et convention existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

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


    hideCreateDialog() {
        this.createStatusContratEtConventionDialog = false;
        this.setValidation(true);
    }

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

    get createStatusContratEtConventionDialog(): boolean {
        return this.statusContratEtConventionService.createStatusContratEtConventionDialog;

    }

    set createStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.createStatusContratEtConventionDialog = value;
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
