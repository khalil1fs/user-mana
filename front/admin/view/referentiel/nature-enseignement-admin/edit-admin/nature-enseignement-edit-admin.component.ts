import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {NatureEnseignementService} from 'src/app/controller/service/referentiel/NatureEnseignement.service';
import {NatureEnseignementVo} from 'src/app/controller/model/referentiel/NatureEnseignement.model';

@Component({
    selector: 'app-nature-enseignement-edit-admin',
    templateUrl: './nature-enseignement-edit-admin.component.html',
    styleUrls: ['./nature-enseignement-edit-admin.component.css']
})
export class NatureEnseignementEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validNatureEnseignementLibelle = true;
    _validNatureEnseignementCode = true;


    constructor(private datePipe: DatePipe, private natureEnseignementService: NatureEnseignementService
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
        this.validNatureEnseignementLibelle = value;
        this.validNatureEnseignementCode = value;
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
        this.natureEnseignementService.edit().subscribe(natureEnseignement => {
            const myIndex = this.natureEnseignements.findIndex(e => e.id === this.selectedNatureEnseignement.id);
            this.natureEnseignements[myIndex] = natureEnseignement;
            this.editNatureEnseignementDialog = false;
            this.submitted = false;
            this.selectedNatureEnseignement = new NatureEnseignementVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateNatureEnseignementLibelle();
        this.validateNatureEnseignementCode();

    }

    private validateNatureEnseignementLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedNatureEnseignement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNatureEnseignementLibelle = false;
        } else {
            this.validNatureEnseignementLibelle = true;
        }
    }

    private validateNatureEnseignementCode() {
        if (this.stringUtilService.isEmpty(this.selectedNatureEnseignement.code)) {
            this.errorMessages.push('Code non valide');
            this.validNatureEnseignementCode = false;
        } else {
            this.validNatureEnseignementCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editNatureEnseignementDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get natureEnseignements(): Array<NatureEnseignementVo> {
        return this.natureEnseignementService.natureEnseignements;
    }

    set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
    }

    get selectedNatureEnseignement(): NatureEnseignementVo {
        return this.natureEnseignementService.selectedNatureEnseignement;
    }

    set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
    }

    get editNatureEnseignementDialog(): boolean {
        return this.natureEnseignementService.editNatureEnseignementDialog;

    }

    set editNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.editNatureEnseignementDialog = value;
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

    get validNatureEnseignementLibelle(): boolean {
        return this._validNatureEnseignementLibelle;
    }

    set validNatureEnseignementLibelle(value: boolean) {
        this._validNatureEnseignementLibelle = value;
    }

    get validNatureEnseignementCode(): boolean {
        return this._validNatureEnseignementCode;
    }

    set validNatureEnseignementCode(value: boolean) {
        this._validNatureEnseignementCode = value;
    }

}
