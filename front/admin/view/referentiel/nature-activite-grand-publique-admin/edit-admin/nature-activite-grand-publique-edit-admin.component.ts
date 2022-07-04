import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {NatureActiviteGrandPubliqueService} from 'src/app/controller/service/referentiel/NatureActiviteGrandPublique.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {NatureActiviteGrandPubliqueVo} from 'src/app/controller/model/referentiel/NatureActiviteGrandPublique.model';
import {environment} from 'src/environments/environment';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

@Component({
    selector: 'app-nature-activite-grand-publique-edit-admin',
    templateUrl: './nature-activite-grand-publique-edit-admin.component.html',
    styleUrls: ['./nature-activite-grand-publique-edit-admin.component.css']
})
export class NatureActiviteGrandPubliqueEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validNatureActiviteGrandPubliqueLibelle = true;
    _validNatureActiviteGrandPubliqueCode = true;


    constructor(private datePipe: DatePipe, private natureActiviteGrandPubliqueService: NatureActiviteGrandPubliqueService
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
        this.validNatureActiviteGrandPubliqueLibelle = value;
        this.validNatureActiviteGrandPubliqueCode = value;
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
        this.natureActiviteGrandPubliqueService.edit().subscribe(natureActiviteGrandPublique => {
            const myIndex = this.natureActiviteGrandPubliques.findIndex(e => e.id === this.selectedNatureActiviteGrandPublique.id);
            this.natureActiviteGrandPubliques[myIndex] = natureActiviteGrandPublique;
            this.editNatureActiviteGrandPubliqueDialog = false;
            this.submitted = false;
            this.selectedNatureActiviteGrandPublique = new NatureActiviteGrandPubliqueVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateNatureActiviteGrandPubliqueLibelle();
        this.validateNatureActiviteGrandPubliqueCode();

    }

    private validateNatureActiviteGrandPubliqueLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedNatureActiviteGrandPublique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNatureActiviteGrandPubliqueLibelle = false;
        } else {
            this.validNatureActiviteGrandPubliqueLibelle = true;
        }
    }

    private validateNatureActiviteGrandPubliqueCode() {
        if (this.stringUtilService.isEmpty(this.selectedNatureActiviteGrandPublique.code)) {
            this.errorMessages.push('Code non valide');
            this.validNatureActiviteGrandPubliqueCode = false;
        } else {
            this.validNatureActiviteGrandPubliqueCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editNatureActiviteGrandPubliqueDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get natureActiviteGrandPubliques(): Array<NatureActiviteGrandPubliqueVo> {
        return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques;
    }

    set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques = value;
    }

    get selectedNatureActiviteGrandPublique(): NatureActiviteGrandPubliqueVo {
        return this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique;
    }

    set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique = value;
    }

    get editNatureActiviteGrandPubliqueDialog(): boolean {
        return this.natureActiviteGrandPubliqueService.editNatureActiviteGrandPubliqueDialog;

    }

    set editNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.editNatureActiviteGrandPubliqueDialog = value;
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

    get validNatureActiviteGrandPubliqueLibelle(): boolean {
        return this._validNatureActiviteGrandPubliqueLibelle;
    }

    set validNatureActiviteGrandPubliqueLibelle(value: boolean) {
        this._validNatureActiviteGrandPubliqueLibelle = value;
    }

    get validNatureActiviteGrandPubliqueCode(): boolean {
        return this._validNatureActiviteGrandPubliqueCode;
    }

    set validNatureActiviteGrandPubliqueCode(value: boolean) {
        this._validNatureActiviteGrandPubliqueCode = value;
    }

}
