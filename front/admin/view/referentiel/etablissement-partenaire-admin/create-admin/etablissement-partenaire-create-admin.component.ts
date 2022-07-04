import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {EtablissementPartenaireVo} from 'src/app/controller/model/referentiel/EtablissementPartenaire.model';
import {EtablissementPartenaireService} from 'src/app/controller/service/referentiel/EtablissementPartenaire.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

@Component({
    selector: 'app-etablissement-partenaire-create-admin',
    templateUrl: './etablissement-partenaire-create-admin.component.html',
    styleUrls: ['./etablissement-partenaire-create-admin.component.css']
})
export class EtablissementPartenaireCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validEtablissementPartenaireLibelle = true;
    _validEtablissementPartenaireCode = true;


    constructor(private datePipe: DatePipe, private etablissementPartenaireService: EtablissementPartenaireService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validEtablissementPartenaireLibelle = value;
        this.validEtablissementPartenaireCode = value;
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
        this.etablissementPartenaireService.save().subscribe(etablissementPartenaire => {
            if (etablissementPartenaire != null) {
                this.etablissementPartenaires.push({...etablissementPartenaire});
                this.createEtablissementPartenaireDialog = false;
                this.submitted = false;
                this.selectedEtablissementPartenaire = new EtablissementPartenaireVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Etablissement partenaire existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateEtablissementPartenaireLibelle();
        this.validateEtablissementPartenaireCode();

    }

    private validateEtablissementPartenaireLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedEtablissementPartenaire.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtablissementPartenaireLibelle = false;
        } else {
            this.validEtablissementPartenaireLibelle = true;
        }
    }

    private validateEtablissementPartenaireCode() {
        if (this.stringUtilService.isEmpty(this.selectedEtablissementPartenaire.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtablissementPartenaireCode = false;
        } else {
            this.validEtablissementPartenaireCode = true;
        }
    }


    hideCreateDialog() {
        this.createEtablissementPartenaireDialog = false;
        this.setValidation(true);
    }

    get etablissementPartenaires(): Array<EtablissementPartenaireVo> {
        return this.etablissementPartenaireService.etablissementPartenaires;
    }

    set etablissementPartenaires(value: Array<EtablissementPartenaireVo>) {
        this.etablissementPartenaireService.etablissementPartenaires = value;
    }

    get selectedEtablissementPartenaire(): EtablissementPartenaireVo {
        return this.etablissementPartenaireService.selectedEtablissementPartenaire;
    }

    set selectedEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this.etablissementPartenaireService.selectedEtablissementPartenaire = value;
    }

    get createEtablissementPartenaireDialog(): boolean {
        return this.etablissementPartenaireService.createEtablissementPartenaireDialog;

    }

    set createEtablissementPartenaireDialog(value: boolean) {
        this.etablissementPartenaireService.createEtablissementPartenaireDialog = value;
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

    get validEtablissementPartenaireLibelle(): boolean {
        return this._validEtablissementPartenaireLibelle;
    }

    set validEtablissementPartenaireLibelle(value: boolean) {
        this._validEtablissementPartenaireLibelle = value;
    }

    get validEtablissementPartenaireCode(): boolean {
        return this._validEtablissementPartenaireCode;
    }

    set validEtablissementPartenaireCode(value: boolean) {
        this._validEtablissementPartenaireCode = value;
    }


}
