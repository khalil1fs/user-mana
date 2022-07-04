import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {DatePipe} from '@angular/common';
import {
    ResponsabiliteEncadrementEtudiantService
} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementEtudiant.service';
import {ResponsabiliteEncadrementEtudiantVo} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementEtudiant.model';

@Component({
    selector: 'app-responsabilite-encadrement-etudiant-edit-admin',
    templateUrl: './resp-encad-etud-edit-admin.component.html',
    styleUrls: ['./resp-encad-etud-edit-admin.component.css']
})
export class ResponsabiliteEncadrementEtudiantEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validResponsabiliteEncadrementEtudiantLibelle = true;
    _validResponsabiliteEncadrementEtudiantCode = true;


    constructor(private datePipe: DatePipe, private responsabiliteEncadrementEtudiantService: ResponsabiliteEncadrementEtudiantService
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
        this.validResponsabiliteEncadrementEtudiantLibelle = value;
        this.validResponsabiliteEncadrementEtudiantCode = value;
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
        this.responsabiliteEncadrementEtudiantService.edit().subscribe(responsabiliteEncadrementEtudiant => {
            const myIndex = this.responsabiliteEncadrementEtudiants.findIndex(e => e.id === this.selectedResponsabiliteEncadrementEtudiant.id);
            this.responsabiliteEncadrementEtudiants[myIndex] = responsabiliteEncadrementEtudiant;
            this.editResponsabiliteEncadrementEtudiantDialog = false;
            this.submitted = false;
            this.selectedResponsabiliteEncadrementEtudiant = new ResponsabiliteEncadrementEtudiantVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateResponsabiliteEncadrementEtudiantLibelle();
        this.validateResponsabiliteEncadrementEtudiantCode();

    }

    private validateResponsabiliteEncadrementEtudiantLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedResponsabiliteEncadrementEtudiant.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validResponsabiliteEncadrementEtudiantLibelle = false;
        } else {
            this.validResponsabiliteEncadrementEtudiantLibelle = true;
        }
    }

    private validateResponsabiliteEncadrementEtudiantCode() {
        if (this.stringUtilService.isEmpty(this.selectedResponsabiliteEncadrementEtudiant.code)) {
            this.errorMessages.push('Code non valide');
            this.validResponsabiliteEncadrementEtudiantCode = false;
        } else {
            this.validResponsabiliteEncadrementEtudiantCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editResponsabiliteEncadrementEtudiantDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get responsabiliteEncadrementEtudiants(): Array<ResponsabiliteEncadrementEtudiantVo> {
        return this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants;
    }

    set responsabiliteEncadrementEtudiants(value: Array<ResponsabiliteEncadrementEtudiantVo>) {
        this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants = value;
    }

    get selectedResponsabiliteEncadrementEtudiant(): ResponsabiliteEncadrementEtudiantVo {
        return this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant;
    }

    set selectedResponsabiliteEncadrementEtudiant(value: ResponsabiliteEncadrementEtudiantVo) {
        this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant = value;
    }

    get editResponsabiliteEncadrementEtudiantDialog(): boolean {
        return this.responsabiliteEncadrementEtudiantService.editResponsabiliteEncadrementEtudiantDialog;

    }

    set editResponsabiliteEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteEncadrementEtudiantService.editResponsabiliteEncadrementEtudiantDialog = value;
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

    get validResponsabiliteEncadrementEtudiantLibelle(): boolean {
        return this._validResponsabiliteEncadrementEtudiantLibelle;
    }

    set validResponsabiliteEncadrementEtudiantLibelle(value: boolean) {
        this._validResponsabiliteEncadrementEtudiantLibelle = value;
    }

    get validResponsabiliteEncadrementEtudiantCode(): boolean {
        return this._validResponsabiliteEncadrementEtudiantCode;
    }

    set validResponsabiliteEncadrementEtudiantCode(value: boolean) {
        this._validResponsabiliteEncadrementEtudiantCode = value;
    }

}
