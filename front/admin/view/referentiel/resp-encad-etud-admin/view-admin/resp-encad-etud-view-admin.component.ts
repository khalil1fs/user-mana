import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {
    ResponsabiliteEncadrementEtudiantService
} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementEtudiant.service';
import {ResponsabiliteEncadrementEtudiantVo} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementEtudiant.model';

@Component({
    selector: 'app-responsabilite-encadrement-etudiant-view-admin',
    templateUrl: './resp-encad-etud-view-admin.component.html',
    styleUrls: ['./resp-encad-etud-view-admin.component.css']
})
export class ResponsabiliteEncadrementEtudiantViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private responsabiliteEncadrementEtudiantService: ResponsabiliteEncadrementEtudiantService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewResponsabiliteEncadrementEtudiantDialog = false;
    }

// getters and setters

    get responsabiliteEncadrementEtudiants(): Array<ResponsabiliteEncadrementEtudiantVo> {
        return this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants;
    }

    set responsabiliteEncadrementEtudiants(value: Array<ResponsabiliteEncadrementEtudiantVo>) {
        this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants = value;
    }

    get selectedResponsabiliteEncadrementEtudiant(): ResponsabiliteEncadrementEtudiantVo {
        return this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant;
    }

    set selectedResponsabiliteEncadrementEtudiant(value: ResponsabiliteEncadrementEtudiantVo) {
        this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant = value;
    }

    get viewResponsabiliteEncadrementEtudiantDialog(): boolean {
        return this.responsabiliteEncadrementEtudiantService.viewResponsabiliteEncadrementEtudiantDialog;

    }

    set viewResponsabiliteEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteEncadrementEtudiantService.viewResponsabiliteEncadrementEtudiantDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
