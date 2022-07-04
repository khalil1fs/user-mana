import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
    ResponsabiliteEncadrementDoctorantService
} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementDoctorant.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {
    ResponsabiliteEncadrementDoctorantVo
} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementDoctorant.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-responsabilite-encadrement-doctorant-view-admin',
    templateUrl: './res-enca-doc-view-admin.component.html',
    styleUrls: ['./res-enca-doc-view-admin.component.css']
})
export class ResponsabiliteEncadrementDoctorantViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewResponsabiliteEncadrementDoctorantDialog = false;
    }

// getters and setters

    get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
        return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
    }

    set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
    }

    get selectedResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
        return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
    }

    set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
    }

    get viewResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this.responsabiliteEncadrementDoctorantService.viewResponsabiliteEncadrementDoctorantDialog;

    }

    set viewResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.viewResponsabiliteEncadrementDoctorantDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
