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
    selector: 'app-responsabilite-encadrement-etudiant-create-admin',
    templateUrl: './resp-encad-etud-create-admin.component.html',
    styleUrls: ['./resp-encad-etud-create-admin.component.css']
})
export class ResponsabiliteEncadrementEtudiantCreateAdminComponent implements OnInit {

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


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validResponsabiliteEncadrementEtudiantLibelle = value;
        this.validResponsabiliteEncadrementEtudiantCode = value;
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
        this.responsabiliteEncadrementEtudiantService.save().subscribe(responsabiliteEncadrementEtudiant => {
            if (responsabiliteEncadrementEtudiant != null) {
                this.responsabiliteEncadrementEtudiants.push({...responsabiliteEncadrementEtudiant});
                this.createResponsabiliteEncadrementEtudiantDialog = false;
                this.submitted = false;
                this.selectedResponsabiliteEncadrementEtudiant = new ResponsabiliteEncadrementEtudiantVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Responsabilite encadrement etudiant existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

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


    hideCreateDialog() {
        this.createResponsabiliteEncadrementEtudiantDialog = false;
        this.setValidation(true);
    }

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

    get createResponsabiliteEncadrementEtudiantDialog(): boolean {
        return this.responsabiliteEncadrementEtudiantService.createResponsabiliteEncadrementEtudiantDialog;

    }

    set createResponsabiliteEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteEncadrementEtudiantService.createResponsabiliteEncadrementEtudiantDialog = value;
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
