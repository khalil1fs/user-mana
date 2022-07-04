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
    selector: 'app-role-evaluation-recherche-universitaire-edit-admin',
    templateUrl: './role-eval-rech-uni-edit-admin.component.html',
    styleUrls: ['./role-eval-rech-uni-edit-admin.component.css']
})
export class RoleEvaluationRechercheUniversitaireEditAdminComponent implements OnInit {

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


// methods
    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validRoleEvaluationRechercheUniversitaireLibelle = value;
        this.validRoleEvaluationRechercheUniversitaireCode = value;
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
        this.roleEvaluationRechercheUniversitaireService.edit().subscribe(roleEvaluationRechercheUniversitaire => {
            const myIndex = this.roleEvaluationRechercheUniversitaires.findIndex(e => e.id === this.selectedRoleEvaluationRechercheUniversitaire.id);
            this.roleEvaluationRechercheUniversitaires[myIndex] = roleEvaluationRechercheUniversitaire;
            this.editRoleEvaluationRechercheUniversitaireDialog = false;
            this.submitted = false;
            this.selectedRoleEvaluationRechercheUniversitaire = new RoleEvaluationRechercheUniversitaireVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
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


//openPopup
// methods

    hideEditDialog() {
        this.editRoleEvaluationRechercheUniversitaireDialog = false;
        this.setValidation(true);
    }

// getters and setters

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

    get editRoleEvaluationRechercheUniversitaireDialog(): boolean {
        return this.roleEvaluationRechercheUniversitaireService.editRoleEvaluationRechercheUniversitaireDialog;

    }

    set editRoleEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.roleEvaluationRechercheUniversitaireService.editRoleEvaluationRechercheUniversitaireDialog = value;
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
