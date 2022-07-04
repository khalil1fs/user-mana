import {Component, OnInit} from '@angular/core';
import {AffectationStructurelleService} from 'src/app/controller/service/referentiel/AffectationStructurelle.service';
import {AffectationStructurelleVo} from 'src/app/controller/model/referentiel/AffectationStructurelle.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

@Component({
    selector: 'app-affectation-structurelle-edit-admin',
    templateUrl: './affectation-structurelle-edit-admin.component.html',
    styleUrls: ['./affectation-structurelle-edit-admin.component.css']
})
export class AffectationStructurelleEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validAffectationStructurelleCode = true;
    _validAffectationStructurelleLibelleCourt = true;
    _validAffectationStructurelleLibelleLong = true;


    constructor(private datePipe: DatePipe, private affectationStructurelleService: AffectationStructurelleService
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
        this.validAffectationStructurelleCode = value;
        this.validAffectationStructurelleLibelleCourt = value;
        this.validAffectationStructurelleLibelleLong = value;
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
        this.affectationStructurelleService.edit().subscribe(affectationStructurelle => {
            const myIndex = this.affectationStructurelles.findIndex(e => e.id === this.selectedAffectationStructurelle.id);
            this.affectationStructurelles[myIndex] = affectationStructurelle;
            this.editAffectationStructurelleDialog = false;
            this.submitted = false;
            this.selectedAffectationStructurelle = new AffectationStructurelleVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateAffectationStructurelleCode();
        this.validateAffectationStructurelleLibelleCourt();
        this.validateAffectationStructurelleLibelleLong();

    }

    private validateAffectationStructurelleCode() {
        if (this.stringUtilService.isEmpty(this.selectedAffectationStructurelle.code)) {
            this.errorMessages.push('Code non valide');
            this.validAffectationStructurelleCode = false;
        } else {
            this.validAffectationStructurelleCode = true;
        }
    }

    private validateAffectationStructurelleLibelleCourt() {
        if (this.stringUtilService.isEmpty(this.selectedAffectationStructurelle.libelleCourt)) {
            this.errorMessages.push('Libelle court non valide');
            this.validAffectationStructurelleLibelleCourt = false;
        } else {
            this.validAffectationStructurelleLibelleCourt = true;
        }
    }

    private validateAffectationStructurelleLibelleLong() {
        if (this.stringUtilService.isEmpty(this.selectedAffectationStructurelle.libelleLong)) {
            this.errorMessages.push('Libelle long non valide');
            this.validAffectationStructurelleLibelleLong = false;
        } else {
            this.validAffectationStructurelleLibelleLong = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editAffectationStructurelleDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get affectationStructurelles(): Array<AffectationStructurelleVo> {
        return this.affectationStructurelleService.affectationStructurelles;
    }

    set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
    }

    get selectedAffectationStructurelle(): AffectationStructurelleVo {
        return this.affectationStructurelleService.selectedAffectationStructurelle;
    }

    set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
    }

    get editAffectationStructurelleDialog(): boolean {
        return this.affectationStructurelleService.editAffectationStructurelleDialog;

    }

    set editAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.editAffectationStructurelleDialog = value;
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

    get validAffectationStructurelleCode(): boolean {
        return this._validAffectationStructurelleCode;
    }

    set validAffectationStructurelleCode(value: boolean) {
        this._validAffectationStructurelleCode = value;
    }

    get validAffectationStructurelleLibelleCourt(): boolean {
        return this._validAffectationStructurelleLibelleCourt;
    }

    set validAffectationStructurelleLibelleCourt(value: boolean) {
        this._validAffectationStructurelleLibelleCourt = value;
    }

    get validAffectationStructurelleLibelleLong(): boolean {
        return this._validAffectationStructurelleLibelleLong;
    }

    set validAffectationStructurelleLibelleLong(value: boolean) {
        this._validAffectationStructurelleLibelleLong = value;
    }

}
