import {DatePipe} from '@angular/common';
import {TypeEtudeVo} from 'src/app/controller/model/referentiel/TypeEtude.model';
import {MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {TypeEtudeService} from 'src/app/controller/service/referentiel/TypeEtude.service';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-type-etude-view-admin',
    templateUrl: './type-etude-view-admin.component.html',
    styleUrls: ['./type-etude-view-admin.component.css']
})
export class TypeEtudeViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private typeEtudeService: TypeEtudeService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewTypeEtudeDialog = false;
    }

// getters and setters

    get typeEtudes(): Array<TypeEtudeVo> {
        return this.typeEtudeService.typeEtudes;
    }

    set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
    }

    get selectedTypeEtude(): TypeEtudeVo {
        return this.typeEtudeService.selectedTypeEtude;
    }

    set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
    }

    get viewTypeEtudeDialog(): boolean {
        return this.typeEtudeService.viewTypeEtudeDialog;

    }

    set viewTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.viewTypeEtudeDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
