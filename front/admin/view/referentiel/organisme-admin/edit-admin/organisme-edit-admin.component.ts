import {DatePipe} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {PaysVo} from '../../../../../../controller/model/referentiel/Pays.model';
import {PaysService} from '../../../../../../controller/service/referentiel/Pays.service';
import {OrganismeService} from '../../../../../../controller/service/referentiel/Organisme.service';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {OrganismeVo} from '../../../../../../controller/model/referentiel/Organisme.model';
import {environment} from '../../../../../../../environments/environment';
import {StringUtilService} from '../../../../../../controller/service/formulaire/StringUtil.service';

@Component({
    selector: 'app-organisme-edit-admin',
    templateUrl: './organisme-edit-admin.component.html',
    styleUrls: ['./organisme-edit-admin.component.css']
})
export class OrganismeEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validOrganismeIntitule = true;
    _validOrganismeCode = true;

    _validPaysLibelle = true;
    _validPaysCode = true;


    constructor(private datePipe: DatePipe, private organismeService: OrganismeService
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
        this.validOrganismeIntitule = value;
        this.validOrganismeCode = value;
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
        this.organismeService.edit().subscribe(organisme => {
            const myIndex = this.organismes.findIndex(e => e.id === this.selectedOrganisme.id);
            this.organismes[myIndex] = organisme;
            this.editOrganismeDialog = false;
            this.submitted = false;
            this.selectedOrganisme = new OrganismeVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateOrganismeIntitule();
        this.validateOrganismeCode();

    }

    private validateOrganismeIntitule() {
        if (this.stringUtilService.isEmpty(this.selectedOrganisme.intitule)) {
            this.errorMessages.push('Intitule non valide');
            this.validOrganismeIntitule = false;
        } else {
            this.validOrganismeIntitule = true;
        }
    }

    private validateOrganismeCode() {
        if (this.stringUtilService.isEmpty(this.selectedOrganisme.code)) {
            this.errorMessages.push('Code non valide');
            this.validOrganismeCode = false;
        } else {
            this.validOrganismeCode = true;
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
        this.editOrganismeDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get organismes(): Array<OrganismeVo> {
        return this.organismeService.organismes;
    }

    set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
    }

    get selectedOrganisme(): OrganismeVo {
        return this.organismeService.selectedOrganisme;
    }

    set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
    }

    get editOrganismeDialog(): boolean {
        return this.organismeService.editOrganismeDialog;

    }

    set editOrganismeDialog(value: boolean) {
        this.organismeService.editOrganismeDialog = value;
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

    get validOrganismeIntitule(): boolean {
        return this._validOrganismeIntitule;
    }

    set validOrganismeIntitule(value: boolean) {
        this._validOrganismeIntitule = value;
    }

    get validOrganismeCode(): boolean {
        return this._validOrganismeCode;
    }

    set validOrganismeCode(value: boolean) {
        this._validOrganismeCode = value;
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
