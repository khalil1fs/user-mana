import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {EtablissementPartenaireVo} from 'src/app/controller/model/referentiel/EtablissementPartenaire.model';
import {EtablissementPartenaireService} from 'src/app/controller/service/referentiel/EtablissementPartenaire.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-etablissement-partenaire-view-admin',
    templateUrl: './etablissement-partenaire-view-admin.component.html',
    styleUrls: ['./etablissement-partenaire-view-admin.component.css']
})
export class EtablissementPartenaireViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private etablissementPartenaireService: EtablissementPartenaireService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewEtablissementPartenaireDialog = false;
    }

// getters and setters

    get etablissementPartenaires(): Array<EtablissementPartenaireVo> {
        return this.etablissementPartenaireService.etablissementPartenaires;
    }

    set etablissementPartenaires(value: Array<EtablissementPartenaireVo>) {
        this.etablissementPartenaireService.etablissementPartenaires = value;
    }

    get selectedEtablissementPartenaire(): EtablissementPartenaireVo {
        return this.etablissementPartenaireService.selectedEtablissementPartenaire;
    }

    set selectedEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this.etablissementPartenaireService.selectedEtablissementPartenaire = value;
    }

    get viewEtablissementPartenaireDialog(): boolean {
        return this.etablissementPartenaireService.viewEtablissementPartenaireDialog;

    }

    set viewEtablissementPartenaireDialog(value: boolean) {
        this.etablissementPartenaireService.viewEtablissementPartenaireDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
