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
    selector: 'app-niveau-responsabilite-pedagogique-create-admin',
    templateUrl: './niveau-resp-ped-create-admin.component.html',
    styleUrls: ['./niveau-resp-ped-create-admin.component.css']
})
export class NiveauRespPedCreateAdminComponent implements OnInit {

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


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validNiveauResponsabilitePedagogiqueLibelle = value;
        this.validNiveauResponsabilitePedagogiqueCode = value;
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
        this.niveauResponsabilitePedagogiqueService.save().subscribe(niveauResponsabilitePedagogique => {
            if (niveauResponsabilitePedagogique != null) {
                this.niveauResponsabilitePedagogiques.push({...niveauResponsabilitePedagogique});
                this.createNiveauResponsabilitePedagogiqueDialog = false;
                this.submitted = false;
                this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Niveau responsabilite pedagogique existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

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


    hideCreateDialog() {
        this.createNiveauResponsabilitePedagogiqueDialog = false;
        this.setValidation(true);
    }

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

    get createNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog;

    }

    set createNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog = value;
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
