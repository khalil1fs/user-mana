import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {PartenaireService} from 'src/app/controller/service/referentiel/Partenaire.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PartenaireVo} from 'src/app/controller/model/referentiel/Partenaire.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
    selector: 'app-partenaire-view-admin',
    templateUrl: './partenaire-view-admin.component.html',
    styleUrls: ['./partenaire-view-admin.component.css']
})
export class PartenaireViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private partenaireService: PartenaireService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private paysService: PaysService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedPays = new PaysVo();
        this.paysService.findAll().subscribe((data) => this.payss = data);
    }

    hideViewDialog() {
        this.viewPartenaireDialog = false;
    }

// getters and setters

    get partenaires(): Array<PartenaireVo> {
        return this.partenaireService.partenaires;
    }

    set partenaires(value: Array<PartenaireVo>) {
        this.partenaireService.partenaires = value;
    }

    get selectedPartenaire(): PartenaireVo {
        return this.partenaireService.selectedPartenaire;
    }

    set selectedPartenaire(value: PartenaireVo) {
        this.partenaireService.selectedPartenaire = value;
    }

    get viewPartenaireDialog(): boolean {
        return this.partenaireService.viewPartenaireDialog;

    }

    set viewPartenaireDialog(value: boolean) {
        this.partenaireService.viewPartenaireDialog = value;
    }

    get selectedPays(): PaysVo {
        return this.paysService.selectedPays;
    }

    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
    }

    get payss(): Array<PaysVo> {
        return this.paysService.payss;
    }

    set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
    }

    get editPaysDialog(): boolean {
        return this.paysService.editPaysDialog;
    }

    set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
