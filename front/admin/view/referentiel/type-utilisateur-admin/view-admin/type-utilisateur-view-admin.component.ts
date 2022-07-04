import {Component, OnInit} from '@angular/core';

import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {TypeUtilisateurService} from 'src/app/controller/service/referentiel/TypeUtilisateur.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {TypeUtilisateurVo} from 'src/app/controller/model/referentiel/TypeUtilisateur.model';

@Component({
    selector: 'app-type-utilisateur-view-admin',
    templateUrl: './type-utilisateur-view-admin.component.html',
    styleUrls: ['./type-utilisateur-view-admin.component.css']
})
export class TypeUtilisateurViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private typeUtilisateurService: TypeUtilisateurService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewTypeUtilisateurDialog = false;
    }

// getters and setters

    get typeUtilisateurs(): Array<TypeUtilisateurVo> {
        return this.typeUtilisateurService.typeUtilisateurs;
    }

    set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
    }

    get selectedTypeUtilisateur(): TypeUtilisateurVo {
        return this.typeUtilisateurService.selectedTypeUtilisateur;
    }

    set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
    }

    get viewTypeUtilisateurDialog(): boolean {
        return this.typeUtilisateurService.viewTypeUtilisateurDialog;

    }

    set viewTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.viewTypeUtilisateurDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
