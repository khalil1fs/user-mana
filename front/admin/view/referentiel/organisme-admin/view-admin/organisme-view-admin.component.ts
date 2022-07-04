import {DatePipe} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {PaysVo} from '../../../../../../controller/model/referentiel/Pays.model';
import {PaysService} from '../../../../../../controller/service/referentiel/Pays.service';
import {OrganismeService} from '../../../../../../controller/service/referentiel/Organisme.service';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {OrganismeVo} from '../../../../../../controller/model/referentiel/Organisme.model';
import {environment} from '../../../../../../../environments/environment';

@Component({
    selector: 'app-organisme-view-admin',
    templateUrl: './organisme-view-admin.component.html',
    styleUrls: ['./organisme-view-admin.component.css']
})
export class OrganismeViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private organismeService: OrganismeService
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
        this.viewOrganismeDialog = false;
    }

// getters and setters

    get organismes(): Array<OrganismeVo> {
        return this.organismeService.organismes;
    }

    set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
    }

    get selectedOrganisme(): OrganismeVo {
        return this.organismeService.selectedOrganisme;
    }

    set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
    }

    get viewOrganismeDialog(): boolean {
        return this.organismeService.viewOrganismeDialog;

    }

    set viewOrganismeDialog(value: boolean) {
        this.organismeService.viewOrganismeDialog = value;
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
