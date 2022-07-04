import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {RoleDeveloppementDeSavoirVo} from 'src/app/controller/model/referentiel/RoleDeveloppementDeSavoir.model';
import {environment} from 'src/environments/environment';
import {RoleDeveloppementDeSavoirService} from 'src/app/controller/service/referentiel/RoleDeveloppementDeSavoir.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-role-developpement-de-savoir-view-admin',
    templateUrl: './role-dev-de-savoir-view-admin.component.html',
    styleUrls: ['./role-dev-de-savoir-view-admin.component.css']
})
export class RoleDeveloppementDeSavoirViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewRoleDeveloppementDeSavoirDialog = false;
    }

// getters and setters

    get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
        return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
    }

    set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
    }

    get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
        return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
    }

    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
    }

    get viewRoleDeveloppementDeSavoirDialog(): boolean {
        return this.roleDeveloppementDeSavoirService.viewRoleDeveloppementDeSavoirDialog;

    }

    set viewRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.viewRoleDeveloppementDeSavoirDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
