import {DatePipe} from '@angular/common';

import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {CommanditaireService} from 'src/app/controller/service/referentiel/Commanditaire.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {CommanditaireVo} from 'src/app/controller/model/referentiel/Commanditaire.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';

@Component({
    selector: 'app-commanditaire-view-admin',
    templateUrl: './commanditaire-view-admin.component.html',
    styleUrls: ['./commanditaire-view-admin.component.css']
})
export class CommanditaireViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private commanditaireService: CommanditaireService
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
        this.viewCommanditaireDialog = false;
    }

// getters and setters

    get commanditaires(): Array<CommanditaireVo> {
        return this.commanditaireService.commanditaires;
    }

    set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
    }

    get selectedCommanditaire(): CommanditaireVo {
        return this.commanditaireService.selectedCommanditaire;
    }

    set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
    }

    get viewCommanditaireDialog(): boolean {
        return this.commanditaireService.viewCommanditaireDialog;

    }

    set viewCommanditaireDialog(value: boolean) {
        this.commanditaireService.viewCommanditaireDialog = value;
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
