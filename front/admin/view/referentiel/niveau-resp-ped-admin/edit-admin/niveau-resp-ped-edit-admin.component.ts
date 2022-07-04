import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {
    NiveauResponsabilitePedagogiqueService
} from 'src/app/controller/service/referentiel/NiveauResponsabilitePedagogique.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {NiveauResponsabilitePedagogiqueVo} from 'src/app/controller/model/referentiel/NiveauResponsabilitePedagogique.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-niveau-responsabilite-pedagogique-edit-admin',
    templateUrl: './niveau-resp-ped-edit-admin.component.html',
    styleUrls: ['./niveau-resp-ped-edit-admin.component.css']
})
export class NiveauRespPedEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validNiveauResponsabilitePedagogiqueLibelle = true;
    _validNiveauResponsabilitePedagogiqueCode = true;


    constructor(private datePipe: DatePipe, private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService
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
        this.validNiveauResponsabilitePedagogiqueLibelle = value;
        this.validNiveauResponsabilitePedagogiqueCode = value;
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
        this.niveauResponsabilitePedagogiqueService.edit().subscribe(niveauResponsabilitePedagogique => {
            const myIndex = this.niveauResponsabilitePedagogiques.findIndex(e => e.id === this.selectedNiveauResponsabilitePedagogique.id);
            this.niveauResponsabilitePedagogiques[myIndex] = niveauResponsabilitePedagogique;
            this.editNiveauResponsabilitePedagogiqueDialog = false;
            this.submitted = false;
            this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateNiveauResponsabilitePedagogiqueLibelle();
        this.validateNiveauResponsabilitePedagogiqueCode();

    }

    private validateNiveauResponsabilitePedagogiqueLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedNiveauResponsabilitePedagogique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNiveauResponsabilitePedagogiqueLibelle = false;
        } else {
            this.validNiveauResponsabilitePedagogiqueLibelle = true;
        }
    }

    private validateNiveauResponsabilitePedagogiqueCode() {
        if (this.stringUtilService.isEmpty(this.selectedNiveauResponsabilitePedagogique.code)) {
            this.errorMessages.push('Code non valide');
            this.validNiveauResponsabilitePedagogiqueCode = false;
        } else {
            this.validNiveauResponsabilitePedagogiqueCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editNiveauResponsabilitePedagogiqueDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
        return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
    }

    set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
    }

    get selectedNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
        return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
    }

    set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
    }

    get editNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog;

    }

    set editNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog = value;
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

    get validNiveauResponsabilitePedagogiqueLibelle(): boolean {
        return this._validNiveauResponsabilitePedagogiqueLibelle;
    }

    set validNiveauResponsabilitePedagogiqueLibelle(value: boolean) {
        this._validNiveauResponsabilitePedagogiqueLibelle = value;
    }

    get validNiveauResponsabilitePedagogiqueCode(): boolean {
        return this._validNiveauResponsabilitePedagogiqueCode;
    }

    set validNiveauResponsabilitePedagogiqueCode(value: boolean) {
        this._validNiveauResponsabilitePedagogiqueCode = value;
    }

}
