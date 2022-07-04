import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ModaliteInterventionVo} from 'src/app/controller/model/referentiel/ModaliteIntervention.model';
import {ModaliteInterventionService} from 'src/app/controller/service/referentiel/ModaliteIntervention.service';

@Component({
    selector: 'app-modalite-intervention-view-admin',
    templateUrl: './modalite-intervention-view-admin.component.html',
    styleUrls: ['./modalite-intervention-view-admin.component.css']
})
export class ModaliteInterventionViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private modaliteInterventionService: ModaliteInterventionService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewModaliteInterventionDialog = false;
    }

// getters and setters

    get modaliteInterventions(): Array<ModaliteInterventionVo> {
        return this.modaliteInterventionService.modaliteInterventions;
    }

    set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
    }

    get selectedModaliteIntervention(): ModaliteInterventionVo {
        return this.modaliteInterventionService.selectedModaliteIntervention;
    }

    set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
    }

    get viewModaliteInterventionDialog(): boolean {
        return this.modaliteInterventionService.viewModaliteInterventionDialog;

    }

    set viewModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.viewModaliteInterventionDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
