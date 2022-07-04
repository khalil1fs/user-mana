import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
    RoleEvaluationRechercheUniversitaireService
} from 'src/app/controller/service/referentiel/RoleEvaluationRechercheUniversitaire.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {
    RoleEvaluationRechercheUniversitaireVo
} from 'src/app/controller/model/referentiel/RoleEvaluationRechercheUniversitaire.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-role-evaluation-recherche-universitaire-create-admin',
    templateUrl: './role-eval-rech-uni-create-admin.component.html',
    styleUrls: ['./role-eval-rech-uni-create-admin.component.css']
})
export class RoleEvaluationRechercheUniversitaireCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validRoleEvaluationRechercheUniversitaireLibelle = true;
    _validRoleEvaluationRechercheUniversitaireCode = true;


    constructor(private datePipe: DatePipe, private roleEvaluationRechercheUniversitaireService: RoleEvaluationRechercheUniversitaireService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validRoleEvaluationRechercheUniversitaireLibelle = value;
        this.validRoleEvaluationRechercheUniversitaireCode = value;
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
        this.roleEvaluationRechercheUniversitaireService.save().subscribe(roleEvaluationRechercheUniversitaire => {
            if (roleEvaluationRechercheUniversitaire != null) {
                this.roleEvaluationRechercheUniversitaires.push({...roleEvaluationRechercheUniversitaire});
                this.createRoleEvaluationRechercheUniversitaireDialog = false;
                this.submitted = false;
                this.selectedRoleEvaluationRechercheUniversitaire = new RoleEvaluationRechercheUniversitaireVo();

            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreurs',
                    detail: 'Role evaluation recherche universitaire existe déjà'
                });
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateRoleEvaluationRechercheUniversitaireLibelle();
        this.validateRoleEvaluationRechercheUniversitaireCode();

    }

    private validateRoleEvaluationRechercheUniversitaireLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedRoleEvaluationRechercheUniversitaire.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRoleEvaluationRechercheUniversitaireLibelle = false;
        } else {
            this.validRoleEvaluationRechercheUniversitaireLibelle = true;
        }
    }

    private validateRoleEvaluationRechercheUniversitaireCode() {
        if (this.stringUtilService.isEmpty(this.selectedRoleEvaluationRechercheUniversitaire.code)) {
            this.errorMessages.push('Code non valide');
            this.validRoleEvaluationRechercheUniversitaireCode = false;
        } else {
            this.validRoleEvaluationRechercheUniversitaireCode = true;
        }
    }


    hideCreateDialog() {
        this.createRoleEvaluationRechercheUniversitaireDialog = false;
        this.setValidation(true);
    }

    get roleEvaluationRechercheUniversitaires(): Array<RoleEvaluationRechercheUniversitaireVo> {
        return this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaires;
    }

    set roleEvaluationRechercheUniversitaires(value: Array<RoleEvaluationRechercheUniversitaireVo>) {
        this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaires = value;
    }

    get selectedRoleEvaluationRechercheUniversitaire(): RoleEvaluationRechercheUniversitaireVo {
        return this.roleEvaluationRechercheUniversitaireService.selectedRoleEvaluationRechercheUniversitaire;
    }

    set selectedRoleEvaluationRechercheUniversitaire(value: RoleEvaluationRechercheUniversitaireVo) {
        this.roleEvaluationRechercheUniversitaireService.selectedRoleEvaluationRechercheUniversitaire = value;
    }

    get createRoleEvaluationRechercheUniversitaireDialog(): boolean {
        return this.roleEvaluationRechercheUniversitaireService.createRoleEvaluationRechercheUniversitaireDialog;

    }

    set createRoleEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.roleEvaluationRechercheUniversitaireService.createRoleEvaluationRechercheUniversitaireDialog = value;
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

    get validRoleEvaluationRechercheUniversitaireLibelle(): boolean {
        return this._validRoleEvaluationRechercheUniversitaireLibelle;
    }

    set validRoleEvaluationRechercheUniversitaireLibelle(value: boolean) {
        this._validRoleEvaluationRechercheUniversitaireLibelle = value;
    }

    get validRoleEvaluationRechercheUniversitaireCode(): boolean {
        return this._validRoleEvaluationRechercheUniversitaireCode;
    }

    set validRoleEvaluationRechercheUniversitaireCode(value: boolean) {
        this._validRoleEvaluationRechercheUniversitaireCode = value;
    }


}
