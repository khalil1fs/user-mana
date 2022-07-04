import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {
    NiveauResponsabilitePedagogiqueService
} from 'src/app/controller/service/referentiel/NiveauResponsabilitePedagogique.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {NiveauResponsabilitePedagogiqueVo} from 'src/app/controller/model/referentiel/NiveauResponsabilitePedagogique.model';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-niveau-responsabilite-pedagogique-view-admin',
    templateUrl: './niveau-resp-ped-view-admin.component.html',
    styleUrls: ['./niveau-resp-ped-view-admin.component.css']
})
export class NiveauRespPedViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewNiveauResponsabilitePedagogiqueDialog = false;
    }

// getters and setters

    get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
        return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
    }

    set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
    }

    get selectedNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
        return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
    }

    set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
    }

    get viewNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this.niveauResponsabilitePedagogiqueService.viewNiveauResponsabilitePedagogiqueDialog;

    }

    set viewNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.viewNiveauResponsabilitePedagogiqueDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
