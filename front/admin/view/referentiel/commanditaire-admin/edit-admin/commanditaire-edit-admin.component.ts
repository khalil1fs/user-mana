import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {CommanditaireService} from 'src/app/controller/service/referentiel/Commanditaire.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {CommanditaireVo} from 'src/app/controller/model/referentiel/Commanditaire.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';

@Component({
    selector: 'app-commanditaire-edit-admin',
    templateUrl: './commanditaire-edit-admin.component.html',
    styleUrls: ['./commanditaire-edit-admin.component.css']
})
export class CommanditaireEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validCommanditaireLibelle = true;
    _validCommanditaireCode = true;

    _validPaysLibelle = true;
    _validPaysCode = true;


    constructor(private datePipe: DatePipe, private commanditaireService: CommanditaireService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private paysService: PaysService
    ) {

    }


// methods
    ngOnInit(): void {

        this.selectedPays = new PaysVo();
        this.paysService.findAll().subscribe((data) => this.payss = data);
    }


    private setValidation(value: boolean) {
        this.validCommanditaireLibelle = value;
        this.validCommanditaireCode = value;
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
        this.commanditaireService.edit().subscribe(commanditaire => {
            const myIndex = this.commanditaires.findIndex(e => e.id === this.selectedCommanditaire.id);
            this.commanditaires[myIndex] = commanditaire;
            this.editCommanditaireDialog = false;
            this.submitted = false;
            this.selectedCommanditaire = new CommanditaireVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateCommanditaireLibelle();
        this.validateCommanditaireCode();

    }

    private validateCommanditaireLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedCommanditaire.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCommanditaireLibelle = false;
        } else {
            this.validCommanditaireLibelle = true;
        }
    }

    private validateCommanditaireCode() {
        if (this.stringUtilService.isEmpty(this.selectedCommanditaire.code)) {
            this.errorMessages.push('Code non valide');
            this.validCommanditaireCode = false;
        } else {
            this.validCommanditaireCode = true;
        }
    }


//openPopup
    public async openCreatePays(pays: string) {
        const isPermistted = await this.roleService.isPermitted('Pays', 'edit');
        if (isPermistted) {
            this.selectedPays = new PaysVo();
            this.createPaysDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideEditDialog() {
        this.editCommanditaireDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get commanditaires(): Array<CommanditaireVo> {
        return this.commanditaireService.commanditaires;
    }

    set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
    }

    get selectedCommanditaire(): CommanditaireVo {
        return this.commanditaireService.selectedCommanditaire;
    }

    set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
    }

    get editCommanditaireDialog(): boolean {
        return this.commanditaireService.editCommanditaireDialog;

    }

    set editCommanditaireDialog(value: boolean) {
        this.commanditaireService.editCommanditaireDialog = value;
    }

    get selectedPays(): PaysVo {
        return this.paysService.selectedPays;
    }

    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
    }

    get payss(): Array<PaysVo> {
        return this.paysService.payss;
    }

    set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
    }

    get createPaysDialog(): boolean {
        return this.paysService.createPaysDialog;
    }

    set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog = value;
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

    get validCommanditaireLibelle(): boolean {
        return this._validCommanditaireLibelle;
    }

    set validCommanditaireLibelle(value: boolean) {
        this._validCommanditaireLibelle = value;
    }

    get validCommanditaireCode(): boolean {
        return this._validCommanditaireCode;
    }

    set validCommanditaireCode(value: boolean) {
        this._validCommanditaireCode = value;
    }

    get validPaysLibelle(): boolean {
        return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
        this._validPaysLibelle = value;
    }

    get validPaysCode(): boolean {
        return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
        this._validPaysCode = value;
    }
}
