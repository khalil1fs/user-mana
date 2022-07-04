import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcAssociationVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErcAssociation.model';
import {
    DisciplineScientifiqueErcAssociationService
} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErcAssociation.service';
import {SemanticRelationshipVo} from 'src/app/controller/model/referentiel/SemanticRelationship.model';
import {SemanticRelationshipService} from 'src/app/controller/service/referentiel/SemanticRelationship.service';

@Component({
    selector: 'app-discipline-scientifique-view-admin',
    templateUrl: './discipline-scientifique-view-admin.component.html',
    styleUrls: ['./discipline-scientifique-view-admin.component.css']
})
export class DisciplineScientifiqueViewAdminComponent implements OnInit {

    selectedDisciplineScientifiqueErcAssociations: DisciplineScientifiqueErcAssociationVo = new DisciplineScientifiqueErcAssociationVo();
    disciplineScientifiqueErcAssociationsListe: Array<DisciplineScientifiqueErcAssociationVo> = [];

    myDisciplineScientifiqueErcs: Array<DisciplineScientifiqueErcVo> = [];
    mySemanticRelationships: Array<SemanticRelationshipVo> = [];


    constructor(private datePipe: DatePipe, private disciplineScientifiqueService: DisciplineScientifiqueService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
        , private disciplineScientifiqueErcAssociationService: DisciplineScientifiqueErcAssociationService
        , private semanticRelationshipService: SemanticRelationshipService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedDisciplineScientifiqueErcAssociations.disciplineScientifiqueErcVo = new DisciplineScientifiqueErcVo();
        this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);
        this.selectedDisciplineScientifiqueErcAssociations.semanticRelationshipVo = new SemanticRelationshipVo();
        this.semanticRelationshipService.findAll().subscribe((data) => this.semanticRelationships = data);
    }

    hideViewDialog() {
        this.viewDisciplineScientifiqueDialog = false;
    }

// getters and setters

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

    get viewDisciplineScientifiqueDialog(): boolean {
        return this.disciplineScientifiqueService.viewDisciplineScientifiqueDialog;

    }

    set viewDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.viewDisciplineScientifiqueDialog = value;
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

    get editDisciplineScientifiqueErcDialog(): boolean {
        return this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog;
    }

    set editDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog = value;
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

    get editSemanticRelationshipDialog(): boolean {
        return this.semanticRelationshipService.editSemanticRelationshipDialog;
    }

    set editSemanticRelationshipDialog(value: boolean) {
        this.semanticRelationshipService.editSemanticRelationshipDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
