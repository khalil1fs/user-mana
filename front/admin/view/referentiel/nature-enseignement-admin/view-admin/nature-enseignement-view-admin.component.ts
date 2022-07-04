import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {NatureEnseignementService} from 'src/app/controller/service/referentiel/NatureEnseignement.service';
import {NatureEnseignementVo} from 'src/app/controller/model/referentiel/NatureEnseignement.model';

@Component({
    selector: 'app-nature-enseignement-view-admin',
    templateUrl: './nature-enseignement-view-admin.component.html',
    styleUrls: ['./nature-enseignement-view-admin.component.css']
})
export class NatureEnseignementViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private natureEnseignementService: NatureEnseignementService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewNatureEnseignementDialog = false;
    }

// getters and setters

    get natureEnseignements(): Array<NatureEnseignementVo> {
        return this.natureEnseignementService.natureEnseignements;
    }

    set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
    }

    get selectedNatureEnseignement(): NatureEnseignementVo {
        return this.natureEnseignementService.selectedNatureEnseignement;
    }

    set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
    }

    get viewNatureEnseignementDialog(): boolean {
        return this.natureEnseignementService.viewNatureEnseignementDialog;

    }

    set viewNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.viewNatureEnseignementDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
