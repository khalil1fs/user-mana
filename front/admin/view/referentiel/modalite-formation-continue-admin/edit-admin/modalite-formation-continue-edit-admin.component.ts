import {Component, OnInit} from '@angular/core';
import {ModaliteFormationContinueService} from 'src/app/controller/service/referentiel/ModaliteFormationContinue.service';
import {ModaliteFormationContinueVo} from 'src/app/controller/model/referentiel/ModaliteFormationContinue.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-modalite-formation-continue-edit-admin',
    templateUrl: './modalite-formation-continue-edit-admin.component.html',
    styleUrls: ['./modalite-formation-continue-edit-admin.component.css']
})
export class ModaliteFormationContinueEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validModaliteFormationContinueLibelle = true;
    _validModaliteFormationContinueCode = true;


    constructor(private datePipe: DatePipe, private modaliteFormationContinueService: ModaliteFormationContinueService
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
        this.validModaliteFormationContinueLibelle = value;
        this.validModaliteFormationContinueCode = value;
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
        this.modaliteFormationContinueService.edit().subscribe(modaliteFormationContinue => {
            const myIndex = this.modaliteFormationContinues.findIndex(e => e.id === this.selectedModaliteFormationContinue.id);
            this.modaliteFormationContinues[myIndex] = this.selectedModaliteFormationContinue;
            this.editModaliteFormationContinueDialog = false;
            this.submitted = false;
            this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateModaliteFormationContinueLibelle();
        this.validateModaliteFormationContinueCode();

    }

    private validateModaliteFormationContinueLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedModaliteFormationContinue.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModaliteFormationContinueLibelle = false;
        } else {
            this.validModaliteFormationContinueLibelle = true;
        }
    }

    private validateModaliteFormationContinueCode() {
        if (this.stringUtilService.isEmpty(this.selectedModaliteFormationContinue.code)) {
            this.errorMessages.push('Code non valide');
            this.validModaliteFormationContinueCode = false;
        } else {
            this.validModaliteFormationContinueCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editModaliteFormationContinueDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get modaliteFormationContinues(): Array<ModaliteFormationContinueVo> {
        return this.modaliteFormationContinueService.modaliteFormationContinues;
    }

    set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
    }

    get selectedModaliteFormationContinue(): ModaliteFormationContinueVo {
        return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
    }

    set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
    }

    get editModaliteFormationContinueDialog(): boolean {
        return this.modaliteFormationContinueService.editModaliteFormationContinueDialog;

    }

    set editModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.editModaliteFormationContinueDialog = value;
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

    get validModaliteFormationContinueLibelle(): boolean {
        return this._validModaliteFormationContinueLibelle;
    }

    set validModaliteFormationContinueLibelle(value: boolean) {
        this._validModaliteFormationContinueLibelle = value;
    }

    get validModaliteFormationContinueCode(): boolean {
        return this._validModaliteFormationContinueCode;
    }

    set validModaliteFormationContinueCode(value: boolean) {
        this._validModaliteFormationContinueCode = value;
    }

}
