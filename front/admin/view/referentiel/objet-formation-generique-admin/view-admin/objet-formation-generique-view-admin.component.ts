import {DatePipe} from '@angular/common';

import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {MessageService} from 'primeng/api';

import {ObjetFormationGeneriqueService} from 'src/app/controller/service/referentiel/ObjetFormationGenerique.service';
import {ObjetFormationGeneriqueVo} from 'src/app/controller/model/referentiel/ObjetFormationGenerique.model';


@Component({
    selector: 'app-objet-formation-generique-view-admin',
    templateUrl: './objet-formation-generique-view-admin.component.html',
    styleUrls: ['./objet-formation-generique-view-admin.component.css']
})
export class ObjetFormationGeneriqueViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private objetFormationGeneriqueService: ObjetFormationGeneriqueService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewObjetFormationGeneriqueDialog = false;
    }

// getters and setters

    get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
        return this.objetFormationGeneriqueService.objetFormationGeneriques;
    }

    set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
    }

    get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
        return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
    }

    set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
    }

    get viewObjetFormationGeneriqueDialog(): boolean {
        return this.objetFormationGeneriqueService.viewObjetFormationGeneriqueDialog;

    }

    set viewObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.viewObjetFormationGeneriqueDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
