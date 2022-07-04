import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
    RoleEvaluationRechercheUniversitaireService
} from 'src/app/controller/service/referentiel/RoleEvaluationRechercheUniversitaire.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {
    RoleEvaluationRechercheUniversitaireVo
} from 'src/app/controller/model/referentiel/RoleEvaluationRechercheUniversitaire.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-role-evaluation-recherche-universitaire-view-admin',
    templateUrl: './role-eval-rech-uni-view-admin.component.html',
    styleUrls: ['./role-eval-rech-uni-view-admin.component.css']
})
export class RoleEvaluationRechercheUniversitaireViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private roleEvaluationRechercheUniversitaireService: RoleEvaluationRechercheUniversitaireService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewRoleEvaluationRechercheUniversitaireDialog = false;
    }

// getters and setters

    get roleEvaluationRechercheUniversitaires(): Array<RoleEvaluationRechercheUniversitaireVo> {
        return this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaires;
    }

    set roleEvaluationRechercheUniversitaires(value: Array<RoleEvaluationRechercheUniversitaireVo>) {
        this.roleEvaluationRechercheUniversitaireService.roleEvaluationRechercheUniversitaires = value;
    }

    get selectedRoleEvaluationRechercheUniversitaire(): RoleEvaluationRechercheUniversitaireVo {
        return this.roleEvaluationRechercheUniversitaireService.selectedRoleEvaluationRechercheUniversitaire;
    }

    set selectedRoleEvaluationRechercheUniversitaire(value: RoleEvaluationRechercheUniversitaireVo) {
        this.roleEvaluationRechercheUniversitaireService.selectedRoleEvaluationRechercheUniversitaire = value;
    }

    get viewRoleEvaluationRechercheUniversitaireDialog(): boolean {
        return this.roleEvaluationRechercheUniversitaireService.viewRoleEvaluationRechercheUniversitaireDialog;

    }

    set viewRoleEvaluationRechercheUniversitaireDialog(value: boolean) {
        this.roleEvaluationRechercheUniversitaireService.viewRoleEvaluationRechercheUniversitaireDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
