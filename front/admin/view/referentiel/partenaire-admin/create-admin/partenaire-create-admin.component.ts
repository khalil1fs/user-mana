import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {PartenaireService} from 'src/app/controller/service/referentiel/Partenaire.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PartenaireVo} from 'src/app/controller/model/referentiel/Partenaire.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
    selector: 'app-partenaire-create-admin',
    templateUrl: './partenaire-create-admin.component.html',
    styleUrls: ['./partenaire-create-admin.component.css']
})
export class PartenaireCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validPartenaireSigleOfficel = true;
    _validPartenaireNomOfficel = true;

    _validPaysLibelle = true;
    _validPaysCode = true;


    constructor(private datePipe: DatePipe, private partenaireService: PartenaireService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private paysService: PaysService
    ) {

    }


    ngOnInit(): void {

        this.selectedPays = new PaysVo();
        this.paysService.findAll().subscribe((data) => this.Payss = data);
    }


    private setValidation(value: boolean) {
        this.validPartenaireSigleOfficel = value;
        this.validPartenaireNomOfficel = value;
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
        this.partenaireService.save().subscribe(partenaire => {
            if (partenaire != null) {
                this.partenaires.push({...partenaire});
                this.createPartenaireDialog = false;
                this.submitted = false;
                this.selectedPartenaire = new PartenaireVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Partenaire existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validatePartenaireSigleOfficel();
        this.validatePartenaireNomOfficel();

    }

    private validatePartenaireSigleOfficel() {
        if (this.stringUtilService.isEmpty(this.selectedPartenaire.sigleOfficel)) {
            this.errorMessages.push('Sigle officel non valide');
            this.validPartenaireSigleOfficel = false;
        } else {
            this.validPartenaireSigleOfficel = true;
        }
    }

    private validatePartenaireNomOfficel() {
        if (this.stringUtilService.isEmpty(this.selectedPartenaire.nomOfficel)) {
            this.errorMessages.push('Nom officel non valide');
            this.validPartenaireNomOfficel = false;
        } else {
            this.validPartenaireNomOfficel = true;
        }
    }


    public async openCreatePays(Pays: string) {
        const isPermistted = await this.roleService.isPermitted('Pays', 'add');
        if (isPermistted) {
            this.selectedPays = new PaysVo();
            this.createPaysDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createPartenaireDialog = false;
        this.setValidation(true);
    }

    get partenaires(): Array<PartenaireVo> {
        return this.partenaireService.partenaires;
    }

    set partenaires(value: Array<PartenaireVo>) {
        this.partenaireService.partenaires = value;
    }

    get selectedPartenaire(): PartenaireVo {
        return this.partenaireService.selectedPartenaire;
    }

    set selectedPartenaire(value: PartenaireVo) {
        this.partenaireService.selectedPartenaire = value;
    }

    get createPartenaireDialog(): boolean {
        return this.partenaireService.createPartenaireDialog;

    }

    set createPartenaireDialog(value: boolean) {
        this.partenaireService.createPartenaireDialog = value;
    }

    get selectedPays(): PaysVo {
        return this.paysService.selectedPays;
    }

    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
    }

    get Payss(): Array<PaysVo> {
        return this.paysService.payss;
    }

    set Payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
    }

    get createPaysDialog(): boolean {
        return this.paysService.createPaysDialog;
    }

    set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog = value;
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

    get validPartenaireSigleOfficel(): boolean {
        return this._validPartenaireSigleOfficel;
    }

    set validPartenaireSigleOfficel(value: boolean) {
        this._validPartenaireSigleOfficel = value;
    }

    get validPartenaireNomOfficel(): boolean {
        return this._validPartenaireNomOfficel;
    }

    set validPartenaireNomOfficel(value: boolean) {
        this._validPartenaireNomOfficel = value;
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
