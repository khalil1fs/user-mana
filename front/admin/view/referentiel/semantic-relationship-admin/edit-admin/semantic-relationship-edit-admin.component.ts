import {Component, OnInit} from '@angular/core';
import {SemanticRelationshipService} from 'src/app/controller/service/referentiel/SemanticRelationship.service';
import {SemanticRelationshipVo} from 'src/app/controller/model/referentiel/SemanticRelationship.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

@Component({
    selector: 'app-semantic-relationship-edit-admin',
    templateUrl: './semantic-relationship-edit-admin.component.html',
    styleUrls: ['./semantic-relationship-edit-admin.component.css']
})
export class SemanticRelationshipEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validSemanticRelationshipLibelle = true;
    _validSemanticRelationshipCode = true;


    constructor(private datePipe: DatePipe, private semanticRelationshipService: SemanticRelationshipService
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
        this.validSemanticRelationshipLibelle = value;
        this.validSemanticRelationshipCode = value;
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
        this.semanticRelationshipService.edit().subscribe(semanticRelationship => {
            const myIndex = this.semanticRelationships.findIndex(e => e.id === this.selectedSemanticRelationship.id);
            this.semanticRelationships[myIndex] = semanticRelationship;
            this.editSemanticRelationshipDialog = false;
            this.submitted = false;
            this.selectedSemanticRelationship = new SemanticRelationshipVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateSemanticRelationshipLibelle();
        this.validateSemanticRelationshipCode();

    }

    private validateSemanticRelationshipLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedSemanticRelationship.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSemanticRelationshipLibelle = false;
        } else {
            this.validSemanticRelationshipLibelle = true;
        }
    }

    private validateSemanticRelationshipCode() {
        if (this.stringUtilService.isEmpty(this.selectedSemanticRelationship.code)) {
            this.errorMessages.push('Code non valide');
            this.validSemanticRelationshipCode = false;
        } else {
            this.validSemanticRelationshipCode = true;
        }
    }


//openPopup
// methods

    hideEditDialog() {
        this.editSemanticRelationshipDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get semanticRelationships(): Array<SemanticRelationshipVo> {
        return this.semanticRelationshipService.semanticRelationships;
    }

    set semanticRelationships(value: Array<SemanticRelationshipVo>) {
        this.semanticRelationshipService.semanticRelationships = value;
    }

    get selectedSemanticRelationship(): SemanticRelationshipVo {
        return this.semanticRelationshipService.selectedSemanticRelationship;
    }

    set selectedSemanticRelationship(value: SemanticRelationshipVo) {
        this.semanticRelationshipService.selectedSemanticRelationship = value;
    }

    get editSemanticRelationshipDialog(): boolean {
        return this.semanticRelationshipService.editSemanticRelationshipDialog;

    }

    set editSemanticRelationshipDialog(value: boolean) {
        this.semanticRelationshipService.editSemanticRelationshipDialog = value;
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

    get validSemanticRelationshipLibelle(): boolean {
        return this._validSemanticRelationshipLibelle;
    }

    set validSemanticRelationshipLibelle(value: boolean) {
        this._validSemanticRelationshipLibelle = value;
    }

    get validSemanticRelationshipCode(): boolean {
        return this._validSemanticRelationshipCode;
    }

    set validSemanticRelationshipCode(value: boolean) {
        this._validSemanticRelationshipCode = value;
    }

}
