import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {StatusContratEtConventionVo} from 'src/app/controller/model/referentiel/StatusContratEtConvention.model';
import {environment} from 'src/environments/environment';
import {StatusContratEtConventionService} from 'src/app/controller/service/referentiel/StatusContratEtConvention.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-status-contrat-et-convention-view-admin',
    templateUrl: './status-cont-conv-view-admin.component.html',
    styleUrls: ['./status-cont-conv-view-admin.component.css']
})
export class StatusContratEtConventionViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private statusContratEtConventionService: StatusContratEtConventionService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewStatusContratEtConventionDialog = false;
    }

// getters and setters

    get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
        return this.statusContratEtConventionService.statusContratEtConventions;
    }

    set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
    }

    get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
        return this.statusContratEtConventionService.selectedStatusContratEtConvention;
    }

    set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
    }

    get viewStatusContratEtConventionDialog(): boolean {
        return this.statusContratEtConventionService.viewStatusContratEtConventionDialog;

    }

    set viewStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.viewStatusContratEtConventionDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
