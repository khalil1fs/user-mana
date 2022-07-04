import {DatePipe} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {NiveauFormationPostBacVo} from 'src/app/controller/model/referentiel/NiveauFormationPostBac.model';
import {environment} from 'src/environments/environment';
import {NiveauFormationPostBacService} from 'src/app/controller/service/referentiel/NiveauFormationPostBac.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-niveau-formation-post-bac-view-admin',
    templateUrl: './niveau-formation-post-bac-view-admin.component.html',
    styleUrls: ['./niveau-formation-post-bac-view-admin.component.css']
})
export class NiveauFormationPostBacViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private niveauFormationPostBacService: NiveauFormationPostBacService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewNiveauFormationPostBacDialog = false;
    }

// getters and setters

    get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
        return this.niveauFormationPostBacService.niveauFormationPostBacs;
    }

    set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
    }

    get selectedNiveauFormationPostBac(): NiveauFormationPostBacVo {
        return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
    }

    set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
    }

    get viewNiveauFormationPostBacDialog(): boolean {
        return this.niveauFormationPostBacService.viewNiveauFormationPostBacDialog;

    }

    set viewNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.viewNiveauFormationPostBacDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
