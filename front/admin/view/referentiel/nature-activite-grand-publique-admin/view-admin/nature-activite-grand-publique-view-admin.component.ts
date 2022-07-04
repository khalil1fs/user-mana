import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {NatureActiviteGrandPubliqueService} from 'src/app/controller/service/referentiel/NatureActiviteGrandPublique.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {NatureActiviteGrandPubliqueVo} from 'src/app/controller/model/referentiel/NatureActiviteGrandPublique.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-nature-activite-grand-publique-view-admin',
    templateUrl: './nature-activite-grand-publique-view-admin.component.html',
    styleUrls: ['./nature-activite-grand-publique-view-admin.component.css']
})
export class NatureActiviteGrandPubliqueViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private natureActiviteGrandPubliqueService: NatureActiviteGrandPubliqueService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewNatureActiviteGrandPubliqueDialog = false;
    }

// getters and setters

    get natureActiviteGrandPubliques(): Array<NatureActiviteGrandPubliqueVo> {
        return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques;
    }

    set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques = value;
    }

    get selectedNatureActiviteGrandPublique(): NatureActiviteGrandPubliqueVo {
        return this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique;
    }

    set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique = value;
    }

    get viewNatureActiviteGrandPubliqueDialog(): boolean {
        return this.natureActiviteGrandPubliqueService.viewNatureActiviteGrandPubliqueDialog;

    }

    set viewNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.viewNatureActiviteGrandPubliqueDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
