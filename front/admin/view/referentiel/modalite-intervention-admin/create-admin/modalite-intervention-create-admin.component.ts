import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ModaliteInterventionVo} from 'src/app/controller/model/referentiel/ModaliteIntervention.model';
import {ModaliteInterventionService} from 'src/app/controller/service/referentiel/ModaliteIntervention.service';

@Component({
    selector: 'app-modalite-intervention-create-admin',
    templateUrl: './modalite-intervention-create-admin.component.html',
    styleUrls: ['./modalite-intervention-create-admin.component.css']
})
export class ModaliteInterventionCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validModaliteInterventionLibelle = true;
    _validModaliteInterventionCode = true;


    constructor(private datePipe: DatePipe, private modaliteInterventionService: ModaliteInterventionService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validModaliteInterventionLibelle = value;
        this.validModaliteInterventionCode = value;
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
        this.modaliteInterventionService.save().subscribe(modaliteIntervention => {
            if (modaliteIntervention != null) {
                this.modaliteInterventions.push({...modaliteIntervention});
                this.createModaliteInterventionDialog = false;
                this.submitted = false;
                this.selectedModaliteIntervention = new ModaliteInterventionVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Modalite intervention existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateModaliteInterventionLibelle();
        this.validateModaliteInterventionCode();

    }

    private validateModaliteInterventionLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedModaliteIntervention.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModaliteInterventionLibelle = false;
        } else {
            this.validModaliteInterventionLibelle = true;
        }
    }

    private validateModaliteInterventionCode() {
        if (this.stringUtilService.isEmpty(this.selectedModaliteIntervention.code)) {
            this.errorMessages.push('Code non valide');
            this.validModaliteInterventionCode = false;
        } else {
            this.validModaliteInterventionCode = true;
        }
    }


    hideCreateDialog() {
        this.createModaliteInterventionDialog = false;
        this.setValidation(true);
    }

    get modaliteInterventions(): Array<ModaliteInterventionVo> {
        return this.modaliteInterventionService.modaliteInterventions;
    }

    set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
    }

    get selectedModaliteIntervention(): ModaliteInterventionVo {
        return this.modaliteInterventionService.selectedModaliteIntervention;
    }

    set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
    }

    get createModaliteInterventionDialog(): boolean {
        return this.modaliteInterventionService.createModaliteInterventionDialog;

    }

    set createModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.createModaliteInterventionDialog = value;
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

    get validModaliteInterventionLibelle(): boolean {
        return this._validModaliteInterventionLibelle;
    }

    set validModaliteInterventionLibelle(value: boolean) {
        this._validModaliteInterventionLibelle = value;
    }

    get validModaliteInterventionCode(): boolean {
        return this._validModaliteInterventionCode;
    }

    set validModaliteInterventionCode(value: boolean) {
        this._validModaliteInterventionCode = value;
    }


}
