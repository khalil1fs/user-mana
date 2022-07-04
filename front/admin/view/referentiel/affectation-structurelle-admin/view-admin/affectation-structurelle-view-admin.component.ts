import {Component, OnInit} from '@angular/core';
import {AffectationStructurelleService} from 'src/app/controller/service/referentiel/AffectationStructurelle.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {AffectationStructurelleVo} from 'src/app/controller/model/referentiel/AffectationStructurelle.model';

@Component({
    selector: 'app-affectation-structurelle-view-admin',
    templateUrl: './affectation-structurelle-view-admin.component.html',
    styleUrls: ['./affectation-structurelle-view-admin.component.css']
})
export class AffectationStructurelleViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private affectationStructurelleService: AffectationStructurelleService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewAffectationStructurelleDialog = false;
    }

// getters and setters

    get affectationStructurelles(): Array<AffectationStructurelleVo> {
        return this.affectationStructurelleService.affectationStructurelles;
    }

    set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
    }

    get selectedAffectationStructurelle(): AffectationStructurelleVo {
        return this.affectationStructurelleService.selectedAffectationStructurelle;
    }

    set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
    }

    get viewAffectationStructurelleDialog(): boolean {
        return this.affectationStructurelleService.viewAffectationStructurelleDialog;

    }

    set viewAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.viewAffectationStructurelleDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
