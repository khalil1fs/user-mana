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
    selector: 'app-responsabilite-encadrement-doctorant-create-admin',
    templateUrl: './res-enca-doc-create-admin.component.html',
    styleUrls: ['./res-enca-doc-create-admin.component.css']
})
export class ResponsabiliteEncadrementDoctorantCreateAdminComponent implements OnInit {

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


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validResponsabiliteEncadrementDoctorantLibelle = value;
        this.validResponsabiliteEncadrementDoctorantCode = value;
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
        this.responsabiliteEncadrementDoctorantService.save().subscribe(responsabiliteEncadrementDoctorant => {
            if (responsabiliteEncadrementDoctorant != null) {
                this.responsabiliteEncadrementDoctorants.push({...responsabiliteEncadrementDoctorant});
                this.createResponsabiliteEncadrementDoctorantDialog = false;
                this.submitted = false;
                this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();

            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreurs',
                    detail: 'Responsabilite encadrement doctorant existe déjà'
                });
            }

        }, error => {
            console.log(error);
        });
    }

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


    hideCreateDialog() {
        this.createResponsabiliteEncadrementDoctorantDialog = false;
        this.setValidation(true);
    }

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

    get createResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog;

    }

    set createResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog = value;
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
