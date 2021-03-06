import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';


import {DisciplineScientifiqueErcAssociationVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErcAssociation.model';
import {
    DisciplineScientifiqueErcAssociationService
} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErcAssociation.service';
import {SemanticRelationshipVo} from 'src/app/controller/model/referentiel/SemanticRelationship.model';
import {SemanticRelationshipService} from 'src/app/controller/service/referentiel/SemanticRelationship.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';

@Component({
    selector: 'app-discipline-scientifique-create-admin',
    templateUrl: './discipline-scientifique-create-admin.component.html',
    styleUrls: ['./discipline-scientifique-create-admin.component.css']
})
export class DisciplineScientifiqueCreateAdminComponent implements OnInit {

    selectedDisciplineScientifiqueErcAssociations: DisciplineScientifiqueErcAssociationVo = new DisciplineScientifiqueErcAssociationVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueService: DisciplineScientifiqueService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private semanticRelationshipService: SemanticRelationshipService
        , private disciplineScientifiqueErcAssociationService: DisciplineScientifiqueErcAssociationService
        , private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
    ) {

    }


    ngOnInit(): void {


        this.selectedDisciplineScientifiqueErcAssociations.disciplineScientifiqueErcVo = new DisciplineScientifiqueErcVo();
        this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);
        this.selectedDisciplineScientifiqueErcAssociations.semanticRelationshipVo = new SemanticRelationshipVo();
        this.semanticRelationshipService.findAll().subscribe((data) => this.semanticRelationships = data);


    }


    validateDisciplineScientifiqueErcAssociations() {
        this.errorMessages = new Array();
    }


    private setValidation(value: boolean) {
        this.validDisciplineScientifiqueLibelleFr = value;
        this.validDisciplineScientifiqueLibelleEng = value;
        this.validDisciplineScientifiqueCode = value;
    }

    addDisciplineScientifiqueErcAssociations() {
        if (this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo == null) {
            this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo = new Array<DisciplineScientifiqueErcAssociationVo>();
        }
        this.validateDisciplineScientifiqueErcAssociations();
        if (this.errorMessages.length === 0) {
            this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo.push(this.selectedDisciplineScientifiqueErcAssociations);
            this.selectedDisciplineScientifiqueErcAssociations = new DisciplineScientifiqueErcAssociationVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrig?? les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteDisciplineScientifiqueErcAssociations(p: DisciplineScientifiqueErcAssociationVo) {
        this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo.splice(index, 1);
            }
        });
    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrig?? les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.disciplineScientifiqueService.save().subscribe(disciplineScientifique => {
            if (disciplineScientifique != null) {
                this.disciplineScientifiques.push({...disciplineScientifique});
                this.createDisciplineScientifiqueDialog = false;
                this.submitted = false;
                this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Discipline scientifique existe d??j??'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateDisciplineScientifiqueLibelleFr();
        this.validateDisciplineScientifiqueLibelleEng();
        this.validateDisciplineScientifiqueCode();

    }

    private validateDisciplineScientifiqueLibelleFr() {
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifique.libelleFr)) {
            this.errorMessages.push('Libelle fr non valide');
            this.validDisciplineScientifiqueLibelleFr = false;
        } else {
            this.validDisciplineScientifiqueLibelleFr = true;
        }
    }

    private validateDisciplineScientifiqueLibelleEng() {
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifique.libelleEng)) {
            this.errorMessages.push('Libelle eng non valide');
            this.validDisciplineScientifiqueLibelleEng = false;
        } else {
            this.validDisciplineScientifiqueLibelleEng = true;
        }
    }

    private validateDisciplineScientifiqueCode() {
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifique.code)) {
            this.errorMessages.push('Code non valide');
            this.validDisciplineScientifiqueCode = false;
        } else {
            this.validDisciplineScientifiqueCode = true;
        }
    }


    public async openCreateDisciplineScientifiqueErc(disciplineScientifiqueErc: string) {
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'add');
        if (isPermistted) {
            this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
            this.createDisciplineScientifiqueErcDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me de permission'
            });
        }
    }

    public async openCreateSemanticRelationship(semanticRelationship: string) {
        const isPermistted = await this.roleService.isPermitted('SemanticRelationship', 'add');
        if (isPermistted) {
            this.selectedSemanticRelationship = new SemanticRelationshipVo();
            this.createSemanticRelationshipDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createDisciplineScientifiqueDialog = false;
        this.setValidation(true);
    }

    get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
        return this.disciplineScientifiqueService.disciplineScientifiques;
    }

    set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
    }

    get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
        return this.disciplineScientifiqueService.selectedDisciplineScientifique;
    }

    set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
    }

    get createDisciplineScientifiqueDialog(): boolean {
        return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;

    }

    set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog = value;
    }

    get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
        return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
    }

    set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
    }

    get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
        return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
    }

    set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
    }

    get createDisciplineScientifiqueErcDialog(): boolean {
        return this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog;
    }

    set createDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog = value;
    }

    get selectedSemanticRelationship(): SemanticRelationshipVo {
        return this.semanticRelationshipService.selectedSemanticRelationship;
    }

    set selectedSemanticRelationship(value: SemanticRelationshipVo) {
        this.semanticRelationshipService.selectedSemanticRelationship = value;
    }

    get semanticRelationships(): Array<SemanticRelationshipVo> {
        return this.semanticRelationshipService.semanticRelationships;
    }

    set semanticRelationships(value: Array<SemanticRelationshipVo>) {
        this.semanticRelationshipService.semanticRelationships = value;
    }

    get createSemanticRelationshipDialog(): boolean {
        return this.semanticRelationshipService.createSemanticRelationshipDialog;
    }

    set createSemanticRelationshipDialog(value: boolean) {
        this.semanticRelationshipService.createSemanticRelationshipDialog = value;
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

    get validDisciplineScientifiqueLibelleFr(): boolean {
        return this._validDisciplineScientifiqueLibelleFr;
    }

    set validDisciplineScientifiqueLibelleFr(value: boolean) {
        this._validDisciplineScientifiqueLibelleFr = value;
    }

    get validDisciplineScientifiqueLibelleEng(): boolean {
        return this._validDisciplineScientifiqueLibelleEng;
    }

    set validDisciplineScientifiqueLibelleEng(value: boolean) {
        this._validDisciplineScientifiqueLibelleEng = value;
    }

    get validDisciplineScientifiqueCode(): boolean {
        return this._validDisciplineScientifiqueCode;
    }

    set validDisciplineScientifiqueCode(value: boolean) {
        this._validDisciplineScientifiqueCode = value;
    }


}
