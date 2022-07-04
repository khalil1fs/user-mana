import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
    ResponsabiliteEncadrementDoctorantService
} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementDoctorant.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {
    ResponsabiliteEncadrementDoctorantVo
} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementDoctorant.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-responsabilite-encadrement-doctorant-edit-admin',
    templateUrl: './res-enca-doc-edit-admin.component.html',
    styleUrls: ['./res-enca-doc-edit-admin.component.css']
})
export class ResponsabiliteEncadrementDoctorantEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validResponsabiliteEncadrementDoctorantLibelle = true;
    _validResponsabiliteEncadrementDoctorantCode = true;


    constructor(private datePipe: DatePipe, private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
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
        this.validResponsabiliteEncadrementDoctorantLibelle = value;
        this.validResponsabiliteEncadrementDoctorantCode = value;
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
        this.responsabiliteEncadrementDoctorantService.edit().subscribe(responsabiliteEncadrementDoctorant => {
            const myIndex = this.responsabiliteEncadrementDoctorants.findIndex(e => e.id === this.selectedResponsabiliteEncadrementDoctorant.id);
            this.responsabiliteEncadrementDoctorants[myIndex] = responsabiliteEncadrementDoctorant;
            this.editResponsabiliteEncadrementDoctorantDialog = false;
            this.submitted = false;
            this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateResponsabiliteEncadrementDoctorantLibelle();
        this.validateResponsabiliteEncadrementDoctorantCode();

    }

    private validateResponsabiliteEncadrementDoctorantLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedResponsabiliteEncadrementDoctorant.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validResponsabiliteEncadrementDoctorantLibelle = false;
        } else {
            this.validResponsabiliteEncadrementDoctorantLibelle = true;
        }
    }

    private validateResponsabiliteEncadrementDoctorantCode() {
        if (this.stringUtilService.isEmpty(this.selectedResponsabiliteEncadrementDoctorant.code)) {
            this.errorMessages.push('Code non valide');
            this.validResponsabiliteEncadrementDoctorantCode = false;
        } else {
            this.validResponsabiliteEncadrementDoctorantCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editResponsabiliteEncadrementDoctorantDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
        return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
    }

    set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
    }

    get selectedResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
        return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
    }

    set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
    }

    get editResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this.responsabiliteEncadrementDoctorantService.editResponsabiliteEncadrementDoctorantDialog;

    }

    set editResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.editResponsabiliteEncadrementDoctorantDialog = value;
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

    get validResponsabiliteEncadrementDoctorantLibelle(): boolean {
        return this._validResponsabiliteEncadrementDoctorantLibelle;
    }

    set validResponsabiliteEncadrementDoctorantLibelle(value: boolean) {
        this._validResponsabiliteEncadrementDoctorantLibelle = value;
    }

    get validResponsabiliteEncadrementDoctorantCode(): boolean {
        return this._validResponsabiliteEncadrementDoctorantCode;
    }

    set validResponsabiliteEncadrementDoctorantCode(value: boolean) {
        this._validResponsabiliteEncadrementDoctorantCode = value;
    }

}
