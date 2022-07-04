import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {DatePipe} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {NiveauFormationPostBacVo} from 'src/app/controller/model/referentiel/NiveauFormationPostBac.model';
import {environment} from 'src/environments/environment';
import {NiveauFormationPostBacService} from 'src/app/controller/service/referentiel/NiveauFormationPostBac.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-niveau-formation-post-bac-create-admin',
    templateUrl: './niveau-formation-post-bac-create-admin.component.html',
    styleUrls: ['./niveau-formation-post-bac-create-admin.component.css']
})
export class NiveauFormationPostBacCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validNiveauFormationPostBacLibelle = true;
    _validNiveauFormationPostBacCode = true;


    constructor(private datePipe: DatePipe, private niveauFormationPostBacService: NiveauFormationPostBacService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validNiveauFormationPostBacLibelle = value;
        this.validNiveauFormationPostBacCode = value;
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
        this.niveauFormationPostBacService.save().subscribe(niveauFormationPostBac => {
            if (niveauFormationPostBac != null) {
                this.niveauFormationPostBacs.push({...niveauFormationPostBac});
                this.createNiveauFormationPostBacDialog = false;
                this.submitted = false;
                this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Niveau formation post bac existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateNiveauFormationPostBacLibelle();
        this.validateNiveauFormationPostBacCode();

    }

    private validateNiveauFormationPostBacLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedNiveauFormationPostBac.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNiveauFormationPostBacLibelle = false;
        } else {
            this.validNiveauFormationPostBacLibelle = true;
        }
    }

    private validateNiveauFormationPostBacCode() {
        if (this.stringUtilService.isEmpty(this.selectedNiveauFormationPostBac.code)) {
            this.errorMessages.push('Code non valide');
            this.validNiveauFormationPostBacCode = false;
        } else {
            this.validNiveauFormationPostBacCode = true;
        }
    }


    hideCreateDialog() {
        this.createNiveauFormationPostBacDialog = false;
        this.setValidation(true);
    }

    get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
        return this.niveauFormationPostBacService.niveauFormationPostBacs;
    }

    set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
    }

    get selectedNiveauFormationPostBac(): NiveauFormationPostBacVo {
        return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
    }

    set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
    }

    get createNiveauFormationPostBacDialog(): boolean {
        return this.niveauFormationPostBacService.createNiveauFormationPostBacDialog;

    }

    set createNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.createNiveauFormationPostBacDialog = value;
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

    get validNiveauFormationPostBacLibelle(): boolean {
        return this._validNiveauFormationPostBacLibelle;
    }

    set validNiveauFormationPostBacLibelle(value: boolean) {
        this._validNiveauFormationPostBacLibelle = value;
    }

    get validNiveauFormationPostBacCode(): boolean {
        return this._validNiveauFormationPostBacCode;
    }

    set validNiveauFormationPostBacCode(value: boolean) {
        this._validNiveauFormationPostBacCode = value;
    }


}
